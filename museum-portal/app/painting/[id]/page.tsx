"use client";

import { useParams } from "next/navigation";
import { paintings } from "../../lib/paintings";
import Link from "next/link";

export default function PaintingDetailPage() {
  const params = useParams();
  const painting = paintings.find((p) => p.id === params.id);

  if (!painting) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-amber-200/60">Painting not found</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-amber-200/60 transition-colors hover:text-amber-200"
        >
          &larr; Back to Museum
        </Link>

        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h1 className="text-4xl font-bold text-amber-50">{painting.title}</h1>
          <p className="text-lg text-amber-200/60">
            {painting.artist}, {painting.year}
          </p>
          <p className="text-amber-100/80">
            Visit the museum to experience this painting as an immersive 3D world.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-8 py-4 text-lg font-semibold text-black transition-all hover:from-amber-500 hover:to-amber-400"
          >
            Enter Museum
          </Link>
        </div>
      </div>
    </main>
  );
}
