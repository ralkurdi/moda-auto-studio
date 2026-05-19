"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, ChevronR } from "../_lib/design";
import { Screen } from "../_components/screen-shell";

const CATS = [
  {
    href: "/services/vinyl-wraps",
    kicker: "Vinyl",
    title: "Color-change wraps",
    from: "$4,500",
    bullets: [
      "Full & partial",
      "Satin · gloss · chrome · PPF-over-wrap",
      "5–7 days in studio",
    ],
  },
  {
    href: "/services",
    kicker: "PPF",
    title: "Paint Protection Film",
    from: "$1,895",
    bullets: [
      "Front partial · full front · full body",
      "10-year self-healing XPEL film",
      "Track packages available",
    ],
  },
  {
    href: "/services/window-tint",
    kicker: "Tint",
    title: "Window tinting",
    from: "$1,295",
    bullets: [
      "Ceramic IR-blocking",
      "5% · 20% · 35% · 50% VLT",
      "Lifetime warranty",
    ],
  },
  {
    href: "/services",
    kicker: "Ceramic",
    title: "Ceramic coating",
    from: "$1,495",
    bullets: [
      "9H gloss enhancement",
      "5 / 9-year packages",
      "Pairs with PPF — attaches at 50% off",
    ],
  },
  {
    href: "/services",
    kicker: "Correction",
    title: "Paint correction",
    from: "$1,195",
    bullets: [
      "1 & 2-stage polish",
      "Pre-coat prep",
      "Swirl & oxidation removal",
    ],
  },
  {
    href: "/services",
    kicker: "Trim",
    title: "Chrome delete",
    from: "$395",
    bullets: [
      "Badge blackout",
      "Window surrounds",
      "Headlight / taillight tint",
    ],
  },
];

export default function ServicesPage() {
  const router = useRouter();
  return (
    <Screen title="Services">
      <div style={{ padding: "20px 22px 32px" }}>
        <Ey>Studio disciplines</Ey>
        <SH size={36} style={{ marginTop: 8, marginBottom: 20 }}>
          Every finish, one roof.
        </SH>
        {CATS.map((c, i) => (
          <button
            key={i}
            onClick={() => router.push(c.href)}
            style={{
              width: "100%",
              textAlign: "left",
              background: "var(--ink-2)",
              border: "1px solid var(--line)",
              padding: 18,
              marginBottom: 10,
              color: "inherit",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 10,
            }}
          >
            <div>
              <Ey style={{ color: "var(--accent)" }}>{c.kicker}</Ey>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 22,
                  marginTop: 4,
                }}
              >
                {c.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--mute)",
                  marginTop: 8,
                  lineHeight: 1.7,
                }}
              >
                {c.bullets.map((b, j) => (
                  <div key={j}>· {b}</div>
                ))}
              </div>
            </div>
            <div
              style={{
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Ey>From</Ey>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 22,
                  color: "var(--bone)",
                }}
              >
                {c.from}
              </div>
              <span style={{ color: "var(--accent)" }}>
                <ChevronR />
              </span>
            </div>
          </button>
        ))}
        <button
          onClick={() => router.push("/pricing")}
          style={{
            width: "100%",
            marginTop: 10,
            padding: 16,
            border: "1px dashed var(--line)",
            color: "var(--bone-2)",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: ".18em",
            textTransform: "uppercase",
          }}
        >
          View full price sheet →
        </button>
      </div>
    </Screen>
  );
}
