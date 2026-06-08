/**
 * Fetch up to 5 reviews from Google Places API for the configured Place ID.
 * Returns { ok, reviews, rating, total } or { ok: false, error }.
 *
 * Note: Google's Places API caps reviews per request at 5 — that's the
 * platform limit, not a config we can raise. The 5 returned are Google's
 * "most relevant" selection based on recency + helpfulness. For a longer
 * archive, we'd cache historical fetches in Supabase (which we do via
 * /api/reviews/refresh) and let new ones accumulate over time.
 */
export async function fetchPlaceReviews() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) {
    return {
      ok: false,
      error: "Google Places not configured (missing API key or Place ID)",
      reviews: [],
    };
  }

  const url =
    "https://maps.googleapis.com/maps/api/place/details/json?" +
    new URLSearchParams({
      place_id: placeId,
      fields: "reviews,rating,user_ratings_total,name",
      // Force English so review text is consistent; Google falls back to
      // original language if no translation exists.
      language: "en",
      key,
    }).toString();

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      const text = await res.text();
      return {
        ok: false,
        error: `Places API ${res.status}: ${text.slice(0, 200)}`,
        reviews: [],
      };
    }
    const data = await res.json();
    if (data.status !== "OK") {
      return {
        ok: false,
        error: `Places API status ${data.status}: ${data.error_message || ""}`,
        reviews: [],
      };
    }
    return {
      ok: true,
      reviews: data.result?.reviews || [],
      rating: data.result?.rating || null,
      total: data.result?.user_ratings_total || 0,
      name: data.result?.name || null,
    };
  } catch (e) {
    return { ok: false, error: e.message, reviews: [] };
  }
}

/**
 * Normalize Google review shape into the shape our `reviews` Supabase table
 * expects.
 *
 * Google review structure (relevant fields):
 *   {
 *     author_name, author_url, profile_photo_url,
 *     rating (1-5), text, time (unix seconds), relative_time_description
 *   }
 *
 * Note: Google does NOT expose a stable per-review ID, so we synthesize
 * `google_id` from author + time, which is stable enough for upsert.
 */
export function normalizeReview(r) {
  return {
    google_id: `${(r.author_name || "anon").replace(/\s+/g, "_")}_${r.time || 0}`,
    rating: r.rating,
    body: r.text || "",
    author: r.author_name || "Anonymous",
    vehicle: null, // Google reviews don't carry vehicle metadata
    created_at: r.time
      ? new Date(r.time * 1000).toISOString()
      : new Date().toISOString(),
    fetched_at: new Date().toISOString(),
    display: r.rating >= 4, // Only display 4+ star reviews
  };
}
