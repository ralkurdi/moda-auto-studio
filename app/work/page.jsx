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
      <div style={{ padding: "20px 22px 12px" }}>
        <Ey>Before / After</Ey>
        <SH size={28} style={{ marginTop: 6, marginBottom: 14 }}>
          Drag to reveal.
        </SH>
        <BeforeAfter label="BMW M4 · satin black" />
      </div>
      <div style={{ padding: "8px 22px 36px" }}>
        <Ey style={{ marginTop: 20 }}>Recent work</Ey>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginTop: 14,
          }}
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
              }}
            >
              <Ph h={120} label={it.t} />
              <div style={{ padding: 10 }}>
                <Ey style={{ color: "var(--accent)" }}>{it.tag}</Ey>
                <div
                  style={{
                    fontFamily: "var(--serif)",
                    fontSize: 15,
                    marginTop: 4,
                    lineHeight: 1.15,
                  }}
                >
                  {it.t}
                </div>
                <div
                  style={{ fontSize: 11, color: "var(--mute)", marginTop: 3 }}
                >
                  {it.s}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Screen>
  );
}
