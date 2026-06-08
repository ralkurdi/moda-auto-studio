import { NextResponse } from "next/server";
import { supabaseServer } from "../../../_lib/supabase/server";
import { fetchPlaceReviews, normalizeReview } from "../../../_lib/google-places";

export const dynamic = "force-dynamic";

/**
 * POST /api/reviews/refresh
 *
 * Pulls the latest reviews from Google Places API, upserts them into the
 * Supabase `reviews` table keyed by google_id. Returns counts.
 *
 * Trigger manually for now (curl); when we want daily refresh, point a
 * Netlify Scheduled Function or external cron (e.g. cron-job.org) at this
 * URL. The handler is idempotent so re-running is safe.
 */
export async function POST() {
  return refresh();
}

// Also allow GET so it's easy to trigger from a browser tab while testing.
export async function GET() {
  return refresh();
}

async function refresh() {
  const places = await fetchPlaceReviews();
  if (!places.ok) {
    console.error("[reviews.refresh] Places API failed:", places.error);
    return NextResponse.json(
      { ok: false, error: places.error },
      { status: 500 }
    );
  }

  const rows = places.reviews.map(normalizeReview);
  if (rows.length === 0) {
    return NextResponse.json({
      ok: true,
      placeRating: places.rating,
      placeTotal: places.total,
      upserted: 0,
      note: "Places API returned no reviews",
    });
  }

  const supabase = supabaseServer();
  const { error } = await supabase
    .from("reviews")
    .upsert(rows, { onConflict: "google_id" });

  if (error) {
    console.error("[reviews.refresh] Supabase upsert failed:", error.message);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    placeRating: places.rating,
    placeTotal: places.total,
    upserted: rows.length,
  });
}
