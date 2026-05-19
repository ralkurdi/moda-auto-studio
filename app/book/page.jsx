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
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(28px, 4vw, 64px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <Ey>Reserve a bay</Ey>
        <SH size="clamp(34px, 4vw, 56px)" style={{ marginTop: 10 }}>
          A{" "}
          <span style={{ fontStyle: "italic", color: "var(--accent)" }}>
            four-step
          </span>{" "}
          fitting.
        </SH>
        <div
          style={{
            fontSize: "clamp(13px, 1.15vw, 16px)",
            color: "var(--bone-2)",
            marginTop: 14,
            lineHeight: 1.6,
            maxWidth: 540,
          }}
        >
          Tell us the car, choose your service, pick a window. Jobs over $1,000
          require a $300 refundable deposit — fully refundable up to 72 hours
          before.
        </div>
        <div style={{ marginTop: "clamp(24px, 3vw, 44px)" }}>
          {STEPS.map(([n, t, s], i) => (
            <div
              key={n}
              style={{
                display: "grid",
                gridTemplateColumns: "clamp(44px, 5vw, 64px) 1fr",
                padding: "clamp(16px, 2vw, 24px) 0",
                borderBottom:
                  i < STEPS.length - 1 ? "1px solid var(--line)" : "none",
                gap: 12,
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
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(20px, 1.8vw, 24px)",
                  }}
                >
                  {t}
                </div>
                <div
                  style={{ fontSize: 12, color: "var(--mute)", marginTop: 4 }}
                >
                  {s}
                </div>
              </div>
            </div>
          ))}
        </div>
        <GBtn
          style={{ width: "100%", marginTop: "clamp(24px, 3vw, 40px)" }}
          onClick={() => router.push("/book/vehicle")}
        >
          Begin fitting
        </GBtn>
      </section>
    </Screen>
  );
}
