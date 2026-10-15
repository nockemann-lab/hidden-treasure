/*
 * Interactive 3D smartphone (assembled / exploded) for "Hidden Treasure in Your Pocket".
 * A generic modern smartphone with seven layers, modelled in code with three.js (MIT licence).
 * The first version of this model was generated with Google Gemini; it has since been redrawn
 * with more realistic detail. No brand names or logos.
 *
 * This is the SOURCE file. The website loads the bundled version, phone3d.min.js.
 * After editing, rebuild with:   npm install   then   npm run build:3d
 *
 * Usage (see index.html):
 *   const viewer = Phone3D.create(containerElement, {
 *       label: key => text,            // names, e.g. label('part.pcb') or label('layer.board')
 *       onSelect: part => {},          // a part was clicked: 'screen', 'camera', 'pcb', 'speaker', 'battery', 'casing'
 *       onExplode: t => {},            // explode factor changed (0 = assembled, 1 = exploded)
 *       reducedMotion: false
 *   });
 *   viewer.select('pcb'); viewer.toggle(); viewer.setExplode(0.5);
 *   viewer.diagonalView(); viewer.backView(); viewer.resetView(); viewer.partAt(clientX, clientY);
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const W = 2.75;   // phone width
const H = 5.85;   // phone height
const R = 0.42;   // corner radius

// Camera positions of the three lenses (shared by the main board, camera modules and rear camera bar)
const CAM = { y: 2.15, uw: -0.85, main: -0.15, tele: 0.72 };

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------
const V = (x, y, z) => new THREE.Vector3(x, y, z);

// Fixed pseudo-random numbers, so the model looks the same every time
function seeded(seed) {
    return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

// Rounded rectangle as a Shape (or a Path, for holes)
function rrect(w, h, r, cx = 0, cy = 0, PathType = THREE.Shape) {
    const s = new PathType();
    const x = cx - w / 2, y = cy - h / 2;
    r = Math.min(r, w / 2, h / 2);
    s.moveTo(x + r, y);
    s.lineTo(x + w - r, y);
    s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
    s.lineTo(x + w, y + h - r);
    s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
    s.lineTo(x + r, y + h);
    s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
    s.lineTo(x, y + r);
    s.absarc(x + r, y + r, r, Math.PI, 1.5 * Math.PI, false);
    return s;
}
const rrHole = (w, h, r, cx, cy) => rrect(w, h, r, cx, cy, THREE.Path);
const circleHole = (r, cx, cy) => new THREE.Path().absarc(cx, cy, r, 0, Math.PI * 2, false);

// Extruded shape, centred on z = 0
function extrude(shape, depth, bevel = 0) {
    const g = new THREE.ExtrudeGeometry(shape, {
        depth, curveSegments: 24,
        bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3
    });
    g.translate(0, 0, -depth / 2);
    return g;
}

// A flat ribbon (flex cable) following a curve; `side` is the direction of the ribbon's width
function ribbon(points, width, side = V(1, 0, 0)) {
    const pos = [], idx = [];
    points.forEach((p, i) => {
        pos.push(p.x - side.x * width / 2, p.y - side.y * width / 2, p.z - side.z * width / 2,
                 p.x + side.x * width / 2, p.y + side.y * width / 2, p.z + side.z * width / 2);
        if (i > 0) { const a = (i - 1) * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    return g;
}
const curve = (...pts) => new THREE.CatmullRomCurve3(pts).getPoints(48);

// ---------------------------------------------------------------------------
// Textures drawn on a canvas (no image files needed)
// ---------------------------------------------------------------------------
function canvasTexture(w, h, draw) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d'), w, h);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
}
const FONT = (weight, size) => `${weight} ${size}px -apple-system, "Segoe UI", Arial, sans-serif`;
function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

// Lock screen with the app's colours and a dock of element "apps"
function screenTexture() {
    return canvasTexture(1080, 2280, (ctx, w, h) => {
        const bg = ctx.createLinearGradient(0, 0, w * 0.4, h);
        bg.addColorStop(0, '#13234a'); bg.addColorStop(0.55, '#1e3c72'); bg.addColorStop(1, '#0b1428');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h);
        // soft golden and teal waves
        [['rgba(240, 169, 46, 0.62)', 1300, 520], ['rgba(20, 184, 166, 0.55)', 1550, 420], ['rgba(19, 35, 74, 0.75)', 1780, 380]]
            .forEach(([col, y0, amp]) => {
                ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(0, y0);
                ctx.bezierCurveTo(w * 0.35, y0 - amp, w * 0.65, y0 + amp, w, y0 - amp * 0.4);
                ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill();
            });
        // status bar
        ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = FONT(600, 44); ctx.fillText('9:41', 70, 105);
        [0, 1, 2, 3].forEach(i => ctx.fillRect(w - 300 + i * 22, 100 - 14 - i * 9, 14, 14 + i * 9));
        roundRect(ctx, w - 190, 66, 92, 44, 12); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(255,255,255,0.9)'; ctx.stroke();
        ctx.fillRect(w - 182, 74, 62, 28); ctx.fillRect(w - 94, 80, 8, 16);
        // clock and title
        ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.font = FONT(200, 300); ctx.fillText('9:41', w / 2, 560);
        ctx.font = FONT(500, 46); ctx.fillStyle = 'rgba(255, 224, 138, 0.95)';
        ctx.fillText('Hidden Treasure in Your Pocket', w / 2, 650);
        // dock with element tiles as app icons
        const tiles = [['Au', 79, '#fff59d', '#fbc02d'], ['Li', 3, '#ffccbc', '#e64a19'], ['Co', 27, '#ffccbc', '#e64a19'], ['Nd', 60, '#c8e6c9', '#388e3c']];
        roundRect(ctx, 60, h - 420, w - 120, 250, 70); ctx.fillStyle = 'rgba(255,255,255,0.16)'; ctx.fill();
        tiles.forEach(([sym, z, bgc, edge], i) => {
            const x = 115 + i * 225, y = h - 380;
            roundRect(ctx, x, y, 170, 170, 40); ctx.fillStyle = bgc; ctx.fill();
            ctx.fillStyle = edge; ctx.fillRect(x + 20, y + 152, 130, 12);
            ctx.fillStyle = '#455a64'; ctx.font = FONT(700, 34); ctx.fillText(String(z), x + 85, y + 48);
            ctx.fillStyle = '#2c3e50'; ctx.font = FONT(800, 78); ctx.fillText(sym, x + 85, y + 128);
        });
        roundRect(ctx, w / 2 - 150, h - 70, 300, 14, 7); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fill();
    });
}

// Circuit board: solder mask with copper traces, vias, pads and printed labels
function pcbTexture(seed) {
    const rnd = seeded(seed);
    return canvasTexture(1024, 1024, (ctx, w, h) => {
        ctx.fillStyle = '#0f3b2c'; ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(62, 160, 112, 0.55)'; ctx.lineWidth = 3;
        for (let b = 0; b < 26; b++) {                      // buses of parallel traces with 45-degree bends
            const x = rnd() * w, y = rnd() * h, n = 3 + Math.floor(rnd() * 5), len = 60 + rnd() * 240, dir = rnd() < 0.5 ? 1 : -1;
            for (let k = 0; k < n; k++) {
                ctx.beginPath(); ctx.moveTo(x, y + k * 9);
                ctx.lineTo(x + len, y + k * 9); ctx.lineTo(x + len + 40, y + k * 9 + dir * 40); ctx.lineTo(x + len + 40 + len * 0.6, y + k * 9 + dir * 40);
                ctx.stroke();
            }
        }
        for (let i = 0; i < 320; i++) {                     // vias
            const x = rnd() * w, y = rnd() * h;
            ctx.fillStyle = '#c9a34a'; ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#0a2a1f'; ctx.beginPath(); ctx.arc(x, y, 1.6, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = 'rgba(232, 236, 240, 0.75)'; ctx.font = FONT(600, 15);
        for (let i = 0; i < 70; i++) ctx.fillText(['C', 'R', 'L', 'U', 'Q', 'TP'][Math.floor(rnd() * 6)] + Math.floor(rnd() * 900 + 1), rnd() * w, rnd() * h);
    });
}

// Pressed steel shield can with ventilation holes
function shieldTexture() {
    return canvasTexture(512, 512, (ctx, w, h) => {
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, '#d9dee4'); g.addColorStop(1, '#aeb6bf');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = 'rgba(40, 46, 54, 0.55)';
        for (let y = 40; y < h - 30; y += 34) for (let x = 40 + ((y / 34) % 2) * 17; x < w - 30; x += 34) {
            ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 6; ctx.strokeRect(8, 8, w - 16, h - 16);
    });
}

function chipTexture(title, sub) {
    return canvasTexture(512, 512, (ctx, w, h) => {
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, '#24282e'); g.addColorStop(1, '#121417');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#9aa3ae'; ctx.font = FONT(700, 58); ctx.fillText(title, 50, 220);
        ctx.font = FONT(500, 34); ctx.fillText(sub, 50, 285);
        ctx.fillStyle = '#d4a017'; ctx.beginPath(); ctx.arc(60, 440, 14, 0, Math.PI * 2); ctx.fill();
    });
}

// Copper vapour chamber with its sponge-like wick pattern and soldered seam
function vaporTexture() {
    return canvasTexture(512, 512, (ctx, w, h) => {
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, '#e2a06f'); g.addColorStop(0.5, '#c9784a'); g.addColorStop(1, '#b8673c');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(120, 60, 30, 0.25)'; ctx.lineWidth = 2;
        for (let i = -h; i < w; i += 14) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + h, h); ctx.stroke(); }
        ctx.strokeStyle = 'rgba(255, 230, 200, 0.6)'; ctx.lineWidth = 10; ctx.strokeRect(14, 14, w - 28, h - 28);
    });
}

// Battery label: accurate chemistry and the real "do not bin" symbol (no brand names or invented data)
function batteryTexture() {
    return canvasTexture(1024, 1136, (ctx, w, h) => {
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, '#2d3138'); g.addColorStop(1, '#1f2227');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#e2e8f0';
        ctx.font = FONT(700, 54); ctx.fillText('Lithium-ion Polymer Battery', 70, 110);
        ctx.font = FONT(600, 38); ctx.fillText('3.89 V   5000 mAh   19.5 Wh', 70, 170);

        ctx.fillStyle = 'rgba(56, 189, 248, 0.12)'; ctx.fillRect(70, 210, 884, 290);
        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 4; ctx.strokeRect(70, 210, 884, 290);
        ctx.fillStyle = '#38bdf8'; ctx.font = FONT(700, 40); ctx.fillText('WHAT IS INSIDE?', 100, 265);
        ctx.fillStyle = '#f1f5f9'; ctx.font = FONT(500, 36);
        ctx.fillText('+  Lithium cobalt oxide (Li, Co)', 100, 325);
        ctx.fillText('−  Graphite (C)', 100, 377);
        ctx.fillText('Foils: copper (Cu), aluminium (Al)', 100, 429);
        ctx.fillText('Electrolyte: lithium salt', 100, 481);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = FONT(700, 42); ctx.fillText('Do not put in the bin!', 70, 590);
        ctx.font = FONT(500, 34);
        ctx.fillText('Damaged batteries can start fires.', 70, 640);
        ctx.fillText('Recycle at an e-waste collection point.', 70, 685);

        // Crossed-out wheelie bin (the real WEEE symbol)
        ctx.strokeStyle = '#e2e8f0'; ctx.fillStyle = '#e2e8f0'; ctx.lineWidth = 9;
        const bx = 130, by = 790;
        ctx.fillRect(bx - 18, by - 10, 150, 12);
        ctx.strokeRect(bx, by + 8, 114, 150);
        ctx.beginPath(); ctx.arc(bx + 18, by + 172, 14, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(bx - 36, by - 36); ctx.lineTo(bx + 150, by + 205);
        ctx.moveTo(bx + 150, by - 36); ctx.lineTo(bx - 36, by + 205); ctx.stroke();
        ctx.fillRect(bx - 36, by + 222, 186, 16);

        // Recycling arrows
        ctx.save(); ctx.translate(520, 900); ctx.lineWidth = 13;
        for (let k = 0; k < 3; k++) {
            ctx.rotate((2 * Math.PI) / 3);
            ctx.beginPath(); ctx.moveTo(-55, 64); ctx.lineTo(55, 64); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(55, 64); ctx.lineTo(32, 41); ctx.lineTo(32, 87); ctx.closePath(); ctx.fill();
        }
        ctx.restore();
        ctx.font = FONT(700, 46); ctx.fillText('Li-ion', 730, 915);
        ctx.font = FONT(500, 28); ctx.fillStyle = '#94a3b8';
        ctx.fillText('Illustration for "Hidden Treasure in Your Pocket"', 70, 1090);
    });
}

function grilleTexture() {
    return canvasTexture(256, 128, (ctx, w, h) => {
        ctx.fillStyle = '#16181c'; ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#3a3f47';
        for (let y = 10; y < h; y += 12) for (let x = 8 + ((y / 12) % 2) * 6; x < w; x += 12) {
            ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2); ctx.fill();
        }
    });
}

// Soft round shadow for the floor
function shadowTexture() {
    return canvasTexture(256, 256, (ctx, w, h) => {
        const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
        g.addColorStop(0, 'rgba(15, 23, 42, 0.42)'); g.addColorStop(0.55, 'rgba(15, 23, 42, 0.16)'); g.addColorStop(1, 'rgba(15, 23, 42, 0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    });
}

// Map a texture onto a flat extruded/shape geometry whose x/y span [x0..x1] x [y0..y1]
function fitTexture(tex, x0, x1, y0, y1) {
    tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(1 / (x1 - x0), 1 / (y1 - y0));
    tex.offset.set(-x0 / (x1 - x0), -y0 / (y1 - y0));
    return tex;
}

// ---------------------------------------------------------------------------
// The model: seven layers, front to back. Every mesh is tagged with the app's
// part id (which card opens) and the key of its hover name.
// ---------------------------------------------------------------------------
function buildPhone() {
    const M = {
        alu: new THREE.MeshStandardMaterial({ color: 0xc3c9d1, metalness: 0.9, roughness: 0.28 }),
        darkAlu: new THREE.MeshStandardMaterial({ color: 0x3a4049, metalness: 0.8, roughness: 0.38 }),
        steel: new THREE.MeshStandardMaterial({ color: 0xb8c0c8, metalness: 0.92, roughness: 0.24 }),
        copper: new THREE.MeshStandardMaterial({ color: 0xc8743f, metalness: 0.9, roughness: 0.28 }),
        gold: new THREE.MeshStandardMaterial({ color: 0xe0b23a, metalness: 0.95, roughness: 0.2 }),
        black: new THREE.MeshStandardMaterial({ color: 0x16181c, metalness: 0.2, roughness: 0.45 }),
        blackGloss: new THREE.MeshStandardMaterial({ color: 0x0d0f12, metalness: 0.3, roughness: 0.15 }),
        flex: new THREE.MeshStandardMaterial({ color: 0xd38a2c, metalness: 0.35, roughness: 0.35, side: THREE.DoubleSide }),
        lensGlass: new THREE.MeshPhysicalMaterial({ color: 0x0b1530, metalness: 0.2, roughness: 0.03, clearcoat: 1, side: THREE.DoubleSide }),
        ceramic: new THREE.MeshStandardMaterial({ color: 0xbfa37a, metalness: 0.1, roughness: 0.5 }),
        tantalum: new THREE.MeshStandardMaterial({ color: 0xe0a21b, metalness: 0.15, roughness: 0.4 })
    };
    const at = (m, x, y, z) => { m.position.set(x, y, z); return m; };
    const mesh = (geo, mat) => new THREE.Mesh(geo, mat);
    const box = (w, h, d, mat, r = 0.01) => mesh(new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2, h / 2, d / 2)), mat);
    const cyl = (r, len, mat, seg = 32) => { const m = mesh(new THREE.CylinderGeometry(r, r, len, seg), mat); m.rotation.x = Math.PI / 2; return m; };  // axis along z
    const disc = (r, mat, back = false) => { const m = mesh(new THREE.CircleGeometry(r, 40), mat); if (back) m.rotation.y = Math.PI; return m; };
    const ring = (r1, r2, mat, back = false) => { const m = mesh(new THREE.RingGeometry(r1, r2, 48), mat); if (back) m.rotation.y = Math.PI; return m; };
    const tag = (obj, part, label) => { obj.traverse(o => { if (o.isMesh) { o.userData.part = part; o.userData.label = label; } }); return obj; };
    const add = (layer, part, label, ...objs) => objs.forEach(o => layer.add(tag(o, part, label)));

    // Many tiny surface-mount components as one instanced mesh each (fast to draw)
    function smdField(spots, rnd) {
        const caps = [], ress = [];
        spots.forEach(([x, y, z]) => (rnd() < 0.62 ? caps : ress).push([x, y, z, rnd() < 0.5 ? 0 : Math.PI / 2]));
        const make = (list, w, h, d, mat) => {
            const im = new THREE.InstancedMesh(new THREE.BoxGeometry(w, h, d), mat, Math.max(list.length, 1));
            const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = V(1, 1, 1);
            list.forEach(([x, y, z, rot], i) => { q.setFromAxisAngle(V(0, 0, 1), rot); im.setMatrixAt(i, m4.compose(V(x, y, z + d / 2), q, s)); });
            im.count = list.length;
            return im;
        };
        return [make(caps, 0.055, 0.03, 0.03, M.ceramic), make(ress, 0.05, 0.026, 0.016, M.black)];
    }
    function scatter(rnd, x0, x1, y0, y1, step, z, keepOut) {
        const spots = [];
        for (let y = y0; y <= y1; y += step) for (let x = x0; x <= x1; x += step) {
            const px = x + (rnd() - 0.5) * step * 0.5, py = y + (rnd() - 0.5) * step * 0.5;
            if (rnd() < 0.3) continue;
            if (keepOut.some(([cx, cy, w, h]) => Math.abs(px - cx) < w / 2 + 0.04 && Math.abs(py - cy) < h / 2 + 0.04)) continue;
            spots.push([px, py, z]);
        }
        return spots;
    }

    // ===== Layer 0: display (cover glass, OLED panel, flex cable folded behind) =====
    const l0 = new THREE.Group();
    const glass = mesh(extrude(rrect(W, H, R), 0.035, 0.012), new THREE.MeshPhysicalMaterial({
        color: 0x9fb3c8, metalness: 0, roughness: 0.03, clearcoat: 1, transparent: true, opacity: 0.1, envMapIntensity: 1.6
    }));
    const panel = at(mesh(extrude(rrect(W - 0.08, H - 0.08, R - 0.04), 0.03), M.blackGloss), 0, 0, -0.065);
    const sw = W - 0.14, sh = H - 0.14;
    const screenTex = fitTexture(screenTexture(), -sw / 2, sw / 2, -sh / 2, sh / 2);
    const screen = at(mesh(new THREE.ShapeGeometry(rrect(sw, sh, R - 0.07), 24),
        new THREE.MeshStandardMaterial({ color: 0x1a1a1a, emissiveMap: screenTex, emissive: 0xffffff, emissiveIntensity: 1, roughness: 0.2, metalness: 0 })), 0, 0, -0.0485);
    const punch = at(disc(0.055, M.blackGloss), 0, H / 2 - 0.26, -0.048);
    const punchRing = at(ring(0.055, 0.07, M.darkAlu), 0, H / 2 - 0.26, -0.0478);
    const backing = at(mesh(new THREE.ShapeGeometry(rrect(W - 0.34, H - 0.7, 0.2), 8), M.copper), 0, 0.15, -0.081);
    backing.rotation.y = Math.PI;
    const flexPts = curve(V(0, -H / 2 + 0.3, -0.082), V(0, -H / 2 + 0.12, -0.082), V(0, -H / 2 + 0.06, -0.13),
        V(0, -H / 2 + 0.12, -0.18), V(0, -H / 2 + 0.4, -0.18), V(0, -H / 2 + 0.78, -0.18));
    const flex0 = mesh(ribbon(flexPts, 1.05), M.flex);
    const ddic = at(box(0.55, 0.12, 0.025, M.blackGloss), 0, -H / 2 + 0.36, -0.194);
    const dispConn = at(box(0.42, 0.13, 0.04, M.gold), 0, -H / 2 + 0.74, -0.2);
    add(l0, 'screen', 'part.screen', glass, panel, screen, backing, flex0, ddic, dispConn);
    add(l0, 'camera', 'part.cameraFront', punch, punchRing);

    // ===== Layer 1: aluminium frame with mid-plate, buttons, antenna gaps, vapour chamber =====
    const l1 = new THREE.Group();
    const railShape = rrect(W, H, R);
    railShape.holes.push(rrHole(W - 0.15, H - 0.15, R - 0.075, 0, 0));
    const rail = mesh(extrude(railShape, 0.29, 0.015), M.alu);
    const plateShape = rrect(W - 0.12, H - 0.12, R - 0.06);
    plateShape.holes.push(rrHole(0.56, 0.56, 0.1, CAM.uw, CAM.y), rrHole(0.72, 0.72, 0.12, CAM.main, CAM.y),
        rrHole(0.86, 0.5, 0.08, CAM.tele, CAM.y + 0.05), circleHole(0.1, 0, H / 2 - 0.26));
    const plate = mesh(extrude(plateShape, 0.045), M.darkAlu);
    const antennaMat = new THREE.MeshStandardMaterial({ color: 0x5b6470, roughness: 0.7 });
    const antennas = [[-1, 2.2], [1, 2.2], [-1, -1.0], [1, -1.0]].map(([s, y]) => at(box(0.095, 0.045, 0.3, antennaMat, 0.005), s * (W / 2 - 0.035), y, 0))
        .concat([[-0.85, 1], [0.85, 1], [-0.85, -1], [0.85, -1]].map(([x, s]) => at(box(0.045, 0.095, 0.3, antennaMat, 0.005), x, s * (H / 2 - 0.035), 0)));
    const power = at(box(0.05, 0.42, 0.12, M.alu, 0.02), W / 2 + 0.02, 1.1, 0);
    const volume = at(box(0.05, 0.85, 0.12, M.alu, 0.02), W / 2 + 0.02, 0.2, 0);
    const simTray = at(box(0.03, 0.62, 0.13, new THREE.MeshStandardMaterial({ color: 0x9aa3ad, metalness: 0.85, roughness: 0.35 }), 0.01), -W / 2 - 0.004, 1.2, 0);
    const usbHole = at(box(0.36, 0.06, 0.12, M.blackGloss, 0.03), 0, -H / 2 + 0.01, 0);
    const holes = [0.48, 0.58, 0.68, 0.78, 0.88, 0.98, -0.6, -0.72].map(x => at(mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.05, 12), M.blackGloss), x, -H / 2 + 0.005, 0));
    const bosses = [[-1.05, -2.6], [1.05, -2.6], [-1.05, 0.7], [1.05, 0.7], [-1.05, 2.6], [1.05, 2.6]]
        .map(([x, y]) => at(cyl(0.055, 0.08, M.steel, 20), x, y, 0.06));
    const vapor = at(mesh(extrude(rrect(1.55, 2.45, 0.12, 0.15, 0.15), 0.025, 0.006), new THREE.MeshStandardMaterial({
        map: fitTexture(vaporTexture(), -0.625, 0.925, -1.075, 1.375), metalness: 0.85, roughness: 0.3
    })), 0, 0, 0.04);
    const frontCam = at(cyl(0.085, 0.13, M.black, 28), 0, H / 2 - 0.26, 0.1);
    const frontLens = at(disc(0.05, M.lensGlass), 0, H / 2 - 0.26, 0.166);
    const frontCamFlex = mesh(ribbon(curve(V(0, H / 2 - 0.36, 0.06), V(0.12, H / 2 - 0.55, 0.07), V(0.32, H / 2 - 0.68, 0.06)), 0.14, V(1, 0.5, 0).normalize()), M.flex);
    const earpiece = at(box(0.62, 0.08, 0.07, M.black, 0.03), 0, H / 2 - 0.1, 0.06);
    const earMesh = at(box(0.5, 0.03, 0.01, M.steel, 0.01), 0, H / 2 - 0.1, 0.098);
    add(l1, 'casing', 'part.frame', rail, plate, ...antennas, power, volume, simTray, usbHole, ...holes, ...bosses);
    add(l1, 'casing', 'part.vapor', vapor);
    add(l1, 'camera', 'part.cameraFront', frontCam, frontLens, frontCamFlex);
    add(l1, 'speaker', 'part.speaker', earpiece, earMesh);

    // ===== Layer 2: main circuit board (top) and charging sub-board (bottom), joined by a flex cable =====
    const l2 = new THREE.Group();
    const rnd = seeded(23);
    const bx0 = -1.22, bx1 = 1.22, by0 = 0.72, by1 = 2.72;
    const boardShape = rrect(bx1 - bx0, by1 - by0, 0.1, 0, (by0 + by1) / 2);
    boardShape.holes.push(rrHole(0.56, 0.56, 0.1, CAM.uw, CAM.y), rrHole(0.72, 0.72, 0.12, CAM.main, CAM.y),
        rrHole(0.86, 0.5, 0.08, CAM.tele, CAM.y + 0.05),
        ...[[-1.12, 0.82], [1.12, 0.82], [-1.12, 2.62], [1.12, 2.62]].map(([x, y]) => circleHole(0.04, x, y)));
    const board = mesh(extrude(boardShape, 0.05), new THREE.MeshStandardMaterial({ map: fitTexture(pcbTexture(5), bx0, bx1, by0, by1), roughness: 0.45, metalness: 0.2 }));
    const top = 0.025;   // board front face
    const shieldMat = new THREE.MeshStandardMaterial({ map: shieldTexture(), metalness: 0.85, roughness: 0.3 });
    const chips = [   // [x, y, w, h] of the larger parts (also kept free of tiny components)
        [0.28, 1.27, 0.66, 0.66], [-0.78, 1.28, 0.72, 0.74], [0.95, 1.22, 0.42, 0.58], [-0.27, 0.97, 0.3, 0.3],
        [0.85, 0.83, 0.38, 0.13], [-0.25, 1.67, 0.42, 0.13], [1.12, 1.78, 0.1, 0.1], [-1.12, 1.62, 0.1, 0.1]
    ];
    const socBase = at(box(0.66, 0.66, 0.03, new THREE.MeshStandardMaterial({ color: 0x1d4d3b, roughness: 0.5 }), 0.01), 0.28, 1.27, top + 0.015);
    const soc = at(box(0.56, 0.56, 0.07, new THREE.MeshStandardMaterial({ map: chipTexture('PROCESSOR', 'silicon chip'), roughness: 0.3, metalness: 0.3 }), 0.012), 0.28, 1.27, top + 0.065);
    const shield = at(box(0.72, 0.74, 0.1, shieldMat, 0.015), -0.78, 1.28, top + 0.05);
    const storage = at(box(0.42, 0.58, 0.06, new THREE.MeshStandardMaterial({ map: chipTexture('MEMORY', 'storage'), roughness: 0.3, metalness: 0.3 }), 0.01), 0.95, 1.22, top + 0.03);
    const pmic = at(box(0.3, 0.3, 0.045, M.blackGloss, 0.008), -0.27, 0.97, top + 0.0225);
    const conn = ([x, y, w, h]) => [at(box(w, h, 0.055, M.black, 0.01), x, y, top + 0.0275), at(box(w - 0.04, h * 0.45, 0.012, M.gold, 0.004), x, y, top + 0.06)];
    const coax = ([x, y]) => [at(cyl(0.045, 0.05, M.gold, 20), x, y, top + 0.025), at(cyl(0.022, 0.06, M.steel, 16), x, y, top + 0.03)];
    const tants = [[-0.02, 0.86], [0.08, 0.86], [-0.55, 0.84]].map(([x, y]) => at(box(0.1, 0.06, 0.05, M.tantalum, 0.006), x, y, top + 0.025));
    const screwRings = [[-1.12, 0.82], [1.12, 0.82], [-1.12, 2.62], [1.12, 2.62]].map(([x, y]) => at(ring(0.04, 0.07, M.gold), x, y, top + 0.001));
    const mainSmd = smdField(scatter(rnd, -1.15, 1.15, 0.78, 1.82, 0.075, top, chips), rnd);
    const upperSmd = smdField(scatter(rnd, -1.15, 1.15, 2.47, 2.66, 0.07, top,
        [[CAM.uw, CAM.y, 0.6, 0.6], [CAM.main, CAM.y, 0.76, 0.76], [CAM.tele, CAM.y + 0.05, 0.9, 0.54], [-1.12, 2.62, 0.1, 0.1], [1.12, 2.62, 0.1, 0.1]]), rnd);

    // sub-board with USB-C port and microphone
    const sbShape = rrect(2.2, 0.55, 0.08, 0, -2.48);
    sbShape.holes.push(circleHole(0.04, -1.0, -2.48), circleHole(0.04, 1.0, -2.48));
    const subBoard = mesh(extrude(sbShape, 0.05), new THREE.MeshStandardMaterial({ map: fitTexture(pcbTexture(9), -1.1, 1.1, -2.755, -2.205), roughness: 0.45, metalness: 0.2 }));
    const usbShell = at(box(0.38, 0.2, 0.13, M.steel, 0.06), 0, -H / 2 + 0.16, top + 0.04);
    const usbMouth = at(box(0.3, 0.02, 0.07, M.blackGloss, 0.01), 0, -H / 2 + 0.055, top + 0.04);
    const mic = at(cyl(0.05, 0.05, M.steel, 20), 0.55, -2.45, top + 0.025);
    const subConn = conn([-0.55, -2.36, 0.36, 0.12]);
    const subSmd = smdField(scatter(rnd, -0.95, 0.95, -2.7, -2.27, 0.075, top,
        [[0, -2.6, 0.45, 0.3], [0.55, -2.45, 0.14, 0.14], [-0.55, -2.36, 0.4, 0.16], [-1.0, -2.48, 0.1, 0.1], [1.0, -2.48, 0.1, 0.1]]), rnd);
    const mainFlex = mesh(ribbon(curve(V(-0.95, -2.3, top + 0.005), V(-0.98, -1.6, top + 0.05), V(-0.98, 0.0, top + 0.05), V(-0.95, 0.6, top + 0.04), V(-0.9, 0.78, top + 0.01)), 0.18), M.flex);
    add(l2, 'pcb', 'part.pcb', board, socBase, soc, shield, storage, pmic, ...tants, ...screwRings, ...mainSmd, ...upperSmd,
        ...conn(chips[4]), ...conn(chips[5]), ...coax(chips[6]), ...coax(chips[7]),
        subBoard, mic, ...subConn, ...subSmd, mainFlex);
    add(l2, 'battery', 'part.usb', usbShell, usbMouth);

    // ===== Layer 3: camera modules, loudspeaker and vibration motor =====
    const l3 = new THREE.Group();
    function cameraModule(x, y, size, barrelR) {
        const g = new THREE.Group();
        g.add(at(box(size, size, 0.24, M.darkAlu, 0.03), x, y, 0));                 // housing
        g.add(at(box(size * 0.82, size * 0.82, 0.01, M.steel, 0.02), x, y, 0.123));  // cover plate (front)
        g.add(at(cyl(barrelR, 0.16, M.black, 40), x, y, -0.2));                     // lens barrel (towards the back)
        g.add(at(ring(barrelR * 0.55, barrelR, M.steel, true), x, y, -0.281));
        g.add(at(disc(barrelR * 0.58, M.lensGlass, true), x, y, -0.279));
        g.add(at(mesh(new THREE.TorusGeometry(barrelR + 0.03, 0.025, 12, 40), M.copper), x, y, -0.13));   // stabiliser coil
        g.add(mesh(ribbon(curve(V(x + size / 2 - 0.05, y - size / 2 + 0.08, 0.13), V(x + size / 2 + 0.08, y - size / 2 - 0.05, 0.14), V(x + size / 2 + 0.1, y - size / 2 - 0.3, 0.13)), 0.14), M.flex));
        return g;
    }
    const uw = cameraModule(CAM.uw, CAM.y, 0.5, 0.15);
    const main = cameraModule(CAM.main, CAM.y, 0.66, 0.21);
    const tele = new THREE.Group();
    tele.add(at(box(0.84, 0.46, 0.24, M.steel, 0.03), CAM.tele, CAM.y + 0.05, 0));
    tele.add(at(box(0.3, 0.3, 0.06, M.lensGlass, 0.04), CAM.tele, CAM.y + 0.05, -0.14));
    tele.add(at(box(0.18, 0.4, 0.02, M.black, 0.01), CAM.tele - 0.25, CAM.y + 0.05, 0.125));
    const speakerBox = at(box(0.96, 0.52, 0.22, M.black, 0.05), 0.6, -2.42, 0);
    const grille = at(mesh(new THREE.PlaneGeometry(0.8, 0.36), new THREE.MeshStandardMaterial({ map: grilleTexture(), roughness: 0.6 })), 0.6, -2.42, 0.111);
    const spkPads = [0.25, 0.37].map(x => at(box(0.07, 0.07, 0.01, M.gold, 0.005), x, -2.24, 0.112));
    const motor = at(box(0.92, 0.44, 0.2, M.steel, 0.05), -0.6, -2.42, 0);
    const motorBand = at(box(0.3, 0.45, 0.205, M.copper, 0.02), -0.6, -2.42, 0);
    const motorFlex = mesh(ribbon(curve(V(-0.15, -2.42, 0.08), V(-0.02, -2.38, 0.1), V(0.05, -2.25, 0.1)), 0.12, V(0, 1, 0)), M.flex);
    add(l3, 'camera', 'part.cameraRear', uw, main, tele);
    add(l3, 'speaker', 'part.speaker', speakerBox, grille, ...spkPads);
    add(l3, 'speaker', 'part.vibration', motor, motorBand, motorFlex);

    // ===== Layer 4: battery with protection board, flex and pull tabs =====
    const l4 = new THREE.Group();
    const BW = 2.3, BH = 2.55, BY = -0.7;
    const pouch = at(mesh(new RoundedBoxGeometry(BW, BH, 0.22, 5, 0.07), new THREE.MeshStandardMaterial({ color: 0xaab1ba, metalness: 0.7, roughness: 0.32 })), 0, BY, 0);
    const label = at(mesh(new THREE.PlaneGeometry(BW - 0.14, BH - 0.14), new THREE.MeshStandardMaterial({ map: batteryTexture(), roughness: 0.4, metalness: 0.1 })), 0, BY, 0.111);
    const pcm = at(box(1.7, 0.16, 0.08, new THREE.MeshStandardMaterial({ color: 0x1d4d3b, roughness: 0.5 }), 0.02), 0, BY + BH / 2 + 0.1, 0);
    const kapton = at(box(1.76, 0.2, 0.1, new THREE.MeshStandardMaterial({ color: 0xd99a2b, roughness: 0.25, metalness: 0.1, transparent: true, opacity: 0.55 }), 0.03), 0, BY + BH / 2 + 0.1, 0);
    const battFlex = mesh(ribbon(curve(V(0.62, BY + BH / 2 + 0.16, 0.03), V(0.75, BY + BH / 2 + 0.3, 0.09), V(0.85, 0.83, 0.12)), 0.2), M.flex);
    const battConn = at(box(0.34, 0.12, 0.05, M.black, 0.01), 0.85, 0.83, 0.13);
    const tabs = [-0.55, 0.55].map(x => at(box(0.3, 0.22, 0.012, new THREE.MeshStandardMaterial({ color: 0x1f8f5b, roughness: 0.6 }), 0.004), x, BY - BH / 2 - 0.05, 0.1));
    add(l4, 'battery', 'part.battery', pouch, label, pcm, kapton, battFlex, battConn, ...tabs);

    // ===== Layer 5: wireless charging coil and NFC antenna on a ferrite sheet =====
    const l5 = new THREE.Group();
    const ferrite = at(mesh(extrude(rrect(2.2, 2.5, 0.12), 0.03), new THREE.MeshStandardMaterial({ color: 0x24272c, metalness: 0.4, roughness: 0.6 })), 0, -0.6, 0);
    const coil = new THREE.Group();
    for (let r = 0.2; r <= 0.82; r += 0.04) coil.add(at(mesh(new THREE.TorusGeometry(r, 0.014, 6, 72), M.copper), 0, -0.6, 0.03));
    const nfc = [0, 1, 2].map(k => {
        const s = rrect(2.0 - k * 0.09, 2.3 - k * 0.09, 0.14 - k * 0.04, 0, -0.6);
        s.holes.push(rrHole(1.95 - k * 0.09, 2.25 - k * 0.09, 0.12 - k * 0.04, 0, -0.6));
        return at(mesh(extrude(s, 0.01), M.copper), 0, 0, 0.02);
    });
    const leads = [-0.05, 0.05].map(x => at(box(0.04, 0.55, 0.012, M.copper, 0.004), x, 0.03, 0.025));
    const coilConn = at(box(0.3, 0.12, 0.04, M.gold, 0.01), 0, 0.37, 0.035);
    add(l5, 'battery', 'part.coil', ferrite, coil, ...nfc, ...leads, coilConn);

    // ===== Layer 6: back cover (glass) with the camera bar =====
    const l6 = new THREE.Group();
    const backGlass = mesh(extrude(rrect(W, H, R), 0.06, 0.012), new THREE.MeshPhysicalMaterial({
        color: 0x5d7389, metalness: 0.1, roughness: 0.42, clearcoat: 0.6, clearcoatRoughness: 0.3
    }));
    const graphite = at(mesh(new THREE.ShapeGeometry(rrect(2.25, 3.6, 0.15), 8), new THREE.MeshStandardMaterial({ color: 0x2b2f35, metalness: 0.55, roughness: 0.5 })), 0, -0.55, 0.048);
    const bar = at(mesh(extrude(rrect(2.58, 0.86, 0.43), 0.11, 0.015), M.alu), 0, CAM.y, -0.115);
    const inset = at(mesh(extrude(rrect(2.12, 0.62, 0.31), 0.02), M.blackGloss), -0.13, CAM.y, -0.188);
    const lens = (x, r) => [at(ring(r, r + 0.045, M.steel, true), x, CAM.y, -0.2), at(disc(r, M.lensGlass, true), x, CAM.y, -0.199),
        at(ring(r * 0.35, r * 0.5, new THREE.MeshStandardMaterial({ color: 0x2a3550, metalness: 0.6, roughness: 0.2, side: THREE.DoubleSide }), true), x, CAM.y, -0.2005)];
    const teleWin = [at(box(0.34, 0.34, 0.012, M.lensGlass, 0.05), CAM.tele, CAM.y, -0.202), at(box(0.4, 0.4, 0.008, M.steel, 0.07), CAM.tele, CAM.y, -0.198)];
    const flash = at(disc(0.07, new THREE.MeshStandardMaterial({ color: 0xfff3c4, emissive: 0xfff0a0, emissiveIntensity: 0.35, side: THREE.DoubleSide }), true), 1.07, CAM.y + 0.15, -0.2);
    const sensor = at(disc(0.05, M.blackGloss, true), 1.07, CAM.y - 0.15, -0.2);
    add(l6, 'casing', 'part.rearGlass', backGlass, graphite);
    add(l6, 'camera', 'part.cameraRear', bar, inset, ...lens(CAM.uw, 0.15), ...lens(CAM.main, 0.2), ...teleWin, sensor);
    add(l6, 'camera', 'part.flash', flash);

    // Assembled: layers stacked inside the frame. Exploded: the layers fan out along the
    // phone's depth (display in front, back cover behind), each one a little higher.
    const ASSEMBLED = [V(0, 0, 0.175), V(0, 0, 0), V(0, 0, -0.01), V(0, 0, -0.03), V(0, 0, -0.03), V(0, 0, -0.1), V(0, 0, -0.185)];
    const EXPLODED = [0, 1, 2, 3, 4, 5, 6].map(i => V(0, 0.24 * (i - 3), -2.45 * (i - 3)));
    const NAMES = ['layer.display', 'layer.frame', 'layer.board', 'layer.cameras', 'layer.battery', 'layer.charging', 'layer.back'];
    const layers = [l0, l1, l2, l3, l4, l5, l6].map((m, i) => ({ mesh: m, assembled: ASSEMBLED[i], exploded: EXPLODED[i], name: NAMES[i] }));

    // Each mesh gets its own material copy so it can glow on its own
    const group = new THREE.Group();
    layers.forEach(l => {
        l.mesh.traverse(o => {
            if (o.isMesh) {
                o.material = o.material.clone();
                o.userData.baseEmissive = o.material.emissive ? o.material.emissive.clone() : null;
                o.userData.baseIntensity = o.material.emissiveIntensity;
                o.castShadow = !o.material.transparent;
                o.receiveShadow = true;
            }
        });
        group.add(l.mesh);
    });
    return { group, layers };
}

// ---------------------------------------------------------------------------
// Viewer
// ---------------------------------------------------------------------------
function create(container, opts) {
    const options = Object.assign({ label: k => k, onSelect: () => {}, onExplode: () => {}, reducedMotion: false }, opts);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });   // throws if WebGL is unavailable
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;   // small parts cast soft shadows on the boards
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.className = 'phone3d-canvas';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const sun = new THREE.DirectionalLight(0xffffff, 1.7);
    sun.position.set(4, 12, 9);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { near: 0.5, far: 40, left: -9, right: 9, top: 9, bottom: -9 });
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xdbeafe, 0.6);
    fill.position.set(-8, -2, 7);
    scene.add(fill);
    const backLight = new THREE.DirectionalLight(0xffffff, 1.3);   // lights the back for the back view
    backLight.position.set(-4, 6, -14);
    scene.add(backLight);

    const { group, layers } = buildPhone();
    const YAW = -0.62;
    group.rotation.set(-0.1, YAW, 0.0);
    scene.add(group);

    // Soft shadow on the "floor", stretching as the phone comes apart
    const floor = new THREE.Group();
    floor.rotation.y = YAW;
    floor.position.y = -4.15;
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2;
    floor.add(shadow);
    scene.add(floor);

    // Dashed guide lines through the corners of all layers (classic exploded-view drawing)
    const guideGeo = new THREE.BufferGeometry();
    guideGeo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(4 * 2 * 3), 3));
    const guides = new THREE.LineSegments(guideGeo, new THREE.LineDashedMaterial({ color: 0x64748b, dashSize: 0.12, gapSize: 0.09, transparent: true, opacity: 0 }));
    group.add(guides);
    const CORNERS = [[-1, 1], [1, 1], [-1, -1], [1, -1]].map(([sx, sy]) => V(sx * (W / 2 - 0.2), sy * (H / 2 - 0.2), 0));

    // Name tags for the layers when the phone is apart
    const tagBox = document.createElement('div');
    tagBox.className = 'phone3d-tags';
    tagBox.setAttribute('aria-hidden', 'true');
    container.appendChild(tagBox);
    const tags = layers.map(l => {
        const t = document.createElement('span');
        t.className = 'phone3d-tag';
        t.textContent = options.label(l.name);
        tagBox.appendChild(t);
        return t;
    });

    // A narrow lens (small field of view) from further away keeps the layers evenly spaced
    const FOV = 22;
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);
    const HOME = { pos: V(-0.3, 2.0, 36.5), target: V(-0.3, -0.15, 0) };
    const DIAGONAL = { pos: V(15.6, 16.8, 39.5), target: V(-0.2, -0.4, 0) };
    const BACK = { pos: V(14.5, 5.4, -24.5), target: V(0.4, 0.0, 0) };
    camera.position.copy(HOME.pos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(HOME.target);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false;      // keep the mouse wheel for scrolling the page
    controls.enablePan = false;
    controls.minPolarAngle = 0.55;    // no turning the phone upside down (turning all the way round is fine)
    controls.maxPolarAngle = 2.2;
    renderer.domElement.style.touchAction = 'pan-y';   // vertical swipes scroll the page, sideways swipes turn the phone

    // ---- size & framing ----
    let width = 1, height = 1;
    function resize() {
        width = Math.max(container.clientWidth, 1);
        height = Math.max(container.clientHeight, 1);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        // keep the whole exploded phone in view on narrow screens
        camera.fov = camera.aspect < 0.75 ? FOV * (0.75 / camera.aspect) ** 0.6 : FOV;
        camera.updateProjectionMatrix();
        tagBox.classList.toggle('small', width < 420);
    }
    new ResizeObserver(resize).observe(container);
    resize();

    // ---- explode animation ----
    let factor = 0, target = 0, animating = false;
    const ease = t => t * t * (3 - 2 * t);
    function applyExplode() {
        const e = ease(factor);
        layers.forEach(l => l.mesh.position.lerpVectors(l.assembled, l.exploded, e));
        // guide lines from the front layer's corners to the back layer's corners
        const a = layers[0].mesh.position, b = layers[layers.length - 1].mesh.position;
        const arr = guideGeo.attributes.position.array;
        CORNERS.forEach((c, i) => {
            arr.set([c.x + a.x, c.y + a.y, a.z], i * 6);
            arr.set([c.x + b.x, c.y + b.y, b.z], i * 6 + 3);
        });
        guideGeo.attributes.position.needsUpdate = true;
        guideGeo.computeBoundingSphere();
        guides.computeLineDistances();
        guides.material.opacity = 0.55 * Math.max(0, (e - 0.15) / 0.85);
        guides.visible = e > 0.15;
        shadow.scale.set(3.3 + e * 0.6, 1.6 + e * 15.5, 1);
        camera.zoom = 1 + (1 - e) * 0.75;      // come closer while the phone is in one piece
        camera.updateProjectionMatrix();
        options.onExplode(factor);
    }
    function setExplode(t, animate) {
        target = Math.min(Math.max(t, 0), 1);
        if (animate && !options.reducedMotion) { animating = true; }
        else { factor = target; animating = false; applyExplode(); }
    }

    // ---- highlighting ----
    let selected = null, hovered = null, clock = 0;
    const meshes = [];
    group.traverse(o => { if (o.isMesh) meshes.push(o); });
    function paint() {
        const pulse = 0.35 + 0.2 * Math.sin(clock * 4);
        meshes.forEach(m => {
            if (!m.material.emissive) return;
            if (m.userData.part === selected) { m.material.emissive.setHex(0xe74c3c); m.material.emissiveIntensity = pulse; }
            else if (m.userData.part === hovered) { m.material.emissive.setHex(0xffc400); m.material.emissiveIntensity = 0.35; }
            else { m.material.emissive.copy(m.userData.baseEmissive); m.material.emissiveIntensity = m.userData.baseIntensity; }
        });
    }

    // ---- layer name tags follow their layers on screen ----
    const tmp = V(0, 0, 0);
    const toCam = V(0, 0, 0), front = V(0, 0, 0);
    function placeTags() {
        // only when apart, and only when looking at the front (from behind the layers line up and tags would pile up)
        front.set(0, 0, 1).applyQuaternion(group.quaternion);
        toCam.copy(camera.position).sub(controls.target).normalize();
        const facing = Math.min(1, Math.max(0, (front.dot(toCam) - 0.1) / 0.3));
        const show = Math.max(0, (ease(factor) - 0.55) / 0.45) * facing;
        tags.forEach((t, i) => {
            const l = layers[i];
            const below = i % 2 === 1;                 // alternate above / below so neighbours don't overlap
            tmp.set(0, below ? -H / 2 - 0.35 : H / 2 + 0.3, 0);
            l.mesh.localToWorld(tmp);
            t.classList.toggle('below', below);
            tmp.project(camera);
            t.style.opacity = tmp.z > 1 ? 0 : show;
            t.style.left = ((tmp.x + 1) / 2 * width) + 'px';
            t.style.top = ((1 - tmp.y) / 2 * height) + 'px';
        });
    }

    // ---- pointer: hover label + click to select ----
    const label = document.createElement('div');
    label.className = 'phone3d-label';
    label.setAttribute('aria-hidden', 'true');
    container.appendChild(label);
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    function hit(clientX, clientY) {
        const r = renderer.domElement.getBoundingClientRect();
        ndc.set(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        const h = ray.intersectObjects(meshes, false)[0];
        return h ? h.object : null;
    }
    let down = null;
    renderer.domElement.addEventListener('pointerdown', ev => { down = [ev.clientX, ev.clientY]; });
    renderer.domElement.addEventListener('pointerup', ev => {
        if (!down || Math.hypot(ev.clientX - down[0], ev.clientY - down[1]) > 6) { down = null; return; }
        down = null;
        const m = hit(ev.clientX, ev.clientY);
        if (m) { selected = m.userData.part; options.onSelect(m.userData.part, m.userData.label); }
    });
    renderer.domElement.addEventListener('pointermove', ev => {
        if (ev.pointerType !== 'mouse') return;
        const m = hit(ev.clientX, ev.clientY);
        hovered = m ? m.userData.part : null;
        renderer.domElement.style.cursor = m ? 'pointer' : 'grab';
        if (m) {
            const r = container.getBoundingClientRect();
            label.textContent = options.label(m.userData.label);
            label.style.left = Math.min(Math.max(ev.clientX - r.left, 70), r.width - 70) + 'px';
            label.style.top = (ev.clientY - r.top - 14) + 'px';
            label.classList.add('visible');
        } else label.classList.remove('visible');
    });
    renderer.domElement.addEventListener('pointerleave', () => { hovered = null; label.classList.remove('visible'); });

    // ---- camera moves ----
    let fly = null;
    function flyTo(view) {
        if (options.reducedMotion) { camera.position.copy(view.pos); controls.target.copy(view.target); return; }
        fly = { from: camera.position.clone(), fromT: controls.target.clone(), to: view, t: 0 };
    }

    // ---- render loop (paused while off-screen or covered by a pop-up) ----
    let visible = true, paused = false;
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(container);
    let last = performance.now();
    function frame(now) {
        requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.1); last = now;
        if (!visible || paused || document.hidden) return;
        clock += dt;
        if (animating) {
            const d = target - factor;
            if (Math.abs(d) < 0.003) { factor = target; animating = false; } else factor += d * Math.min(dt * 5, 1);
            applyExplode();
        }
        if (fly) {
            fly.t = Math.min(fly.t + dt * 1.6, 1);
            const e = ease(fly.t);
            camera.position.lerpVectors(fly.from, fly.to.pos, e);
            controls.target.lerpVectors(fly.fromT, fly.to.target, e);
            if (fly.t >= 1) fly = null;
        }
        paint();
        controls.update();
        renderer.render(scene, camera);
        placeTags();
    }
    applyExplode();
    requestAnimationFrame(frame);

    return {
        select(part) { selected = part; },
        setPaused(on) { paused = !!on; },
        setExplode,
        toggle() { setExplode(target < 0.5 ? 1 : 0, true); return target; },
        isExploded: () => target >= 0.5,
        diagonalView() { setExplode(1, true); flyTo(DIAGONAL); },
        backView() { flyTo(BACK); },
        resetView() { flyTo(HOME); },
        // which part is under a screen point (used by the automatic tests)
        partAt(clientX, clientY) { const m = hit(clientX, clientY); return m ? m.userData.part : null; }
    };
}

window.Phone3D = { create };
