# Atlas renderer

`atlas-engine.js` is a locally served ES module bundled with esbuild 0.25.12. It
includes the exports used by `../globe.js` from Three.js 0.180.0 and d3-geo
3.1.1 (with d3-array 3.2.4 and internmap 2.0.3). License texts are included
here. The globe has no runtime CDN dependency.

To rebuild, install those pinned packages in a temporary directory, then create
an `engine.js` entry with these exports:

```js
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
```

Bundle with
`esbuild engine.js --bundle --format=esm --minify
--legal-comments=eof --banner:js='// deno-fmt-ignore-file'
--outfile=atlas-engine.js`,
then copy the resulting module here.

The map uses the site's existing `world.json`. Visited-country records live in
`src/_data/travel.yaml` and supply the globe’s highlighted regions. No travel
dates or routes are inferred. `globe-surface.js` defines the palette and imports
the NSIDC Arctic sea-ice geometry. See
[the ice data source](../arctic-ice-source.md) for its date, credit, and
conversion details. The static SVG uses the same map and ice data.
