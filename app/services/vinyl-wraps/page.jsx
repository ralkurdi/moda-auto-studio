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
      <Ph h={240} label="Gloss midnight blue · R8 Spyder" />
      <div style={{ padding: "24px 22px 32px" }}>
        <Ey style={{ color: "var(--accent)" }}>Signature service</Ey>
        <SH size={38} style={{ marginTop: 8 }}>
          Color-change wraps.
        </SH>
        <div
          style={{
            fontSize: 14,
            color: "var(--bone-2)",
            marginTop: 14,
            lineHeight: 1.55,
          }}
        >
          Premium cast films from 3M, Avery Dennison, and KPMF — applied
          panel-by-panel with wrapped edges and tucked seams you won&rsquo;t
          find from the curb.
        </div>
        <Rule style={{ margin: "24px 0" }} />
        <Ey>Film families</Ey>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginTop: 12,
          }}
        >
          {FILMS.map((f) => (
            <div
              key={f.n}
              style={{ padding: 12, border: "1px solid var(--line)" }}
            >
              <div
                style={{
                  height: 56,
                  background: f.c,
                  border: "1px solid var(--line)",
                }}
              />
              <div
                style={{
                  marginTop: 10,
                  fontFamily: "var(--serif)",
                  fontSize: 18,
                }}
              >
                {f.n}
              </div>
            </div>
          ))}
        </div>
        <Rule style={{ margin: "28px 0" }} />
        <button
          onClick={() => router.push("/visualizer")}
          style={{
            width: "100%",
            padding: 20,
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
          }}
        >
          Open the color visualizer <span>→</span>
        </button>
        <div style={{ marginTop: 24 }}>
          <Ey>Timeline</Ey>
          {TIMELINE.map(([d, t], i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                padding: "14px 0",
                borderBottom: "1px solid var(--line)",
                alignItems: "baseline",
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
              <div style={{ fontSize: 14 }}>{t}</div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 20,
            padding: 14,
            background: "var(--ink-2)",
            border: "1px solid var(--line)",
          }}
        >
          <Ey>Starting at</Ey>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 32,
              marginTop: 4,
              color: "var(--bone)",
            }}
          >
            $4,500{" "}
            <span style={{ fontSize: 14, color: "var(--mute)" }}>
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
      </div>
    </Screen>
  );
}
