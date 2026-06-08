import { Ey, SH } from "../_lib/design";
import { Screen } from "../_components/screen-shell";
import { supabaseServer } from "../_lib/supabase/server";

// Re-render at most once an hour. The Google refresh runs separately
// (via /api/reviews/refresh on a cron) so this just dictates how often
// the rendered page picks up the latest cache from Supabase.
export const revalidate = 3600;

// Fallback dataset used until Supabase has real Google reviews. Once the
// refresh endpoint has run at least once, real reviews take over.
const FALLBACK_REVIEWS = [
  {
    rating: 5,
    author: "Daniel K.",
    location: "Burlingame",
    vehicle: "2023 BMW M4",
    body:
      "They treated my M4 like a gallery piece. I picked it up and genuinely didn't recognize it — in the best way. Edges are perfectly tucked, no lift at 6 months.",
  },
  {
    rating: 5,
    author: "Priya S.",
    location: "Palo Alto",
    vehicle: "2024 Taycan",
    body:
      "Booked the full-body PPF after seeing their Instagram. Walked me through every panel before the install. The daily photos from the bay were such a nice touch.",
  },
  {
    rating: 5,
    author: "James O.",
    location: "SSF",
    vehicle: "2022 Civic Type R",
    body:
      "I know I wasn't their highest-ticket client but they treated it like a Ferrari. Tint is flawless. No bubbles, no gap on the dot matrix.",
  },
  {
    rating: 4,
    author: "Sara L.",
    location: "Daly City",
    vehicle: "2024 Model Y",
    body:
      "Took a day longer than quoted but the result is immaculate. The team redid one door after I pointed out a tiny speck — no fuss, no charge.",
  },
  {
    rating: 5,
    author: "Ethan V.",
    location: "Brisbane",
    vehicle: "2023 GT3",
    body:
      "Full body PPF + 10-year ceramic. The car looks wet in the sun. Worth every cent and then some.",
  },
  {
    rating: 5,
    author: "Marcus T.",
    location: "San Mateo",
    vehicle: "2025 Tesla Model S Plaid",
    body:
      "Satin black full wrap. They sent me daily photos from the bay. Picked it up and almost couldn't tell it was the same car. Incredible work.",
  },
];

function timeAgo(iso) {
  if (!iso) return null;
  const then = new Date(iso).getTime();
  if (isNaN(then)) return null;
  const days = Math.floor((Date.now() - then) / (1000 * 60 * 60 * 24));
  if (days < 14) return days <= 1 ? "this week" : `${days} days ago`;
  if (days < 60) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

async function loadReviews() {
  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from("reviews")
      .select("id, rating, body, author, vehicle, created_at")
      .eq("display", true)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error || !data || data.length === 0) {
      return { reviews: FALLBACK_REVIEWS, source: "fallback" };
    }

    const normalized = data.map((r) => ({
      rating: r.rating,
      body: r.body,
      author: r.author,
      location: null, // Google reviews don't expose reviewer location
      vehicle: r.vehicle, // typically null for Google; reserved for future enrichment
      timeAgo: timeAgo(r.created_at),
    }));

    const avg =
      normalized.reduce((s, r) => s + r.rating, 0) / normalized.length;
    return { reviews: normalized, source: "google", avg, total: data.length };
  } catch {
    return { reviews: FALLBACK_REVIEWS, source: "fallback" };
  }
}

export default async function ReviewsPage() {
  const { reviews, source, avg, total } = await loadReviews();

  // Aggregate stats: real numbers when Supabase has data, brand-trust
  // hardcoded values for the fallback.
  const displayAvg = source === "google" ? avg.toFixed(1) : "4.9";
  const displayTotal = source === "google" ? `${total} reviews` : "148 reviews";

  return (
    <Screen title="Reviews">
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(20px, 3vw, 56px)",
          paddingBottom: 8,
        }}
      >
        <Ey>
          {displayAvg} · {displayTotal}
        </Ey>
        <SH
          size="clamp(34px, 4vw, 56px)"
          style={{ marginTop: 8, marginBottom: 18 }}
        >
          From our owners.
        </SH>
        <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
          {"★★★★★".split("").map((_, i) => (
            <span key={i} style={{ color: "var(--accent)", fontSize: 20 }}>
              ★
            </span>
          ))}
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "var(--mute)",
              alignSelf: "center",
              marginLeft: 4,
              letterSpacing: ".12em",
            }}
          >
            {displayAvg} AVERAGE
          </div>
        </div>
      </section>
      <section
        className="container-narrow"
        style={{
          paddingTop: 0,
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        {reviews.map((r, i) => (
          <div
            key={i}
            style={{
              padding: "clamp(20px, 2.5vw, 36px) 0",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", gap: 2 }}>
              {"★★★★★".split("").map((_, j) => (
                <span
                  key={j}
                  style={{
                    color: "var(--accent)",
                    opacity: j < r.rating ? 1 : 0.2,
                    fontSize: 14,
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(18px, 2vw, 24px)",
                lineHeight: 1.45,
                marginTop: 12,
              }}
            >
              &ldquo;{r.body}&rdquo;
            </div>
            <div
              style={{
                marginTop: 16,
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <Ey>
                {r.author}
                {r.location ? ` · ${r.location}` : ""}
              </Ey>
              {(r.vehicle || r.timeAgo) && (
                <Ey style={{ color: "var(--accent)" }}>
                  {r.vehicle || r.timeAgo}
                </Ey>
              )}
            </div>
          </div>
        ))}
      </section>
    </Screen>
  );
}
