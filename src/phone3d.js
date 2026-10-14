/*
 * Interactive 3D smartphone (assembled / exploded) for "Hidden Treasure in Your Pocket".
 * Based on a model generated with Google Gemini; built with three.js (MIT licence).
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
 *   viewer.select('pcb'); viewer.toggle(); viewer.setExplode(0.5); viewer.diagonalView(); viewer.resetView();
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const PHONE_W = 2.7;
const PHONE_H = 5.55;

// ---------------------------------------------------------------------------
// Textures drawn on a canvas (no image files needed)
// ---------------------------------------------------------------------------
function batteryLabelTexture() {
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 1536;
    const ctx = c.getContext('2d');
    const font = (w, s) => `${w} ${s}px -apple-system, "Segoe UI", Arial, sans-serif`;

    const g = ctx.createLinearGradient(0, 0, 1024, 1536);
    g.addColorStop(0, '#d9dde1'); g.addColorStop(1, '#bcc2c8');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 1024, 1536);
    ctx.strokeStyle = '#8a9198'; ctx.lineWidth = 20; ctx.strokeRect(30, 30, 964, 1476);

    ctx.fillStyle = '#16181b';
    ctx.font = font('bold', 58); ctx.fillText('Lithium-ion Polymer Battery', 90, 170);
    ctx.font = font('600', 40); ctx.fillText('3.85 V   3400 mAh   13.1 Wh', 90, 240);
    ctx.fillRect(90, 280, 844, 5);

    ctx.fillStyle = 'rgba(30, 60, 114, 0.10)'; ctx.fillRect(90, 320, 844, 300);
    ctx.strokeStyle = '#1e3c72'; ctx.lineWidth = 4; ctx.strokeRect(90, 320, 844, 300);
    ctx.fillStyle = '#1e3c72';
    ctx.font = font('bold', 40); ctx.fillText('WHAT IS INSIDE?', 120, 380);
    ctx.fillStyle = '#16181b'; ctx.font = font('500', 36);
    ctx.fillText('+  Lithium cobalt oxide (Li, Co)', 120, 440);
    ctx.fillText('−  Graphite (C)', 120, 495);
    ctx.fillText('Foils: copper (Cu), aluminium (Al)', 120, 550);
    ctx.fillText('Electrolyte: lithium salt', 120, 600);

    ctx.font = font('bold', 40); ctx.fillText('Do not put in the bin!', 90, 720);
    ctx.font = font('500', 34);
    ctx.fillText('Damaged batteries can start fires.', 90, 775);
    ctx.fillText('Recycle at an e-waste collection point.', 90, 822);

    // Crossed-out wheelie bin (the real WEEE symbol)
    ctx.strokeStyle = '#16181b'; ctx.fillStyle = '#16181b'; ctx.lineWidth = 10;
    const bx = 160, by = 930;
    ctx.fillRect(bx - 20, by - 12, 170, 14);              // lid
    ctx.strokeRect(bx, by + 10, 130, 170);                // body
    ctx.beginPath(); ctx.arc(bx + 20, by + 195, 16, 0, Math.PI * 2); ctx.fill();   // wheel
    ctx.beginPath(); ctx.moveTo(bx - 40, by - 40); ctx.lineTo(bx + 170, by + 230);
    ctx.moveTo(bx + 170, by - 40); ctx.lineTo(bx - 40, by + 230); ctx.stroke();
    ctx.fillRect(bx - 40, by + 250, 210, 18);              // bar under the bin

    // Recycling arrows (three chasing arrows in a triangle)
    ctx.save(); ctx.translate(560, 1050); ctx.lineWidth = 14;
    for (let k = 0; k < 3; k++) {
        ctx.rotate((2 * Math.PI) / 3);
        ctx.beginPath(); ctx.moveTo(-60, 70); ctx.lineTo(60, 70); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(60, 70); ctx.lineTo(35, 45); ctx.lineTo(35, 95); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
    ctx.font = font('bold', 44); ctx.fillText('Li-ion', 760, 1065);

    ctx.font = font('500', 30); ctx.fillStyle = '#3d434a';
    ctx.fillText('Illustration for "Hidden Treasure in Your Pocket"', 90, 1420);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
}

function pcbTexture() {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 1024;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#0d5c46'; ctx.fillRect(0, 0, 512, 1024);
    let seed = 7;                                          // fixed pattern every time
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    ctx.strokeStyle = '#348c6e'; ctx.lineWidth = 3;
    for (let i = 0; i < 65; i++) {
        const x = rnd() * 512, y = rnd() * 1024;
        ctx.beginPath(); ctx.moveTo(x, y);
        ctx.lineTo(x + (rnd() - 0.5) * 140, y);
        ctx.lineTo(x + (rnd() - 0.5) * 140, y + (rnd() - 0.5) * 200);
        ctx.stroke();
    }
    ctx.fillStyle = '#e5b842';
    for (let i = 0; i < 180; i++) {
        ctx.beginPath(); ctx.arc(rnd() * 490 + 10, rnd() * 1000 + 10, 4, 0, Math.PI * 2); ctx.fill();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
}

// ---------------------------------------------------------------------------
// The model: six layers (front to back). Every mesh is tagged with the app's
// part id and the key of its name, e.g. { part: 'camera', label: 'part.cameraRear' }.
// ---------------------------------------------------------------------------
function buildPhone() {
    const M = {
        bezel: new THREE.MeshStandardMaterial({ color: 0x22272b, roughness: 0.3, metalness: 0.4 }),
        glass: new THREE.MeshPhysicalMaterial({ color: 0x323b42, roughness: 0.08, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 }),
        gold: new THREE.MeshStandardMaterial({ color: 0xd9a441, roughness: 0.22, metalness: 0.92 }),
        flex: new THREE.MeshStandardMaterial({ color: 0xc86d28, roughness: 0.32, metalness: 0.65 }),
        alu: new THREE.MeshStandardMaterial({ color: 0x8a9198, roughness: 0.35, metalness: 0.85 }),
        darkMetal: new THREE.MeshStandardMaterial({ color: 0x3b4046, roughness: 0.4, metalness: 0.75 }),
        chip: new THREE.MeshStandardMaterial({ color: 0x1e2226, roughness: 0.25, metalness: 0.3 }),
        chrome: new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.2, metalness: 0.9 }),
        black: new THREE.MeshStandardMaterial({ color: 0x111315, roughness: 0.4 })
    };
    const box = (w, h, d, r, mat) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, r), mat);
    const at = (mesh, x, y, z) => { mesh.position.set(x, y, z); return mesh; };
    const tag = (obj, part, label) => {
        obj.traverse(o => { if (o.isMesh) { o.userData.part = part; o.userData.label = label; } });
        return obj;
    };

    // Layer 0: front cover glass (display). The earpiece belongs to the speaker, the front camera to the camera.
    const l0 = new THREE.Group();
    l0.add(tag(box(PHONE_W, PHONE_H, 0.09, 0.32, M.bezel), 'screen', 'part.screen'));
    l0.add(tag(at(box(PHONE_W + 0.03, PHONE_H + 0.03, 0.06, 0.33, M.chrome), 0, 0, -0.01), 'screen', 'part.screen'));
    l0.add(tag(at(new THREE.Mesh(new THREE.PlaneGeometry(PHONE_W - 0.24, PHONE_H - 1.15), M.glass), 0, 0, 0.047), 'screen', 'part.screen'));
    const ring = at(new THREE.Mesh(new THREE.RingGeometry(0.19, 0.22, 32), M.chrome), 0, -PHONE_H / 2 + 0.33, 0.048);
    l0.add(tag(ring, 'screen', 'part.screen'));
    l0.add(tag(at(box(0.6, 0.09, 0.03, 0.03, M.black), 0, PHONE_H / 2 - 0.28, 0.048), 'speaker', 'part.speaker'));
    l0.add(tag(at(new THREE.Mesh(new THREE.CircleGeometry(0.07, 20), M.black), -0.48, PHONE_H / 2 - 0.28, 0.05), 'camera', 'part.cameraFront'));

    // Layer 1: display panel with the orange flex cable carrying the front camera
    const l1 = new THREE.Group();
    l1.add(tag(box(PHONE_W - 0.06, PHONE_H - 0.06, 0.08, 0.28, M.darkMetal), 'screen', 'part.screen'));
    l1.add(tag(at(new THREE.Mesh(new THREE.PlaneGeometry(PHONE_W - 0.24, PHONE_H - 1.2),
        new THREE.MeshStandardMaterial({ color: 0x475059, roughness: 0.22, metalness: 0.5 })), 0, -0.22, 0.042), 'screen', 'part.screen'));
    const flex = new THREE.Group();
    flex.add(at(box(1.18, 0.62, 0.05, 0.04, M.flex), 0.28, PHONE_H / 2 - 0.65, 0.05));
    const ribbon = at(new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.36, 0.03), M.flex), 1.12, PHONE_H / 2 - 0.56, 0.06);
    ribbon.rotation.z = 0.12; flex.add(ribbon);
    const lens = at(new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.08, 24), M.chip), 0.32, PHONE_H / 2 - 0.55, 0.08);
    lens.rotation.x = Math.PI / 2; flex.add(lens);
    for (let i = 0; i < 3; i++) flex.add(at(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, 0.05), M.chip), -0.12 + i * 0.12, PHONE_H / 2 - 0.62, 0.08));
    l1.add(tag(flex, 'camera', 'part.cameraFront'));

    // Layer 2: internal mid-frame with graphite heat-spreading sheet (part of the casing & frame)
    const l2 = new THREE.Group();
    l2.add(box(PHONE_W - 0.04, PHONE_H - 0.04, 0.07, 0.28, M.alu));
    l2.add(at(new THREE.Mesh(new THREE.PlaneGeometry(PHONE_W - 0.26, PHONE_H - 0.9),
        new THREE.MeshStandardMaterial({ color: 0x4b535b, roughness: 0.45, metalness: 0.6 })), 0, 0, 0.037));
    l2.add(at(box(0.38, 0.11, 0.08, 0.04, M.chrome), 0, -PHONE_H / 2 + 0.25, 0.01));
    tag(l2, 'casing', 'part.casing');

    // Layer 3: L-shaped circuit board
    const l3 = new THREE.Group();
    const pcbMat = new THREE.MeshStandardMaterial({ map: pcbTexture(), roughness: 0.35, metalness: 0.3 });
    l3.add(at(box(0.95, PHONE_H - 0.25, 0.08, 0.04, pcbMat), PHONE_W / 2 - 0.52, 0, 0));
    l3.add(at(box(PHONE_W - 0.15, 1.15, 0.08, 0.04, pcbMat), 0, -PHONE_H / 2 + 0.7, 0));
    [[PHONE_W / 2 - 0.05, PHONE_H / 2 - 0.25], [PHONE_W / 2 - 0.05, 0.4], [-PHONE_W / 2 + 0.1, -PHONE_H / 2 + 0.25], [0.2, -PHONE_H / 2 + 0.12]]
        .forEach(([x, y]) => { const t = at(new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.09, 16), M.gold), x, y, 0); t.rotation.x = Math.PI / 2; l3.add(t); });
    l3.add(at(box(0.72, 0.85, 0.14, 0.03, M.chrome), PHONE_W / 2 - 0.52, 1.25, 0.06));
    [[0.82, 2.15, 0.35, 0.35, M.chip], [0.82, 0.45, 0.42, 0.48, M.chip], [0.82, -0.25, 0.32, 0.38, M.chip], [0.82, -0.9, 0.36, 0.32, M.chip],
     [-0.35, -1.95, 0.48, 0.45, M.chip], [0.25, -2.0, 0.38, 0.38, M.chip], [0.78, -2.05, 0.42, 0.36, M.gold], [-0.92, -2.05, 0.32, 0.28, M.gold]]
        .forEach(([x, y, w, h, m]) => l3.add(at(box(w, h, 0.12, 0.02, m), x, y, 0.055)));
    for (let i = 0; i < 28; i++) {
        const right = i < 18;
        const x = right ? PHONE_W / 2 - 0.85 + (i % 3) * 0.28 : -1.0 + (i - 18) * 0.22;
        const y = right ? -1.4 + Math.floor(i / 3) * 0.62 : -1.65 - (i % 2) * 0.55;
        l3.add(at(new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.06, 0.09), i % 3 === 0 ? M.gold : M.chip), x, y, 0.05));
    }
    tag(l3, 'pcb', 'part.pcb');

    // Layer 4: rear housing with rear camera, loudspeaker and vibration motor
    const l4 = new THREE.Group();
    const shell = new THREE.Group();
    shell.add(box(PHONE_W, PHONE_H, 0.22, 0.32, M.alu));
    shell.add(at(box(PHONE_W - 0.28, PHONE_H - 0.6, 0.14, 0.12,
        new THREE.MeshStandardMaterial({ color: 0x42484e, roughness: 0.5, metalness: 0.6 })), -0.08, -0.15, 0.065));
    shell.add(at(box(0.06, 0.42, 0.08, 0.02, M.alu), PHONE_W / 2 + 0.02, 1.1, 0));
    shell.add(at(box(0.06, 0.42, 0.08, 0.02, M.alu), PHONE_W / 2 + 0.02, 0.5, 0));
    l4.add(tag(shell, 'casing', 'part.casing'));
    const cam = new THREE.Group();
    cam.add(at(box(0.6, 0.6, 0.18, 0.12, M.chrome), -0.78, PHONE_H / 2 - 0.62, 0.08));
    const rearLens = at(new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.2, 24),
        new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.1, metalness: 0.8 })), -0.78, PHONE_H / 2 - 0.62, 0.1);
    rearLens.rotation.x = Math.PI / 2; cam.add(rearLens);
    l4.add(tag(cam, 'camera', 'part.cameraRear'));
    const audio = new THREE.Group();
    audio.add(at(box(0.8, 0.42, 0.14, 0.06, M.black), -0.78, -PHONE_H / 2 + 0.42, 0.11));       // loudspeaker box
    for (let i = 0; i < 5; i++) {                                                                // grille holes
        const hole = at(new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.02, 12), M.chrome), -1.05 + i * 0.14, -PHONE_H / 2 + 0.42, 0.19);
        hole.rotation.x = Math.PI / 2;
        audio.add(hole);
    }
    const motor = at(new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.42, 24), M.chrome), 0.7, -PHONE_H / 2 + 0.45, 0.11);
    motor.rotation.z = Math.PI / 2; audio.add(motor);                                           // vibration motor
    l4.add(tag(audio, 'speaker', 'part.speaker'));

    // Layer 5: battery
    const l5 = new THREE.Group();
    const BW = 1.85, BH = 3.35, BD = 0.22;
    l5.add(box(BW, BH, BD, 0.08, new THREE.MeshStandardMaterial({ color: 0x2b2f33, roughness: 0.35, metalness: 0.5 })));
    l5.add(at(new THREE.Mesh(new THREE.PlaneGeometry(BW - 0.12, BH - 0.16),
        new THREE.MeshStandardMaterial({ map: batteryLabelTexture(), roughness: 0.4, metalness: 0.15 })), 0, 0, BD / 2 + 0.002));
    l5.add(at(box(BW - 0.1, 0.22, BD - 0.04, 0.03, M.black), 0, BH / 2 + 0.09, 0));
    const bf = at(new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.35, 0.03), M.flex), BW / 2 - 0.32, BH / 2 + 0.26, 0.02);
    bf.rotation.z = -0.35; l5.add(bf);
    const bc = at(new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.16, 0.06), M.gold), BW / 2 - 0.08, BH / 2 + 0.38, 0.04);
    bc.rotation.z = -0.35; l5.add(bc);
    tag(l5, 'battery', 'part.battery');

    // Assembled positions stack the layers inside the housing; exploded positions form a
    // diagonal staircase (front layer top-left, housing and battery bottom-right), like the photo.
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const ASSEMBLED = [V(0, 0, 0.16), V(0, 0, 0.1), V(0, 0, 0.04), V(0, 0, -0.02), V(0, 0, -0.12), V(-0.25, -0.25, -0.04)];
    const EXPLODED = [V(-2.35, 2.6, 1.6), V(-1.35, 1.75, 1.0), V(-0.35, 0.9, 0.4), V(0.75, 0.05, -0.2), V(2.0, -0.8, -0.8), V(2.55, -3.6, 0.35)];
    const layers = [l0, l1, l2, l3, l4, l5].map((mesh, i) => ({ mesh, assembled: ASSEMBLED[i], exploded: EXPLODED[i] }));

    // Each mesh gets its own material copy so it can glow on its own
    const group = new THREE.Group();
    layers.forEach(l => {
        l.mesh.traverse(o => {
            if (o.isMesh) {
                o.material = o.material.clone();
                o.userData.baseEmissive = o.material.emissive ? o.material.emissive.clone() : null;
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

    const { group, layers } = buildPhone();
    group.rotation.set(-0.1, 0.3, 0.02);
    scene.add(group);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const HOME = { pos: new THREE.Vector3(0.2, 0.9, 22.5), target: new THREE.Vector3(0.2, 0.1, 0) };
    const DIAGONAL = { pos: new THREE.Vector3(-8.5, 4.8, 19.5), target: new THREE.Vector3(0.2, 0.1, 0) };
    camera.position.copy(HOME.pos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(HOME.target);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = false;      // keep the mouse wheel for scrolling the page
    controls.enablePan = false;
    controls.minPolarAngle = 0.55;    // no turning the phone upside down
    controls.maxPolarAngle = 2.2;
    controls.minAzimuthAngle = -1.4;
    controls.maxAzimuthAngle = 1.4;
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
            else { m.material.emissive.copy(m.userData.baseEmissive); m.material.emissiveIntensity = 1; }
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
        resetView() { flyTo(HOME); }
    };
}

window.Phone3D = { create };
