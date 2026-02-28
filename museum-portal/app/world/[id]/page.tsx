"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { paintings } from "../../lib/paintings";
import WorldViewer from "../../components/WorldViewer";
import Link from "next/link";

export default function WorldPage() {
  const params = useParams();
  const painting = paintings.find((p) => p.id === params.id);
  const [spzUrl, setSpzUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(`world-${params.id}`);
    if (stored) {
      const data = JSON.parse(stored);
      setSpzUrl(data.spzUrl);
    } else {
      setError("No world data found. Please generate from the painting page.");
    }
  }, [params.id]);

  if (!painting) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-amber-200/60">Painting not found</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {spzUrl && <WorldViewer spzUrl={spzUrl} />}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-4 text-center">
            <p className="text-red-400">{error}</p>
            <Link
              href={`/painting/${painting.id}`}
              className="inline-block rounded-lg bg-amber-600 px-6 py-3 text-black font-semibold hover:bg-amber-500"
            >
              Go to Painting
            </Link>
          </div>
        </div>
      )}

      {/* Overlay UI */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-6">
        <div className="pointer-events-auto">
          <Link
            href="/"
            className="rounded-lg bg-black/60 px-4 py-2 text-sm text-amber-200 backdrop-blur transition-colors hover:bg-black/80"
          >
            &larr; Back to Gallery
          </Link>
        </div>
        <div className="rounded-lg bg-black/60 px-4 py-2 text-right backdrop-blur">
          <p className="text-sm font-semibold text-amber-100">
            {painting.title}
          </p>
          <p className="text-xs text-amber-200/60">{painting.artist}</p>
        </div>
      </div>
    </div>
  );
}
