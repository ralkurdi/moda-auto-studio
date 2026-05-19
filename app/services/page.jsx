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
      <section
        className="container"
        style={{
          paddingTop: "clamp(20px, 3vw, 56px)",
          paddingBottom: "clamp(32px, 5vw, 80px)",
        }}
      >
        <Ey>Studio disciplines</Ey>
        <SH
          size="clamp(36px, 4.5vw, 64px)"
          style={{
            marginTop: 8,
            marginBottom: "clamp(20px, 3vw, 40px)",
          }}
        >
          Every finish, one roof.
        </SH>
        <div className="grid-2">
          {CATS.map((c, i) => (
            <button
              key={i}
              onClick={() => router.push(c.href)}
              style={{
                width: "100%",
                textAlign: "left",
                background: "var(--ink-2)",
                border: "1px solid var(--line)",
                padding: "clamp(18px, 2vw, 28px)",
                color: "inherit",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 14,
                cursor: "pointer",
                transition: "border-color .15s",
              }}
            >
              <div>
                <Ey style={{ color: "var(--accent)" }}>{c.kicker}</Ey>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(22px, 2.2vw, 28px)",
                    marginTop: 4,
                    lineHeight: 1.15,
                  }}
                >
                  {c.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--mute)",
                    marginTop: 10,
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
                    fontSize: "clamp(20px, 2vw, 26px)",
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
        </div>
        <button
          onClick={() => router.push("/pricing")}
          style={{
            width: "100%",
            marginTop: 16,
            padding: 16,
            border: "1px dashed var(--line)",
            color: "var(--bone-2)",
            fontFamily: "var(--mono)",
            fontSize: 11,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          View full price sheet →
        </button>
      </section>
    </Screen>
  );
}
