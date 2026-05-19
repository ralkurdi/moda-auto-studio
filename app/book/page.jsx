"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, GBtn } from "../_lib/design";
import { Screen } from "../_components/screen-shell";

const STEPS = [
  ["01", "Your vehicle", "Year · Make · Model"],
  ["02", "The service", "Wrap, PPF, tint, or combo"],
  ["03", "Pick a window", "Live availability · 6 weeks ahead"],
  ["04", "Confirm reservation", "Text confirmation · deposit if required"],
];

export default function BookHubPage() {
  const router = useRouter();
  return (
    <Screen title="Book">
      <div style={{ padding: "28px 22px 12px" }}>
        <Ey>Reserve a bay</Ey>
        <SH size={34} style={{ marginTop: 8 }}>
          A{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
            four-step
          </span>{" "}
          fitting.
        </SH>
        <div
          style={{
            fontSize: 13,
            color: "var(--bone-2)",
            marginTop: 12,
            lineHeight: 1.55,
          }}
        >
          Tell us the car, choose your service, pick a window. Jobs over $1,000
          require a $300 refundable deposit — fully refundable up to 72 hours
          before.
        </div>
      </div>
      <div style={{ padding: "20px 22px" }}>
        {STEPS.map(([n, t, s], i) => (
          <div
            key={n}
            style={{
              display: "grid",
              gridTemplateColumns: "44px 1fr",
              padding: "16px 0",
              borderBottom: i < 3 ? "1px solid var(--line)" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--accent)",
              }}
            >
              {n}
            </div>
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: 20 }}>
                {t}
              </div>
              <div
                style={{ fontSize: 12, color: "var(--mute)", marginTop: 3 }}
              >
                {s}
              </div>
            </div>
          </div>
        ))}
        <GBtn
          style={{ width: "100%", marginTop: 24 }}
          onClick={() => router.push("/book/vehicle")}
        >
          Begin fitting
        </GBtn>
      </div>
    </Screen>
  );
}
