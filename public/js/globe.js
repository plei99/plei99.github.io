import { arcticIce, colors } from "./globe-surface.js";

// The template supplies the visited countries without adding visible labels.
const container = document.getElementById("globe-container");
const motion = document.getElementById("globe-motion-toggle");
const zoomIn = document.getElementById("globe-zoom-in");
const zoomOut = document.getElementById("globe-zoom-out");
const reset = document.getElementById("globe-reset");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
const visited = new Set(container.dataset.visited.split("|"));

function showFallback(error) {
  console.warn(
    "The interactive atlas is unavailable; using its illustration.",
    error,
  );
  container.dataset.ready = "false";
  container.querySelector("canvas")?.remove();
  for (const button of [motion, zoomIn, zoomOut, reset]) button.disabled = true;
  document.getElementById("globe-status").textContent =
    container.dataset.fallbackLabel;
}

async function init() {
  const [T, response] = await Promise.all([
    import("./vendor/atlas-engine.js"),
    fetch("/js/world.json"),
  ]);
  if (!response.ok) throw new Error(`Map request failed: ${response.status}`);
  const world = await response.json();
  const renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.VSMShadowMap;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", container.getAttribute("aria-label"));
  canvas.setAttribute("aria-describedby", "globe-keyboard-help");
  container.prepend(canvas);

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(34, 1, 0.1, 30);
  camera.position.z = 4.05;
  const globe = new T.Group();
  scene.add(globe);
  scene.add(new T.AmbientLight(0xe6efff, 0.48));
  const sun = new T.DirectionalLight(0xfff9f0, 2.35);
  sun.position.set(-3, 5, 4);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, {
    left: -3,
    right: 3,
    top: 3,
    bottom: -3,
    near: 0.5,
    far: 15,
  });
  sun.shadow.radius = 18;
  sun.shadow.blurSamples = 16;
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.04;
  // Rotation changes the map, not the spherical silhouette or cast shadow.
  sun.shadow.autoUpdate = false;
  sun.shadow.needsUpdate = true;
  scene.add(sun);
  const rim = new T.DirectionalLight(0xb7d4ff, 1.15);
  rim.position.set(3, 1, -3);
  scene.add(rim);

  const floor = new T.Mesh(
    new T.PlaneGeometry(20, 20),
    new T.ShadowMaterial({ color: 0x23364d, opacity: 0.36 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -1.16;
  floor.receiveShadow = true;
  scene.add(floor);

  const textureWidth = Math.min(4096, renderer.capabilities.maxTextureSize);
  const makeCanvas = () => {
    const image = document.createElement("canvas");
    image.width = textureWidth;
    image.height = textureWidth / 2;
    return image;
  };
  const surface = makeCanvas();
  const relief = makeCanvas();
  const ctx = surface.getContext("2d");
  const bump = relief.getContext("2d");
  const projection = T.geoEquirectangular()
    .translate([surface.width / 2, surface.height / 2])
    .scale(surface.width / (2 * Math.PI));
  const path = T.geoPath(projection, ctx);
  const bumpPath = T.geoPath(projection, bump);
  ctx.fillStyle = colors.ocean;
  ctx.fillRect(0, 0, surface.width, surface.height);
  bump.fillStyle = "#202020";
  bump.fillRect(0, 0, relief.width, relief.height);
  ctx.beginPath();
  path(T.geoGraticule10());
  ctx.strokeStyle = colors.graticule;
  ctx.lineWidth = surface.width / 4096;
  ctx.stroke();
  ctx.beginPath();
  path(arcticIce);
  ctx.fillStyle = colors.ice;
  ctx.fill();
  bump.beginPath();
  bumpPath(arcticIce);
  bump.fillStyle = "#666666";
  bump.fill();
  for (const feature of world.features) {
    ctx.beginPath();
    path(feature);
    const polarLand = feature.properties.name === "Antarctica";
    ctx.fillStyle = polarLand
      ? colors.ice
      : visited.has(feature.properties.name)
      ? colors.visited
      : colors.land;
    ctx.fill();
    ctx.strokeStyle = polarLand
      ? colors.iceBorder
      : visited.has(feature.properties.name)
      ? colors.visitedBorder
      : colors.border;
    ctx.lineWidth = 1.1 * surface.width / 4096;
    ctx.stroke();
    bump.beginPath();
    bumpPath(feature);
    bump.fillStyle = "#999999";
    bump.fill();
  }
  const map = new T.CanvasTexture(surface);
  map.colorSpace = T.SRGBColorSpace;
  map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const bumpMap = new T.CanvasTexture(relief);
  const geometry = new T.SphereGeometry(1, 128, 96);
  geometry.rotateY(-Math.PI / 2);
  const earth = new T.Mesh(
    geometry,
    new T.MeshPhongMaterial({
      map,
      bumpMap,
      bumpScale: 0.012,
      specular: new T.Color("#34445a"),
      shininess: 22,
    }),
  );
  earth.castShadow = true;
  globe.add(earth);

  let width = 1;
  let height = 1;
  let latitude = 25;
  let longitude = 78;
  let zoom = 1;
  let target = null;
  let rotating = !reducedMotion.matches;
  let inView = true;
  let frame = 0;
  let previousTime = 0;
  let disposed = false;
  const clamp = T.MathUtils.clamp;
  const normalize = (angle) => ((angle + 180) % 360 + 360) % 360 - 180;

  function schedule() {
    if (!frame && !disposed && !document.hidden && inView) {
      frame = requestAnimationFrame(draw);
    }
  }

  function updateMotion() {
    motion.setAttribute("aria-pressed", String(rotating));
    const label = rotating
      ? motion.dataset.pauseLabel
      : motion.dataset.startLabel;
    motion.setAttribute("aria-label", label);
    motion.title = label;
  }

  function pause() {
    rotating = false;
    target = null;
    updateMotion();
  }

  function draw(now) {
    frame = 0;
    const delta = Math.min(now - (previousTime || now), 48);
    previousTime = now;
    if (target) {
      const step = reducedMotion.matches ? 1 : 1 - Math.exp(-delta / 170);
      longitude += normalize(target.lon - longitude) * step;
      latitude += (target.lat - latitude) * step;
      if (
        Math.abs(normalize(target.lon - longitude)) +
            Math.abs(target.lat - latitude) < 0.05
      ) {
        longitude = target.lon;
        latitude = target.lat;
        target = null;
      }
    } else if (rotating) {
      longitude = normalize(longitude + delta * 0.01);
    }
    globe.rotation.set(
      T.MathUtils.degToRad(latitude),
      -T.MathUtils.degToRad(longitude),
      0,
    );
    globe.updateMatrixWorld(true);
    renderer.render(scene, camera);
    if (rotating || target) schedule();
  }

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Fit the sphere in both portrait and landscape views.
    const verticalFov = T.MathUtils.degToRad(camera.fov / 2);
    const horizontalFov = Math.atan(Math.tan(verticalFov) * camera.aspect);
    camera.position.z = 1.27 / Math.sin(Math.min(verticalFov, horizontalFov)) /
      zoom;
    camera.position.y = 0.65;
    camera.lookAt(0, -0.08, 0);
    camera.updateProjectionMatrix();
    schedule();
  }

  function changeZoom(amount) {
    zoom = clamp(zoom + amount, 0.85, 1.25);
    zoomIn.disabled = zoom >= 1.25;
    zoomOut.disabled = zoom <= 0.85;
    resize();
  }

  motion.addEventListener("click", () => {
    rotating = !rotating;
    target = null;
    updateMotion();
    schedule();
  });
  zoomIn.addEventListener("click", () => changeZoom(0.1));
  zoomOut.addEventListener("click", () => changeZoom(-0.1));
  reset.addEventListener("click", () => {
    pause();
    zoom = 1;
    changeZoom(0);
    target = { lat: 25, lon: 78 };
    schedule();
  });
  const onMotionChange = () => {
    if (reducedMotion.matches) pause();
    schedule();
  };
  reducedMotion.addEventListener("change", onMotionChange);

  let drag = null;
  canvas.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    pause();
    drag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    longitude = normalize(longitude - dx * 0.3 / zoom);
    latitude = clamp(latitude + dy * 0.3 / zoom, -78, 78);
    drag.x = event.clientX;
    drag.y = event.clientY;
    schedule();
  });
  canvas.addEventListener("pointerup", (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    drag = null;
    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
  });
  for (const eventName of ["pointercancel", "lostpointercapture"]) {
    canvas.addEventListener(eventName, () => {
      drag = null;
    });
  }
  canvas.addEventListener("keydown", (event) => {
    if (
      ![
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "+",
        "=",
        "-",
        "Home",
      ].includes(event.key)
    ) return;
    event.preventDefault();
    pause();
    switch (event.key) {
      case "ArrowLeft":
        longitude -= 8;
        break;
      case "ArrowRight":
        longitude += 8;
        break;
      case "ArrowUp":
        latitude = clamp(latitude + 8, -78, 78);
        break;
      case "ArrowDown":
        latitude = clamp(latitude - 8, -78, 78);
        break;
      case "+":
      case "=":
        changeZoom(0.1);
        break;
      case "-":
        changeZoom(-0.1);
        break;
      case "Home":
        reset.click();
        break;
    }
    schedule();
  });
  const onVisibility = () => {
    previousTime = 0;
    if (!document.hidden) schedule();
  };
  document.addEventListener("visibilitychange", onVisibility);
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    previousTime = 0;
    if (inView) schedule();
  });
  observer.observe(container);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  for (const button of [motion, zoomIn, zoomOut, reset]) {
    button.disabled = false;
  }
  container.dataset.ready = "true";
  updateMotion();
  resize();

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    observer.disconnect();
    reducedMotion.removeEventListener("change", onMotionChange);
    document.removeEventListener("visibilitychange", onVisibility);
    scene.traverse((object) => {
      object.geometry?.dispose();
      object.material?.dispose();
    });
    map.dispose();
    bumpMap.dispose();
    sun.shadow.dispose();
    renderer.dispose();
  }
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    dispose();
    showFallback(new Error("WebGL context lost"));
  }, { once: true });
  // The travel page opens as a panel over the figure; panel.js fires this when
  // the panel closes or its content is replaced, so the WebGL context is freed.
  document.addEventListener("panel:close", dispose, { once: true });
  addEventListener("pagehide", (event) => {
    if (!event.persisted) dispose();
  }, { once: true });
}

init().catch(showFallback);
