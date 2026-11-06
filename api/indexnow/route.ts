import { NextResponse } from "next/server";

// POST /api/indexnow  { "urls": ["https://your-domain.com/studio"] }
// Pings Bing IndexNow so new/updated pages are discovered fast. Key must be hosted at /<key>.txt —
// set INDEXNOW_KEY in Vercel env vars; the key file itself is a static public file, not committed here.
export async function POST(req: Request) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 });
  const { urls } = await req.json().catch(() => ({ urls: [] }));
  const host = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com").host;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ host, key, keyLocation: `${process.env.NEXT_PUBLIC_SITE_URL}/${key}.txt`, urlList: urls }),
  });
  return NextResponse.json({ ok: res.ok, status: res.status });
}
