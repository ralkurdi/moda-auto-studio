"use client";

import { Ey, SH } from "../_lib/design";
import { Screen } from "../_components/screen-shell";

const REVIEWS = [
  {
    stars: 5,
    who: "Daniel K. · Burlingame",
    car: "2023 BMW M4",
    body:
      "They treated my M4 like a gallery piece. I picked it up and genuinely didn't recognize it — in the best way. Edges are perfectly tucked, no lift at 6 months.",
  },
  {
    stars: 5,
    who: "Priya S. · Palo Alto",
    car: "2024 Taycan",
    body:
      "Booked the full-body PPF after seeing their Instagram. Walked me through every panel before the install. The daily photos from the bay were such a nice touch.",
  },
  {
    stars: 5,
    who: "James O. · SSF",
    car: "2022 Civic Type R",
    body:
      "I know I wasn't their highest-ticket client but they treated it like a Ferrari. Tint is flawless. No bubbles, no gap on the dot matrix.",
  },
  {
    stars: 4,
    who: "Sara L. · Daly City",
    car: "2024 Model Y",
    body:
      "Took a day longer than quoted but the result is immaculate. The team redid one door after I pointed out a tiny speck — no fuss, no charge.",
  },
  {
    stars: 5,
    who: "Ethan V. · Brisbane",
    car: "2023 GT3",
    body:
      "Full body PPF + 10-year ceramic. The car looks wet in the sun. Worth every cent and then some.",
  },
  {
    stars: 5,
    who: "Marcus T. · San Mateo",
    car: "2025 Tesla Model S Plaid",
    body:
      "Satin black full wrap. They sent me daily photos from the bay. Picked it up and almost couldn't tell it was the same car. Incredible work.",
  },
];

export default function ReviewsPage() {
  return (
    <Screen title="Reviews">
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(20px, 3vw, 56px)",
          paddingBottom: 8,
        }}
      >
        <Ey>4.9 · 148 reviews</Ey>
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
            4.9 AVERAGE
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
        {REVIEWS.map((r, i) => (
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
                    opacity: j < r.stars ? 1 : 0.2,
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
              <Ey>{r.who}</Ey>
              <Ey style={{ color: "var(--accent)" }}>{r.car}</Ey>
            </div>
          </div>
        ))}
      </section>
    </Screen>
  );
}
