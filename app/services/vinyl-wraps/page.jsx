"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Rule, Ph } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";

const FILMS = [
  { n: "Satin", c: "#2a2a2d" },
  { n: "Gloss", c: "#0b0b0c" },
  { n: "Matte", c: "#1a1a1c" },
  { n: "Chrome", c: "linear-gradient(135deg,#d9d6cf,#6b6a65)" },
  { n: "Color-flip", c: "linear-gradient(135deg,#6d2c2c,#2c3a6d)" },
  { n: "PPF-clear", c: "rgba(237,232,222,0.08)" },
];

const TIMELINE = [
  ["Day 1", "Intake, wash, decontamination"],
  ["Day 2", "Disassembly: handles, emblems, trims"],
  ["Days 3–5", "Panel-by-panel wrap installation"],
  ["Day 6", "Reassembly, QC, photo handoff"],
];

export default function VinylWrapsPage() {
  const router = useRouter();
  return (
    <Screen title="Vinyl Wraps">
      <section style={{ flexShrink: 0 }}>
        <Ph
          h="clamp(240px, 40vh, 480px)"
          label="Gloss midnight blue · R8 Spyder"
        />
      </section>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(24px, 3vw, 56px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <Ey style={{ color: "var(--accent)" }}>Signature service</Ey>
        <SH size="clamp(38px, 4.5vw, 64px)" style={{ marginTop: 8 }}>
          Color-change wraps.
        </SH>
        <div
          style={{
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "var(--bone-2)",
            marginTop: 16,
            lineHeight: 1.6,
          }}
        >
          Premium cast films from 3M, Avery Dennison, and KPMF — applied
          panel-by-panel with wrapped edges and tucked seams you won&rsquo;t
          find from the curb.
        </div>

        <Rule style={{ margin: "clamp(24px, 3vw, 40px) 0" }} />

        <Ey>Film families</Ey>
        <div
          className="grid-3"
          style={{ marginTop: "clamp(12px, 1.6vw, 24px)" }}
        >
          {FILMS.map((f) => (
            <div
              key={f.n}
              style={{
                padding: "clamp(12px, 1.4vw, 18px)",
                border: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  height: "clamp(56px, 8vw, 90px)",
                  background: f.c,
                  border: "1px solid var(--line)",
                }}
              />
              <div
                style={{
                  marginTop: 10,
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(18px, 1.6vw, 22px)",
                }}
              >
                {f.n}
              </div>
            </div>
          ))}
        </div>

        <Rule style={{ margin: "clamp(28px, 4vw, 56px) 0" }} />

        <button
          onClick={() => router.push("/visualizer")}
          style={{
            width: "100%",
            padding: "clamp(18px, 2vw, 28px)",
            background: "var(--ink-2)",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          Open the color visualizer <span>→</span>
        </button>

        <div style={{ marginTop: "clamp(24px, 3vw, 48px)" }}>
          <Ey>Timeline</Ey>
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
          <Ey>Starting at</Ey>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(32px, 3.6vw, 48px)",
              marginTop: 4,
              color: "var(--bone)",
            }}
          >
            $4,500{" "}
            <span style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: "var(--mute)" }}>
              sedan · full color change
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
