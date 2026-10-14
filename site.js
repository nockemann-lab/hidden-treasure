/*
 * Shared behaviour for all pages:
 *   - language loading and text replacement (data-i18n attributes)
 *   - light/dark theme toggle
 *   - exhibition ("kiosk") mode:  add ?kiosk to the address (or ?kiosk=120 for 120 s)
 *   - offline support (service worker) when served over http(s)
 *
 * Needs content/languages.js and content/en.js to be loaded first.
 */
(function () {
    'use strict';

    const html = document.documentElement;
    const params = new URLSearchParams(location.search);
    const LANGS = window.SITE_LANGUAGES || { en: 'English' };
    const ALL = window.SITE_CONTENT || {};
    let content = ALL.en || { ui: {} };
    let lang = 'en';

    function store(key, value) {
        try { if (value === undefined) return localStorage.getItem(key); localStorage.setItem(key, value); } catch (e) { return null; }
    }

    // --- TEXT -------------------------------------------------------------
    function t(key, vars) {
        let s = content.ui[key];
        if (s === undefined) s = (ALL.en && ALL.en.ui[key]) || key;
        if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
        return s;
    }

    function applyI18n(root) {
        root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
        root.querySelectorAll('[data-i18n-html]').forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
        root.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
        root.querySelectorAll('[data-i18n-alt]').forEach(el => { el.setAttribute('alt', t(el.dataset.i18nAlt)); });
        root.querySelectorAll('[data-i18n-label]').forEach(el => { el.dataset.label = t(el.dataset.i18nLabel); });
    }

    function pickLanguage() {
        const wanted = [params.get('lang'), store('lang')]
            .concat((navigator.languages || [navigator.language || '']).map(l => (l || '').slice(0, 2).toLowerCase()));
        return wanted.find(l => l && LANGS[l]) || 'en';
    }

    function merge(base, extra) {
        if (!extra) return base;
        return {
            ui: Object.assign({}, base.ui, extra.ui),
            elements: Object.assign({}, base.elements, extra.elements),
            layers: extra.layers || base.layers,
            quiz: extra.quiz || base.quiz
        };
    }

    function buildLanguageSwitcher() {
        const codes = Object.keys(LANGS);
        const holder = document.querySelector('.site-controls');
        if (codes.length < 2 || !holder) return;
        const sel = document.createElement('select');
        sel.className = 'lang-select';
        sel.setAttribute('aria-label', t('lang.label'));
        codes.forEach(code => {
            const o = document.createElement('option');
            o.value = code; o.textContent = LANGS[code]; o.selected = code === lang;
            sel.appendChild(o);
        });
        sel.addEventListener('change', () => {
            store('lang', sel.value);
            params.set('lang', sel.value);
            location.search = params.toString();
        });
        holder.prepend(sel);
    }

    // Load the chosen language (English is already loaded), then call back with the content
    function loadContent(callback, options) {
        const opts = options || {};
        const done = () => {
            content = merge(ALL.en, lang === 'en' ? null : ALL[lang]);
            html.lang = lang;
            if (opts.i18n !== false) {
                applyI18n(document);
                buildLanguageSwitcher();
            }
            refreshThemeButton();
            setupKiosk();
            callback(content, lang);
        };
        lang = opts.i18n === false ? 'en' : pickLanguage();
        if (lang === 'en' || ALL[lang]) { done(); return; }
        const s = document.createElement('script');
        s.src = 'content/' + lang + '.js';
        s.onload = done;
        s.onerror = () => { lang = 'en'; done(); };
        document.head.appendChild(s);
    }

    // --- THEME ------------------------------------------------------------
    const darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const effectiveTheme = () => html.dataset.theme || (darkQuery && darkQuery.matches ? 'dark' : 'light');

    function refreshThemeButton() {
        const btn = document.querySelector('.theme-toggle');
        if (!btn) return;
        const dark = effectiveTheme() === 'dark';
        btn.textContent = dark ? '☀️' : '🌙';
        btn.setAttribute('aria-label', t(dark ? 'theme.toLight' : 'theme.toDark'));
        btn.title = btn.getAttribute('aria-label');
    }

    document.addEventListener('click', e => {
        if (!e.target.closest('.theme-toggle')) return;
        const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
        html.dataset.theme = next;
        store('theme', next);
        refreshThemeButton();
    });
    if (darkQuery && darkQuery.addEventListener) darkQuery.addEventListener('change', refreshThemeButton);

    // --- EXHIBITION (KIOSK) MODE -------------------------------------------
    const kiosk = params.has('kiosk');
    let kioskReady = false;

    function kioskParams() {
        const p = new URLSearchParams();
        p.set('kiosk', params.get('kiosk') || '');
        if (params.get('lang')) p.set('lang', params.get('lang'));
        return p.toString().replace(/=$/, '').replace(/=&/, '&');
    }

    function setupKiosk() {
        if (!kiosk || kioskReady) return;
        kioskReady = true;
        html.classList.add('kiosk');
        const idleSecs = Math.max(parseInt(params.get('kiosk'), 10) || 90, 20);
        const warnSecs = 10;

        // Keep visitors inside the display: internal links keep kiosk mode, external links do nothing
        document.addEventListener('click', e => {
            const a = e.target.closest('a[href]');
            if (!a) return;
            const href = a.getAttribute('href');
            if (/^https?:/i.test(href)) { e.preventDefault(); return; }
            if (/\.html(\?|#|$)/.test(href)) {
                e.preventDefault();
                const [path, query] = href.split('?');
                const p = new URLSearchParams(query || '');
                new URLSearchParams(kioskParams()).forEach((v, k) => p.set(k, v));
                location.href = path + '?' + p.toString();
            }
        }, true);

        const overlay = document.createElement('div');
        overlay.className = 'kiosk-overlay';
        overlay.hidden = true;
        overlay.innerHTML = '<div class="box" role="alertdialog" aria-live="assertive"><h2></h2><p></p><span class="count"></span></div>';
        overlay.querySelector('h2').textContent = t('kiosk.title');
        overlay.querySelector('p').textContent = t('kiosk.text');
        document.body.appendChild(overlay);

        let last = Date.now();
        const activity = () => { last = Date.now(); overlay.hidden = true; };
        ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart', 'scroll'].forEach(ev =>
            window.addEventListener(ev, activity, { passive: true, capture: true }));

        setInterval(() => {
            const left = idleSecs - Math.floor((Date.now() - last) / 1000);
            if (left <= 0) {
                try { sessionStorage.clear(); } catch (e) { /* ignore */ }
                location.href = 'index.html?' + kioskParams();
            } else if (left <= warnSecs) {
                overlay.querySelector('.count').textContent = left;
                overlay.hidden = false;
            }
        }, 1000);
    }

    // --- OFFLINE SUPPORT ----------------------------------------------------
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
        window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
    }

    window.Site = { t, applyI18n, loadContent, get lang() { return lang; }, kiosk };
})();
