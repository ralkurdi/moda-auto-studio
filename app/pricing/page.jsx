"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, GBtn } from "../_lib/design";
import { Screen } from "../_components/screen-shell";

const BUNDLES = [
  ["Essential", "$3,395", "Front PPF + ceramic + full tint"],
  [
    "Signature — most popular",
    "$5,995",
    "Full front PPF + ceramic + full tint + 1yr detail",
  ],
  [
    "Concours",
    "$10,995",
    "Full-body PPF + ceramic + full tint + 2yr detail",
  ],
  ["Tesla / EV", "$4,495–$5,995", "Optimized for Tesla, Lucid, Rivian"],
  ["Track Day", "$3,295", "Front PPF + windshield ceramic + headlight PPF"],
];

const GROUPS = [
  {
    head: "Vinyl wraps · full color change",
    rows: [
      ["Coupe", "$3,000"],
      ["Sedan", "$4,500"],
      ["SUV", "$5,500"],
      ["Exotic", "Custom inquiry"],
      ["Partial accent (roof, hood, mirrors)", "$1,200–$2,400"],
      ["Satin chrome / flip films", "+20%"],
    ],
  },
  {
    head: "Paint Protection Film · 3M Scotchgard Pro Series",
    rows: [
      ["Partial front (bumper, hood strip)", "Starting at $950"],
      ["Full front (bumper, hood, fenders, mirrors)", "Starting at $1,895"],
      ["Full body", "Starting at $5,995"],
      ["Track package (rockers, A-pillars)", "+$695"],
      ["Headlight PPF add-on", "$295"],
    ],
  },
  {
    head: "Window tinting · 3M Ceramic IR",
    rows: [
      ["Sedan · full vehicle", "$1,295"],
      ["SUV / Tesla Model Y", "$1,395"],
      ["Windshield only (70% ceramic)", "$395"],
      ["Full Model S / Plaid", "$1,495"],
    ],
  },
  {
    head: "Ceramic coating + paint correction",
    rows: [
      ["Sedan", "$695"],
      ["SUV", "$795"],
      ["Large SUV / Truck", "$895"],
      ["Interior ceramic", "$495"],
      ["Wheel / caliper ceramic", "$595"],
      ["Pairs with PPF", "50% off ceramic"],
    ],
  },
  {
    head: "Add-ons & custom",
    rows: [
      ["Chrome delete", "Inquire for quote"],
      ["Custom decals", "Inquire for quote"],
      ["Commercial fleet graphics", "Inquire for quote"],
      ["Headlight tint (smoked)", "$195"],
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();
  return (
    <Screen title="Price Sheet">
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(20px, 3vw, 56px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <Ey>Published rates</Ey>
        <SH
          size="clamp(32px, 4vw, 56px)"
          style={{ marginTop: 6, marginBottom: "clamp(18px, 2.5vw, 36px)" }}
        >
          Honest numbers.
        </SH>

        {/* Bundles */}
        <div style={{ marginBottom: "clamp(28px, 4vw, 56px)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <Ey style={{ color: "var(--accent)" }}>Protection bundles</Ey>
            <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
          </div>
          {BUNDLES.map(([k, v, d], i) => (
            <div
              key={i}
              style={{
                padding: "clamp(14px, 1.6vw, 22px) 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(14px, 1.3vw, 17px)",
                    color: k.includes("most")
                      ? "var(--accent)"
                      : "var(--bone)",
                  }}
                >
                  {k}
                </span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    color: "var(--bone-2)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v}
                </span>
              </div>
              <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 4 }}>
                {d}
              </div>
            </div>
          ))}
        </div>

        {GROUPS.map((g) => (
          <div key={g.head} style={{ marginBottom: "clamp(28px, 4vw, 56px)" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <Ey style={{ color: "var(--accent)" }}>{g.head}</Ey>
              <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
            </div>
            {g.rows.map(([k, v], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  padding: "clamp(12px, 1.4vw, 18px) 0",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <span style={{ fontSize: "clamp(13.5px, 1.15vw, 15px)" }}>
                  {k}
                </span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    color: "var(--bone-2)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        ))}
        <div
          style={{
            marginTop: 8,
            padding: "clamp(14px, 1.8vw, 24px)",
            border: "1px dashed var(--line)",
            color: "var(--mute)",
            fontSize: "clamp(12px, 1vw, 13.5px)",
            lineHeight: 1.55,
          }}
        >
          Prices are starting points for typical vehicles in good paint
          condition. Final quote after intake consultation.
        </div>
        <GBtn
          style={{ width: "100%", marginTop: "clamp(20px, 2.5vw, 36px)" }}
          onClick={() => router.push("/book")}
        >
          Book a consultation
        </GBtn>
      </section>
    </Screen>
  );
}
