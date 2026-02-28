# Rapier Physics Patterns for Gaussian Splat Scenes

Patterns for integrating [Rapier](https://rapier.rs/) physics with SparkJS Gaussian splat environments.

## Setup

### Packages

```bash
# Standalone (recommended for bundler compatibility)
npm install @dimforge/rapier3d-compat

# Or standard (requires dynamic WASM import)
npm install @dimforge/rapier3d

# React Three Fiber wrapper
npm install @react-three/rapier
```

### Initialization

```js
// -compat packages require explicit init
import RAPIER from '@dimforge/rapier3d-compat';
await RAPIER.init();
const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });

// Standard packages use dynamic import
const RAPIER = await import('@dimforge/rapier3d');
const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
```

## Core Pattern: Rigid Body + Collider

Every physics object is a rigid body with one or more colliders attached.

```js
// 1. Describe the body
const bodyDesc = RAPIER.RigidBodyDesc.dynamic()
  .setTranslation(0, 5, 0);
const body = world.createRigidBody(bodyDesc);

// 2. Describe the collider
const colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5); // half-extents
world.createCollider(colliderDesc, body);

// 3. Step each frame
function update() {
  world.step();
  const pos = body.translation();  // { x, y, z }
  const rot = body.rotation();     // { x, y, z, w } quaternion
  // Sync Three.js mesh to physics body
  mesh.position.set(pos.x, pos.y, pos.z);
  mesh.quaternion.set(rot.x, rot.y, rot.z, rot.w);
}
```

### Body Types

| Type | Method | Use case |
|---|---|---|
| Dynamic | `RigidBodyDesc.dynamic()` | Objects affected by forces and gravity |
| Fixed | `RigidBodyDesc.fixed()` | Static geometry (floors, walls) |
| Kinematic Position | `RigidBodyDesc.kinematicPositionBased()` | Player characters, moving platforms |
| Kinematic Velocity | `RigidBodyDesc.kinematicVelocityBased()` | Velocity-driven kinematic objects |

## Trimesh Collider from GLB

Load a simplified collision mesh (GLB) and create a trimesh collider that aligns with splat visuals. This is the core pattern from `spark-physics`.

```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const gltf = await loader.loadAsync('collision-mesh.glb');

// Extract geometry from the loaded model
gltf.scene.traverse((child) => {
  if (child.isMesh) {
    const geometry = child.geometry;
    const vertices = new Float32Array(geometry.attributes.position.array);
    const indices = new Uint32Array(geometry.index.array);

    // Create trimesh collider
    const colliderDesc = RAPIER.ColliderDesc.trimesh(vertices, indices);
    const bodyDesc = RAPIER.RigidBodyDesc.fixed();
    const body = world.createRigidBody(bodyDesc);
    world.createCollider(colliderDesc, body);
  }
});
```

### Aligning Colliders with Splats

```
Scene setup:
1. Load splat via SparkJS SplatMesh (visual layer)
2. Load simplified GLB of same scene (collision layer)
3. Create trimesh colliders from GLB geometry
4. GLB mesh is invisible (mesh.visible = false) — only physics
5. Splat and GLB share same coordinate space

Important: The collision GLB should be a simplified version of the
scene geometry. It does NOT need to match the splat exactly — rough
approximation is fine for physics.
```

## Capsule Character Controller

The standard pattern for first-person and third-person controllers in splat scenes. Uses a kinematic body with capsule collider and manual ground detection.

```js
// Character body — kinematic so we control position directly
const characterDesc = RAPIER.RigidBodyDesc.kinematicPositionBased()
  .setTranslation(0, 2, 0);
const characterBody = world.createRigidBody(characterDesc);

// Capsule collider — radius 0.3, half-height 0.5
const capsuleDesc = RAPIER.ColliderDesc.capsule(0.5, 0.3);
world.createCollider(capsuleDesc, characterBody);

// Movement state
const velocity = { x: 0, y: 0, z: 0 };
const SPEED = 5;
const GRAVITY = -20;
const JUMP_FORCE = 8;
let grounded = false;

function updateCharacter(deltaTime, inputDir) {
  const pos = characterBody.translation();

  // Ground detection via raycast
  const ray = new RAPIER.Ray(
    { x: pos.x, y: pos.y, z: pos.z },
    { x: 0, y: -1, z: 0 }
  );
  const hit = world.castRay(ray, 1.1, true); // max distance, solid
  grounded = hit !== null && hit.timeOfImpact < 1.05;

  // Apply gravity
  if (grounded) {
    velocity.y = 0;
  } else {
    velocity.y += GRAVITY * deltaTime;
  }

  // Horizontal movement from input
  velocity.x = inputDir.x * SPEED;
  velocity.z = inputDir.z * SPEED;

  // Update position
  const nextPos = {
    x: pos.x + velocity.x * deltaTime,
    y: pos.y + velocity.y * deltaTime,
    z: pos.z + velocity.z * deltaTime,
  };
  characterBody.setNextKinematicTranslation(nextPos);

  // Step physics
  world.step();

  return characterBody.translation();
}

function jump() {
  if (grounded) {
    velocity.y = JUMP_FORCE;
  }
}
```

### Camera Follow (FPS)

```js
function updateCamera(camera, characterPos) {
  camera.position.set(
    characterPos.x,
    characterPos.y + 1.6,  // eye height
    characterPos.z
  );
}
```

### Camera Follow (TPS)

```js
function updateCamera(camera, characterPos, yaw, pitch, distance) {
  const offset = new THREE.Vector3(
    Math.sin(yaw) * Math.cos(pitch) * distance,
    Math.sin(pitch) * distance,
    Math.cos(yaw) * Math.cos(pitch) * distance
  );
  camera.position.copy(characterPos).add(offset);
  camera.position.y += 1.6; // target height
  camera.lookAt(characterPos.x, characterPos.y + 1.2, characterPos.z);
}
```

## Collision Events

Detect when physics bodies collide — useful for triggering audio, effects, or game logic.

```js
// Create collider with events enabled
const colliderDesc = RAPIER.ColliderDesc.cuboid(1, 1, 1)
  .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS);
world.createCollider(colliderDesc, body);

// Create event queue
const eventQueue = new RAPIER.EventQueue(true);

// Check events each frame
function update() {
  world.step(eventQueue);

  eventQueue.drainCollisionEvents((handle1, handle2, started) => {
    if (started) {
      console.log("Collision started:", handle1, handle2);
      // Trigger spatial audio, particle effects, etc.
    } else {
      console.log("Collision ended:", handle1, handle2);
    }
  });
}
```

## Debug Visualization

Rapier's `debugRender()` returns raw vertex/color data. Render it with Three.js for development.

```js
function createDebugRenderer(world, scene) {
  const material = new THREE.LineBasicMaterial({ vertexColors: true });
  const geometry = new THREE.BufferGeometry();
  const lines = new THREE.LineSegments(geometry, material);
  scene.add(lines);

  return function updateDebug() {
    const { vertices, colors } = world.debugRender();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
  };
}

// Usage in render loop
const updateDebug = createDebugRenderer(world, scene);
function animate() {
  world.step();
  updateDebug();
  renderer.render(scene, camera);
}
```

## React Three Fiber + Rapier

Declarative physics with `@react-three/rapier`. Used by `character-controller-sample-project`.

```jsx
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';

function Scene() {
  return (
    <Canvas>
      <Physics gravity={[0, -9.81, 0]} debug>
        {/* Static floor */}
        <RigidBody type="fixed">
          <CuboidCollider args={[10, 0.1, 10]} />
        </RigidBody>

        {/* Dynamic object */}
        <RigidBody type="dynamic" position={[0, 5, 0]}>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial />
          </mesh>
        </RigidBody>
      </Physics>
    </Canvas>
  );
}
```

### R3F Trimesh from GLB

```jsx
import { useGLTF } from '@react-three/drei';
import { RigidBody, TrimeshCollider } from '@react-three/rapier';

function CollisionMesh({ url }) {
  const { scene } = useGLTF(url);
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene} visible={false} />
    </RigidBody>
  );
}
```

## Collider Reference

| Collider | Constructor | Use Case |
|---|---|---|
| Cuboid | `ColliderDesc.cuboid(hx, hy, hz)` | Walls, floors, boxes |
| Ball | `ColliderDesc.ball(radius)` | Spheres, marbles |
| Capsule | `ColliderDesc.capsule(halfHeight, radius)` | Character controllers |
| Cylinder | `ColliderDesc.cylinder(halfHeight, radius)` | Columns, pipes |
| Cone | `ColliderDesc.cone(halfHeight, radius)` | Pointed objects |
| Trimesh | `ColliderDesc.trimesh(vertices, indices)` | Complex static geometry |
| Convex Hull | `ColliderDesc.convexHull(points)` | Irregular dynamic objects |
| Heightfield | `ColliderDesc.heightfield(rows, cols, heights, scale)` | Terrain |

## Generating Collision Meshes from Splats (splat2mesh)

The `splat2mesh` tool from [61cygni/protoverse](https://github.com/61cygni/protoverse) converts Gaussian splat files into polygon meshes suitable for Rapier trimesh colliders. This is the missing step between "load a splat" and "create physics colliders."

**Tool location**: `tools/splat2mesh.html` (single-file, runs in-browser)

### Pipeline

```
.spz / .ply / .splat file
  → Load via SparkJS SplatMesh
  → Filter by opacity cutoff (remove transparent splats)
  → Subsample at configurable rate (reduce point count)
  → Voxelize into 3D grid (distance-weighted fill)
  → Marching cubes at iso-level 0.5
  → Export collision-mesh.glb
  → (Optional) Simplify with meshoptimizer WASM
  → Export simplified-mesh.glb
  → Load into Rapier as trimesh collider
```

### Two-Tab Workflow

**Tab 1 — Splat to Mesh**: Load splat file, configure opacity cutoff and sample rate, voxelize, run marching cubes, preview with WASD+mouse-look, export as `collision-mesh.glb`.

**Tab 2 — Simplify Mesh**: Load the GLB from Tab 1 (or any GLB/GLTF), optionally paint patches onto the surface, simplify via meshoptimizer with configurable reduction %, export as `simplified-mesh.glb`.

### Loading the Result into Rapier

```js
// Load the collision mesh exported from splat2mesh
const gltf = await new GLTFLoader().loadAsync('collision-mesh.glb');

gltf.scene.traverse((child) => {
  if (child.isMesh) {
    const vertices = new Float32Array(child.geometry.attributes.position.array);
    const indices = new Uint32Array(child.geometry.index.array);

    const bodyDesc = RAPIER.RigidBodyDesc.fixed();
    const body = world.createRigidBody(bodyDesc);
    const colliderDesc = RAPIER.ColliderDesc.trimesh(vertices, indices);
    world.createCollider(colliderDesc, body);
  }
});
```

### Tips

- **Opacity cutoff**: Start around 0.5 — this filters out semi-transparent splats that don't represent solid surfaces
- **Sample rate**: Lower values (e.g., 0.1) produce faster but coarser meshes; higher values (e.g., 0.5) give more detail
- **Simplification**: Use Tab 2's meshoptimizer to reduce triangle count — collision meshes don't need visual detail, aim for the simplest geometry that approximates the scene surfaces
- **Patch tool**: Use Tab 2's patch painting to fill holes or add collision surfaces where the automatic mesh generation missed geometry
- **Coordinate alignment**: The exported GLB preserves the same coordinate space as the input splat — no manual alignment needed when loading both into the same Three.js scene

## Common Pitfalls

- **WASM init**: Always `await RAPIER.init()` before creating worlds (for `-compat` packages)
- **Fixed timestep**: Use a fixed timestep for `world.step()` or accumulate delta time — variable steps cause jitter
- **Trimesh on dynamic bodies**: Trimesh colliders only work on `fixed` bodies. Use convex hull for dynamic objects.
- **Coordinate alignment**: Ensure GLB collision mesh uses the same coordinate space and scale as the splat
- **Collider size**: `cuboid(hx, hy, hz)` takes **half-extents**, not full dimensions
