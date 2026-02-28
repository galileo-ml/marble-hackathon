"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Local SPZ paths for each painting
const PAINTING_SPZ: Record<string, string> = {
  "bedroom-in-ares": "/paintings/bedroom-in-ares.spz",
  "music-lesson": "/paintings/music-lesson.spz",
  "nighthawks": "/paintings/nighthawks.spz",
  "courtyard-in-delft": "/paintings/courtyard-in-delft.spz",
  "the-dream": "/paintings/the-dream.spz",
  "red-studio": "/paintings/red-studio.spz",
};

// Calibrated painting positions from user walkthrough
const PAINTING_POSITIONS = [
  { id: "bedroom-in-ares", label: "Bedroom in Arles", position: new THREE.Vector3(-2.763, 1.804, -5.218) },
  { id: "music-lesson", label: "The Music Lesson", position: new THREE.Vector3(-2.138, 1.748, -6.088) },
  { id: "nighthawks", label: "Nighthawks", position: new THREE.Vector3(-0.022, 1.750, -7.034) },
  { id: "courtyard-in-delft", label: "Courtyard in Delft", position: new THREE.Vector3(2.145, 1.775, -6.041) },
  { id: "the-dream", label: "The Dream", position: new THREE.Vector3(2.778, 2.223, -5.289) },
  { id: "red-studio", label: "The Red Studio", position: new THREE.Vector3(2.845, 1.749, -4.270) },
];

const PROXIMITY_PRELOAD = 5.0;
const PROXIMITY_HINT = 2.5;
const PROXIMITY_ENTER = 0.7;

export default function Museum() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"museum" | "world">("museum");
  const [transitioning, setTransitioning] = useState(false);
  const [hintText, setHintText] = useState("");
  const [fadeOpacity, setFadeOpacity] = useState(0);

  const museumSceneRef = useRef<THREE.Scene | null>(null);
  const worldSceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<any>(null);
  const modeRef = useRef<"museum" | "world">("museum");
  const transitioningRef = useRef(false);
  const enteredRef = useRef(false);
  const SplatMeshRef = useRef<any>(null);

  // Camera rotation state (shared between init and handlers via refs)
  const yawRef = useRef(0);
  const pitchRef = useRef(0);

  const preloadingIdRef = useRef<string | null>(null);
  const preloadedIdRef = useRef<string | null>(null);
  const preloadedSplatRef = useRef<any>(null);

  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { transitioningRef.current = transitioning; }, [transitioning]);

  // Enter painting — instant swap, preserve camera direction
  const handleEnterPainting = useCallback((paintingId: string) => {
    if (transitioningRef.current || modeRef.current !== "museum") return;
    if (!PAINTING_SPZ[paintingId]) return;
    if (preloadedIdRef.current !== paintingId || !preloadedSplatRef.current) return;

    enteredRef.current = true;

    const worldScene = worldSceneRef.current;
    if (worldScene) {
      while (worldScene.children.length > 0) worldScene.remove(worldScene.children[0]);
      worldScene.add(preloadedSplatRef.current);
    }

    // Reset camera to eye level looking straight ahead
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 1.6, 0);
    }
    yawRef.current = 0;
    pitchRef.current = 0;

    modeRef.current = "world";
    setMode("world");
    setHintText("");
  }, []);

  // Exit world — fade out
  const handleExitWorld = useCallback(() => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setTransitioning(true);

    setFadeOpacity(1);
    setTimeout(() => {
      const worldScene = worldSceneRef.current;
      if (worldScene) {
        while (worldScene.children.length > 0) worldScene.remove(worldScene.children[0]);
      }

      preloadedIdRef.current = null;
      preloadedSplatRef.current = null;
      preloadingIdRef.current = null;

      modeRef.current = "museum";
      setMode("museum");
      enteredRef.current = false;

      if (cameraRef.current) {
        cameraRef.current.position.set(0, 1.6, 0);
      }
      // Reset look direction to forward
      yawRef.current = 0;
      pitchRef.current = 0;

      setTimeout(() => {
        setFadeOpacity(0);
        setTransitioning(false);
        transitioningRef.current = false;
      }, 100);
    }, 600);
  }, []);

  // X key to exit world
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "x" && modeRef.current === "world") {
        handleExitWorld();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleExitWorld]);

  // Main rendering pipeline
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;

    async function init() {
      const { SplatMesh, SparkControls } = await import("@sparkjsdev/spark");
      SplatMeshRef.current = SplatMesh;

      if (disposed) return;

      const width = container!.clientWidth;
      const height = container!.clientHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.autoClear = false;
      container!.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.set(0, 1.6, 0);
      cameraRef.current = camera;

      const controls = new SparkControls({ canvas: renderer.domElement });
      controls.fpsMovement.moveSpeed = 5;
      controls.pointerControls.enable = false;
      controlsRef.current = controls;

      // Pointer lock for free mouse look
      const onMouseMove = (e: MouseEvent) => {
        if (document.pointerLockElement !== renderer.domElement) return;
        yawRef.current -= e.movementX * 0.002;
        pitchRef.current -= e.movementY * 0.002;
        pitchRef.current = Math.max(-Math.PI * 0.44, Math.min(Math.PI * 0.44, pitchRef.current));
      };

      const onClick = () => {
        renderer.domElement.requestPointerLock();
      };

      document.addEventListener("mousemove", onMouseMove);
      renderer.domElement.addEventListener("click", onClick);

      const museumScene = new THREE.Scene();
      museumSceneRef.current = museumScene;

      const worldScene = new THREE.Scene();
      worldSceneRef.current = worldScene;

      // Load museum splat
      try {
        new SplatMesh({
          url: "/paintings/museum.spz",
          onLoad: (mesh: any) => {
            museumScene.add(mesh);
          },
        });
      } catch {
        // silently handle
      }

      // Animation loop
      renderer.setAnimationLoop(() => {
        if (disposed) return;

        // Apply pointer lock rotation
        const euler = new THREE.Euler(pitchRef.current, yawRef.current, 0, "YXZ");
        camera.quaternion.setFromEuler(euler);

        controls.update(camera);
        renderer.clear();

        if (modeRef.current === "museum") {
          renderer.render(museumScene, camera);

          if (!enteredRef.current && !transitioningRef.current) {
            let closestDist = Infinity;
            let closestPainting: (typeof PAINTING_POSITIONS)[0] | null = null;

            for (const painting of PAINTING_POSITIONS) {
              const dx = camera.position.x - painting.position.x;
              const dz = camera.position.z - painting.position.z;
              const dist = Math.sqrt(dx * dx + dz * dz);
              if (dist < closestDist) {
                closestDist = dist;
                closestPainting = painting;
              }
            }

            if (closestPainting && closestDist < PROXIMITY_PRELOAD) {
              const targetId = closestPainting.id;

              if (preloadingIdRef.current !== targetId && preloadedIdRef.current !== targetId) {
                if (preloadedSplatRef.current) {
                  preloadedSplatRef.current = null;
                }
                preloadedIdRef.current = null;
                preloadingIdRef.current = targetId;

                const url = PAINTING_SPZ[targetId];
                try {
                  new SplatMeshRef.current({
                    url,
                    onLoad: (mesh: any) => {
                      if (preloadingIdRef.current === targetId) {
                        preloadedIdRef.current = targetId;
                        preloadedSplatRef.current = mesh;
                        preloadingIdRef.current = null;
                      }
                    },
                  });
                } catch {
                  preloadingIdRef.current = null;
                }
              }

              if (closestDist < PROXIMITY_HINT) {
                const isReady = preloadedIdRef.current === closestPainting.id;
                if (closestDist < PROXIMITY_ENTER && isReady) {
                  handleEnterPainting(closestPainting.id);
                  setHintText("");
                } else if (closestDist < PROXIMITY_ENTER && !isReady) {
                  // Silently wait for load, no text
                } else {
                  setHintText(closestDist < PROXIMITY_ENTER + 0.3
                    ? `Walk into ${closestPainting.label}...`
                    : `${closestPainting.label} — walk closer to enter`);
                }
              } else {
                setHintText("");
              }
            } else {
              setHintText("");
              if (preloadingIdRef.current || preloadedIdRef.current) {
                preloadedSplatRef.current = null;
                preloadedIdRef.current = null;
                preloadingIdRef.current = null;
              }
            }
          }
        } else {
          renderer.render(worldScene, camera);
        }
      });

      // Resize
      const handleResize = () => {
        const w = container!.clientWidth;
        const h = container!.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        disposed = true;
        document.removeEventListener("mousemove", onMouseMove);
        renderer.domElement.removeEventListener("click", onClick);
        window.removeEventListener("resize", handleResize);
        renderer.setAnimationLoop(null);
        renderer.dispose();
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    }

    const cleanupPromise = init();

    return () => {
      disposed = true;
      cleanupPromise.then((cleanup) => cleanup?.());
    };
  }, [handleEnterPainting, handleExitWorld]);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-black">
      <div ref={containerRef} className="h-full w-full" />

      {/* Fade overlay (only used for exit transition) */}
      <div
        className="absolute inset-0 bg-black pointer-events-none z-50"
        style={{
          opacity: fadeOpacity,
          transition: "opacity 600ms ease-in-out",
        }}
      />

      {/* Crosshair (museum mode) */}
      {mode === "museum" && !transitioning && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="w-5 h-5 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/40" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-white/40" />
          </div>
        </div>
      )}

      {/* Hint text (museum mode) */}
      {hintText && mode === "museum" && !transitioning && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20
          text-amber-100 text-lg pointer-events-none bg-black/50 px-5 py-2 rounded-lg"
          style={{ fontFamily: "Georgia, serif", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
        >
          {hintText}
        </div>
      )}

      {/* Back button (world mode) */}
      {mode === "world" && !transitioning && (
        <button
          onClick={handleExitWorld}
          className="absolute top-6 left-6 z-40 px-4 py-2 bg-black/60 backdrop-blur-sm
            text-amber-100 rounded-lg border border-amber-900/40 hover:bg-black/80
            hover:border-amber-600/60 transition-all cursor-pointer"
        >
          ← Back to Museum
        </button>
      )}

      {/* X key hint (world mode) */}
      {mode === "world" && !transitioning && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40
          text-amber-200/40 text-sm pointer-events-none">
          Press X to return to museum
        </div>
      )}
    </div>
  );
}
