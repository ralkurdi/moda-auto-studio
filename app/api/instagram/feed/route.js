import { NextResponse } from "next/server";

// 24-hour revalidate — Instagram doesn't need to be real-time. The cache
// lives in Next.js's fetch cache; first hit after expiry refreshes it.
export const revalidate = 86400;

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return NextResponse.json(
      { ok: false, posts: [], error: "Instagram not configured" },
      { status: 200 }
    );
  }

  const url =
    `https://graph.facebook.com/v18.0/${userId}/media?` +
    new URLSearchParams({
      fields:
        "id,caption,media_url,permalink,media_type,thumbnail_url,timestamp",
      limit: "12",
      access_token: token,
    }).toString();

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) {
      const text = await res.text();
      console.error("[instagram.feed] graph api error:", res.status, text);
      return NextResponse.json(
        { ok: false, posts: [], error: `Graph API ${res.status}` },
        { status: 200 }
      );
    }
    const data = await res.json();
    return NextResponse.json({ ok: true, posts: data.data || [] });
  } catch (e) {
    console.error("[instagram.feed] fetch failed:", e.message);
    return NextResponse.json(
      { ok: false, posts: [], error: e.message },
      { status: 200 }
    );
  }
}
