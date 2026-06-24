"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Rule, Ph } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";

const COVERAGE_TIERS = [
  {
    name: "Partial Front",
    from: "Starting at $950",
    desc: "Bumper + 24″ of hood. Covers the high-impact strike zone for daily commuters.",
  },
  {
    name: "Full Front",
    from: "Starting at $1,895",
    desc: "Bumper, hood, fenders, mirrors, A-pillars. The high-impact zones — most popular tier.",
  },
  {
    name: "Full Body",
    from: "Starting at $5,995",
    desc: "Every painted panel + rockers + door cups. Total protection. VIN-registered.",
  },
  {
    name: "Track Package",
    from: "Starting at +$695",
    desc: "Add-on. Rockers, lower doors, A-pillars, front canards. For track or canyon days.",
  },
];

const FILM_BRANDS = [
  { n: "3M Scotchgard Pro Series", note: "Self-healing, 10-yr" },
  { n: "3M Scotchgard Pro Series Matte", note: "Matte finish, 10-yr" },
];

const TIMELINE = [
  ["Day 1", "Intake, wash, chemical decon, claybar, IPA wipe-down"],
  ["Day 2", "Disassembly: emblems, sensors, trims; alcohol prep"],
  ["Days 3–5", "Computer-cut PPF applied panel-by-panel, edges wrapped + tucked"],
  ["Day 6–7", "Curing, QC under controlled lighting, photo handoff"],
];

export default function PaintProtectionFilmPage() {
  const router = useRouter();
  return (
    <Screen title="Paint Protection Film">
      <section style={{ flexShrink: 0 }}>
        <Ph
          h="clamp(240px, 40vh, 480px)"
          label="Full front PPF · 2024 Porsche GT3"
        />
      </section>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(24px, 3vw, 56px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <Ey style={{ color: "var(--accent)" }}>Premium protection</Ey>
        <SH size="clamp(38px, 4.5vw, 64px)" style={{ marginTop: 8 }}>
          Paint Protection Film.
        </SH>
        <div
          style={{
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "var(--bone-2)",
            marginTop: 16,
            lineHeight: 1.6,
          }}
        >
          Self-healing thermoplastic urethane that absorbs rock chips, road
          debris, and minor scratches before they reach your paint. We install
          by hand — computer-cut to factory tolerances, edges wrapped and
          tucked so you won&rsquo;t see them at the curb.
        </div>

        <Rule style={{ margin: "clamp(24px, 3vw, 40px) 0" }} />

        <Ey>Coverage tiers</Ey>
        <div
          className="grid-2"
          style={{ marginTop: "clamp(12px, 1.6vw, 24px)" }}
        >
          {COVERAGE_TIERS.map((c) => (
            <div
              key={c.name}
              style={{
                padding: "clamp(14px, 1.8vw, 22px)",
                border: "1px solid var(--line)",
                background: "var(--ink-2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(18px, 1.7vw, 22px)",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    color: "var(--accent)",
                  }}
                >
                  {c.from}
                </div>
              </div>
              <div
                style={{
                  fontSize: "clamp(12px, 1vw, 14px)",
                  color: "var(--bone-2)",
                  lineHeight: 1.55,
                }}
              >
                {c.desc}
              </div>
            </div>
          ))}
        </div>

        <Rule style={{ margin: "clamp(24px, 3vw, 40px) 0" }} />

        <Ey>Film options</Ey>
        <div
          className="grid-2"
          style={{ marginTop: "clamp(12px, 1.6vw, 24px)" }}
        >
          {FILM_BRANDS.map((f) => (
            <div
              key={f.n}
              style={{
                padding: "clamp(14px, 1.6vw, 20px)",
                border: "1px solid var(--line)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 12,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                }}
              >
                {f.n}
              </div>
              <Ey>{f.note}</Ey>
            </div>
          ))}
        </div>

        <Rule style={{ margin: "clamp(28px, 4vw, 56px) 0" }} />

        <div style={{ marginTop: 0 }}>
          <Ey>Timeline · Full Body</Ey>
          {TIMELINE.map(([d, t], i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "clamp(80px, 8vw, 120px) 1fr",
                padding: "clamp(14px, 1.6vw, 20px) 0",
                borderBottom: "1px solid var(--line)",
                alignItems: "baseline",
                gap: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--accent)",
                }}
              >
                {d}
              </div>
              <div style={{ fontSize: "clamp(14px, 1.15vw, 16px)" }}>{t}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "clamp(20px, 2.5vw, 36px)",
            padding: "clamp(14px, 1.8vw, 24px)",
            background: "var(--ink-2)",
            border: "1px solid var(--line)",
          }}
        >
          <Ey>Warranty</Ey>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(20px, 1.8vw, 24px)",
              marginTop: 6,
              color: "var(--bone)",
            }}
          >
            10-year manufacturer warranty · VIN-registered · transferable
          </div>
          <div
            style={{
              fontSize: "clamp(12px, 1vw, 14px)",
              color: "var(--bone-2)",
              marginTop: 10,
              lineHeight: 1.55,
            }}
          >
            Covers yellowing, bubbling, peeling, cracking, and delamination.
            We photograph every panel for the warranty record.
          </div>
        </div>

        <div
          style={{
            marginTop: "clamp(20px, 2.5vw, 36px)",
            padding: "clamp(14px, 1.8vw, 24px)",
            background: "var(--ink-2)",
            border: "1px solid var(--line)",
          }}
        >
          <Ey>Starting at</Ey>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(32px, 3.6vw, 48px)",
              marginTop: 4,
              color: "var(--bone)",
            }}
          >
            $1,895{" "}
            <span style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: "var(--mute)" }}>
              sedan · full front
            </span>
          </div>
        </div>
        <GBtn
          style={{ width: "100%", marginTop: 16 }}
          onClick={() => router.push("/book")}
        >
          Reserve a bay
        </GBtn>
      </section>
    </Screen>
  );
}
