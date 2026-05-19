"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Crest, Ph } from "../_lib/design";
import { Screen } from "../_components/screen-shell";

const CERTS = [
  ["XPEL Authorized", "PPF"],
  ["Llumar FormulaOne", "Tint"],
  ["IDA Member", "Detailing"],
  ["Avery SW900", "Vinyl"],
];

const CONTACT = [
  ["Studio", "412 Forbes Blvd, South SF 94080"],
  ["Hours", "Mon–Sat · 9–6 · by appointment"],
  ["Phone", "(415) 555-0192"],
  ["Email", "book@modaautostudio.com"],
  ["Instagram", "@modaautostudio"],
];

export default function AboutPage() {
  const router = useRouter();
  return (
    <Screen title="The Studio">
      {/* Hero photo strip — full bleed on mobile, contained but tall on desktop */}
      <section style={{ position: "relative", flexShrink: 0 }}>
        <Ph
          h="clamp(260px, 45vh, 540px)"
          label="Studio · South San Francisco"
        />
        <div
          className="container"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            paddingBottom: 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              background: "var(--ink)",
              border: "1px solid var(--line)",
              padding: "clamp(10px, 1.2vw, 16px)",
              transform: "translateY(50%)",
              pointerEvents: "auto",
            }}
          >
            <Crest size={76} />
          </div>
        </div>
      </section>

      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(48px, 6vw, 96px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <SH size="clamp(40px, 5vw, 64px)" style={{ marginTop: 8 }}>
          A garage, quieter.
        </SH>
        <div
          style={{
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "var(--bone-2)",
            marginTop: 16,
            lineHeight: 1.6,
          }}
        >
          MODA is a two-person studio in South San Francisco. We built it
          because we were tired of rushed installs in dusty back lots — we
          wanted a climate-controlled space, the right tools, and enough time
          per car to finish edges the way our hands actually wanted to finish
          them.
        </div>
        <div
          style={{
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "var(--bone-2)",
            marginTop: 14,
            lineHeight: 1.6,
          }}
        >
          One car in, one car out. Appointments only. Coffee always.
        </div>
        <div
          className="grid-4"
          style={{ marginTop: "clamp(28px, 4vw, 56px)" }}
        >
          {CERTS.map(([cert, cat]) => (
            <div
              key={cert}
              style={{
                border: "1px solid var(--line)",
                padding: "clamp(14px, 1.6vw, 22px)",
                background: "var(--ink-2)",
              }}
            >
              <Ey style={{ color: "var(--accent)" }}>{cat}</Ey>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  marginTop: 6,
                }}
              >
                {cert}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "clamp(28px, 4vw, 56px)" }}>
          <Ey>Contact</Ey>
          {CONTACT.map(([k, v], i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                padding: "clamp(12px, 1.4vw, 18px) 0",
                borderBottom: "1px solid var(--line)",
                gap: 16,
              }}
            >
              <Ey>{k}</Ey>
              <div style={{ fontSize: "clamp(14px, 1.15vw, 16px)" }}>{v}</div>
            </div>
          ))}
        </div>
        <GBtn
          style={{ width: "100%", marginTop: "clamp(24px, 3vw, 40px)" }}
          onClick={() => router.push("/book")}
        >
          Book your fitting
        </GBtn>
        <GBtn
          v="ghost"
          style={{ width: "100%", marginTop: 10 }}
          onClick={() => router.push("/reviews")}
        >
          Read all reviews
        </GBtn>
      </section>
    </Screen>
  );
}
