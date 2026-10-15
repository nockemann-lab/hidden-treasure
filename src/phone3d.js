/*
 * Interactive 3D smartphone (assembled / exploded) for "Hidden Treasure in Your Pocket".
 * A generic modern smartphone, based on a detailed model generated with Google Gemini
 * (brand names and logos removed); built with three.js (MIT licence).
 *
 * This is the SOURCE file. The website loads the bundled version, phone3d.min.js.
 * After editing, rebuild with:   npm install   then   npm run build:3d
 *
 * Usage (see index.html):
 *   const viewer = Phone3D.create(containerElement, {
 *       label: key => text,            // part names, e.g. label('part.pcb')
 *       onSelect: part => {},          // a part was clicked: 'screen', 'camera', 'pcb', 'speaker', 'battery', 'casing'
 *       onExplode: t => {},            // explode factor changed (0 = assembled, 1 = exploded)
 *       reducedMotion: false
 *   });
 *   viewer.select('pcb'); viewer.toggle(); viewer.setExplode(0.5);
 *   viewer.diagonalView(); viewer.backView(); viewer.resetView();
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const W = 2.75;   // phone width
const H = 5.85;   // phone height
const R = 0.42;   // corner radius

// ---------------------------------------------------------------------------
// Textures drawn on a canvas (no image files needed)
// ---------------------------------------------------------------------------
function canvasTexture(w, h, draw) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    draw(c.getContext('2d'));
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
}
const FONT = (weight, size) => `${weight} ${size}px -apple-system, "Segoe UI", Arial, sans-serif`;

// Fixed pseudo-random numbers, so the circuit board looks the same every time
function seeded(seed) {
    return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

function displayTexture() {
    return canvasTexture(1024, 2200, ctx => {
        const bg = ctx.createRadialGradient(512, 1100, 80, 512, 1100, 1100);
        bg.addColorStop(0, '#1e293b'); bg.addColorStop(0.45, '#0f172a'); bg.addColorStop(1, '#05070b');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, 1024, 2200);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.14)'; ctx.lineWidth = 4;
        for (let r = 160; r <= 480; r += 80) { ctx.beginPath(); ctx.arc(512, 1050, r, 0, Math.PI * 2); ctx.stroke(); }
        ctx.fillStyle = 'rgba(248, 250, 252, 0.28)'; ctx.textAlign = 'center';
        ctx.font = FONT(300, 150); ctx.fillText('09:30', 512, 540);
        ctx.font = FONT(500, 38); ctx.fillText('Hidden Treasure in Your Pocket', 512, 615);
    });
}

function chipTexture() {
    return canvasTexture(512, 512, ctx => {
        ctx.fillStyle = '#181c20'; ctx.fillRect(0, 0, 512, 512);
        ctx.strokeStyle = '#334155'; ctx.lineWidth = 10; ctx.strokeRect(12, 12, 488, 488);
        ctx.fillStyle = '#cbd5e1'; ctx.font = FONT('bold', 64); ctx.fillText('Si', 60, 130);
        ctx.fillStyle = '#94a3b8'; ctx.font = FONT('bold', 46); ctx.fillText('PROCESSOR', 60, 230);
        ctx.font = FONT(500, 32); ctx.fillText('silicon chip', 60, 290);
        ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(65, 440, 16, 0, Math.PI * 2); ctx.fill();
    });
}

function pcbTexture() {
    const rnd = seeded(11);
    return canvasTexture(1024, 1536, ctx => {
        ctx.fillStyle = '#0e5a44'; ctx.fillRect(0, 0, 1024, 1536);
        ctx.strokeStyle = '#2f8a6a'; ctx.lineWidth = 3;
        for (let i = 0; i < 140; i++) {
            const x = rnd() * 1024, y = rnd() * 1536;
            ctx.beginPath(); ctx.moveTo(x, y);
            ctx.lineTo(x + (rnd() - 0.5) * 200, y);
            ctx.lineTo(x + (rnd() - 0.5) * 200, y + (rnd() - 0.5) * 240);
            ctx.stroke();
        }
        ctx.fillStyle = '#eab308';
        for (let i = 0; i < 380; i++) { ctx.beginPath(); ctx.arc(30 + rnd() * 964, 30 + rnd() * 1476, 4.5, 0, Math.PI * 2); ctx.fill(); }
    });
}

// Battery label: accurate chemistry and the real "do not bin" symbol (no brand names or invented data)
function batteryTexture() {
    return canvasTexture(1024, 1600, ctx => {
        const g = ctx.createLinearGradient(0, 0, 1024, 1600);
        g.addColorStop(0, '#272a30'); g.addColorStop(0.5, '#32363e'); g.addColorStop(1, '#23262b');
        ctx.fillStyle = g; ctx.fillRect(0, 0, 1024, 1600);
        ctx.fillStyle = '#10b981';                                     // easy-pull adhesive tabs
        ctx.fillRect(18, 180, 28, 1200); ctx.fillRect(978, 180, 28, 1200);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = FONT('bold', 50); ctx.fillText('Lithium-ion Polymer Battery', 95, 165);
        ctx.font = FONT(600, 38); ctx.fillText('3.89 V   5000 mAh   19.5 Wh', 95, 235);

        ctx.fillStyle = 'rgba(56, 189, 248, 0.12)'; ctx.fillRect(95, 290, 834, 330);
        ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 4; ctx.strokeRect(95, 290, 834, 330);
        ctx.fillStyle = '#38bdf8'; ctx.font = FONT('bold', 40); ctx.fillText('WHAT IS INSIDE?', 125, 350);
        ctx.fillStyle = '#f1f5f9'; ctx.font = FONT(500, 36);
        ctx.fillText('+  Lithium cobalt oxide (Li, Co)', 125, 415);
        ctx.fillText('−  Graphite (C)', 125, 470);
        ctx.fillText('Foils: copper (Cu), aluminium (Al)', 125, 525);
        ctx.fillText('Electrolyte: lithium salt', 125, 580);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = FONT('bold', 42); ctx.fillText('Do not put in the bin!', 95, 720);
        ctx.font = FONT(500, 34);
        ctx.fillText('Damaged batteries can start fires.', 95, 775);
        ctx.fillText('Recycle at an e-waste collection point.', 95, 822);

        // Crossed-out wheelie bin (the real WEEE symbol)
        ctx.strokeStyle = '#e2e8f0'; ctx.fillStyle = '#e2e8f0'; ctx.lineWidth = 10;
        const bx = 160, by = 960;
        ctx.fillRect(bx - 20, by - 12, 170, 14);
        ctx.strokeRect(bx, by + 10, 130, 170);
        ctx.beginPath(); ctx.arc(bx + 20, by + 195, 16, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.moveTo(bx - 40, by - 40); ctx.lineTo(bx + 170, by + 230);
        ctx.moveTo(bx + 170, by - 40); ctx.lineTo(bx - 40, by + 230); ctx.stroke();
        ctx.fillRect(bx - 40, by + 250, 210, 18);

        // Recycling arrows
        ctx.save(); ctx.translate(560, 1080); ctx.lineWidth = 14;
        for (let k = 0; k < 3; k++) {
            ctx.rotate((2 * Math.PI) / 3);
            ctx.beginPath(); ctx.moveTo(-60, 70); ctx.lineTo(60, 70); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(60, 70); ctx.lineTo(35, 45); ctx.lineTo(35, 95); ctx.closePath(); ctx.fill();
        }
        ctx.restore();
        ctx.font = FONT('bold', 46); ctx.fillText('Li-ion', 760, 1095);
        ctx.font = FONT(500, 30); ctx.fillStyle = '#94a3b8';
        ctx.fillText('Illustration for "Hidden Treasure in Your Pocket"', 95, 1470);
    });
}

function coilTexture() {
    return canvasTexture(1024, 1024, ctx => {
        ctx.fillStyle = '#181a1f'; ctx.fillRect(0, 0, 1024, 1024);
        for (let r = 130; r < 430; r += 7.5) {
            ctx.beginPath(); ctx.arc(512, 512, r, 0, Math.PI * 2);
            ctx.strokeStyle = Math.round(r / 7.5) % 2 ? '#d97706' : '#b45309';
            ctx.lineWidth = 5.5; ctx.stroke();
        }
        ctx.strokeStyle = '#64748b'; ctx.lineWidth = 22; ctx.setLineDash([45, 14]);
        ctx.beginPath(); ctx.arc(512, 512, 465, 0, Math.PI * 2); ctx.stroke();
    });
}

// ---------------------------------------------------------------------------
// The model: seven layers, front to back. Every mesh is tagged with the app's
// part id (which card opens) and the key of its hover name.
// ---------------------------------------------------------------------------
function buildPhone() {
    const M = {
        alu: new THREE.MeshStandardMaterial({ color: 0xbec5ce, metalness: 0.88, roughness: 0.24 }),
        darkAlu: new THREE.MeshStandardMaterial({ color: 0x262b33, metalness: 0.78, roughness: 0.32 }),
        copper: new THREE.MeshStandardMaterial({ color: 0xc86d3b, metalness: 0.88, roughness: 0.25 }),
        gold: new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.94, roughness: 0.18 }),
        steel: new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.92, roughness: 0.2 }),
        silicon: new THREE.MeshStandardMaterial({ color: 0x181b20, metalness: 0.35, roughness: 0.2 }),
        lens: new THREE.MeshPhysicalMaterial({ color: 0x091326, metalness: 0.1, roughness: 0.05, clearcoat: 1 }),
        backGlass: new THREE.MeshPhysicalMaterial({ color: 0x3b424c, metalness: 0.15, roughness: 0.22, clearcoat: 0.85, clearcoatRoughness: 0.12 })
    };
    const rbox = (w, h, d, r, mat, seg = 3) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, seg, r), mat);
    const at = (mesh, x, y, z) => { mesh.position.set(x, y, z); return mesh; };
    const facing = mesh => { mesh.rotation.x = Math.PI / 2; return mesh; };      // cylinders face the viewer
    const tag = (obj, part, label) => {
        obj.traverse(o => { if (o.isMesh) { o.userData.part = part; o.userData.label = label; } });
        return obj;
    };
    const add = (layer, part, label, ...meshes) => meshes.forEach(m => layer.add(tag(m, part, label)));

    // Layer 0: OLED display with cover glass, front camera hole and display flex cable
    const l0 = new THREE.Group();
    add(l0, 'screen', 'part.screen',
        rbox(W, H, 0.06, R, new THREE.MeshStandardMaterial({ color: 0x111317, roughness: 0.2, metalness: 0.3 }), 6),
        at(new THREE.Mesh(new THREE.PlaneGeometry(W - 0.14, H - 0.16),
            new THREE.MeshPhysicalMaterial({ map: displayTexture(), roughness: 0.06, metalness: 0.08, clearcoat: 1 })), 0, 0, 0.032));
    const backing = at(new THREE.Mesh(new THREE.PlaneGeometry(W - 0.25, H - 0.55), M.copper), 0, 0, -0.032);
    backing.rotation.y = Math.PI;
    add(l0, 'screen', 'part.screen', backing, at(rbox(0.95, 0.55, 0.04, 0.03, M.copper, 2), 0.15, -H / 2 + 0.55, -0.04));
    add(l0, 'camera', 'part.cameraFront', at(new THREE.Mesh(new THREE.CircleGeometry(0.085, 24), M.lens), 0, H / 2 - 0.28, 0.034));

    // Layer 1: aluminium mid-frame with buttons, antenna gaps and copper vapour chamber
    const l1 = new THREE.Group();
    const antenna = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.6 });
    add(l1, 'casing', 'part.frame',
        rbox(W + 0.04, H + 0.04, 0.16, R, M.alu, 6),
        rbox(W - 0.18, H - 0.22, 0.17, R - 0.08, M.darkAlu, 4),
        at(rbox(0.06, 0.42, 0.07, 0.02, M.alu, 2), W / 2 + 0.03, 0.95, 0),
        at(rbox(0.06, 0.85, 0.07, 0.02, M.alu, 2), W / 2 + 0.03, 0.1, 0),
        ...[[-1, 1.9], [1, 1.9], [-1, -1.9], [1, -1.9]].map(([s, y]) => at(new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.17), antenna), s * (W / 2 + 0.01), y, 0)));
    add(l1, 'casing', 'part.vapor', at(rbox(1.75, 2.85, 0.18, 0.08, M.copper), -0.2, -0.25, 0));

    // Layer 2: logic board with processor, memory, shield cans, connectors and capacitors
    const l2 = new THREE.Group();
    const pcbMat = new THREE.MeshStandardMaterial({ map: pcbTexture(), roughness: 0.35, metalness: 0.35 });
    const tantalum = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.5 });
    add(l2, 'pcb', 'part.pcb',
        at(rbox(W - 0.35, 1.85, 0.08, 0.06, pcbMat, 2), 0, 1.55, 0),
        at(rbox(0.88, 2.85, 0.08, 0.04, pcbMat, 2), W / 2 - 0.62, -0.45, 0),
        at(rbox(0.68, 0.68, 0.12, 0.03, new THREE.MeshStandardMaterial({ map: chipTexture(), roughness: 0.25, metalness: 0.3 }), 2), 0.62, 0.35, 0.05),
        at(rbox(0.54, 0.62, 0.11, 0.02, M.silicon, 2), 0.62, -0.42, 0.045),
        at(rbox(0.75, 0.92, 0.12, 0.03, M.steel, 2), 0.62, -1.32, 0.05),
        at(rbox(0.95, 0.65, 0.12, 0.03, M.steel, 2), -0.55, 1.05, 0.05),
        ...Array.from({ length: 6 }, (_, i) => at(new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.11, 0.11), M.gold), 0.25 + (i % 2) * 0.45, 0.9 - Math.floor(i / 2) * 0.85, 0.05)),
        ...Array.from({ length: 36 }, (_, i) => at(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.05, 0.09), i % 3 === 0 ? tantalum : M.gold), 0.32 + (i % 4) * 0.19, 1.3 - Math.floor(i / 4) * 0.34, 0.045)));

    // Layer 3: triple rear camera (ultra-wide, main with stabiliser coil, periscope zoom) and vibration motor
    const l3 = new THREE.Group();
    add(l3, 'camera', 'part.cameraRear',
        at(rbox(2.22, 0.82, 0.22, 0.12, M.darkAlu), 0, 1.68, 0),
        facing(at(new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.28, 28), M.lens), -0.72, 1.68, -0.04)),
        facing(at(new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.26, 32), M.copper), -0.08, 1.68, -0.02)),
        facing(at(new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.32, 32), M.lens), -0.08, 1.68, -0.04)),
        at(rbox(0.62, 0.48, 0.28, 0.04, M.steel, 2), 0.64, 1.68, -0.02),
        at(rbox(0.34, 0.34, 0.31, 0.04, M.lens, 2), 0.64, 1.68, -0.04));
    add(l3, 'speaker', 'part.vibration',
        at(rbox(0.95, 0.48, 0.18, 0.05, M.steel, 2), -0.52, -2.18, 0),
        at(new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.49, 0.19), M.copper), -0.52, -2.18, 0));

    // Layer 4: battery with pull tabs, protection board and flex cable
    const l4 = new THREE.Group();
    const BW = 1.56, BH = 3.18, BD = 0.22;
    const labelMat = new THREE.MeshStandardMaterial({ map: batteryTexture(), roughness: 0.28, metalness: 0.22 });
    const front = at(new THREE.Mesh(new THREE.PlaneGeometry(BW - 0.06, BH - 0.08), labelMat), -0.36, -0.32, BD / 2 + 0.002);
    const back = at(new THREE.Mesh(new THREE.PlaneGeometry(BW - 0.06, BH - 0.08), labelMat), -0.36, -0.32, -BD / 2 - 0.002);
    back.rotation.y = Math.PI;
    add(l4, 'battery', 'part.battery',
        at(rbox(BW, BH, BD, 0.08, new THREE.MeshStandardMaterial({ color: 0x24282f, roughness: 0.35, metalness: 0.5 }), 4), -0.36, -0.32, 0),
        front, back,
        at(new THREE.Mesh(new THREE.BoxGeometry(BW - 0.1, 0.18, BD + 0.02),
            new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.2, metalness: 0.1, transparent: true, opacity: 0.85 })), -0.36, BH / 2 - 0.22, 0),
        at(new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.22, 0.04), M.copper), 0.18, BH / 2 - 0.12, 0.03));

    // Layer 5: wireless charging coil on a ferrite/graphite sheet, USB-C port and loudspeaker
    const l5 = new THREE.Group();
    const coil = at(new THREE.Mesh(new THREE.CircleGeometry(0.88, 48),
        new THREE.MeshStandardMaterial({ map: coilTexture(), roughness: 0.25, metalness: 0.75, side: THREE.DoubleSide })), -0.1, -0.3, 0.026);
    add(l5, 'battery', 'part.coil',
        at(rbox(1.92, 2.35, 0.04, 0.14, new THREE.MeshStandardMaterial({ color: 0x1c2026, roughness: 0.45, metalness: 0.55 })), -0.1, -0.3, 0),
        coil);
    add(l5, 'battery', 'part.usb', at(rbox(0.42, 0.32, 0.14, 0.05, M.steel, 2), 0, -H / 2 + 0.22, 0));
    add(l5, 'speaker', 'part.speaker', at(rbox(0.85, 0.52, 0.16, 0.05, M.darkAlu, 2), 0.65, -2.22, 0));

    // Layer 6: rear glass with the camera bar (lens window, three lenses, flash, sensor)
    const l6 = new THREE.Group();
    add(l6, 'casing', 'part.rearGlass', rbox(W, H, 0.08, R, M.backGlass, 6));
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, roughness: 0.2, side: THREE.DoubleSide });
    add(l6, 'camera', 'part.cameraRear',
        at(rbox(2.38, 0.92, 0.22, 0.44, M.alu, 6), 0, 1.68, -0.11),
        at(rbox(1.72, 0.66, 0.24, 0.32, M.lens, 5), -0.22, 1.68, -0.12),
        ...[-0.72, -0.08, 0.44].map(x => at(new THREE.Mesh(new THREE.RingGeometry(0.14, 0.19, 28), ringMat), x, 1.68, -0.245)),
        at(new THREE.Mesh(new THREE.CircleGeometry(0.095, 24), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, side: THREE.DoubleSide })), 0.88, 1.52, -0.225));
    add(l6, 'camera', 'part.flash',
        at(new THREE.Mesh(new THREE.CircleGeometry(0.095, 24),
            new THREE.MeshStandardMaterial({ color: 0xfef3c7, emissive: 0xfef08a, emissiveIntensity: 0.25, side: THREE.DoubleSide })), 0.88, 1.84, -0.225));

    // Assembled: layers stacked inside the phone. Exploded: the layers fan out front to back
    // (display in front, rear glass at the back); the phone is shown turned, so every layer is visible.
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const ASSEMBLED = [V(0, 0, 0.15), V(0, 0, 0.05), V(0, 0, 0.01), V(0, 0, -0.02), V(0, 0, -0.03), V(0, 0, -0.09), V(0, 0, -0.15)];
    const EXPLODED = [0, 1, 2, 3, 4, 5, 6].map(i => V(0, -0.3 * (i - 3), -1.9 * (i - 3)));
    const layers = [l0, l1, l2, l3, l4, l5, l6].map((mesh, i) => ({ mesh, assembled: ASSEMBLED[i], exploded: EXPLODED[i] }));

    // Each mesh gets its own material copy so it can glow on its own
    const group = new THREE.Group();
    layers.forEach(l => {
        l.mesh.traverse(o => {
            if (o.isMesh) {
                o.material = o.material.clone();
                o.userData.baseEmissive = o.material.emissive ? o.material.emissive.clone() : null;
                o.userData.baseIntensity = o.material.emissiveIntensity;
                o.castShadow = true; o.receiveShadow = true;
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
    renderer.shadowMap.enabled = true;   // parts cast soft shadows on each other
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.className = 'phone3d-canvas';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

    const sun = new THREE.DirectionalLight(0xffffff, 1.8);
    sun.position.set(3, 14, 7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { near: 0.5, far: 40, left: -9, right: 9, top: 9, bottom: -9 });
    sun.shadow.bias = -0.0005;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xdbeafe, 0.7);
    fill.position.set(-8, -4, 6);
    scene.add(fill);
    const backLight = new THREE.DirectionalLight(0xffffff, 1.4);   // lights the back for the back view
    backLight.position.set(-4, 6, -14);
    scene.add(backLight);

    const { group, layers } = buildPhone();
    group.rotation.set(-0.12, -0.6, 0.0);
    scene.add(group);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const HOME = { pos: new THREE.Vector3(-0.9, 2.0, 23.5), target: new THREE.Vector3(-0.9, 0.9, 0) };
    const DIAGONAL = { pos: new THREE.Vector3(9.5, 10, 25), target: new THREE.Vector3(-0.6, -0.2, 0) };
    const BACK = { pos: new THREE.Vector3(14, 5, -23), target: new THREE.Vector3(0.6, -0.5, 0) };
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
        camera.fov = camera.aspect < 0.75 ? 34 * (0.75 / camera.aspect) ** 0.6 : 34;
        camera.updateProjectionMatrix();
    }
    new ResizeObserver(resize).observe(container);
    resize();

    // ---- explode animation ----
    let factor = 0, target = 0, animating = false;
    const ease = t => t * t * (3 - 2 * t);
    function applyExplode() {
        const e = ease(factor);
        layers.forEach(l => l.mesh.position.lerpVectors(l.assembled, l.exploded, e));
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

    // ---- pointer: hover label + click to select ----
    const label = document.createElement('div');
    label.className = 'phone3d-label';
    label.setAttribute('aria-hidden', 'true');
    container.appendChild(label);
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    function hit(ev) {
        const r = renderer.domElement.getBoundingClientRect();
        ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
        ray.setFromCamera(ndc, camera);
        const h = ray.intersectObjects(meshes, false)[0];
        return h ? h.object : null;
    }
    let down = null;
    renderer.domElement.addEventListener('pointerdown', ev => { down = [ev.clientX, ev.clientY]; });
    renderer.domElement.addEventListener('pointerup', ev => {
        if (!down || Math.hypot(ev.clientX - down[0], ev.clientY - down[1]) > 6) { down = null; return; }
        down = null;
        const m = hit(ev);
        if (m) { selected = m.userData.part; options.onSelect(m.userData.part, m.userData.label); }
    });
    renderer.domElement.addEventListener('pointermove', ev => {
        if (ev.pointerType !== 'mouse') return;
        const m = hit(ev);
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

    // ---- render loop (paused while off-screen) ----
    let visible = true;
    new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(container);
    let last = performance.now();
    function frame(now) {
        requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.1); last = now;
        if (!visible || document.hidden) return;
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
    }
    applyExplode();
    requestAnimationFrame(frame);

    return {
        select(part) { selected = part; },
        setExplode,
        toggle() { setExplode(target < 0.5 ? 1 : 0, true); return target; },
        isExploded: () => target >= 0.5,
        diagonalView() { setExplode(1, true); flyTo(DIAGONAL); },
        backView() { flyTo(BACK); },
        resetView() { flyTo(HOME); }
    };
}

window.Phone3D = { create };
