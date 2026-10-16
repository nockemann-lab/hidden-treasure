/*
 * Offline support: caches all files of the site so it works without an internet connection
 * after the first visit, and can be installed as an app.
 *
 * IMPORTANT: when you change any file, increase the version number below so visitors get the
 * new version. When you add a file (e.g. a new language in content/), add it to FILES too.
 */
const VERSION = 'v22';
const CACHE = 'phone-elements-' + VERSION;

const FILES = [
    './',
    'content/en.js',
    'content/languages.js',
    'element-Ag.jpg',
    'element-K.jpg',
    'element-La.jpg',
    'element-Mn.jpg',
    'element-Ni.jpg',
    'element-Ba.jpg',
    'element-Hf.jpg',
    'element-As.jpg',
    'element-Y.jpg',
    'element-Pr.jpg',
    'element-Ti.jpg',
    'element-Sb.jpg',
    'element-Al.jpg',
    'element-Au.jpg',
    'element-C-graphite.jpg',
    'element-Co.jpg',
    'element-Cu.jpg',
    'element-Dy.jpg',
    'element-Eu.jpg',
    'element-Fe.jpg',
    'element-Ga.jpg',
    'element-In.jpg',
    'element-Ir.jpg',
    'element-Li.jpg',
    'element-Mg.jpg',
    'element-Nd.jpg',
    'element-Pd.jpg',
    'element-Si.jpg',
    'element-Sn.jpg',
    'element-Ta.jpg',
    'element-Tb.jpg',
    'element-W.jpg',
    'icons/apple-touch-icon.png',
    'icons/icon-192.png',
    'icons/icon-512.png',
    'index.html',
    'game.js',
    'manifest.webmanifest',
    'material-plastic.jpg',
    'og-image.jpg',
    'phone3d.min.js',
    'phone_parts_exploded_view.jpg',
    'quiz.html',
    'site.css',
    'site.js',
    'survey-qr.png',
    'teachers.html'
];

self.addEventListener('install', event => {
    // 'reload' skips the browser's HTTP cache, so the new version never stores old copies
    event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k.startsWith('phone-elements-') && k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

    // Pages, scripts, styles and text: network first, so a new page never runs with old scripts;
    // the cached copy is used when offline
    if (req.mode === 'navigate' || /\.(html|js|css|webmanifest)$/.test(new URL(req.url).pathname)) {
        event.respondWith(
            fetch(req.mode === 'navigate' ? req : new Request(req, { cache: 'no-cache' }))
                .then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; })
                .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || (req.mode === 'navigate' ? caches.match('index.html') : Response.error())))
        );
        return;
    }

    // Images: serve from the cache, fetch and cache anything new
    event.respondWith(
        caches.match(req, { ignoreSearch: true }).then(cached => cached || fetch(req).then(res => {
            if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
            return res;
        }))
    );
});
