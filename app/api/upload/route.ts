import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.error() as NextResponse;
  }

  const blob = await put(filename, request.body || new ReadableStream(), {
    access: "public",
  });

  return NextResponse.json(blob);
}
