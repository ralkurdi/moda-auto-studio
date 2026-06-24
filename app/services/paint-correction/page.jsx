"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Rule, Ph } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";

const STAGES = [
  {
    name: "1-Stage Polish",
    from: "$695",
    desc: "Single-step polish. Removes light swirl, holograms, and dealership wash marks. For cars under 2 years old.",
  },
  {
    name: "2-Stage Correction",
    from: "$1,195",
    desc: "Compound to remove deeper defects, then refine with polish. Most popular tier. Required prep before ceramic coating.",
  },
  {
    name: "3-Stage Concours",
    from: "$1,895",
    desc: "Heavy cut + medium polish + finishing polish. Shows-quality finish. For oxidized, neglected, or pre-show vehicles.",
  },
  {
    name: "Headlight Restoration",
    from: "+$195",
    desc: "Add-on. Wet-sand + polish + UV seal. Restores clarity on yellowed lenses.",
  },
];

const TOOLS = [
  { n: "Rupes BigFoot LHR21", note: "21mm random orbital" },
  { n: "Rupes Mille", note: "Gear-driven, fixed orbit" },
  { n: "Lake Country Microfiber + foam pads", note: "Cut + polish + finish" },
  { n: "Menzerna 3-step", note: "FG400 · FF3000 · FF4500" },
];

const TIMELINE = [
  ["Day 1", "Intake, decon wash, claybar, test panel for paint thickness"],
  ["Day 2", "Compound — heavy cut on defect-prone panels"],
  ["Day 3", "Polish — refine to swirl-free under controlled lighting"],
  ["Day 4", "Finishing polish + IPA wipe; ready for coating or wax"],
];

export default function PaintCorrectionPage() {
  const router = useRouter();
  return (
    <Screen title="Paint Correction">
      <section style={{ flexShrink: 0 }}>
        <Ph
          h="clamp(240px, 40vh, 480px)"
          label="50/50 compound vs polish · BMW M4 black"
        />
      </section>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(24px, 3vw, 56px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <Ey style={{ color: "var(--accent)" }}>Cut · refine · finish</Ey>
        <SH size="clamp(38px, 4.5vw, 64px)" style={{ marginTop: 8 }}>
          Paint correction.
        </SH>
        <div
          style={{
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "var(--bone-2)",
            marginTop: 16,
            lineHeight: 1.6,
          }}
        >
          Multi-stage machine polish to remove swirl marks, oxidation,
          holograms, and light scratches. The required prep step before any
          ceramic coating — and the difference between &ldquo;clean&rdquo;
          and &ldquo;wet-looking under any light&rdquo;.
        </div>

        <Rule style={{ margin: "clamp(24px, 3vw, 40px) 0" }} />

        <Ey>Correction stages</Ey>
        <div
          className="grid-2"
          style={{ marginTop: "clamp(12px, 1.6vw, 24px)" }}
        >
          {STAGES.map((s) => (
            <div
              key={s.name}
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
                  {s.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    color: "var(--accent)",
                  }}
                >
                  {s.from}
                </div>
              </div>
              <div
                style={{
                  fontSize: "clamp(12px, 1vw, 14px)",
                  color: "var(--bone-2)",
                  lineHeight: 1.55,
                }}
              >
                {s.desc}
              </div>
            </div>
          ))}
        </div>

        <Rule style={{ margin: "clamp(24px, 3vw, 40px) 0" }} />

        <Ey>Tools + compounds</Ey>
        <div
          className="grid-2"
          style={{ marginTop: "clamp(12px, 1.6vw, 24px)" }}
        >
          {TOOLS.map((t) => (
            <div
              key={t.n}
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
                {t.n}
              </div>
              <Ey>{t.note}</Ey>
            </div>
          ))}
        </div>

        <Rule style={{ margin: "clamp(28px, 4vw, 56px) 0" }} />

        <div>
          <Ey>Timeline · 2-Stage</Ey>
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
          <Ey>What gets removed</Ey>
          <div
            style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "var(--bone-2)",
              marginTop: 8,
              lineHeight: 1.6,
            }}
          >
            Swirl marks · oxidation · holograms · light scratches · etching
            from bird droppings + water spots · most dealership wash damage.
            Deep scratches that have broken the clearcoat are noted up front
            but won&rsquo;t fully disappear without wet-sanding or repaint.
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
            $1,195{" "}
            <span style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: "var(--mute)" }}>
              sedan · 2-stage
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
