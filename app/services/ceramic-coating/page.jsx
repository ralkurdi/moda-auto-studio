"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Rule, Ph } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";

const PROGRAMS = [
  {
    name: "3-Year",
    from: "$995",
    desc: "Single-layer SiO2 coating with 9H surface hardness. Hydrophobic, gloss-enhancing.",
  },
  {
    name: "5-Year",
    from: "$1,495",
    desc: "Two-layer system preceded by single-stage correction. Most popular tier.",
  },
  {
    name: "9-Year",
    from: "$2,195",
    desc: "Three layers + base + topcoat. Two-stage correction. Annual maintenance included.",
  },
  {
    name: "Interior · Wheels",
    from: "+$495",
    desc: "Add-ons. Leather/Alcantara coating + caliper/wheel-face ceramic. Stain and brake-dust shedding.",
  },
];

const COATINGS = [
  { n: "Gtechniq Crystal Serum Ultra", note: "9H base, 5-7 yr" },
  { n: "CarPro CQuartz UK 3.0", note: "Hydrophobic, 5 yr" },
  { n: "IGL Kenzo", note: "Solvent-free, 9 yr" },
  { n: "Gtechniq EXOv5", note: "Hydrophilic topcoat" },
];

const TIMELINE = [
  ["Day 1", "Intake, wash, decon, iron + tar removal, claybar"],
  ["Day 2", "Paint correction · cut + polish to swirl-free finish"],
  ["Day 3", "IPA wipe, panel-by-panel coating application, cure"],
  ["Day 4", "Final QC under controlled lighting, photo handoff"],
];

export default function CeramicCoatingPage() {
  const router = useRouter();
  return (
    <Screen title="Ceramic Coating">
      <section style={{ flexShrink: 0 }}>
        <Ph
          h="clamp(240px, 40vh, 480px)"
          label="Ceramic-coated panel · M5 Competition"
        />
      </section>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(24px, 3vw, 56px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <Ey style={{ color: "var(--accent)" }}>Glass-hard finish</Ey>
        <SH size="clamp(38px, 4.5vw, 64px)" style={{ marginTop: 8 }}>
          Ceramic coating.
        </SH>
        <div
          style={{
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "var(--bone-2)",
            marginTop: 16,
            lineHeight: 1.6,
          }}
        >
          A 9H SiO2 nano-coating that bonds to your clearcoat, creating a
          glass-like hydrophobic layer. Water sheets off. Bird droppings and
          tree sap wipe clean. UV stops fading the paint underneath. The
          depth of gloss is what people notice first — especially on dark
          colors.
        </div>

        <Rule style={{ margin: "clamp(24px, 3vw, 40px) 0" }} />

        <Ey>Programs</Ey>
        <div
          className="grid-2"
          style={{ marginTop: "clamp(12px, 1.6vw, 24px)" }}
        >
          {PROGRAMS.map((p) => (
            <div
              key={p.name}
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
                  {p.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    color: "var(--accent)",
                  }}
                >
                  {p.from}
                </div>
              </div>
              <div
                style={{
                  fontSize: "clamp(12px, 1vw, 14px)",
                  color: "var(--bone-2)",
                  lineHeight: 1.55,
                }}
              >
                {p.desc}
              </div>
            </div>
          ))}
        </div>

        <Rule style={{ margin: "clamp(24px, 3vw, 40px) 0" }} />

        <Ey>Coating options</Ey>
        <div
          className="grid-2"
          style={{ marginTop: "clamp(12px, 1.6vw, 24px)" }}
        >
          {COATINGS.map((c) => (
            <div
              key={c.n}
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
                {c.n}
              </div>
              <Ey>{c.note}</Ey>
            </div>
          ))}
        </div>

        <Rule style={{ margin: "clamp(28px, 4vw, 56px) 0" }} />

        <div>
          <Ey>Timeline · 5-Year Program</Ey>
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
          <Ey>Pairs with PPF</Ey>
          <div
            style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "var(--bone-2)",
              marginTop: 8,
              lineHeight: 1.6,
            }}
          >
            Ceramic over Paint Protection Film extends the PPF&rsquo;s life
            and adds the same hydrophobic feel across the whole car. When
            both are booked together, ceramic attaches at <span style={{ color: "var(--accent)" }}>50% off</span>.
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
            $1,495{" "}
            <span style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: "var(--mute)" }}>
              sedan · 5-year program
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
