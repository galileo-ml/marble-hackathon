import { NextRequest, NextResponse } from "next/server";
import { getOperationStatus } from "../../../lib/worldlabs";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ operationId: string }> }
) {
  try {
    const { operationId } = await params;
    const result = await getOperationStatus(operationId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Status check error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Status check failed",
      },
      { status: 500 }
    );
  }
}
