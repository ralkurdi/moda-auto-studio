"use client";

import { Ey, SH, Ph } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";
import { BeforeAfter } from "../../_components/before-after";

export default function WorkDetailPage() {
  return (
    <Screen title="Case Study">
      <BeforeAfter label="M4 Comp · satin black" />
      <div style={{ padding: 22 }}>
        <Ey style={{ color: "var(--accent)" }}>Wrap · 6 days</Ey>
        <SH size={28} style={{ marginTop: 6 }}>
          2024 BMW M4 Competition
        </SH>
        <div
          style={{
            fontSize: 13,
            color: "var(--bone-2)",
            marginTop: 12,
            lineHeight: 1.6,
          }}
        >
          Isle of Man Green → 3M 2080 Satin Black. Full color change with
          chrome delete on window surrounds, kidney grills, and model badges.
          Owner wanted stealth — we gave them stealth.
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 8,
            marginTop: 22,
          }}
        >
          {[
            ["Film", "3M 2080 M12"],
            ["Hours", "58"],
            ["Warranty", "10 yr"],
          ].map(([k, v]) => (
            <div
              key={k}
              style={{ border: "1px solid var(--line)", padding: 12 }}
            >
              <Ey>{k}</Ey>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 18,
                  marginTop: 4,
                }}
              >
                {v}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 22 }}>
          <Ph h={180} label="Detail · front quarter" />
        </div>
        <div style={{ marginTop: 10 }}>
          <Ph h={180} label="Detail · rear badge delete" />
        </div>
      </div>
    </Screen>
  );
}
