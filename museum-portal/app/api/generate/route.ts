import { NextResponse } from "next/server";

// This API route is kept for potential future use but is not used
// by the 3D museum experience (worlds are pre-generated).
export async function POST() {
  return NextResponse.json(
    { error: "World generation is disabled. Worlds are pre-generated." },
    { status: 410 }
  );
}
