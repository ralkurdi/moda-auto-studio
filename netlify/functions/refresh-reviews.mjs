// Netlify Scheduled Function — fires every 6 hours per the schedule
// declared in netlify.toml ([functions."refresh-reviews"]).
//
// Calls the canonical /api/reviews/refresh route so the Google Places →
// Supabase sync logic lives in one place. The HTTP roundtrip is trivial
// (<200ms) and keeps the route as the source of truth.
//
// To test locally without waiting for the cron:
//   curl https://modaautostudiosf.com/.netlify/functions/refresh-reviews
//
// To trigger the underlying refresh directly (bypass the schedule):
//   curl https://modaautostudiosf.com/api/reviews/refresh
//
// Netlify exposes the deployed site URL as process.env.URL at runtime.
// Falls back to the live domain so this still works if URL is unset.

export default async () => {
  const base = process.env.URL || "https://modaautostudiosf.com";
  const target = `${base}/api/reviews/refresh`;

  try {
    const res = await fetch(target, { method: "POST" });
    const body = await res.json().catch(() => ({}));
    console.log("[refresh-reviews] status", res.status, body);
    return new Response(JSON.stringify({ ok: res.ok, body }), {
      status: res.ok ? 200 : 502,
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    console.error("[refresh-reviews] fetch failed:", e.message);
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};
