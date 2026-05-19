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
      <div style={{ position: "relative" }}>
        <Ph h={260} label="Studio · South San Francisco" />
        <div
          style={{
            position: "absolute",
            right: 18,
            bottom: -30,
            background: "var(--ink)",
            border: "1px solid var(--line)",
            padding: 10,
          }}
        >
          <Crest size={76} />
        </div>
      </div>
      <div style={{ padding: "48px 22px 36px" }}>
        <SH size={40} style={{ marginTop: 8 }}>
          A garage, quieter.
        </SH>
        <div
          style={{
            fontSize: 14,
            color: "var(--bone-2)",
            marginTop: 14,
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
            fontSize: 14,
            color: "var(--bone-2)",
            marginTop: 12,
            lineHeight: 1.6,
          }}
        >
          One car in, one car out. Appointments only. Coffee always.
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginTop: 28,
          }}
        >
          {CERTS.map(([cert, cat]) => (
            <div
              key={cert}
              style={{
                border: "1px solid var(--line)",
                padding: 14,
                background: "var(--ink-2)",
              }}
            >
              <Ey style={{ color: "var(--accent)" }}>{cat}</Ey>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 16,
                  marginTop: 4,
                }}
              >
                {cert}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28 }}>
          <Ey>Contact</Ey>
          {CONTACT.map(([k, v], i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr",
                padding: "12px 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <Ey>{k}</Ey>
              <div style={{ fontSize: 14 }}>{v}</div>
            </div>
          ))}
        </div>
        <GBtn
          style={{ width: "100%", marginTop: 24 }}
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
      </div>
    </Screen>
  );
}
