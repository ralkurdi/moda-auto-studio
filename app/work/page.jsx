"use client";

import { useRouter } from "next/navigation";
import { Ey, SH, Ph } from "../_lib/design";
import { Screen } from "../_components/screen-shell";
import { BeforeAfter } from "../_components/before-after";

const ITEMS = [
  {
    slug: "bmw-m4-satin-black",
    t: "2023 Porsche 911 GT3",
    s: "Full-body PPF + ceramic",
    tag: "PPF",
  },
  {
    slug: "porsche-gt3-full-body-ppf",
    t: "2024 BMW M4 Competition",
    s: "Satin black color change",
    tag: "Wrap",
  },
  {
    slug: "audi-rs6-chrome-delete",
    t: "2022 Audi RS6",
    s: "Chrome delete + 20% tint",
    tag: "Tint",
  },
  {
    slug: "tesla-plaid-midnight-flip",
    t: "2025 Tesla Model S Plaid",
    s: "Gloss midnight flip",
    tag: "Wrap",
  },
  {
    slug: "lucid-air-full-front-ppf",
    t: "2023 Lucid Air",
    s: "Full front PPF",
    tag: "PPF",
  },
  {
    slug: "cayenne-blackout",
    t: "2024 Cayenne GTS",
    s: "Blackout package",
    tag: "Trim",
  },
];

export default function WorkPage() {
  const router = useRouter();
  return (
    <Screen title="Portfolio">
      <section
        className="container"
        style={{
          paddingTop: "clamp(20px, 3vw, 56px)",
          paddingBottom: "clamp(12px, 1.5vw, 24px)",
        }}
      >
        <Ey>Before / After</Ey>
        <SH
          size="clamp(28px, 3.6vw, 48px)"
          style={{
            marginTop: 6,
            marginBottom: "clamp(14px, 2vw, 28px)",
          }}
        >
          Drag to reveal.
        </SH>
        <BeforeAfter label="BMW M4 · satin black" />
      </section>
      <section
        className="container"
        style={{
          paddingTop: "clamp(20px, 2.5vw, 40px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <Ey>Recent work</Ey>
        <div
          className="grid-3"
          style={{ marginTop: "clamp(14px, 2vw, 28px)" }}
        >
          {ITEMS.map((it, i) => (
            <button
              key={i}
              onClick={() => router.push(`/work/${it.slug}`)}
              style={{
                padding: 0,
                border: "1px solid var(--line)",
                color: "inherit",
                textAlign: "left",
                cursor: "pointer",
                transition: "border-color .15s",
                background: "var(--ink-2)",
              }}
            >
              <Ph h={160} label={it.t} />
              <div style={{ padding: "clamp(10px, 1.2vw, 16px)" }}>
                <Ey style={{ color: "var(--accent)" }}>{it.tag}</Ey>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: "clamp(15px, 1.3vw, 18px)",
                    marginTop: 6,
                    lineHeight: 1.15,
                  }}
                >
                  {it.t}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "var(--mute)",
                    marginTop: 4,
                  }}
                >
                  {it.s}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </Screen>
  );
}
