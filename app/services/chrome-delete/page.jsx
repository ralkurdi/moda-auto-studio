"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Rule, Ph } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";

const COVERAGE = [
  {
    name: "Window Surrounds",
    from: "$395",
    desc: "Just the chrome strips around the door windows. Cleanest entry point — the single most-visible change.",
  },
  {
    name: "Surrounds + Badges",
    from: "$495",
    desc: "Window surrounds plus model badges, manufacturer emblem, and trunk lettering. The factory-stealth look.",
  },
  {
    name: "Full Blackout",
    from: "$695",
    desc: "Surrounds + badges + kidney grills + mirror caps + side gills. Every chrome-finish accent goes matte black.",
  },
  {
    name: "Headlight · Taillight Tint",
    from: "+$195",
    desc: "Add-on. Smoked nano-ceramic film over headlights or taillights. Subtle darkening, fully legal at conservative VLT.",
  },
];

const MATERIALS = [
  { n: "3M 1080 Satin Black", note: "Cast vinyl, 8-yr" },
  { n: "Avery SW900 Matte Black", note: "Conformable cast" },
  { n: "Hexis Bodyfence", note: "Optional overlaminate" },
  { n: "Pre-cut templates", note: "Computer-matched to OEM trim" },
];

const TIMELINE = [
  ["Day 1", "Wash, decon, remove badges + trims where feasible"],
  ["Day 1", "Surface heat-mapping, panel-by-panel vinyl application"],
  ["Day 2", "Edge tucking, IPA wipe-down, reinstall hardware"],
  ["Day 2", "QC under tungsten + LED, photo handoff"],
];

export default function ChromeDeletePage() {
  const router = useRouter();
  return (
    <Screen title="Chrome Delete">
      <section style={{ flexShrink: 0 }}>
        <Ph
          h="clamp(240px, 40vh, 480px)"
          label="Chrome delete · 2024 M5 kidney grills"
        />
      </section>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(24px, 3vw, 56px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <Ey style={{ color: "var(--accent)" }}>Subtle stealth</Ey>
        <SH size="clamp(38px, 4.5vw, 64px)" style={{ marginTop: 8 }}>
          Chrome delete &amp; blackout.
        </SH>
        <div
          style={{
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "var(--bone-2)",
            marginTop: 16,
            lineHeight: 1.6,
          }}
        >
          Blacking out window surrounds, badges, kidney grills, and mirror
          caps with precision-cut vinyl. The cheapest single change that
          shifts a modern dark car from &ldquo;factory&rdquo; to
          &ldquo;intentional&rdquo; — most owners pair it with a tint.
        </div>

        <Rule style={{ margin: "clamp(24px, 3vw, 40px) 0" }} />

        <Ey>Coverage</Ey>
        <div
          className="grid-2"
          style={{ marginTop: "clamp(12px, 1.6vw, 24px)" }}
        >
          {COVERAGE.map((c) => (
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

        <Ey>Materials</Ey>
        <div
          className="grid-2"
          style={{ marginTop: "clamp(12px, 1.6vw, 24px)" }}
        >
          {MATERIALS.map((m) => (
            <div
              key={m.n}
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
                {m.n}
              </div>
              <Ey>{m.note}</Ey>
            </div>
          ))}
        </div>

        <Rule style={{ margin: "clamp(28px, 4vw, 56px) 0" }} />

        <div>
          <Ey>Timeline · Full Blackout</Ey>
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
          <Ey>Pairs with tint</Ey>
          <div
            style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "var(--bone-2)",
              marginTop: 8,
              lineHeight: 1.6,
            }}
          >
            Most chrome-delete clients add ceramic window tint at the same
            visit — the unified darker tone is what makes the look land.
            Booked together, intake is the same day and the second service
            attaches at <span style={{ color: "var(--accent)" }}>10% off</span>.
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
            $395{" "}
            <span style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: "var(--mute)" }}>
              sedan · window surrounds
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
