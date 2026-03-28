import { NextResponse } from "next/server";
import { buildSearchIndex, searchDocs } from "@/src/lib/search";

let initialized = false;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!initialized) {
    buildSearchIndex();
    initialized = true;
  }

  const results = searchDocs(q);

  return NextResponse.json(results);
}