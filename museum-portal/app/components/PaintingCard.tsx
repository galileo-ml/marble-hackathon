import Link from "next/link";
import type { Painting } from "../lib/paintings";

export default function PaintingCard({ painting }: { painting: Painting }) {
  return (
    <Link href={`/painting/${painting.id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg border-2 border-amber-900/40 bg-[#1a1510] p-3 transition-all duration-300 group-hover:border-amber-600/60 group-hover:shadow-[0_0_30px_rgba(217,170,75,0.15)]">
        <div className="relative aspect-[4/3] overflow-hidden rounded bg-amber-900/20 flex items-center justify-center">
          <span className="text-amber-200/40 text-sm">3D World</span>
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-lg font-semibold text-amber-100 group-hover:text-amber-50">
            {painting.title}
          </h3>
          <p className="text-sm text-amber-200/60">
            {painting.artist}, {painting.year}
          </p>
        </div>
      </div>
    </Link>
  );
}
