"use client";

import { Ey, SH, Ph } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";
import { BeforeAfter } from "../../_components/before-after";

export default function WorkDetailPage() {
  return (
    <Screen title="Case Study">
      <section style={{ paddingTop: "clamp(0px, 1vw, 24px)" }}>
        <div className="container">
          <BeforeAfter label="M4 Comp · satin black" />
        </div>
      </section>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(22px, 3vw, 48px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <Ey style={{ color: "var(--accent)" }}>Wrap · 6 days</Ey>
        <SH
          size="clamp(28px, 3.6vw, 48px)"
          style={{ marginTop: 6 }}
        >
          2024 BMW M4 Competition
        </SH>
        <div
          style={{
            fontSize: "clamp(13px, 1.1vw, 16px)",
            color: "var(--bone-2)",
            marginTop: 14,
            lineHeight: 1.6,
          }}
        >
          Isle of Man Green → 3M 2080 Satin Black. Full color change with chrome
          delete on window surrounds, kidney grills, and model badges. Owner
          wanted stealth — we gave them stealth.
        </div>
        <div
          className="grid-3"
          style={{ marginTop: "clamp(20px, 2.5vw, 36px)" }}
        >
          {[
            ["Film", "3M 2080 M12"],
            ["Hours", "58"],
            ["Warranty", "10 yr"],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{
                border: "1px solid var(--line)",
                padding: "clamp(12px, 1.4vw, 18px)",
              }}
            >
              <Ey>{k}</Ey>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(18px, 1.6vw, 22px)",
                  marginTop: 4,
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
        <div
          className="grid-2"
          style={{ marginTop: "clamp(20px, 2.5vw, 36px)" }}
        >
          <Ph h={220} label="Detail · front quarter" />
          <Ph h={220} label="Detail · rear badge delete" />
        </div>
      </section>
    </Screen>
  );
}
