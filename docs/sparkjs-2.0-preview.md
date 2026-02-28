# SparkJS 2.0 Preview — New Features

> Source: https://sparkjs.dev/2.0.0-preview/docs/new-features-2.0/
> Covers features not in `sparkjs-cheatsheet.md` (which targets 0.1).
> Migration: 2.0 is "mostly backward compatible" with 0.1; specialized cases require updates.

---

## LoD System

The headline feature: render huge worlds of dynamic 3D Gaussian Splats at steady frame rates via a **Level-of-Detail Splat Tree**.

- Interior nodes = downsampled versions of original splats; root = averaged color/shape
- Traversal: `O(N log N)`, rendering: `O(N + …)` with fixed splat budget (default 500K–2.5M)
- **Composite LoD**: multiple splat objects render together with joint tree traversal

### Algorithms
| Algorithm | Speed | Quality | Use case |
|---|---|---|---|
| `tiny-lod` | Fast, on-demand | Lower | Quick iteration |
| `bhatt-lod` | Pre-processing | Higher | Production |

### Usage

```js
// Enable LoD on load
scene.add(new SplatMesh({ url: "./my-splats.spz", lod: true }));

// Keep non-LoD version alongside
scene.add(new SplatMesh({ url: "./my-splats.spz", lod: true, nonLod: true }));

// On-demand LoD creation
await splatMesh.createLodSplats();

// Check/toggle at runtime
splatMesh.enableLod = true;
```

### CLI
```bash
# Pre-build LoD tree (bhatt-lod)
npx build-lod my-splats.spz
```

---

## RAD Format

New `.RAD` (RADiance field) format — extensible container for precomputed LoD trees.

- **HTTP Range requests**: stream only the data needed for current viewpoint
- **Coarse-to-fine**: progressive loading, visible quality improves as more data arrives
- **Multi-GB support**: `ReadableStream` API, works on mobile

```js
scene.add(new SplatMesh({ url: "./scene.rad", lod: true }));
```

---

## Memory Management

Shared **LRU splat page table** manages GPU memory across composite worlds:

- Pre-allocates a fixed GPU pool (default: **16M splats**)
- Auto-evicts chunks based on viewpoint relevance
- Supports **100M+ splat scenes on mobile**

```js
// Configure pool size (in splats)
SparkRenderer.setSplatPoolSize(32_000_000); // 32M splats
```

---

## ExtSplats Encoding

New 32-byte/splat encoding (vs 16-byte `PackedSplats` in 0.1):

| | PackedSplats (0.1) | ExtSplats (2.0) |
|---|---|---|
| Bytes/splat | 16 | 32 |
| Center coords | float16 | **float32** |
| Quantization artifacts | Yes (large scenes) | No |
| Modes | — | per-mesh / accumulator / pager |

```js
// Enable ExtSplats encoding
const splat = new SplatMesh({ url: "scene.spz", covSplats: true });
```

---

## Multiple SparkRenderer Instances

2.0 supports independent renderers with separate:
- Viewpoints / cameras
- Scene content
- Shader effects

Also adds **offline / frame-by-frame rendering** mode.

```js
const renderer1 = new SparkRenderer({ renderer: glRenderer1 });
const renderer2 = new SparkRenderer({ renderer: glRenderer2 });
// Each manages its own splat scene independently
```

---

## SparkXr (AR/VR)

New `SparkXr` class for immersive experiences:

- AR/VR entry point with UI buttons
- Hand tracking support

```js
import { SparkXr } from "@sparkjsdev/spark";
const xr = new SparkXr({ renderer, scene, camera });
xr.init();
```

---

## Experimental Features

### Covariance Splats
Non-uniform scaling support:
```js
const splat = new SplatMesh({ url: "scene.spz", covSplats: true });
```

### Linear Blend Skinning
Character animation via rigged bone systems — enables splat-based rigged characters.

```js
// Attach splat to a skinned mesh skeleton (API TBD in stable release)
```

### SparkPortals
Dynamic portals connecting separate spaces:
```js
import { SparkPortals } from "@sparkjsdev/spark";
// Portal-based rendering between interconnected scenes
```

---

## vs 0.1 Cheatsheet

| Feature | 0.1 (cheatsheet) | 2.0 (this doc) |
|---|---|---|
| LoD | No | Yes (tiny-lod, bhatt-lod) |
| Streaming format | PLY, SPZ, SPLAT, KSPLAT, SOGS | + RAD |
| Center precision | float16 | float32 (ExtSplats) |
| Multi-renderer | No | Yes |
| AR/VR | No | SparkXr |
| Skinning | No | Experimental |
| Portals | No | Experimental |
| GPU pool | Unmanaged | Shared LRU, configurable |
