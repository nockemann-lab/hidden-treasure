/*
 * "Urban Mine": a small strategy game for "Hidden Treasure in Your Pocket".
 * You run a phone recycling centre for 8 weeks. Each week old phones arrive and you decide
 * what to do with each one: refurbish, repair, or recycle it, with limited hours, money and
 * spare parts. Taking shortcuts with batteries can start fires.
 *
 * Prices are simplified game values. The metal amounts per phone come from Gómez et al. (2023),
 * as used in the drawer challenge on the main page. All text is in content/<language>.js (keys 'game.*').
 *
 * Usage: UrbanMine.mount(rootElement, t)   where t(key, vars) returns translated text
 *        UrbanMine.reset()                 shows the start screen again
 */
(function () {
    'use strict';

    const WEEKS = 8;
    const BASE_HOURS = 8;
    const BASE_PHONES = 4;
    const START_MONEY = 60;
    const BEST_KEY = 'urbanMineBest';

    // Metals in one old phone (grams), from up to 53 kg Cu, 270 g Ag, 141 g Au, 18 g Pd and
    // 3.3 kg rare earths per tonne of old phones (Gómez et al., 2023), with about 100 g per phone
    const PER_PHONE = { cu: 5.3, ag: 0.027, au: 0.0141, pd: 0.0018, ree: 0.33 };
    const METAL_VALUE = 1.3;   // £ of metals per phone (about £6.7 billion in 5 billion phones)

    const PARTS = { screen: 25, battery: 15 };
    const UPGRADES = { apprentice: 100, campaign: 60, station: 70 };

    const TYPES = [
        { id: 'working', icon: '📱', weight: 3, actions: ['refurb', 'recycle', 'shred'] },
        { id: 'screen', icon: '🔨', weight: 3, actions: ['fixScreen', 'recycle', 'shred'] },
        { id: 'battery', icon: '🪫', weight: 2, actions: ['fixBattery', 'recycle', 'shred'] },
        { id: 'water', icon: '💧', weight: 2, actions: ['tryFix', 'recycle', 'shred'] },
        { id: 'swollen', icon: '⚠️', weight: 1.5, actions: ['safeRemove', 'shred'] },
        { id: 'old', icon: '📟', weight: 1.5, actions: ['recycle', 'shred'] }
    ];
    const ACTIONS = {
        refurb: { hours: 2, sell: 80 },
        fixScreen: { hours: 2, part: 'screen', sell: 70 },
        fixBattery: { hours: 2, part: 'battery', sell: 75 },
        tryFix: { hours: 2, sell: 60, chance: 0.5 },
        recycle: { hours: 1 },
        safeRemove: { hours: 2 },
        shred: { hours: 0 }
    };
    const EVENTS = ['shortage', 'drive', 'parts', 'fashion', 'inspectors', 'heat'];
    const POINTS = { reused: 30, recycled: 10, shredded: 5, fire: -50, left: -10 };

    let root = null, t = k => k, s = null, nextId = 1;

    const esc = str => String(str).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const money = n => (n < 0 ? '−£' : '£') + Math.abs(Math.round(n));
    const readBest = () => { try { return JSON.parse(localStorage.getItem(BEST_KEY)); } catch (e) { return null; } };

    // ---------------------------------------------------------------------
    // Game state
    // ---------------------------------------------------------------------
    function newGame() {
        s = {
            week: 1, money: START_MONEY, hoursLeft: 0, parts: { screen: 0, battery: 0 }, up: {},
            phones: [], backlog: [], received: 0, reused: 0, recycled: 0, recycledPts: 0, shredded: 0, fires: 0,
            batteries: 0, metals: { cu: 0, ag: 0, au: 0, pd: 0, ree: 0 }, event: null, usedEvents: [], week_: null
        };
        startWeek();
    }

    function newPhone() {
        const total = TYPES.reduce((n, ty) => n + ty.weight, 0);
        let r = Math.random() * total;
        const type = TYPES.find(ty => (r -= ty.weight) < 0) || TYPES[0];
        s.received++;
        return { id: nextId++, type: type.id, done: null };
    }

    function startWeek() {
        s.event = null;
        if (s.week > 1 && Math.random() < 0.7) {
            const free = EVENTS.filter(e => !s.usedEvents.includes(e));
            if (free.length) { s.event = free[Math.floor(Math.random() * free.length)]; s.usedEvents.push(s.event); }
        }
        s.hoursLeft = hoursPerWeek();
        const n = BASE_PHONES + (s.up.campaign ? 2 : 0) + (s.event === 'drive' ? 2 : 0);
        s.phones = s.backlog.map(p => Object.assign(p, { carried: true })).concat(Array.from({ length: n }, newPhone));
        s.backlog = [];
        s.week_ = { sold: 0, earned: 0, recycled: 0, fires: 0 };
        render('week');
    }

    const hoursPerWeek = () => BASE_HOURS + (s.up.apprentice ? 3 : 0);
    const hoursFor = a => (a === 'safeRemove' && s.up.station ? 1 : ACTIONS[a].hours);
    const sellPrice = a => Math.round(ACTIONS[a].sell * (s.event === 'fashion' ? 1.3 : 1));
    const partPrice = p => Math.round(PARTS[p] * (s.event === 'parts' ? 0.5 : 1));
    const shredRisk = type => Math.min(0.95, (type === 'swollen' ? 0.6 : 0.25) * (s.event === 'heat' ? 2 : 1));

    function blocked(a) {
        if (hoursFor(a) > s.hoursLeft) return 'hours';
        const part = ACTIONS[a].part;
        if (part && s.parts[part] < 1) return 'part';
        return null;
    }

    function recoverMetals() {
        Object.keys(PER_PHONE).forEach(k => { s.metals[k] += PER_PHONE[k]; });
        s.money += METAL_VALUE;
    }

    function recycleSafely(phone, failed) {
        recoverMetals();
        s.batteries++;
        s.recycled++;
        s.recycledPts += s.event === 'shortage' ? 2 : 1;
        s.week_.recycled++;
        phone.done = { kind: failed ? 'failed' : 'recycled' };
    }

    function act(phone, a) {
        if (phone.done || blocked(a)) return;
        const A = ACTIONS[a];
        s.hoursLeft -= hoursFor(a);
        if (A.part) s.parts[A.part]--;
        if (A.sell) {
            if (A.chance && Math.random() > A.chance) recycleSafely(phone, true);
            else {
                const p = sellPrice(a);
                s.money += p; s.reused++;
                s.week_.sold++; s.week_.earned += p;
                phone.done = { kind: 'sold', amount: p };
            }
        } else if (a === 'recycle' || a === 'safeRemove') {
            recycleSafely(phone, false);
        } else if (a === 'shred') {
            const fine = s.event === 'inspectors' ? 30 : 0;
            s.money -= fine;
            if (Math.random() < shredRisk(phone.type)) {
                s.fires++; s.week_.fires++; s.money -= 40;
                phone.done = { kind: 'fire', fine };
            } else {
                recoverMetals(); s.shredded++; s.week_.recycled++;
                phone.done = { kind: 'shredded', fine };
            }
        }
        render('week');
    }

    function buyPart(p) {
        const price = partPrice(p);
        if (s.money < price) return;
        s.money -= price; s.parts[p]++;
        render('week');
    }

    function buyUpgrade(u) {
        if (s.up[u] || s.money < UPGRADES[u]) return;
        s.money -= UPGRADES[u]; s.up[u] = true;
        if (u === 'apprentice') s.hoursLeft += 3;
        render('week');
    }

    function endWeek() {
        s.backlog = s.phones.filter(p => !p.done);
        render(s.week >= WEEKS ? 'end' : 'summary');
    }

    function score() {
        const left = s.backlog.length;
        const rows = [
            ['reused', s.reused, s.reused * POINTS.reused],
            ['recycled', s.recycled, s.recycledPts * POINTS.recycled],
            ['shredded', s.shredded, s.shredded * POINTS.shredded],
            ['fires', s.fires, s.fires * POINTS.fire],
            ['left', left, left * POINTS.left],
            ['money', money(s.money), Math.floor(Math.max(s.money, 0) / 10)]
        ];
        const total = rows.reduce((n, r) => n + r[2], 0);
        const perPhone = total / Math.max(s.received, 1);
        const stars = perPhone >= 23 ? 3 : perPhone >= 15 ? 2 : perPhone >= 7 ? 1 : 0;
        return { rows, total, stars, left };
    }

    // live score during the game (without the end-of-game deductions for phones still waiting)
    const liveScore = () => s.reused * POINTS.reused + s.recycledPts * POINTS.recycled + s.shredded * POINTS.shredded + s.fires * POINTS.fire + Math.floor(Math.max(s.money, 0) / 10);

    // ---------------------------------------------------------------------
    // Screens
    // ---------------------------------------------------------------------
    function metalsList() {
        const m = s.metals;
        const g = (v, d) => v.toLocaleString('en-GB', { maximumFractionDigits: d });
        return `<ul class="g-metals">
            <li><span>${esc(t('drawer.cu'))}</span><strong>${g(m.cu, 1)} g</strong></li>
            <li><span>${esc(t('drawer.ag'))}</span><strong>${g(m.ag * 1000, 0)} mg</strong></li>
            <li><span>${esc(t('drawer.au'))}</span><strong>${g(m.au * 1000, 0)} mg</strong></li>
            <li><span>${esc(t('drawer.pd'))}</span><strong>${g(m.pd * 1000, 1)} mg</strong></li>
            <li><span>${esc(t('drawer.ree'))}</span><strong>${g(m.ree, 1)} g</strong></li>
            <li><span>${esc(t('game.batteries'))}</span><strong>${s.batteries}</strong></li>
        </ul>`;
    }

    function intro() {
        const best = readBest();
        return `<div class="g-intro">
            <div class="g-big-icon" aria-hidden="true">🏭♻️📱</div>
            <h3>${esc(t('game.intro.title'))}</h3>
            <ul class="g-rules">
                ${['1', '2', '3', '4', '5'].map(k => `<li>${t('game.intro.rule' + k)}</li>`).join('')}
            </ul>
            <p class="g-note">${esc(t('game.intro.note'))}</p>
            ${best ? `<p class="g-best">⭐ ${esc(t('game.best', { score: best.score, stars: '★'.repeat(best.stars) || '0' }))}</p>` : ''}
            <button type="button" class="g-btn primary" data-go="start">${esc(t('game.start'))} <span aria-hidden="true">▶</span></button>
        </div>`;
    }

    function phoneCard(p) {
        const type = TYPES.find(ty => ty.id === p.type);
        let body;
        if (p.done) {
            const d = p.done;
            const text = d.kind === 'sold' ? t('game.res.sold', { amount: money(d.amount) }) : t('game.res.' + d.kind);
            body = `<p class="g-result ${d.kind}" role="status">${esc(text)}${d.fine ? ' ' + esc(t('game.res.fine', { amount: money(d.fine) })) : ''}</p>`;
        } else {
            body = `<div class="g-actions">${type.actions.map(a => {
                const why = blocked(a), A = ACTIONS[a];
                const bits = [`${hoursFor(a)} h`];
                if (A.sell) bits.push('+' + money(sellPrice(a)));
                if (A.part) bits.push(t('game.uses.' + A.part));
                if (A.chance) bits.push(t('game.chance'));
                if (a === 'shred') bits.push(t('game.risk', { n: Math.round(shredRisk(p.type) * 100) }));
                const reason = why ? `<span class="g-why">${esc(t('game.need.' + why))}</span>` : '';
                return `<button type="button" class="g-act ${a === 'shred' ? 'risky' : ''}" data-phone="${p.id}" data-act="${a}" ${why ? 'disabled' : ''}>
                    <span>${esc(t('game.act.' + a))}</span><small>${esc(bits.join(' · '))}</small>${reason}</button>`;
            }).join('')}</div>`;
        }
        return `<article class="g-card${p.done ? ' done' : ''}">
            <div class="g-card-head"><span class="g-icon" aria-hidden="true">${type.icon}</span>
                <div><strong>${esc(t('game.type.' + p.type + '.title'))}</strong>${p.carried ? ` <em class="g-carried">${esc(t('game.carried'))}</em>` : ''}
                <small>${esc(t('game.type.' + p.type + '.desc'))}</small></div></div>
            ${body}
        </article>`;
    }

    function week() {
        const ev = s.event ? `<div class="g-event" role="status"><strong><span aria-hidden="true">📰</span> ${esc(t('game.ev.' + s.event + '.title'))}</strong> ${esc(t('game.ev.' + s.event + '.text'))}</div>` : '';
        const shopPart = p => `<li><span>${esc(t('game.shop.' + p))} <small>(${esc(t('game.have', { n: s.parts[p] }))})</small></span>
            <button type="button" class="g-btn small" data-buy="${p}" ${s.money < partPrice(p) ? 'disabled' : ''}>${esc(t('game.buy'))} ${money(partPrice(p))}</button></li>`;
        const shopUp = u => `<li><span>${esc(t('game.up.' + u))}<small>${esc(t('game.up.' + u + '.desc'))}</small></span>
            ${s.up[u] ? `<span class="g-owned">✓ ${esc(t('game.owned'))}</span>` : `<button type="button" class="g-btn small" data-up="${u}" ${s.money < UPGRADES[u] ? 'disabled' : ''}>${esc(t('game.buy'))} ${money(UPGRADES[u])}</button>`}</li>`;
        const open = s.phones.filter(p => !p.done).length;
        return `<div class="g-stats" aria-live="polite">
                <span class="g-stat">${esc(t('game.week', { n: s.week, total: WEEKS }))}</span>
                <span class="g-stat"><span aria-hidden="true">💷</span> ${money(s.money)}</span>
                <span class="g-stat"><span aria-hidden="true">⏱️</span> ${esc(t('game.hours', { n: s.hoursLeft, total: hoursPerWeek() }))}</span>
                <span class="g-stat"><span aria-hidden="true">⭐</span> ${esc(t('game.points', { n: liveScore() }))}</span>
            </div>
            ${ev}
            <div class="g-main">
                <div class="g-phones">${s.phones.map(phoneCard).join('')}</div>
                <aside class="g-side">
                    <h3 class="g-side-h">${esc(t('game.shop.title'))}</h3>
                    <ul class="g-shop">${shopPart('screen')}${shopPart('battery')}</ul>
                    <h3 class="g-side-h">${esc(t('game.up.title'))}</h3>
                    <ul class="g-shop">${shopUp('apprentice')}${shopUp('campaign')}${shopUp('station')}</ul>
                    <h3 class="g-side-h">${esc(t('game.recovered'))}</h3>
                    ${metalsList()}
                </aside>
            </div>
            <div class="g-foot">
                <p>${esc(open ? t('game.waiting', { n: open }) : t('game.allDone'))}</p>
                <button type="button" class="g-btn primary" data-go="endweek">${esc(s.week >= WEEKS ? t('game.finish') : t('game.endWeek'))}</button>
            </div>`;
    }

    function summary() {
        const w = s.week_;
        return `<div class="g-summary">
            <h3>${esc(t('game.sum.title', { n: s.week }))}</h3>
            <ul class="g-sum-list">
                <li><span aria-hidden="true">🤝</span> ${esc(t('game.sum.sold', { n: w.sold, amount: money(w.earned) }))}</li>
                <li><span aria-hidden="true">♻️</span> ${esc(t('game.sum.recycled', { n: w.recycled }))}</li>
                ${w.fires ? `<li><span aria-hidden="true">🔥</span> ${esc(t('game.sum.fires', { n: w.fires }))}</li>` : ''}
                ${s.backlog.length ? `<li><span aria-hidden="true">📦</span> ${esc(t('game.sum.waiting', { n: s.backlog.length }))}</li>` : ''}
            </ul>
            <p class="g-tip"><span aria-hidden="true">💡</span> ${esc(t('game.tip.' + ((s.week - 1) % 6 + 1)))}</p>
            <button type="button" class="g-btn primary" data-go="next">${esc(t('game.nextWeek', { n: s.week + 1 }))} <span aria-hidden="true">▶</span></button>
        </div>`;
    }

    function end() {
        const sc = score();
        let best = readBest();
        const isBest = !best || sc.total > best.score;
        if (isBest) { try { localStorage.setItem(BEST_KEY, JSON.stringify({ score: sc.total, stars: sc.stars })); } catch (e) { /* ignore */ } best = { score: sc.total, stars: sc.stars }; }
        const lessons = [];
        if (s.fires) lessons.push(t('game.lesson.fires', { n: s.fires }));
        lessons.push(s.reused >= s.recycled + s.shredded ? t('game.lesson.reuseGood') : t('game.lesson.reuseTip'));
        if (sc.left) lessons.push(t('game.lesson.left', { n: sc.left }));
        lessons.push(t('game.lesson.metals'));
        return `<div class="g-end">
            <div class="g-stars" aria-label="${esc(t('game.starsLabel', { n: sc.stars }))}">${[1, 2, 3].map(i => `<span class="${i <= sc.stars ? 'on' : ''}" aria-hidden="true">★</span>`).join('')}</div>
            <h3>${esc(t('game.end.title' + sc.stars))}</h3>
            <p class="g-total">${esc(t('game.end.score', { n: sc.total }))}${isBest ? ` <span class="g-new">${esc(t('game.newBest'))}</span>` : ''}</p>
            <table class="g-table"><tbody>
                ${sc.rows.map(([k, n, pts]) => `<tr><td>${esc(t('game.row.' + k, { n }))}</td><td>${pts > 0 ? '+' : ''}${pts}</td></tr>`).join('')}
            </tbody></table>
            <h4>${esc(t('game.recoveredTotal'))}</h4>
            ${metalsList()}
            <ul class="g-lessons">${lessons.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
            <div class="g-end-btns">
                <button type="button" class="g-btn primary" data-go="start">${esc(t('game.again'))}</button>
                <button type="button" class="g-btn" data-go="close">${esc(t('game.close'))}</button>
            </div>
        </div>`;
    }

    // ---------------------------------------------------------------------
    // Rendering and input
    // ---------------------------------------------------------------------
    function render(screen) {
        const keepFocus = document.activeElement && root.contains(document.activeElement) ? document.activeElement.dataset : null;
        root.dataset.screen = screen;
        root.innerHTML = screen === 'intro' ? intro() : screen === 'week' ? week() : screen === 'summary' ? summary() : end();
        // keep keyboard users in a sensible place after the screen is redrawn
        let focus = null;
        if (keepFocus && keepFocus.phone) focus = root.querySelector('.g-act:not([disabled])') || root.querySelector('[data-go="endweek"]');
        else if (keepFocus && (keepFocus.buy || keepFocus.up)) focus = root.querySelector(`[data-${keepFocus.buy ? 'buy' : 'up'}="${keepFocus.buy || keepFocus.up}"]`);
        if (!focus && screen !== 'week') focus = root.querySelector('.g-btn.primary');
        if (focus && !focus.disabled) focus.focus({ preventScroll: true });
        if (screen !== 'week') root.scrollTop = 0;
    }

    function onClick(e) {
        const b = e.target.closest('button');
        if (!b || b.disabled || !root.contains(b)) return;
        const d = b.dataset;
        if (d.act) act(s.phones.find(p => p.id === Number(d.phone)), d.act);
        else if (d.buy) buyPart(d.buy);
        else if (d.up) buyUpgrade(d.up);
        else if (d.go === 'start') newGame();
        else if (d.go === 'endweek') endWeek();
        else if (d.go === 'next') { s.week++; startWeek(); }
        else if (d.go === 'close') { const dlg = root.closest('dialog'); if (dlg) dlg.close(); }
    }

    window.UrbanMine = {
        mount(el, translate) {
            root = el; t = translate || t;
            root.addEventListener('click', onClick);
            render('intro');
        },
        reset() { if (root && (!s || root.dataset.screen === 'end')) render('intro'); }
    };
})();
