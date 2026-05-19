"use client";

import { useRouter } from "next/navigation";
import {
  Ey,
  SH,
  GBtn,
  Rule,
  Crest,
  Ph,
  ChevronR,
} from "./_lib/design";
import { Screen } from "./_components/screen-shell";

const SERVICE_ROWS = [
  {
    kicker: "Vinyl",
    title: "Full color-change wraps",
    body: "Satin, gloss, chrome, PPF-over-wrap.",
    to: "/services/vinyl-wraps",
  },
  {
    kicker: "PPF",
    title: "Paint Protection Film",
    body: "Track, partial front, full body.",
    to: "/services",
  },
  {
    kicker: "Tint",
    title: "Ceramic window tinting",
    body: "Lifetime warranty. Legal to limo.",
    to: "/services/window-tint",
  },
  {
    kicker: "Ceramic",
    title: "Ceramic coating",
    body: "9H protection. 5 & 9-year programs.",
    to: "/services",
  },
  {
    kicker: "Trim",
    title: "Chrome delete & blackout",
    body: "Badges, surrounds, emblems.",
    to: "/services",
  },
];

const BUNDLES_TEASER = [
  ["Essential", "Front PPF + ceramic + tint"],
  ["Signature", "Full front PPF + 5yr ceramic + IR tint"],
  ["Concours", "Full-body PPF + 9yr ceramic + tint"],
];

export default function HomePage() {
  const router = useRouter();
  return (
    <Screen title="MODA" right={<Ey>SSF · CA</Ey>}>
      {/* Hero */}
      <div style={{ position: "relative", height: 440, flexShrink: 0 }}>
        <Ph h={440} label="Hero · matte-black wrapped 911" />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg,rgba(11,11,12,0) 40%,rgba(11,11,12,0.88) 95%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "24px 22px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Ey style={{ color: "var(--bone-2)" }}>South San Francisco</Ey>
            <div style={{ opacity: 0.9 }}>
              <Crest size={58} />
            </div>
          </div>
          <div>
            <SH size={46} style={{ maxWidth: 320 }}>
              The finish{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                your car deserved
              </span>{" "}
              from the factory.
            </SH>
            <div
              style={{
                fontSize: 13.5,
                color: "var(--bone-2)",
                marginTop: 14,
                lineHeight: 1.5,
                maxWidth: 300,
              }}
            >
              Vinyl wraps, paint protection film, and window tinting —
              installed by hand in a climate-controlled studio.
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <GBtn onClick={() => router.push("/book")}>Book a fitting</GBtn>
              <GBtn v="ghost" onClick={() => router.push("/work")}>
                See work
              </GBtn>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div style={{ padding: "28px 22px 8px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 14,
          }}
        >
          <Ey>01 · Services</Ey>
          <Ey style={{ color: "var(--bone-2)" }}>Five disciplines</Ey>
        </div>
        {SERVICE_ROWS.map((s, i, arr) => (
          <div key={s.title}>
            <button
              onClick={() => router.push(s.to)}
              style={{
                width: "100%",
                background: "transparent",
                color: "inherit",
                textAlign: "left",
                padding: "18px 0",
                display: "grid",
                gridTemplateColumns: "44px 1fr auto",
                alignItems: "center",
                gap: 14,
              }}
            >
              <Ey>{String(i + 1).padStart(2, "0")}</Ey>
              <div>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 22,
                    lineHeight: 1.1,
                  }}
                >
                  {s.title}
                </div>
                <div
                  style={{ fontSize: 12, color: "var(--mute)", marginTop: 3 }}
                >
                  {s.body}
                </div>
              </div>
              <span style={{ color: "var(--accent)" }}>
                <ChevronR />
              </span>
            </button>
            {i < arr.length - 1 && <Rule />}
          </div>
        ))}
      </div>

      {/* Bundles teaser */}
      <div style={{ padding: "0 22px 10px" }}>
        <Ey>02 · Protection packages</Ey>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
            marginTop: 14,
          }}
        >
          {BUNDLES_TEASER.map(([n, d]) => (
            <button
              key={n}
              onClick={() => router.push("/pricing")}
              style={{
                background: "var(--ink-2)",
                border: "1px solid var(--line)",
                padding: 12,
                textAlign: "left",
                color: "inherit",
              }}
            >
              <Ey
                style={{
                  color: n === "Signature" ? "var(--accent)" : "var(--mute)",
                }}
              >
                {n}
              </Ey>
              <div
                style={{
                  fontSize: 10,
                  color: "var(--mute)",
                  marginTop: 8,
                  lineHeight: 1.4,
                }}
              >
                {d}
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={() => router.push("/book")}
          style={{
            width: "100%",
            marginTop: 10,
            padding: "12px 16px",
            background: "transparent",
            border: "1px solid var(--line)",
            color: "var(--bone-2)",
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          Get a quote →
        </button>
      </div>

      {/* Review */}
      <div style={{ padding: "28px 22px 40px" }}>
        <Ey>03 · What owners say</Ey>
        <div
          style={{
            marginTop: 16,
            fontFamily: "var(--serif)",
            fontSize: 22,
            lineHeight: 1.3,
            fontStyle: "italic",
          }}
        >
          &ldquo;They treated my M4 like a gallery piece. I picked it up and
          genuinely didn&rsquo;t recognize it &mdash; in the best way.&rdquo;
        </div>
        <div
          style={{
            marginTop: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ey>&mdash; Daniel K. · Burlingame</Ey>
          <button
            onClick={() => router.push("/reviews")}
            style={{
              color: "var(--accent)",
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: ".18em",
              textTransform: "uppercase",
            }}
          >
            All reviews →
          </button>
        </div>
      </div>
    </Screen>
  );
}
