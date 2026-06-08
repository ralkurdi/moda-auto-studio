"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Rule, Crest, Ph, ChevronR } from "./_lib/design";
import { Screen } from "./_components/screen-shell";

const SERVICE_ROWS = [
  {
    kicker: "Vinyl",
    title: "Full color-change wraps",
    body: "Satin, gloss, chrome, PPF-over-wrap.",
    to: "/services/vinyl-wraps",
  },
  {
    kicker: "Tint",
    title: "Ceramic window tinting",
    body: "Lifetime warranty. Legal to limo.",
    to: "/services/window-tint",
  },
  {
    kicker: "PPF",
    title: "Paint Protection Film",
    body: "Track, partial front, full body.",
    to: "/services/paint-protection-film",
  },
  {
    kicker: "Ceramic",
    title: "Ceramic coating",
    body: "9H protection. 5 & 9-year programs.",
    to: "/services/ceramic-coating",
  },
  {
    kicker: "Trim",
    title: "Chrome delete & blackout",
    body: "Badges, surrounds, emblems.",
    to: null,
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
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          height: "clamp(440px, 70vh, 720px)",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <Ph
          h="100%"
          label="Hero · matte-black wrapped 911"
          style={{ position: "absolute", inset: 0, height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg,rgba(11,11,12,0.1) 30%,rgba(11,11,12,0.92) 95%)",
          }}
        />
        <div
          className="container"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: 24,
            paddingBottom: 32,
          }}
        >
          {/* Top row — tagline + crest (crest is mobile-only; desktop has it in nav) */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Ey style={{ color: "var(--bone-2)" }}>South San Francisco</Ey>
            <div className="mobile-only" style={{ opacity: 0.9 }}>
              <Crest size={58} />
            </div>
          </div>

          {/* Bottom row — headline + ctas */}
          <div style={{ maxWidth: 640 }}>
            <SH
              size="clamp(2.9rem, 5.8vw, 5rem)"
              style={{ maxWidth: 540, lineHeight: 1.02 }}
            >
              The finish{" "}
              <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
                your car deserved
              </span>{" "}
              from the factory.
            </SH>
            <div
              style={{
                fontSize: "clamp(13.5px, 1.15vw, 16px)",
                color: "var(--bone-2)",
                marginTop: 16,
                lineHeight: 1.55,
                maxWidth: 460,
              }}
            >
              Vinyl wraps, paint protection film, and window tinting — installed
              by hand in a climate-controlled studio.
            </div>
            <div
              style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}
            >
              <GBtn onClick={() => router.push("/book")}>Book a fitting</GBtn>
              <GBtn v="ghost" onClick={() => router.push("/work")}>
                See work
              </GBtn>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────── */}
      <section
        className="container"
        style={{ paddingTop: "clamp(36px, 5vw, 88px)", paddingBottom: 8 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "clamp(14px, 2vw, 28px)",
          }}
        >
          <Ey>01 · Services</Ey>
          <Ey style={{ color: "var(--bone-2)" }}>Five disciplines</Ey>
        </div>
        {SERVICE_ROWS.map((s, i, arr) => {
          const clickable = Boolean(s.to);
          const Tag = clickable ? "button" : "div";
          return (
            <div key={s.title}>
              <Tag
                {...(clickable
                  ? { onClick: () => router.push(s.to) }
                  : {})}
                style={{
                  width: "100%",
                  background: "transparent",
                  color: "inherit",
                  textAlign: "left",
                  padding: "clamp(18px, 2.4vw, 28px) 0",
                  display: "grid",
                  gridTemplateColumns: "clamp(44px, 6vw, 64px) 1fr auto",
                  alignItems: "center",
                  gap: 14,
                  cursor: clickable ? "pointer" : "default",
                }}
              >
                <Ey>{String(i + 1).padStart(2, "0")}</Ey>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: "clamp(22px, 2.4vw, 32px)",
                      lineHeight: 1.1,
                    }}
                  >
                    {s.title}
                  </div>
                  <div
                    style={{
                      fontSize: "clamp(12px, 1vw, 14px)",
                      color: "var(--mute)",
                      marginTop: 5,
                    }}
                  >
                    {s.body}
                  </div>
                </div>
                {clickable && (
                  <span style={{ color: "var(--accent)" }}>
                    <ChevronR />
                  </span>
                )}
              </Tag>
              {i < arr.length - 1 && <Rule />}
            </div>
          );
        })}
      </section>

      {/* ── BUNDLES TEASER ───────────────────────────────────────────── */}
      <section
        className="container"
        style={{
          paddingTop: "clamp(28px, 4vw, 64px)",
          paddingBottom: "clamp(10px, 1.5vw, 24px)",
        }}
      >
        <Ey>02 · Protection packages</Ey>
        <div className="grid-3" style={{ marginTop: "clamp(14px, 2vw, 24px)" }}>
          {BUNDLES_TEASER.map(([n, d]) => (
            <div
              key={n}
              style={{
                background: "var(--ink-2)",
                border: "1px solid var(--line)",
                padding: "clamp(14px, 2vw, 22px)",
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
                  fontSize: "clamp(11px, 1vw, 14px)",
                  color: "var(--bone-2)",
                  marginTop: 10,
                  lineHeight: 1.5,
                }}
              >
                {d}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => router.push("/book")}
          style={{
            width: "100%",
            marginTop: 14,
            padding: "14px 16px",
            background: "transparent",
            border: "1px solid var(--line)",
            color: "var(--bone-2)",
            fontFamily: "var(--mono)",
            fontSize: 10,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          Get a quote →
        </button>
      </section>

      {/* ── FEATURED REVIEW ──────────────────────────────────────────── */}
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(32px, 5vw, 80px)",
          paddingBottom: "clamp(40px, 6vw, 96px)",
          textAlign: "center",
        }}
      >
        <Ey style={{ textAlign: "center" }}>03 · What owners say</Ey>
        <div
          style={{
            marginTop: 24,
            fontFamily: "var(--serif)",
            fontSize: "clamp(22px, 2.6vw, 34px)",
            lineHeight: 1.3,
            fontStyle: "italic",
          }}
        >
          &ldquo;They treated my M4 like a gallery piece. I picked it up and
          genuinely didn&rsquo;t recognize it — in the best way.&rdquo;
        </div>
        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
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
              cursor: "pointer",
            }}
          >
            All reviews →
          </button>
        </div>
      </section>
    </Screen>
  );
}
