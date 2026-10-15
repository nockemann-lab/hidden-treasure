/*
 * "Urban Mine: Repair Rush", a real-time game for "Hidden Treasure in Your Pocket".
 *
 * Old phones ride along a conveyor belt through a repair and recycling shop. Players drag them
 * (or tap a phone, then a station) to the right station before they fall into the landfill bin:
 *   Repair bench (cracked screen, dead battery: needs spare parts), Refurbish & sell (working phones),
 *   Remove battery & recycle (water damage, very old), Battery safety bin (swollen batteries).
 * Swollen batteries start smoking and then catch fire; fires block stations and spread unless
 * players tap them out. The belt speeds up and events happen during the shift.
 *
 * Prices and points are game values. The metal amounts per phone come from Gómez et al. (2023),
 * as used in the drawer challenge on the main page. All text is in content/<language>.js ('game.*').
 *
 * Usage: UrbanMine.mount(rootElement, t)   t(key, vars) returns translated text
 *        UrbanMine.reset()                 call when the pop-up opens
 *        UrbanMine.pause()                 call when the pop-up closes
 * Keyboard: left/right arrows choose a phone, 1-4 send it to a station, F put out a fire, P pause.
 */
(function () {
    'use strict';

    const SHIFT = 150;                       // seconds
    const BEST_KEY = 'urbanMineRushBest';
    // Metals in one old phone (grams): Gómez et al. (2023) per-tonne figures with about 100 g per phone
    const PER_PHONE = { cu: 5.3, ag: 0.027, au: 0.0141, pd: 0.0018, ree: 0.33 };
    const METAL_VALUE = 1.3;                 // £ per phone (about £6.7 billion in 5 billion phones)
    const PRICES = { screen: 15, battery: 10 };
    const DELIVERY = 3;                      // seconds for spare parts to arrive

    const TYPES = {
        working: { badge: '✅', screen: '#2f9e68', weight: [3, 3, 2.5] },
        screen: { badge: '🔨', screen: '#38506b', weight: [2.5, 2.5, 2.5] },
        battery: { badge: '🪫', screen: '#1b2533', weight: [2, 2, 2] },
        water: { badge: '💧', screen: '#2b5f8a', weight: [1.5, 1.5, 1.5] },
        old: { badge: '📟', screen: '#9fb57a', weight: [1.5, 1.5, 1.5] },
        swollen: { badge: '⚠️', screen: '#1b2533', weight: [0.6, 1.3, 1.9] }
    };
    const STATIONS = [
        { id: 'repair', icon: '🔧', color: '#2a5298', slots: 1, time: 2.6, badges: ['🔨', '🪫'] },
        { id: 'sell', icon: '🛍️', color: '#1e8449', slots: 2, time: 1.5, badges: ['✅'] },
        { id: 'recycle', icon: '♻️', color: '#0f766e', slots: 2, time: 2.0, badges: ['💧', '📟'] },
        { id: 'safety', icon: '🪣', color: '#b45309', slots: 3, time: 0.8, badges: ['⚠️'] }
    ];
    const STAGES = [ // [from second, spawn interval, belt speed]
        [0, 3.0, 48], [50, 2.3, 62], [100, 1.75, 76]
    ];
    const EMOJI = s => `${s}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
    const FONT = (w, s) => `${w} ${s}px system-ui,-apple-system,"Segoe UI",Arial,sans-serif`;

    let root, t = k => k, canvas, ctx, L, g = null, raf = 0, last = 0, timeScale = 1;
    let pointer = null, nextId = 1, hudCache = {};

    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const money = n => (n < 0 ? '−£' : '£') + Math.abs(Math.round(n));
    const readBest = () => { try { return JSON.parse(localStorage.getItem(BEST_KEY)); } catch (e) { return null; } };

    // ---------------------------------------------------------------------
    // Layout (logical coordinates; landscape on wide screens, portrait on phones)
    // ---------------------------------------------------------------------
    function layout(portrait) {
        if (!portrait) {
            const W = 960, H = 540, sw = 210, gap = 22, x0 = (W - (4 * sw + 3 * gap)) / 2;
            return { W, H, portrait, belt: { x0: 92, x1: 846, y: 168, h: 66 }, bin: { x: 858, y: 118, w: 88, h: 112 }, chute: { x: 14, y: 118, w: 76, h: 112 },
                stations: STATIONS.map((s, i) => ({ x: x0 + i * (sw + gap), y: 300, w: sw, h: 220 })) };
        }
        const W = 600, H = 860;
        return { W, H, portrait, belt: { x0: 78, x1: 508, y: 170, h: 66 }, bin: { x: 516, y: 118, w: 76, h: 112 }, chute: { x: 8, y: 118, w: 66, h: 112 },
            stations: STATIONS.map((s, i) => ({ x: 24 + (i % 2) * 288, y: 290 + Math.floor(i / 2) * 285, w: 264, h: 260 })) };
    }

    // ---------------------------------------------------------------------
    // Game state
    // ---------------------------------------------------------------------
    function newGame() {
        g = {
            t: 0, running: true, paused: false, over: false, score: 0, money: 30,
            parts: { screen: 1, battery: 1 }, orders: [], phones: [], selId: null, spawnIn: 0.5, burst: 0,
            jobs: { repair: [], sell: [], recycle: [], safety: [] }, fires: [], particles: [], texts: [],
            stats: { sold: 0, repaired: 0, recycled: 0, wasted: 0, safe: 0, fires: 0, landfill: 0, returned: 0, destroyed: 0 },
            metals: { cu: 0, ag: 0, au: 0, pd: 0, ree: 0 }, seen: {}, heatUntil: 0, saleUntil: 0, events: {}, beltOffset: 0
        };
        root.querySelector('.rr-toasts').innerHTML = '';
        showOverlay(null);
        canvas.focus({ preventScroll: true });
    }

    const stage = () => STAGES.reduce((s, st) => (g.t >= st[0] ? st : s), STAGES[0]);
    const speed = () => stage()[2];
    const igniteAfter = () => (g && g.t < g.heatUntil ? 5 : 8.5);
    const partPrice = p => Math.round(PRICES[p] * (g && g.t < g.saleUntil ? 0.5 : 1));

    function spawnPhone() {
        const si = STAGES.indexOf(stage());
        const ids = Object.keys(TYPES);
        const total = ids.reduce((n, id) => n + TYPES[id].weight[si], 0);
        let r = Math.random() * total;
        const type = ids.find(id => (r -= TYPES[id].weight[si]) < 0) || 'working';
        g.phones.push({ id: nextId++, type, x: L.belt.x0 + 4, age: 0, held: false, wobble: Math.random() * 6 });
    }

    function stationRect(id) { return L.stations[STATIONS.findIndex(s => s.id === id)]; }
    function stationCenter(id) { const r = stationRect(id); return { x: r.x + r.w / 2, y: r.y + r.h / 2 }; }
    const burning = id => g.fires.some(f => f.station === id);

    function addScore(n, x, y, text, color) {
        g.score += n;
        if (text) g.texts.push({ x, y, text, color: color || (n >= 0 ? '#1e8449' : '#c0392b'), age: 0 });
    }

    function toast(key, vars) {
        const box = root.querySelector('.rr-toasts');
        const el = document.createElement('div');
        el.className = 'rr-toast';
        el.innerHTML = t(key, vars);
        box.prepend(el);
        while (box.children.length > 2) box.lastChild.remove();
        setTimeout(() => el.classList.add('out'), 5200);
        setTimeout(() => el.remove(), 5800);
    }
    function firstTime(what) { if (g.seen[what]) return; g.seen[what] = true; toast('game.fact.' + what); }

    function startFire(x, y, station) {
        if (g.fires.length >= 6) return;
        g.fires.push({ id: nextId++, x, y, hp: 3, age: 0, station: station || null, spread: false });
        g.stats.fires++;
        if (station) {                       // everything on a burning station is lost
            g.stats.destroyed += g.jobs[station].length;
            g.jobs[station] = [];
        }
        firstTime('fire');
    }

    // Send a phone from the belt to a station
    function send(phone, stId) {
        if (!phone || g.over || g.paused) return;
        const c = stationCenter(stId);
        const reject = key => { g.texts.push({ x: c.x, y: c.y - 20, text: t(key), color: '#b45309', age: 0 }); };
        if (burning(stId)) return reject('game.msg.burning');
        const st = STATIONS.find(s => s.id === stId);
        if (g.jobs[stId].length >= st.slots) return reject('game.msg.busy');
        const ty = phone.type;
        if (ty === 'swollen' && stId !== 'safety') {
            removePhone(phone);
            addScore(-30, c.x, c.y - 40, t('game.msg.fire'));
            startFire(c.x, c.y, stId);
            return;
        }
        if (stId === 'repair') {
            if (ty === 'working') return reject('game.msg.nothingToFix');
            if (ty === 'water' || ty === 'old') return reject('game.msg.cantRepair');
            const part = ty === 'screen' ? 'screen' : 'battery';
            if (g.parts[part] < 1) { firstTime('parts'); return reject('game.msg.noPart.' + part); }
            g.parts[part]--;
        }
        if (stId === 'safety' && ty !== 'swollen') return reject('game.msg.safetyOnly');
        removePhone(phone);
        g.jobs[stId].push({ phone, t: 0, total: st.time });
    }

    function removePhone(phone) {
        g.phones = g.phones.filter(p => p !== phone);
        if (g.selId === phone.id) g.selId = null;
    }

    function finishJob(stId, job) {
        const c = stationCenter(stId), ty = job.phone.type, y = c.y - 40;
        if (stId === 'repair') {
            g.money += 55; g.stats.repaired++;
            addScore(40, c.x, y, t('game.msg.repaired', { amount: money(55) }));
            firstTime('repair');
        } else if (stId === 'sell') {
            if (ty === 'working') {
                g.money += 40; g.stats.sold++;
                addScore(30, c.x, y, t('game.msg.sold', { amount: money(40) }));
                firstTime('sell');
            } else {
                g.stats.returned++;
                addScore(-10, c.x, y, t('game.msg.returned'));
                g.phones.push(Object.assign(job.phone, { x: L.belt.x0 + 4, held: false }));
                firstTime('returned');
            }
        } else if (stId === 'recycle') {
            Object.keys(PER_PHONE).forEach(k => { g.metals[k] += PER_PHONE[k]; });
            g.money += METAL_VALUE;
            for (let i = 0; i < 10; i++) {
                const col = ['#e0b23a', '#c8743f', '#cfd6de', '#7ed3a0'][i % 4];
                g.particles.push({ x: c.x, y: c.y, vx: (Math.random() - 0.5) * 160, vy: -80 - Math.random() * 140, col, age: 0, life: 1 + Math.random() * 0.5 });
            }
            if (ty === 'working') { g.stats.wasted++; addScore(5, c.x, y, t('game.msg.stillWorked'), '#b45309'); }
            else if (ty === 'screen' || ty === 'battery') { g.stats.wasted++; addScore(8, c.x, y, t('game.msg.couldRepair'), '#b45309'); }
            else { g.stats.recycled++; addScore(15, c.x, y, t('game.msg.recycled')); }
            firstTime('recycle');
        } else if (stId === 'safety') {
            g.stats.safe++;
            addScore(25, c.x, y, t('game.msg.safe'));
            firstTime('safe');
        }
    }

    function extinguish(fire) {
        if (!fire || g.over || g.paused) return;
        fire.hp--;
        for (let i = 0; i < 8; i++) g.particles.push({ x: fire.x, y: fire.y - 10, vx: (Math.random() - 0.5) * 140, vy: -60 - Math.random() * 80, col: '#7cc4f5', age: 0, life: 0.6 });
        if (fire.hp <= 0) {
            g.fires = g.fires.filter(f => f !== fire);
            addScore(5, fire.x, fire.y - 40, t('game.msg.fireOut'));
        }
    }

    function order(part) {
        if (!g || g.over || g.paused) return;
        const price = partPrice(part);
        if (g.money < price) return;
        g.money -= price;
        g.orders.push({ part, eta: DELIVERY });
    }

    function events() {
        const ev = (at, id, fn) => { if (g.t >= at && !g.events[id]) { g.events[id] = true; fn(); toast('game.ev.' + id); } };
        ev(32, 'drive', () => { g.burst = 5; });
        ev(50, 'rush1', () => {});
        ev(72, 'heat', () => { g.heatUntil = g.t + 20; });
        ev(100, 'rush2', () => {});
        ev(112, 'sale', () => { g.saleUntil = g.t + 15; });
    }

    function update(dt) {
        g.t += dt;
        if (g.t >= SHIFT) { endGame(); return; }
        events();

        // new phones (keep a gap on the belt)
        g.spawnIn -= dt;
        const firstX = g.phones.reduce((m, p) => Math.min(m, p.held ? Infinity : p.x), Infinity);
        if (g.spawnIn <= 0 && firstX > L.belt.x0 + 62) {
            spawnPhone();
            if (g.burst > 0) { g.burst--; g.spawnIn = 0.75; } else g.spawnIn = stage()[1] * (0.8 + Math.random() * 0.4);
        }

        g.beltOffset = (g.beltOffset + speed() * dt) % 40;
        for (const p of [...g.phones]) {
            if (!p.held) p.x += speed() * dt;
            p.age += dt;
            if (p.type === 'swollen' && p.age > igniteAfter()) {
                removePhone(p);
                g.stats.destroyed++;
                addScore(-10, p.x, L.belt.y - 50, t('game.msg.fire'));
                startFire(p.x, L.belt.y, null);
                continue;
            }
            if (!p.held && p.x > L.belt.x1) {
                removePhone(p);
                g.stats.landfill++;
                addScore(-15, L.bin.x + L.bin.w / 2, L.bin.y - 10, t('game.msg.landfill'));
                firstTime('landfill');
                continue;
            }
            // phones passing a fire on the belt are destroyed
            if (!p.held && g.fires.some(f => !f.station && Math.abs(f.x - p.x) < 30)) {
                removePhone(p); g.stats.destroyed++;
                addScore(-10, p.x, L.belt.y - 50, t('game.msg.burnt'));
            }
        }

        for (const st of STATIONS) {
            for (const job of [...g.jobs[st.id]]) {
                job.t += dt;
                if (job.t >= job.total) { g.jobs[st.id] = g.jobs[st.id].filter(j => j !== job); finishJob(st.id, job); }
            }
        }

        for (const o of [...g.orders]) {
            o.eta -= dt;
            if (o.eta <= 0) { g.parts[o.part]++; g.orders = g.orders.filter(x => x !== o); }
        }

        for (const f of [...g.fires]) {
            f.age += dt;
            g.score -= 3 * dt;
            if (f.age > 7 && !f.spread) {
                f.spread = true;
                if (f.station) {
                    const i = STATIONS.findIndex(s => s.id === f.station);
                    const n = [i - 1, i + 1].filter(j => j >= 0 && j < STATIONS.length && !burning(STATIONS[j].id));
                    if (n.length) { const id = STATIONS[n[Math.floor(Math.random() * n.length)]].id; const c = stationCenter(id); startFire(c.x, c.y, id); }
                } else if (f.x + 110 < L.belt.x1) startFire(f.x + 110, L.belt.y, null);
            }
        }

        g.particles = g.particles.filter(p => { p.age += dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 260 * dt; return p.age < p.life; });
        g.texts = g.texts.filter(x => { x.age += dt; x.y -= 34 * dt; return x.age < 1.6; });
    }

    // ---------------------------------------------------------------------
    // Drawing
    // ---------------------------------------------------------------------
    function rr(x, y, w, h, r) {
        ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
    }

    function drawPhone(p, x, y, s, highlight) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(s, s);
        const ty = TYPES[p.type];
        if (highlight) { ctx.shadowColor = '#ffd76a'; ctx.shadowBlur = 18; }
        if (p.type === 'old') {
            rr(-15, -27, 30, 54, 6); ctx.fillStyle = '#6b7280'; ctx.fill();
            ctx.shadowBlur = 0;
            rr(-11, -22, 22, 16, 2); ctx.fillStyle = ty.screen; ctx.fill();
            ctx.fillStyle = '#d1d5db';
            for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { ctx.beginPath(); ctx.arc(-7 + c * 7, 2 + r * 6, 2, 0, Math.PI * 2); ctx.fill(); }
        } else {
            const bulge = p.type === 'swollen' ? 1 + 0.05 * Math.sin(p.age * 6 + p.wobble) + Math.min(p.age / igniteAfter(), 1) * 0.12 : 1;
            ctx.scale(bulge, 1);
            rr(-18, -31, 36, 62, 7); ctx.fillStyle = '#1f2937'; ctx.fill();
            ctx.shadowBlur = 0;
            rr(-15, -27, 30, 51, 4); ctx.fillStyle = ty.screen; ctx.fill();
            ctx.fillStyle = '#0b0f14'; ctx.beginPath(); ctx.arc(0, -24, 1.8, 0, Math.PI * 2); ctx.fill();      // front camera
            ctx.fillStyle = 'rgba(255,255,255,0.55)'; rr(-6, 19, 12, 2.4, 1.2); ctx.fill();                  // home bar
            ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.beginPath(); ctx.moveTo(-15, -27); ctx.lineTo(2, -27); ctx.lineTo(-15, -2); ctx.closePath(); ctx.fill();   // glass shine
            if (p.type === 'screen') {
                ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 1.4;
                ctx.beginPath(); ctx.moveTo(-6, -10); ctx.lineTo(-14, -22); ctx.moveTo(-6, -10); ctx.lineTo(10, -20); ctx.moveTo(-6, -10); ctx.lineTo(4, 8);
                ctx.lineTo(13, 18); ctx.moveTo(4, 8); ctx.lineTo(-12, 14); ctx.stroke();
            }
            if (p.type === 'water') {
                ctx.fillStyle = 'rgba(147, 197, 253, 0.8)';
                [[-6, -12], [5, 2], [-3, 14]].forEach(([dx, dy]) => { ctx.beginPath(); ctx.arc(dx, dy, 3, 0, Math.PI * 2); ctx.fill(); });
            }
            if (p.type === 'swollen' && p.age > igniteAfter() * 0.45) {
                const k = (p.age - igniteAfter() * 0.45) / (igniteAfter() * 0.55);
                ctx.fillStyle = `rgba(231, 76, 60, ${0.25 + 0.35 * k * (0.6 + 0.4 * Math.sin(p.age * 12))})`;
                rr(-18, -31, 36, 62, 7); ctx.fill();
            }
        }
        ctx.restore();
        ctx.font = EMOJI(18 * s); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(ty.badge, x + 14 * s, y - 28 * s);
        if (p.type === 'swollen' && p.age > igniteAfter() * 0.45) {   // smoke
            for (let i = 0; i < 3; i++) {
                const ph = (p.age * 0.9 + i / 3) % 1;
                ctx.fillStyle = `rgba(120, 125, 135, ${0.45 * (1 - ph)})`;
                ctx.beginPath(); ctx.arc(x + Math.sin(ph * 6 + i) * 8, y - 36 * s - ph * 46, 7 + ph * 12, 0, Math.PI * 2); ctx.fill();
            }
        }
    }

    function draw() {
        const { W, H, belt, bin, chute } = L;
        ctx.clearRect(0, 0, W, H);
        // floor and wall
        ctx.fillStyle = '#e6ebf1'; ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#dbe2ea';
        for (let x = 0; x < W; x += 60) for (let y = 260; y < H; y += 60) if (((x + y) / 60) % 2 === 0) ctx.fillRect(x, y, 60, 60);
        const wall = ctx.createLinearGradient(0, 0, 0, 100);
        wall.addColorStop(0, '#1e3c72'); wall.addColorStop(1, '#2a5298');
        ctx.fillStyle = wall; ctx.fillRect(0, 0, W, 96);
        ctx.fillStyle = '#ffd76a'; ctx.font = FONT(800, L.portrait ? 24 : 28); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('URBAN MINE', W / 2, 34);
        ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.font = FONT(600, 14);
        ctx.fillText(t('game.sign'), W / 2, 66);

        // collection chute and landfill bin
        rr(chute.x, chute.y, chute.w, chute.h, 10); ctx.fillStyle = '#334155'; ctx.fill();
        ctx.font = EMOJI(30); ctx.fillText('📦', chute.x + chute.w / 2, chute.y + 40);
        ctx.fillStyle = 'white'; ctx.font = FONT(700, 11); ctx.fillText(t('game.collection'), chute.x + chute.w / 2, chute.y + 84, chute.w - 6);
        rr(bin.x, bin.y, bin.w, bin.h, 10); ctx.fillStyle = '#3f3f46'; ctx.fill();
        ctx.font = EMOJI(30); ctx.fillText('🗑️', bin.x + bin.w / 2, bin.y + 36);
        ctx.fillStyle = '#fca5a5'; ctx.font = FONT(800, 12); ctx.fillText(t('game.landfill'), bin.x + bin.w / 2, bin.y + 74, bin.w - 6);
        ctx.fillStyle = 'white'; ctx.font = FONT(800, 18); ctx.fillText(String(g ? g.stats.landfill : 0), bin.x + bin.w / 2, bin.y + 96);

        // conveyor belt
        rr(belt.x0 - 6, belt.y - belt.h / 2 - 6, belt.x1 - belt.x0 + 12, belt.h + 12, 14); ctx.fillStyle = '#475569'; ctx.fill();
        ctx.save(); rr(belt.x0, belt.y - belt.h / 2, belt.x1 - belt.x0, belt.h, 10); ctx.clip();
        ctx.fillStyle = '#1f2937'; ctx.fillRect(belt.x0, belt.y - belt.h / 2, belt.x1 - belt.x0, belt.h);
        ctx.strokeStyle = '#374151'; ctx.lineWidth = 6;
        for (let x = belt.x0 - 40 + (g ? g.beltOffset : 0); x < belt.x1 + 40; x += 40) { ctx.beginPath(); ctx.moveTo(x, belt.y - belt.h / 2); ctx.lineTo(x + 16, belt.y); ctx.lineTo(x, belt.y + belt.h / 2); ctx.stroke(); }
        ctx.restore();

        // stations
        STATIONS.forEach((st, i) => {
            const r = L.stations[i];
            ctx.save();
            ctx.shadowColor = 'rgba(15,23,42,0.18)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 4;
            rr(r.x, r.y, r.w, r.h, 14); ctx.fillStyle = '#ffffff'; ctx.fill();
            ctx.restore();
            rr(r.x, r.y, r.w, 46, 14); ctx.fillStyle = st.color; ctx.fill(); ctx.fillRect(r.x, r.y + 30, r.w, 16);
            ctx.fillStyle = 'white'; ctx.textAlign = 'left'; ctx.font = EMOJI(20); ctx.fillText(st.icon, r.x + 12, r.y + 24);
            ctx.font = FONT(800, 14); ctx.fillText(t('game.st.' + st.id), r.x + 42, r.y + 24, r.w - 76);
            rr(r.x + r.w - 30, r.y + 12, 22, 22, 6); ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fill();
            ctx.fillStyle = 'white'; ctx.textAlign = 'center'; ctx.font = FONT(800, 13); ctx.fillText(String(i + 1), r.x + r.w - 19, r.y + 24);
            const slotY = r.y + (L.portrait ? 125 : 112);
            for (let k = 0; k < st.slots; k++) {
                const sx = r.x + r.w / 2 + (k - (st.slots - 1) / 2) * 58;
                rr(sx - 25, slotY - 38, 50, 76, 10); ctx.fillStyle = '#eef2f7'; ctx.fill();
                const job = g && g.jobs[st.id][k];
                if (job) {
                    drawPhone(job.phone, sx, slotY, 0.85, false);
                    ctx.strokeStyle = st.color; ctx.lineWidth = 5; ctx.beginPath();
                    ctx.arc(sx, slotY, 33, -Math.PI / 2, -Math.PI / 2 + (job.t / job.total) * Math.PI * 2); ctx.stroke();
                }
            }
            ctx.textAlign = 'center'; ctx.fillStyle = '#475569'; ctx.font = EMOJI(15);
            ctx.fillText(st.badges.join(' '), r.x + r.w / 2, r.y + r.h - 44);
            ctx.font = FONT(600, 12); ctx.fillText(t('game.st.' + st.id + '.hint'), r.x + r.w / 2, r.y + r.h - 22, r.w - 16);
            if (pointer && pointer.moved && inRect(pointer.x, pointer.y, r)) { rr(r.x, r.y, r.w, r.h, 14); ctx.strokeStyle = '#ffd76a'; ctx.lineWidth = 5; ctx.stroke(); }
            if (g && burning(st.id)) { rr(r.x, r.y, r.w, r.h, 14); ctx.fillStyle = 'rgba(231,76,60,0.18)'; ctx.fill(); }
        });

        if (!g) return;
        for (const p of g.phones) {
            if (pointer && pointer.moved && pointer.dragId === p.id) continue;
            drawPhone(p, p.x, belt.y, 1, p.id === g.selId);
            if (p.id === g.selId) { ctx.strokeStyle = '#ffd76a'; ctx.lineWidth = 3; rr(p.x - 24, belt.y - 38, 48, 76, 9); ctx.stroke(); }
        }
        for (const f of g.fires) {
            const fl = 1 + 0.12 * Math.sin(f.age * 18) + 0.06 * Math.sin(f.age * 31);
            const glow = ctx.createRadialGradient(f.x, f.y, 4, f.x, f.y, 70);
            glow.addColorStop(0, 'rgba(255,140,40,0.55)'); glow.addColorStop(1, 'rgba(255,140,40,0)');
            ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(f.x, f.y, 70, 0, Math.PI * 2); ctx.fill();
            ctx.font = EMOJI(54 * fl); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🔥', f.x, f.y - 6);
            for (let k = 0; k < 3; k++) { ctx.fillStyle = k < f.hp ? '#ef4444' : '#cbd5e1'; ctx.beginPath(); ctx.arc(f.x - 12 + k * 12, f.y + 34, 4, 0, Math.PI * 2); ctx.fill(); }
        }
        for (const p of g.particles) { ctx.globalAlpha = Math.max(0, 1 - p.age / p.life); ctx.fillStyle = p.col; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill(); }
        ctx.globalAlpha = 1;
        for (const x of g.texts) {
            ctx.globalAlpha = Math.min(1, 2 * (1.6 - x.age));
            ctx.font = FONT(800, 15); ctx.textAlign = 'center'; ctx.lineWidth = 4; ctx.strokeStyle = 'white';
            ctx.strokeText(x.text, x.x, x.y); ctx.fillStyle = x.color; ctx.fillText(x.text, x.x, x.y);
        }
        ctx.globalAlpha = 1;
        if (pointer && pointer.moved) {
            const p = g.phones.find(q => q.id === pointer.dragId);
            if (p) drawPhone(p, pointer.x, pointer.y, 1.15, true);
        }
    }

    // ---------------------------------------------------------------------
    // Loop, HUD and screens
    // ---------------------------------------------------------------------
    function frame(now) {
        raf = requestAnimationFrame(frame);
        if (!root.isConnected || !root.offsetParent) { last = now; return; }   // not visible: do nothing
        if (!L) { resize(); if (!L) return; }                                // measure before the first frame
        const dt = Math.min((now - last) / 1000, 0.05) * timeScale; last = now;
        if (g && g.running && !g.paused && !g.over) {
            let left = dt;   // small steps, so fast-forwarding (tests) stays accurate
            while (left > 0 && !g.over) { const step = Math.min(left, 0.05); update(step); left -= step; }
            if (!g.over) hud();
        }
        draw();
    }

    function hud() {
        const set = (sel, val) => { if (hudCache[sel] !== val) { hudCache[sel] = val; const el = root.querySelector(sel); if (el) el.textContent = val; } };
        set('.rr-score', String(Math.max(0, Math.round(g.score))));
        set('.rr-money', money(g.money));
        set('.rr-screens', String(g.parts.screen) + (g.orders.some(o => o.part === 'screen') ? ' +' : ''));
        set('.rr-batteries', String(g.parts.battery) + (g.orders.some(o => o.part === 'battery') ? ' +' : ''));
        set('.rr-time-num', Math.max(0, Math.ceil(SHIFT - g.t)) + ' s');
        root.querySelector('.rr-time-bar span').style.width = (100 * Math.max(0, 1 - g.t / SHIFT)) + '%';
        ['screen', 'battery'].forEach(p => {
            const b = root.querySelector(`[data-order="${p}"]`);
            const label = '+ ' + money(partPrice(p));
            if (b.dataset.label !== label) { b.dataset.label = label; b.firstChild.textContent = label; }
            b.disabled = g.money < partPrice(p);
        });
    }

    function showOverlay(html) {
        const ov = root.querySelector('.rr-overlay');
        ov.hidden = !html;
        ov.innerHTML = html || '';
        const btn = ov.querySelector('.g-btn.primary');
        if (btn) btn.focus({ preventScroll: true });
    }

    function introHtml() {
        const best = readBest();
        return `<div class="rr-card">
            <h3>${esc(t('game.intro.title'))}</h3>
            <p>${t('game.intro.text')}</p>
            <ul class="rr-guide">
                ${STATIONS.map((st, i) => `<li><span class="rr-key">${i + 1}</span><span aria-hidden="true">${st.icon}</span>
                    <strong>${esc(t('game.st.' + st.id))}</strong><span>${esc(t('game.st.' + st.id + '.guide'))}</span></li>`).join('')}
            </ul>
            <p class="rr-warn"><span aria-hidden="true">🔥</span> ${t('game.intro.fire')}</p>
            <p class="rr-small">${esc(t('game.intro.controls'))}</p>
            ${best ? `<p class="g-best">⭐ ${esc(t('game.best', { score: best.score }))}</p>` : ''}
            <button type="button" class="g-btn primary" data-go="start">${esc(t('game.start'))} <span aria-hidden="true">▶</span></button>
            <p class="rr-small">${esc(t('game.intro.note'))}</p>
        </div>`;
    }

    function endGame() {
        g.over = true; g.running = false;
        hud();
        const s = g.stats, score = Math.max(0, Math.round(g.score));   // no negative final scores
        const stars = score >= 1400 ? 3 : score >= 800 ? 2 : score >= 300 ? 1 : 0;
        const best = readBest();
        const isBest = score > 0 && (!best || score > best.score);
        if (isBest) { try { localStorage.setItem(BEST_KEY, JSON.stringify({ score, stars })); } catch (e) { /* ignore */ } }
        const m = g.metals, n = (v, d) => v.toLocaleString('en-GB', { maximumFractionDigits: d });
        const lessons = [];
        if (s.fires) lessons.push(t('game.lesson.fires', { n: s.fires }));
        if (s.landfill) lessons.push(t('game.lesson.landfill', { n: s.landfill }));
        if (s.wasted) lessons.push(t('game.lesson.wasted', { n: s.wasted }));
        if (s.returned) lessons.push(t('game.lesson.returned'));
        if (!lessons.length) lessons.push(t('game.lesson.perfect'));
        lessons.push(t('game.lesson.metals'));
        const row = (k, v) => `<tr><td>${esc(t('game.row.' + k))}</td><td>${v}</td></tr>`;
        showOverlay(`<div class="rr-card rr-end">
            <div class="g-stars" role="img" aria-label="${esc(t('game.starsLabel', { n: stars }))}">${[1, 2, 3].map(i => `<span class="${i <= stars ? 'on' : ''}">★</span>`).join('')}</div>
            <h3>${esc(t('game.end.title' + stars))}</h3>
            <p class="g-total">${esc(t('game.end.score', { n: score }))}${isBest ? ` <span class="g-new">${esc(t('game.newBest'))}</span>` : ''}</p>
            <div class="rr-end-grid">
                <table class="g-table"><tbody>
                    ${row('sold', s.sold)}${row('repaired', s.repaired)}${row('recycled', s.recycled + s.wasted)}${row('safe', s.safe)}
                    ${row('fires', s.fires)}${row('landfill', s.landfill)}${row('money', money(g.money))}
                </tbody></table>
                <div><h4>${esc(t('game.recovered'))}</h4>
                <ul class="g-metals">
                    <li><span>${esc(t('drawer.cu'))}</span><strong>${n(m.cu, 1)} g</strong></li>
                    <li><span>${esc(t('drawer.ag'))}</span><strong>${n(m.ag * 1000, 0)} mg</strong></li>
                    <li><span>${esc(t('drawer.au'))}</span><strong>${n(m.au * 1000, 0)} mg</strong></li>
                    <li><span>${esc(t('drawer.pd'))}</span><strong>${n(m.pd * 1000, 1)} mg</strong></li>
                    <li><span>${esc(t('drawer.ree'))}</span><strong>${n(m.ree, 1)} g</strong></li>
                </ul></div>
            </div>
            <ul class="g-lessons">${lessons.map(l => `<li>${esc(l)}</li>`).join('')}</ul>
            <div class="g-end-btns">
                <button type="button" class="g-btn primary" data-go="start">${esc(t('game.again'))}</button>
                <button type="button" class="g-btn" data-go="close">${esc(t('game.close'))}</button>
            </div>
        </div>`);
    }

    function pause(on) {
        if (!g || g.over || g.paused === on) return;
        g.paused = on;
        const b = root.querySelector('.rr-pause');
        b.textContent = on ? '▶' : '⏸';
        b.setAttribute('aria-label', t(on ? 'game.resume' : 'game.pause'));
        showOverlay(on ? `<div class="rr-card"><h3>${esc(t('game.paused'))}</h3>
            <button type="button" class="g-btn primary" data-go="resume">${esc(t('game.resume'))} <span aria-hidden="true">▶</span></button></div>` : null);
        if (!on) canvas.focus({ preventScroll: true });
    }

    // ---------------------------------------------------------------------
    // Input
    // ---------------------------------------------------------------------
    const inRect = (x, y, r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
    function toLogical(ev) {
        const r = canvas.getBoundingClientRect();
        return { x: (ev.clientX - r.left) / r.width * L.W, y: (ev.clientY - r.top) / r.height * L.H };
    }
    const fireAt = (x, y) => g.fires.find(f => Math.hypot(f.x - x, f.y - y) < 48);
    const phoneAt = (x, y) => g.phones.slice().reverse().find(p => Math.abs(p.x - x) < 28 && Math.abs(L.belt.y - y) < 44);
    const stationAt = (x, y) => { const i = L.stations.findIndex(r => inRect(x, y, r)); return i < 0 ? null : STATIONS[i].id; };

    function onDown(ev) {
        if (!g || g.over || g.paused) return;
        const p = toLogical(ev);
        const f = fireAt(p.x, p.y);
        if (f) { extinguish(f); return; }
        const ph = phoneAt(p.x, p.y);
        if (ph) {
            g.selId = ph.id; ph.held = true;
            pointer = { x: p.x, y: p.y, sx: p.x, sy: p.y, dragId: ph.id, moved: false };
            try { canvas.setPointerCapture(ev.pointerId); } catch (e) { /* ignore */ }
            ev.preventDefault();
            return;
        }
        const st = stationAt(p.x, p.y);
        if (st && g.selId) send(g.phones.find(q => q.id === g.selId), st);
    }
    function onMove(ev) {
        if (!pointer) return;
        const p = toLogical(ev);
        pointer.x = p.x; pointer.y = p.y;
        if (Math.hypot(p.x - pointer.sx, p.y - pointer.sy) > 10) pointer.moved = true;
    }
    function onUp() {
        if (!pointer) return;
        const ph = g && g.phones.find(q => q.id === pointer.dragId);
        if (ph) ph.held = false;
        if (pointer.moved && ph) {
            const st = stationAt(pointer.x, pointer.y);
            if (st) send(ph, st);
        }
        pointer = null;
    }

    function onKey(ev) {
        if (!g || g.over) return;
        if (ev.key === 'p' || ev.key === 'P') { pause(!g.paused); ev.preventDefault(); return; }
        if (g.paused) return;
        const sorted = g.phones.slice().sort((a, b) => b.x - a.x);   // nearest to the landfill first
        if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
            if (!sorted.length) return;
            const i = sorted.findIndex(p => p.id === g.selId);
            const j = i < 0 ? 0 : (i + (ev.key === 'ArrowLeft' ? 1 : -1) + sorted.length) % sorted.length;
            g.selId = sorted[j].id; ev.preventDefault();
        } else if (/^[1-4]$/.test(ev.key)) {
            const sel = g.phones.find(p => p.id === g.selId) || sorted[0];
            send(sel, STATIONS[Number(ev.key) - 1].id); ev.preventDefault();
        } else if (ev.key === 'f' || ev.key === 'F' || ev.key === ' ') {
            extinguish(g.fires[0]); ev.preventDefault();
        }
    }

    function resize() {
        if (!root.clientWidth) return;
        const portrait = root.clientWidth < 640;
        if (!L || L.portrait !== portrait) L = layout(portrait);
        const w = canvas.clientWidth, h = w * L.H / L.W, dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.style.height = h + 'px';
        canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
        ctx.setTransform(canvas.width / L.W, 0, 0, canvas.height / L.H, 0, 0);
        // fact pop-ups go in the gap between the belt and the stations
        root.querySelector('.rr-toasts').style.top = ((L.belt.y + L.belt.h / 2 + 12) / L.H * 100) + '%';
    }

    // ---------------------------------------------------------------------
    // Public API
    // ---------------------------------------------------------------------
    window.UrbanMine = {
        mount(el, translate) {
            root = el; t = translate || t;
            root.innerHTML = `<div class="rr-hud">
                    <div class="rr-time" title="${esc(t('game.timeLeft'))}"><span aria-hidden="true">⏱️</span><div class="rr-time-bar"><span></span></div><b class="rr-time-num">${SHIFT} s</b></div>
                    <span class="rr-stat"><span aria-hidden="true">⭐</span> <b class="rr-score">0</b></span>
                    <span class="rr-stat"><span aria-hidden="true">💷</span> <b class="rr-money">£30</b></span>
                    <span class="rr-stat">${esc(t('game.screens'))} <b class="rr-screens">1</b>
                        <button type="button" class="g-btn small" data-order="screen" aria-label="${esc(t('game.order.screen'))}"><span>+ £15</span></button></span>
                    <span class="rr-stat">${esc(t('game.batteries'))} <b class="rr-batteries">1</b>
                        <button type="button" class="g-btn small" data-order="battery" aria-label="${esc(t('game.order.battery'))}"><span>+ £10</span></button></span>
                    <button type="button" class="g-btn small rr-pause" aria-label="${esc(t('game.pause'))}">⏸</button>
                </div>
                <div class="rr-stage">
                    <canvas class="rr-canvas" tabindex="0" role="application" aria-label="${esc(t('game.canvasLabel'))}"></canvas>
                    <div class="rr-toasts" aria-live="polite"></div>
                    <div class="rr-overlay"></div>
                </div>
                <p class="rr-small rr-keys">${esc(t('game.keys'))}</p>`;
            canvas = root.querySelector('canvas');
            ctx = canvas.getContext('2d');
            new ResizeObserver(resize).observe(root);
            resize();
            canvas.addEventListener('pointerdown', onDown);
            canvas.addEventListener('pointermove', onMove);
            canvas.addEventListener('pointerup', onUp);
            canvas.addEventListener('pointercancel', onUp);
            canvas.addEventListener('keydown', onKey);
            root.addEventListener('click', ev => {
                const b = ev.target.closest('button');
                if (!b || b.disabled) return;
                if (b.dataset.order) order(b.dataset.order);
                else if (b.classList.contains('rr-pause')) pause(!(g && g.paused));
                else if (b.dataset.go === 'start') newGame();
                else if (b.dataset.go === 'resume') pause(false);
                else if (b.dataset.go === 'close') { const d = root.closest('dialog'); if (d) d.close(); }
            });
            document.addEventListener('visibilitychange', () => { if (document.hidden) pause(true); });
            showOverlay(introHtml());
            last = performance.now();
            raf = requestAnimationFrame(frame);
        },
        reset() {
            if (!g || g.over) { g = null; showOverlay(introHtml()); }
            resize();
        },
        pause() { pause(true); },
        // used by the automatic tests
        _debug: {
            state: () => g, layout: () => L,
            send: (id, st) => send(g.phones.find(p => p.id === id), st),
            extinguish: id => extinguish(g.fires.find(f => f.id === id)),
            order, speed: n => { timeScale = n; }
        }
    };
})();
