import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    window.setTimeout(() => loader?.classList.add('hidden'), 900);

    const header = document.getElementById('header');
    window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    menuToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon?.classList.toggle('fa-bars'); icon?.classList.toggle('fa-xmark');
    });
    navMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navMenu.classList.remove('active')));

    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .14, rootMargin: '0px 0px -45px' });
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', event => { const target = document.querySelector(anchor.getAttribute('href')); if (target) { event.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }));

    initToothExperience();
    initBooking();

    const contactForm = document.querySelector('.contact-form');
    contactForm?.addEventListener('submit', event => { event.preventDefault(); const button = contactForm.querySelector('button'); button.innerHTML = '<i class="fa-solid fa-check"></i> Talebiniz alındı'; button.disabled = true; window.setTimeout(() => { contactForm.reset(); button.innerHTML = 'Talebi Gönder <i class="fa-solid fa-paper-plane"></i>'; button.disabled = false; }, 3500); });
});

function initToothExperience() {
    // The approved high-fidelity render preserves the refined crown and root proportions in the hero.
    initToothVisualExperience();
}

function initToothMeshExperience() {
    const mount = document.getElementById('tooth-wrapper');
    if (!mount) return;

    mount.innerHTML = '<canvas class="tooth-canvas" aria-label="Kaydırma ve sürükleme ile dönen üç boyutlu molar modeli"></canvas><span class="tooth-webgl-label">DRAG · ROTATE · SCROLL</span>';
    const canvas = mount.querySelector('.tooth-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.24;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, .1, 100);
    camera.position.set(0, .05, 7.2);
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);
    scene.add(new THREE.HemisphereLight(0xf5fdff, 0x092c4b, 2.3));
    const key = new THREE.DirectionalLight(0xffffff, 4.4); key.position.set(4, 5, 6); scene.add(key);
    const rim = new THREE.PointLight(0x5ce7ff, 20, 12, 2); rim.position.set(-3, 2, 3); scene.add(rim);
    const fill = new THREE.PointLight(0xc7f7ff, 10, 10, 2); fill.position.set(2, -3, 4); scene.add(fill);

    const heroSlot = document.createComment('hero-tooth-slot');
    mount.parentNode?.insertBefore(heroSlot, mount);
    let isDocked = false;
    const setDocked = shouldDock => {
        if (shouldDock === isDocked) return;
        isDocked = shouldDock;
        if (shouldDock) document.body.appendChild(mount);
        else heroSlot.parentNode?.insertBefore(mount, heroSlot.nextSibling);
        mount.classList.toggle('is-floating', shouldDock);
    };

    const enamel = new THREE.MeshPhysicalMaterial({ color: 0xfffdf9, roughness: .16, metalness: 0, clearcoat: .9, clearcoatRoughness: .1, sheen: .05, sheenColor: new THREE.Color(0xdff9ff) });
    const meshGroup = new THREE.Group();
    modelRoot.add(meshGroup);
    const scanRing = new THREE.Mesh(new THREE.TorusGeometry(1.25, .015, 10, 96), new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending }));
    scanRing.rotation.x = Math.PI / 2;
    meshGroup.add(scanRing);

    let toothMesh;
    new STLLoader().load('assets/models/cc0-molar.stl', geometry => {
        geometry.computeVertexNormals();
        geometry.center();
        geometry.computeBoundingBox();
        const size = geometry.boundingBox.getSize(new THREE.Vector3());
        const scale = 3.7 / Math.max(size.x, size.y, size.z);
        toothMesh = new THREE.Mesh(geometry, enamel);
        toothMesh.scale.setScalar(scale);
        toothMesh.rotation.x = -Math.PI / 2;
        toothMesh.position.y = -.12;
        meshGroup.add(toothMesh);
    }, undefined, () => {
        renderer.dispose();
        initToothVisualExperience();
    });

    const pointer = { x: 0, y: 0, dragging: false };
    let targetSpin = -.38;
    let previousScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        targetSpin += (window.scrollY - previousScrollY) * .012;
        previousScrollY = window.scrollY;
    }, { passive: true });
    const updatePointer = event => {
        const rect = mount.getBoundingClientRect();
        pointer.x = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width - .5) * 2, -1, 1);
        pointer.y = THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height - .5) * 2, -1, 1);
    };
    mount.addEventListener('pointermove', event => updatePointer(event));
    mount.addEventListener('pointerdown', event => { pointer.dragging = true; mount.setPointerCapture?.(event.pointerId); mount.classList.add('is-dragging'); updatePointer(event); });
    mount.addEventListener('pointerup', () => { pointer.dragging = false; mount.classList.remove('is-dragging'); });
    mount.addEventListener('pointerleave', () => { if (!pointer.dragging) { pointer.x = 0; pointer.y = 0; } });

    const resize = () => {
        const { width, height } = mount.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };
    new ResizeObserver(resize).observe(mount);
    resize();

    const render = () => {
        const heroRect = document.getElementById('hero')?.getBoundingClientRect();
        const progress = heroRect ? THREE.MathUtils.clamp(-heroRect.top / Math.max(heroRect.height * .86, 1), 0, 1) : 0;
        setDocked(Boolean(heroRect && heroRect.bottom < Math.max(150, window.innerHeight * .34)));
        modelRoot.rotation.y = THREE.MathUtils.lerp(modelRoot.rotation.y, targetSpin + pointer.x * .34, .10);
        modelRoot.rotation.x = THREE.MathUtils.lerp(modelRoot.rotation.x, -.16 - pointer.y * .16 + progress * .12, .08);
        modelRoot.rotation.z = THREE.MathUtils.lerp(modelRoot.rotation.z, -.06 + pointer.x * .05, .08);
        modelRoot.position.y = THREE.MathUtils.lerp(modelRoot.position.y, isDocked ? 0 : -progress * .20, .08);
        scanRing.material.opacity = THREE.MathUtils.lerp(scanRing.material.opacity, progress * .40, .08);
        scanRing.position.y = 1.22 - progress * 2.6;
        scanRing.rotation.z += .02;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };
    render();
}

function initToothVisualExperience() {
    const mount = document.getElementById('tooth-wrapper');
    if (!mount) return;

    mount.innerHTML = `
        <div class="tooth-visual-stage" aria-label="Kaydırma ve sürükleme ile tepki veren diş görseli">
            <span class="tooth-asset-halo" aria-hidden="true"></span>
            <img class="tooth-asset tooth-asset--depth" src="assets/images/hero-molar.png" alt="" aria-hidden="true">
            <img class="tooth-asset tooth-asset--main" src="assets/images/hero-molar.png" alt="Gerçekçi molar diş görselleştirmesi">
            <span class="tooth-webgl-label">DRAG · DEPTH · SCROLL</span>
        </div>`;

    const state = { x: 0, y: 0, dragging: false };
    const heroSlot = document.createComment('hero-tooth-slot');
    mount.parentNode?.insertBefore(heroSlot, mount);
    let isDocked = false;
    const setDocked = shouldDock => {
        if (shouldDock === isDocked) return;
        isDocked = shouldDock;
        if (shouldDock) {
            document.body.appendChild(mount);
        } else {
            heroSlot.parentNode?.insertBefore(mount, heroSlot.nextSibling);
        }
        mount.classList.toggle('is-floating', shouldDock);
    };
    const setPointer = event => {
        const rect = mount.getBoundingClientRect();
        state.x = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width - .5) * 2, -1, 1);
        state.y = THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height - .5) * 2, -1, 1);
    };
    mount.addEventListener('pointermove', event => { setPointer(event); });
    mount.addEventListener('pointerdown', event => {
        state.dragging = true;
        mount.setPointerCapture?.(event.pointerId);
        mount.classList.add('is-dragging');
        setPointer(event);
    });
    mount.addEventListener('pointerup', () => { state.dragging = false; mount.classList.remove('is-dragging'); });
    mount.addEventListener('pointercancel', () => { state.dragging = false; mount.classList.remove('is-dragging'); });
    mount.addEventListener('pointerleave', () => { if (!state.dragging) { state.x = 0; state.y = 0; } });

    const render = () => {
        const hero = document.getElementById('hero');
        const rect = hero?.getBoundingClientRect();
        const progress = rect ? THREE.MathUtils.clamp(-rect.top / Math.max(rect.height * .86, 1), 0, 1) : 0;
        const dockingLine = Math.max(150, window.innerHeight * .34);
        const shouldFloat = Boolean(rect && rect.bottom < dockingLine);
        setDocked(shouldFloat);

        // Horizontal-axis motion follows the user's scroll; its bounded amplitude keeps a 2D hero render believable.
        const scrollTilt = shouldFloat ? Math.sin(window.scrollY * .006) * 14 : progress * 22;
        const rotateY = -6 + scrollTilt + state.x * 8;
        const rotateX = -3 + progress * 7 - state.y * 5;
        const lift = (shouldFloat ? 0 : -progress * 18) - state.y * 5;
        mount.style.setProperty('--tooth-rotate-y', `${rotateY.toFixed(2)}deg`);
        mount.style.setProperty('--tooth-rotate-x', `${rotateX.toFixed(2)}deg`);
        mount.style.setProperty('--tooth-lift', `${lift.toFixed(2)}px`);
        mount.style.setProperty('--tooth-depth-shift', `${(scrollTilt + state.x * 10).toFixed(2)}px`);
        mount.style.setProperty('--tooth-glow', `${(.16 + (shouldFloat ? .22 : progress * .30)).toFixed(2)}`);
        requestAnimationFrame(render);
    };
    render();
}

function initToothExperienceLegacy() {
    const mount = document.getElementById('tooth-wrapper');
    if (!mount || !window.WebGLRenderingContext) return;

    mount.innerHTML = '<canvas class="tooth-canvas" aria-label="Etkileşimli üç boyutlu molar diş modeli"></canvas><span class="tooth-webgl-label">DRAG · ROTATE · SCROLL</span>';
    const canvas = mount.querySelector('canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(31, 1, .1, 100);
    camera.position.set(0, .1, 7.4);
    const modelRoot = new THREE.Group();
    scene.add(modelRoot);

    scene.add(new THREE.HemisphereLight(0xe9fbff, 0x0b3b60, 2.1));
    const key = new THREE.DirectionalLight(0xffffff, 4.2); key.position.set(4.5, 6, 6); scene.add(key);
    const rim = new THREE.PointLight(0x00d4ff, 18, 12, 2); rim.position.set(-4, 1, 2); scene.add(rim);
    const fill = new THREE.PointLight(0xc8f7ff, 12, 9, 2); fill.position.set(2, -3, 4); scene.add(fill);

    const enamelMaterial = new THREE.MeshPhysicalMaterial({ color: 0xfffdf7, roughness: .2, metalness: 0, clearcoat: .72, clearcoatRoughness: .12, sheen: .04, sheenColor: new THREE.Color(0xf1fbff) });
    const proceduralTooth = createProceduralMolar(enamelMaterial);
    proceduralTooth.scale.set(1.28, 1.28, 1.18);
    proceduralTooth.position.y = -.20;
    modelRoot.add(proceduralTooth);

    const pointer = { x: 0, y: 0, active: false };
    mount.addEventListener('pointermove', event => {
        const rect = mount.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width - .5) * 2;
        pointer.y = ((event.clientY - rect.top) / rect.height - .5) * 2;
        pointer.active = true;
    });
    mount.addEventListener('pointerleave', () => pointer.active = false);
    mount.addEventListener('pointerdown', () => mount.classList.add('is-dragging'));
    window.addEventListener('pointerup', () => mount.classList.remove('is-dragging'));

    const resize = () => {
        const { width, height } = mount.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };
    new ResizeObserver(resize).observe(mount); resize();

    const animate = () => {
        const hero = document.getElementById('hero');
        const heroRect = hero?.getBoundingClientRect();
        const scrollProgress = heroRect ? THREE.MathUtils.clamp(-heroRect.top / Math.max(heroRect.height * .9, 1), 0, 1) : 0;
        const pointerX = pointer.active ? pointer.x * .3 : 0;
        const pointerY = pointer.active ? pointer.y * .16 : 0;
        modelRoot.rotation.y = THREE.MathUtils.lerp(modelRoot.rotation.y, scrollProgress * Math.PI * 2.15 + pointerX, .075);
        modelRoot.rotation.x = THREE.MathUtils.lerp(modelRoot.rotation.x, -.14 + pointerY + scrollProgress * .12, .065);
        modelRoot.rotation.z = THREE.MathUtils.lerp(modelRoot.rotation.z, -.05 + scrollProgress * .14, .055);
        modelRoot.position.y = THREE.MathUtils.lerp(modelRoot.position.y, -scrollProgress * .34, .06);
        proceduralTooth.userData.scanRing.material.opacity = THREE.MathUtils.lerp(proceduralTooth.userData.scanRing.material.opacity, scrollProgress * .48, .08);
        proceduralTooth.userData.scanRing.position.y = 1.25 - scrollProgress * 2.7;
        proceduralTooth.userData.scanRing.rotation.z += .025 + scrollProgress * .035;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    animate();
}

function createProceduralMolar(material) {
    const tooth = new THREE.Group();
    const addOrganicMesh = (geometry, position, scale, rotation = [0, 0, 0]) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...position);
        mesh.scale.set(...scale);
        mesh.rotation.set(...rotation);
        tooth.add(mesh);
        return mesh;
    };

    const sphere = new THREE.SphereGeometry(1, 56, 40);
    // Smooth overlapping volumes retain real depth while the tooth rotates.
    addOrganicMesh(sphere, [0, .62, 0], [1.04, .92, .78], [-.06, 0, 0]);
    addOrganicMesh(sphere, [-.50, 1.18, .02], [.52, .43, .58], [0, .10, -.18]);
    addOrganicMesh(sphere, [0, 1.27, .08], [.55, .46, .62], [0, 0, .02]);
    addOrganicMesh(sphere, [.51, 1.15, .03], [.50, .44, .57], [0, -.10, .17]);
    addOrganicMesh(sphere, [0, -.05, -.02], [.74, .58, .62]);

    const createRoot = side => {
        const profile = [
            new THREE.Vector2(.43, .66), new THREE.Vector2(.39, .44), new THREE.Vector2(.34, .08),
            new THREE.Vector2(.29, -.36), new THREE.Vector2(.23, -.77), new THREE.Vector2(.16, -1.14),
            new THREE.Vector2(.08, -1.39), new THREE.Vector2(0, -1.53)
        ];
        addOrganicMesh(new THREE.LatheGeometry(profile, 56), [side * .34, .03, -.02], [.88, 1.08, .78], [0, side * .08, side * -.14]);
    };
    createRoot(-1);
    createRoot(1);

    const fissureMaterial = new THREE.MeshPhysicalMaterial({ color: 0x61899a, roughness: .30, transparent: true, opacity: .13, clearcoat: .08 });
    const addFissure = points => {
        const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
        tooth.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 36, .018, 8, false), fissureMaterial));
    };
    addFissure([[-.50, 1.28, .49], [-.23, 1.40, .61], [0, 1.32, .64], [.27, 1.39, .59], [.50, 1.23, .48]]);
    addFissure([[0, 1.33, .64], [-.02, 1.09, .70], [.04, .91, .67]]);

    /* Legacy flat silhouette retained temporarily for simple rollback.
    const silhouette = new THREE.Shape();
    // Kapalı kontur: crown, sağ kök, gerçek kök aralığı ve sol kök tek geometri içinde.
    silhouette.moveTo(-.78, 1.00);
    silhouette.bezierCurveTo(-1.03, 1.15, -1.02, 1.56, -.77, 1.66);
    silhouette.bezierCurveTo(-.57, 1.75, -.38, 1.52, -.17, 1.60);
    silhouette.bezierCurveTo(.05, 1.68, .14, 1.79, .34, 1.70);
    silhouette.bezierCurveTo(.61, 1.58, .78, 1.72, .94, 1.49);
    silhouette.bezierCurveTo(1.07, 1.29, .93, 1.07, .76, .96);
    silhouette.bezierCurveTo(.66, .81, .70, .59, .63, .42);
    silhouette.bezierCurveTo(.57, .12, .49, -.43, .37, -1.13);
    silhouette.bezierCurveTo(.34, -1.37, .28, -1.58, .17, -1.63);
    silhouette.bezierCurveTo(.04, -1.68, .04, -1.43, .08, -1.19);
    silhouette.bezierCurveTo(.13, -.89, .11, -.60, 0, -.39);
    silhouette.bezierCurveTo(-.10, -.60, -.13, -.89, -.08, -1.19);
    silhouette.bezierCurveTo(-.04, -1.43, -.04, -1.68, -.17, -1.63);
    silhouette.bezierCurveTo(-.28, -1.58, -.34, -1.37, -.37, -1.13);
    silhouette.bezierCurveTo(-.49, -.43, -.57, .12, -.63, .42);
    silhouette.bezierCurveTo(-.70, .59, -.66, .81, -.78, 1.00);

    const toothGeometry = new THREE.ExtrudeGeometry(silhouette, { depth: .62, bevelEnabled: true, bevelThickness: .21, bevelSize: .17, bevelOffset: 0, bevelSegments: 8, curveSegments: 64 });
    toothGeometry.center();
    toothGeometry.computeVertexNormals();
    const molar = new THREE.Mesh(toothGeometry, material);
    molar.scale.set(1.18, 1.15, 1);
    molar.rotation.x = -.08;
    molar.rotation.y = -.10;
    tooth.add(molar);

    const fissureMaterial = new THREE.MeshPhysicalMaterial({ color: 0x698c98, roughness: .34, transparent: true, opacity: .12, clearcoat: 0 });
    const addFissure = points => {
        const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)));
        tooth.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 32, .014, 7, false), fissureMaterial));
    };
    addFissure([[-.52, 1.17, .35], [-.18, 1.27, .36], [.05, 1.22, .36], [.47, 1.12, .36]]);
    addFissure([[-.08, 1.25, .36], [0, 1.12, .36], [.08, .97, .36]]);
    */

    const scanRing = new THREE.Mesh(new THREE.TorusGeometry(1.26, .018, 10, 96), new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending }));
    scanRing.rotation.x = Math.PI / 2;
    scanRing.position.y = 1.25;
    tooth.add(scanRing);
    tooth.userData = { scanRing };
    tooth.rotation.z = -.025;
    return tooth;
}

function initBooking() {
    const booking = document.querySelector('[data-booking]');
    if (!booking) return;
    let step = 1, calendarDate = new Date(); calendarDate.setDate(1);
    const steps = [...booking.querySelectorAll('[data-booking-step]')], progress = [...booking.querySelectorAll('[data-progress]')];
    const showStep = next => { step = next; steps.forEach(item => item.classList.toggle('active', +item.dataset.bookingStep === step)); progress.forEach(item => item.classList.toggle('active', +item.dataset.progress <= step)); booking.querySelector('[data-current-step]').textContent = step; if (step === 3) renderCalendar(); };
    const validStep = () => { const active = booking.querySelector('.booking-step.active'); const invalid = active.querySelector(':invalid'); if (invalid) { invalid.focus(); return false; } return true; };
    booking.querySelectorAll('.booking-next').forEach(button => button.addEventListener('click', () => validStep() && showStep(Math.min(step + 1, 3))));
    booking.querySelectorAll('.booking-back').forEach(button => button.addEventListener('click', () => showStep(Math.max(step - 1, 1))));
    const grid = booking.querySelector('[data-calendar-grid]');
    const renderCalendar = () => {
        const year = calendarDate.getFullYear(), month = calendarDate.getMonth(), first = new Date(year, month, 1).getDay() || 7, days = new Date(year, month + 1, 0).getDate();
        booking.querySelector('[data-calendar-title]').textContent = new Intl.DateTimeFormat('tr-TR', { month: 'long', year: 'numeric' }).format(calendarDate);
        grid.innerHTML = ['P', 'S', 'Ç', 'P', 'C', 'C', 'P'].map(day => `<b>${day}</b>`).join('') + Array(first - 1).fill('<span class="calendar-empty"></span>').join('') + Array.from({ length: days }, (_, index) => {
            const date = new Date(year, month, index + 1); const iso = date.toISOString().split('T')[0]; const disabled = date < new Date(new Date().setHours(0, 0, 0, 0)) || date.getDay() === 0;
            return `<button type="button" class="calendar-day ${disabled ? 'disabled' : ''}" data-date="${iso}" ${disabled ? 'disabled' : ''}>${index + 1}</button>`;
        }).join('');
        grid.querySelectorAll('[data-date]').forEach(day => day.addEventListener('click', () => { grid.querySelectorAll('.calendar-day').forEach(item => item.classList.remove('selected')); day.classList.add('selected'); booking.querySelector('[data-selected-date]').value = day.dataset.date; booking.querySelector('[data-picked-date]').textContent = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long' }).format(new Date(`${day.dataset.date}T12:00:00`)); }));
    };
    booking.querySelector('[data-calendar-prev]')?.addEventListener('click', () => { calendarDate.setMonth(calendarDate.getMonth() - 1); renderCalendar(); });
    booking.querySelector('[data-calendar-next]')?.addEventListener('click', () => { calendarDate.setMonth(calendarDate.getMonth() + 1); renderCalendar(); });
    booking.querySelector('#booking-form')?.addEventListener('submit', event => { if (!booking.querySelector('[data-selected-date]').value) { event.preventDefault(); booking.querySelector('.booking-feedback').textContent = 'Devam etmek için lütfen takvimden bir gün seçin.'; return; } booking.querySelector('.booking-feedback').textContent = 'Randevu talebiniz hazır. Ekibimiz en kısa sürede sizi arayacak.'; });
}
