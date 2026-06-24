import { Ey, SH } from "../_lib/design";
import { Screen } from "../_components/screen-shell";
import { supabaseServer } from "../_lib/supabase/server";

// Re-render at most once an hour. The Google refresh runs separately
// (via /api/reviews/refresh on a 6h cron) and calls revalidatePath
// to invalidate this page immediately on each successful pull, so
// new reviews surface within seconds of the cron firing.
export const revalidate = 3600;

// Direct link to leave a Google review for our Place ID. Pre-fills the
// business so the visitor lands on the write-review modal in one click.
const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJ0RT9mnJ5j4ARuk2F6yjaUqw";

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

    if (error || !data) {
      return { reviews: [], avg: null, total: 0 };
    }

    const reviews = data.map((r) => ({
      rating: r.rating,
      body: r.body,
      author: r.author,
      vehicle: r.vehicle,
      timeAgo: timeAgo(r.created_at),
    }));

    const avg =
      reviews.length > 0
        ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
        : null;

    return { reviews, avg, total: reviews.length };
  } catch {
    return { reviews: [], avg: null, total: 0 };
  }
}

export default async function ReviewsPage() {
  const { reviews, avg, total } = await loadReviews();
  const hasReviews = reviews.length > 0;
  const displayAvg = avg ? avg.toFixed(1) : null;

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
          {hasReviews
            ? `${displayAvg} · ${total} ${total === 1 ? "review" : "reviews"}`
            : "From our owners"}
        </Ey>
        <SH
          size="clamp(34px, 4vw, 56px)"
          style={{ marginTop: 8, marginBottom: 18 }}
        >
          From our owners.
        </SH>
        {hasReviews && (
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
        )}
      </section>
      <section
        className="container-narrow"
        style={{
          paddingTop: 0,
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        {hasReviews ? (
          reviews.map((r, i) => (
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
                </Ey>
                {(r.vehicle || r.timeAgo) && (
                  <Ey style={{ color: "var(--accent)" }}>
                    {r.vehicle || r.timeAgo}
                  </Ey>
                )}
              </div>
            </div>
          ))
        ) : (
          <div
            style={{
              padding: "clamp(40px, 6vw, 80px) 0",
              textAlign: "center",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--serif)",
                fontStyle: "italic",
                fontSize: "clamp(20px, 2.4vw, 28px)",
                lineHeight: 1.4,
                color: "var(--bone)",
                marginBottom: 20,
              }}
            >
              Reviews coming in soon.
            </div>
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                color: "var(--accent)",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "12px 24px",
                border: "1px solid var(--accent)",
              }}
            >
              Be the first to leave one →
            </a>
          </div>
        )}
      </section>
    </Screen>
  );
}
