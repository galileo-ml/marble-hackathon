"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function WorldViewer({ spzUrl, onExit }: { spzUrl: string; onExit?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let animationId: number | undefined;

    async function init() {
      const { SplatMesh, SparkControls } = await import("@sparkjsdev/spark");

      if (disposed) return;

      const width = container!.clientWidth;
      const height = container!.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      // Start at eye level so we're not stuck in the floor
      camera.position.set(0, 1.6, 0);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      container!.appendChild(renderer.domElement);

      const controls = new SparkControls({ canvas: renderer.domElement });

      try {
        const splat = new SplatMesh({ url: spzUrl });
        scene.add(splat);
        setLoading(false);
      } catch (e) {
        setError("Failed to load 3D world");
        setLoading(false);
        return;
      }

      renderer.setAnimationLoop(() => {
        if (disposed) return;
        controls.update(camera);
        renderer.render(scene, camera);
      });

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
      };
    }

    const cleanupPromise = init();

    return () => {
      disposed = true;
      cleanupPromise.then((cleanup) => cleanup?.());
    };
  }, [spzUrl]);

  return (
    <div ref={containerRef} className="h-full w-full relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="space-y-4 text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-900 border-t-amber-400" />
            <p className="text-amber-200/70">Loading 3D world...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <p className="text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
