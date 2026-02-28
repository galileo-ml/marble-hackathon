"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// Calibrated painting positions from user walkthrough
const PAINTING_POSITIONS = [
  { id: "bedroom-in-ares", label: "Bedroom in Arles", position: new THREE.Vector3(-2.763, 1.804, -5.218) },
  { id: "music-lesson", label: "The Music Lesson", position: new THREE.Vector3(-2.138, 1.748, -6.088) },
  { id: "nighthawks", label: "Nighthawks", position: new THREE.Vector3(-0.022, 1.750, -7.034) },
  { id: "courtyard-in-delft", label: "Courtyard in Delft", position: new THREE.Vector3(2.145, 1.775, -6.041) },
  { id: "the-dream", label: "The Dream", position: new THREE.Vector3(2.778, 2.223, -5.289) },
  { id: "red-studio", label: "The Red Studio", position: new THREE.Vector3(2.845, 1.749, -4.270) },
];

const PROXIMITY_HINT = 2.5;  // Show hint text
const PROXIMITY_ENTER = 1.2; // Trigger painting entry

interface MuseumSceneProps {
  onEnterPainting: (paintingId: string) => void;
}

export default function MuseumScene({ onEnterPainting }: MuseumSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;

    async function init() {
      const { SplatMesh, SparkControls } = await import("@sparkjsdev/spark");

      if (disposed) return;

      const width = container!.clientWidth;
      const height = container!.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container!.appendChild(renderer.domElement);

      const controls = new SparkControls({ canvas: renderer.domElement });

      // Load museum splat
      try {
        const splat = new SplatMesh({
          url: "/paintings/museum.spz",
          onLoad: () => {
            setLoading(false);
          },
        });
        scene.add(splat);
      } catch {
        setLoading(false);
        return;
      }

      // Hint overlay
      const hintEl = document.createElement("div");
      hintEl.style.cssText =
        "position:absolute;bottom:100px;left:50%;transform:translateX(-50%);" +
        "color:#f5e6c8;font:18px Georgia,serif;text-align:center;pointer-events:none;" +
        "opacity:0;transition:opacity 0.3s;text-shadow:0 2px 8px rgba(0,0,0,0.8);" +
        "background:rgba(0,0,0,0.5);padding:8px 20px;border-radius:8px;";
      container!.appendChild(hintEl);

      let enteredPainting = false;

      renderer.setAnimationLoop(() => {
        if (disposed) return;

        controls.update(camera);
        renderer.render(scene, camera);

        // Proximity detection (XZ distance only — ignore height differences)
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

        if (closestPainting && closestDist < PROXIMITY_HINT) {
          if (closestDist < PROXIMITY_ENTER && !enteredPainting) {
            enteredPainting = true;
            hintEl.style.opacity = "0";
            onEnterPainting(closestPainting.id);
          } else {
            hintEl.textContent = closestDist < PROXIMITY_ENTER + 0.3
              ? `Walk into ${closestPainting.label}...`
              : `${closestPainting.label} — walk closer to enter`;
            hintEl.style.opacity = "1";
          }
        } else {
          hintEl.style.opacity = "0";
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
        window.removeEventListener("resize", handleResize);
        renderer.setAnimationLoop(null);
        renderer.dispose();
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
        if (container && hintEl.parentNode === container) {
          container.removeChild(hintEl);
        }
      };
    }

    const cleanupPromise = init();

    return () => {
      disposed = true;
      cleanupPromise.then((cleanup) => cleanup?.());
    };
  }, [onEnterPainting]);

  return (
    <div ref={containerRef} className="h-full w-full relative">
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-900 border-t-amber-400" />
            <p className="text-amber-200/70">Loading museum...</p>
          </div>
        </div>
      )}

      {/* Crosshair */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="w-5 h-5 relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/40" />
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/40" />
        </div>
      </div>
    </div>
  );
}
