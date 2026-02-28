"use client";

export default function GenerationStatus({
  status,
  paintingTitle,
}: {
  status: "idle" | "generating" | "processing" | "complete" | "error";
  paintingTitle: string;
}) {
  if (status === "idle") return null;

  const messages = {
    generating: "Opening a portal into the painting...",
    processing: "Constructing the 3D world...",
    complete: "World ready! Stepping in...",
    error: "Something went wrong. Please try again.",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="max-w-md space-y-6 text-center">
        {status !== "error" && status !== "complete" && (
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-amber-900 border-t-amber-400" />
        )}
        {status === "complete" && (
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-400/20 text-3xl">
            ✨
          </div>
        )}
        {status === "error" && (
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-400/20 text-3xl">
            ✕
          </div>
        )}
        <div>
          <h3 className="text-xl font-semibold text-amber-100">
            {paintingTitle}
          </h3>
          <p className="mt-2 text-amber-200/70">{messages[status]}</p>
        </div>
      </div>
    </div>
  );
}
