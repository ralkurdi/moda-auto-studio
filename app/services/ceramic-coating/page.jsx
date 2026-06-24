"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Rule, Ph } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";

// Pricing matches the studio next door (Viliura Detailing at 52 S Linden)
// so cross-shopping clients see the same number on both sites. Flat 3-tier
// vehicle-size pricing for ceramic, quote-based for paint correction.
const CERAMIC_TIERS = [
  {
    name: "Sedan",
    from: "$695",
    desc: "Coupes, hatches, and standard 4-door sedans.",
  },
  {
    name: "SUV",
    from: "$795",
    desc: "Crossovers, mid-size SUVs, and small trucks.",
  },
  {
    name: "Large SUV / Truck",
    from: "$895",
    desc: "Full-size SUVs (Suburban, Tahoe), pickups, G-Wagons.",
  },
];

const COATINGS = [
  { n: "Gtechniq Crystal Serum Ultra", note: "9H base, 5–7 yr" },
  { n: "CarPro CQuartz UK 3.0", note: "Hydrophobic, 5 yr" },
  { n: "IGL Kenzo", note: "Solvent-free, 9 yr" },
  { n: "Gtechniq EXOv5", note: "Hydrophilic topcoat" },
];

const TIMELINE = [
  ["Day 1", "Intake, wash, decon, iron + tar removal, claybar"],
  ["Day 2", "Paint correction — cut + polish to swirl-free finish"],
  ["Day 3", "IPA wipe, panel-by-panel coating application, cure"],
  ["Day 4", "Final QC under controlled lighting, photo handoff"],
];

export default function CeramicCoatingPage() {
  const router = useRouter();
  return (
    <Screen title="Ceramic Coating & Paint Correction">
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
          Ceramic coating &amp; paint correction.
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
          tree sap wipe clean. UV stops fading the paint underneath. Multi-
          stage machine polish to remove swirl marks, oxidation, and light
          scratches is the required prep step before the coating — and the
          difference between &ldquo;clean&rdquo; and &ldquo;wet-looking under
          any light.&rdquo;
        </div>

        <Rule style={{ margin: "clamp(24px, 3vw, 40px) 0" }} />

        <Ey>Ceramic coating · pricing</Ey>
        <div
          className="grid-3"
          style={{ marginTop: "clamp(12px, 1.6vw, 24px)" }}
        >
          {CERAMIC_TIERS.map((c) => (
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

        <Ey>Paint correction</Ey>
        <div
          style={{
            marginTop: "clamp(12px, 1.6vw, 20px)",
            padding: "clamp(16px, 2vw, 24px)",
            background: "var(--ink-2)",
            border: "1px solid var(--line)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(22px, 2.4vw, 30px)",
              lineHeight: 1.3,
              color: "var(--bone)",
            }}
          >
            Quoted per vehicle.{" "}
            <span style={{ color: "var(--accent)" }}>
              Inquire for a custom quote.
            </span>
          </div>
          <div
            style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "var(--bone-2)",
              marginTop: 12,
              lineHeight: 1.6,
            }}
          >
            Scope depends on the paint&rsquo;s starting condition and the
            stage required. A single-stage polish handles light swirl on a
            newer car. A two-stage compound + polish is the most common
            prep for ceramic. Three-stage concours is reserved for oxidized,
            neglected, or pre-show vehicles. We&rsquo;ll evaluate at intake
            or from photos before quoting.
          </div>
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
          <Ey>Timeline · ceramic with 2-stage correction</Ey>
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
            both are booked together, ceramic attaches at{" "}
            <span style={{ color: "var(--accent)" }}>50% off</span>.
          </div>
        </div>

        <GBtn
          style={{ width: "100%", marginTop: "clamp(20px, 2.5vw, 36px)" }}
          onClick={() => router.push("/book")}
        >
          Reserve a bay
        </GBtn>
      </section>
    </Screen>
  );
}
