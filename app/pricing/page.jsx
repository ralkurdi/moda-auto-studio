"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, GBtn } from "../_lib/design";
import { Screen } from "../_components/screen-shell";

const BUNDLES = [
  ["Essential", "$3,995", "Front PPF + 5yr ceramic + full tint"],
  [
    "Signature — most popular",
    "$6,495",
    "Full front PPF + 5yr ceramic + full tint + 1yr detail",
  ],
  [
    "Concours",
    "$11,995",
    "Full-body PPF + 9yr ceramic + full tint + 2yr detail",
  ],
  ["Tesla / EV", "$4,995–$6,495", "Optimized for Tesla, Lucid, Rivian"],
  [
    "Track Day",
    "$3,495",
    "Front PPF + windshield ceramic + headlight PPF",
  ],
];

const GROUPS = [
  {
    head: "Vinyl wraps",
    rows: [
      ["Partial accent (roof, hood, mirrors)", "$1,200–$2,400"],
      ["Full color change · sedan", "$4,500–$5,200"],
      ["Full color change · SUV / truck", "$5,200–$6,500"],
      ["Full color change · exotic", "$6,500+"],
      ["Satin chrome / flip films", "+20%"],
    ],
  },
  {
    head: "Paint Protection Film",
    rows: [
      ["Partial front (bumper, hood strip)", "$950"],
      ["Full front (bumper, hood, fenders, mirrors)", "$1,895"],
      ["Full body", "$5,995–$7,800"],
      ["Track package (rockers, A-pillars)", "+$695"],
      ["Headlight PPF add-on", "$295"],
    ],
  },
  {
    head: "Window tinting",
    rows: [
      ["Sedan · full vehicle", "$1,295"],
      ["SUV / Tesla Model Y", "$1,395"],
      ["Windshield only (70% ceramic)", "$395"],
      ["Full Model S / Plaid", "$1,495"],
    ],
  },
  {
    head: "Ceramic coating",
    rows: [
      ["3-year program", "$995"],
      ["5-year program", "$1,495"],
      ["9-year program", "$2,195"],
      ["Interior ceramic", "$495"],
      ["Wheel / caliper ceramic", "$595"],
    ],
  },
  {
    head: "Add-ons",
    rows: [
      ["Paint correction · 2-stage", "$1,195"],
      ["Chrome delete", "$395–$595"],
      ["Headlight tint (smoked)", "$195"],
    ],
  },
];

export default function PricingPage() {
  const router = useRouter();
  return (
    <Screen title="Price Sheet">
      <div style={{ padding: "20px 22px 40px" }}>
        <Ey>Published rates</Ey>
        <SH size={32} style={{ marginTop: 6, marginBottom: 18 }}>
          Honest numbers.
        </SH>

        {/* Bundles */}
        <div style={{ marginBottom: 28 }}>
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
                padding: "14px 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
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
                    fontSize: 13,
                    color: "var(--bone-2)",
                  }}
                >
                  {v}
                </span>
              </div>
              <div
                style={{ fontSize: 11, color: "var(--mute)", marginTop: 3 }}
              >
                {d}
              </div>
            </div>
          ))}
        </div>

        {GROUPS.map((g) => (
          <div key={g.head} style={{ marginBottom: 28 }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <Ey style={{ color: "var(--accent)" }}>{g.head}</Ey>
              <div
                style={{ flex: 1, height: 1, background: "var(--line)" }}
              />
            </div>
            {g.rows.map(([k, v], i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <span style={{ fontSize: 13.5 }}>{k}</span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 13,
                    color: "var(--bone-2)",
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
            padding: 16,
            border: "1px dashed var(--line)",
            color: "var(--mute)",
            fontSize: 12,
            lineHeight: 1.5,
          }}
        >
          Prices are starting points for typical vehicles in good paint
          condition. Final quote after intake consultation.
        </div>
        <GBtn
          style={{ width: "100%", marginTop: 20 }}
          onClick={() => router.push("/book")}
        >
          Book a consultation
        </GBtn>
      </div>
    </Screen>
  );
}
