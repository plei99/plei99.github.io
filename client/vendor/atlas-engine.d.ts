// Types for public/js/vendor/atlas-engine.js, the prebuilt bundle of the
// Three.js and d3-geo pieces the globe uses (see the README beside it). The
// versions of @types/three and @types/d3-geo in package.json match the bundle.
export {
  AmbientLight,
  CanvasTexture,
  Color,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShadowMaterial,
  SphereGeometry,
  SRGBColorSpace,
  VSMShadowMap,
  WebGLRenderer,
} from "three";
export { geoEquirectangular, geoGraticule10, geoPath } from "d3-geo";
