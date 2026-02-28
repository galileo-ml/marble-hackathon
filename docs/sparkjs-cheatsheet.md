# SparkJS API Cheatsheet

Extended reference for the [Spark](https://sparkjs.dev/) 3D Gaussian Splatting renderer for Three.js.

**Install**: `npm install @sparkjsdev/spark`
**Docs**: https://sparkjs.dev/docs/
**Formats**: PLY, SPZ, SPLAT, KSPLAT, SOGS

## SparkRenderer

The orchestration hub. Traverses the Three.js scene graph, collects all `SplatMesh` instances, sorts splats back-to-front, and draws via a single instanced geometry call.

### Constructor

```ts
const spark = new SparkRenderer({
  renderer: THREE.WebGLRenderer;    // required — create with antialias: false
  clock?: THREE.Clock;              // sync time-based effects (default: new THREE.Clock)
  autoUpdate?: boolean;             // auto-update splats after render (default: true)
  preUpdate?: boolean;              // update before render; false for WebXR (default: false)
  originDistance?: number;          // movement threshold for splat update (default: 1.0)
  maxStdDev?: number;              // max std devs for Gaussian rendering (default: sqrt(8))
  minPixelRadius?: number;         // min splat pixel radius (default: 0.0)
  maxPixelRadius?: number;         // max splat pixel radius (default: 512.0)
  minAlpha?: number;               // min alpha for rendering (default: 0.5/255)
  enable2DGS?: boolean;            // 2D Gaussian splatting mode (default: false)
  preBlurAmount?: number;          // covariance blur scalar (default: 0.0)
  blurAmount?: number;             // blur with opacity adjustment
  focalDistance?: number;           // DoF focal plane distance (default: 0.0)
  apertureAngle?: number;          // aperture angle in radians (default: 0.0)
  falloff?: number;                // Gaussian kernel falloff modulation (default: 1.0)
  clipXY?: number;                 // view frustum clipping factor (default: 1.4)
  focalAdjustment?: number;        // scale calculation adjustment (default: 1.0)
  view?: SparkViewpointOptions;    // default viewpoint config
});
```

### Methods

| Method | Description |
|---|---|
| `newViewpoint(options)` | Create additional viewpoints for multi-view rendering |
| `update({ scene })` | Manually update when `autoUpdate` is false |
| `renderEnvMap({ renderer, scene, worldCenter, ... })` | Render 6 cube faces for environment mapping |
| `recurseSetEnvMap(root, envMap)` | Set envMap recursively on MeshStandardMaterial |
| `getRgba({ generator, ... })` | Extract splat RGBA with SDF edits applied |
| `readRgba({ generator, ... })` | Read RGBA back to CPU as Uint8Array |

### Minimal Setup

```js
import * as THREE from "three";
import { SparkRenderer, SplatMesh } from "@sparkjsdev/spark";

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

const spark = new SparkRenderer({ renderer });

const splat = new SplatMesh({ url: "scene.spz" });
scene.add(splat);

renderer.setAnimationLoop(() => {
  renderer.render(scene, camera);
});
```

## SplatMesh

Extends `THREE.Object3D`. Can be translated, rotated, and scaled like any Three.js object. Supports raycasting for interaction.

### Constructor

```ts
const mesh = new SplatMesh({
  url?: string;                    // load from URL (auto-detects format)
  fileBytes?: Uint8Array | ArrayBuffer;  // decode from raw bytes
  fileType?: SplatFileType;        // override format detection
  packedSplats?: PackedSplats;     // use pre-loaded data (shared instancing)
  maxSplats?: number;              // reserve capacity
  constructSplats?: (splats: PackedSplats) => Promise<void> | void;  // programmatic creation
  onLoad?: (mesh: SplatMesh) => Promise<void> | void;  // load callback
  editable?: boolean;              // enable per-splat editing
  onFrame?: ({ mesh, time, deltaTime }) => void;  // per-frame callback
  objectModifier?: GsplatModifier; // Dyno modifier in object space
  worldModifier?: GsplatModifier;  // Dyno modifier in world space
});
```

### Properties

| Property | Type | Description |
|---|---|---|
| `initialized` | Promise | Resolves when ready |
| `isInitialized` | boolean | Completion flag |
| `recolor` | THREE.Color | Tint all splats (default: white) |
| `opacity` | number | Global opacity multiplier (default: 1) |
| `skinning` | SplatSkinning? | Skeletal animation |
| `edits` | SplatEdit[]? | Per-splat edit list |
| `maxSh` | number | Max spherical harmonics level (default: 3) |

### Methods

| Method | Description |
|---|---|
| `dispose()` | Free GPU buffers |
| `pushSplat(center, scales, quaternion, opacity, color)` | Add a splat |
| `forEachSplat(callback)` | Iterate all splats |
| `getBoundingBox(centers_only?)` | Calculate AABB |
| `updateGenerator()` | Recompile shader pipeline |
| `raycast(raycaster, intersects[])` | Three.js raycaster compatible |

### Loading Patterns

```js
// 1. Direct URL loading
const splat = new SplatMesh({ url: "scene.spz" });
scene.add(splat);

// 2. Shared PackedSplats (load once, instance many)
const packed = new PackedSplats({ url: "asset.ply" });
const instance1 = new SplatMesh({ packedSplats: packed });
const instance2 = new SplatMesh({ packedSplats: packed });
instance2.position.set(5, 0, 0);

// 3. Explicit format for extensionless URLs
const splat = new SplatMesh({
  url: "splatBin/0123456789abcdef",
  fileType: SplatFileType.SPLAT
});

// 4. With load callback
const splat = new SplatMesh({
  url: "scene.ply",
  onLoad: (mesh) => {
    const box = mesh.getBoundingBox();
    console.log("Loaded:", box);
  }
});

// 5. Per-frame animation
const splat = new SplatMesh({
  url: "scene.spz",
  onFrame: ({ mesh, time }) => {
    mesh.rotation.y = Math.sin(time) * 0.5;
  }
});
```

## PackedSplats

Efficient 16-byte-per-splat data container. Used as the intermediate format between loading and rendering.

### Constructor

```ts
const packed = new PackedSplats({
  url?: string;                    // fetch from URL
  fileBytes?: Uint8Array | ArrayBuffer;  // decode from bytes
  fileType?: SplatFileType;        // override format
  maxSplats?: number;              // reserve capacity
  packedArray?: Uint32Array;       // raw packed data (4 uint32 per splat)
  numSplats?: number;              // override count
  construct?: (splats: PackedSplats) => Promise<void> | void;  // programmatic
  extra?: Record<string, unknown>; // extra data (e.g. sh1..3)
});
```

### Packed Data Format (16 bytes per splat)

| Offset | Field | Encoding |
|---|---|---|
| 0 | R | uint8 sRGB |
| 1 | G | uint8 sRGB |
| 2 | B | uint8 sRGB |
| 3 | A | uint8 opacity |
| 4-5 | center.x | float16 |
| 6-7 | center.y | float16 |
| 8-9 | center.z | float16 |
| 10 | quat U | octahedral encoding |
| 11 | quat V | octahedral encoding |
| 12 | scale.x | log-encoded uint8 |
| 13 | scale.y | log-encoded uint8 |
| 14 | scale.z | log-encoded uint8 |
| 15 | quat angle | uint8 (0..pi) |

### Methods

```js
// Get/set individual splats
const { center, scales, quaternion, opacity, color } = packed.getSplat(index);
packed.setSplat(index, center, scales, quaternion, opacity, color);

// Add splats
packed.pushSplat(center, scales, quaternion, opacity, color);

// Iterate all splats
packed.forEachSplat((index, center, scales, quaternion, opacity, color) => {
  // process each splat
});

// Capacity management
packed.ensureSplats(numSplats);

// GPU texture
const texture = packed.getTexture();  // THREE.DataArrayTexture

// Cleanup
packed.dispose();
```

### Low-Level Utilities

```js
import { utils } from "@sparkjsdev/spark";

// Direct Uint32 manipulation
utils.setPackedSplat(packed.packedArray, index, x, y, z, scaleX, scaleY, scaleZ, ...);
utils.setPackedSplatQuat(packed.packedArray, index, quatX, quatY, quatZ, quatW);
utils.setPackedSplatScales(packed.packedArray, index, x, y, z);

// Unpack
const { center, scales, quaternion, color, opacity } = utils.unpackSplat(packed.packedArray, index);
```

## SplatLoader

Progress-aware loading for large splat files.

```js
import { SplatLoader } from "@sparkjsdev/spark";

const loader = new SplatLoader();
loader.loadAsync(url, (event) => {
  if (event.type === "progress") {
    const pct = ((event.loaded / event.total) * 100).toFixed(1);
    console.log(`Loading: ${pct}%`);
  }
}).then((packedSplats) => {
  const mesh = new SplatMesh({ packedSplats });
  scene.add(mesh);
});
```

## Dyno (Shader Graph System)

Compose JavaScript functions into GLSL computation graphs that run on the GPU. Used for procedural splat generation, custom effects, and per-splat modifications.

### Core Types

```js
import { dyno } from "@sparkjsdev/spark";

// Literal GLSL value
dyno.dynoLiteral("float", "1.0");
dyno.dynoLiteral("vec3", "vec3(1.0, 2.0, 3.0)");

// JavaScript value -> GLSL
dyno.dynoConst("float", 1.0);
dyno.dynoConst("vec3", new THREE.Vector3(1, 2, 3));
```

### Creating Dyno Blocks

```js
const myGenerator = dyno.dynoBlock(
  { index: "int" },           // inputs
  { gsplat: Gsplat },         // outputs
  ({ index }) => {             // graph builder
    let gsplat = dyno.readPackedSplat(myPackedSplats, index);
    const opacity = dyno.dynoConst("float", 1.0);
    gsplat = dyno.combineGsplat({ gsplat, opacity });
    return { gsplat };
  }
);
```

### Using with SplatMesh

Inject Dyno modifiers into the rendering pipeline:

```js
const splat = new SplatMesh({
  url: "scene.spz",
  objectModifier: myObjectSpaceDyno,  // runs in object space
  worldModifier: myWorldSpaceDyno,    // runs in world space
});
```

### Built-in Operations

```js
// Arithmetic
const { sum } = dyno.add(a, b).outputs;

// Read splat data from PackedSplats
const gsplat = dyno.readPackedSplat(packedSplats.dyno, index);

// Split/combine gsplat fields
const { center, scales, quaternion, opacity, color } = dyno.splitGsplat(gsplat);
const modified = dyno.combineGsplat({ gsplat, opacity: newOpacity });
```

## Rendering Pipeline (Architecture)

```
1. SparkRenderer traverses scene, collects all SplatMesh instances
2. SplatMesh reads from PackedSplats templates, applies Dyno modifiers
3. Splats aggregated via SplatAccumulator -> PackedSplats (16 bytes/splat)
4. SparkViewpoint reads back distance list from GPU
5. SplatWorker sorts via bucket sort in background thread
6. Single instanced draw call renders back-to-front
```

## Examples (sparkjs.dev/examples)

| Category | Examples |
|---|---|
| Core | Hello World, Environment Map, Interactivity, Multiple Splats, Multiple Viewpoints |
| Rendering | Procedural Splats, Shader Effects, Texture, Stochastic Sorting, SOGS Compression, DoF, Debug Coloring |
| Interactive | Raycasting, Splat Painter, Dynamic Lighting, Reveal Effects, Transitions |
| Simulation | Particle Animation, Particle Simulation, Editor |
| Advanced | WebXR, GLSL Shaders |
