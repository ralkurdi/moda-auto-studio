"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Ey, SH, Ph } from "../_lib/design";
import { Screen } from "../_components/screen-shell";
import { BeforeAfter } from "../_components/before-after";

const IG_HANDLE = "modaautostudio";

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
  const [igPosts, setIgPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram/feed")
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data?.posts)) {
          setIgPosts(data.posts);
        }
      })
      .catch(() => {
        // Silent — section just won't render if the API call fails.
      });
    return () => {
      cancelled = true;
    };
  }, []);

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

      {/* Instagram feed — SHELVED until the @modaautostudio account exits
          Meta's review and we can generate a long-lived Graph API token.
          The section is conditionally rendered, so until INSTAGRAM_ACCESS_TOKEN
          + INSTAGRAM_USER_ID are populated in .env.local, nothing appears.
          Re-enable by completing the Meta Developer walkthrough and adding
          the env vars — no further code changes needed. */}
      {igPosts.length > 0 && (
        <section
          className="container"
          style={{
            paddingTop: "clamp(36px, 5vw, 80px)",
            paddingBottom: "clamp(36px, 5vw, 80px)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: "clamp(14px, 2vw, 28px)",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <div>
              <Ey>From the bay</Ey>
              <div
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "clamp(24px, 3vw, 36px)",
                  color: "var(--bone)",
                  marginTop: 8,
                  lineHeight: 1.1,
                }}
              >
                @{IG_HANDLE}
              </div>
            </div>
            <a
              href={`https://instagram.com/${IG_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--accent)",
                fontFamily: "var(--mono)",
                fontSize: 11,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Follow →
            </a>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "clamp(6px, 1vw, 12px)",
            }}
          >
            {igPosts.map((p) => {
              const src =
                p.media_type === "VIDEO" ? p.thumbnail_url || p.media_url : p.media_url;
              return (
                <a
                  key={p.id}
                  href={p.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    aspectRatio: "1",
                    background: "var(--ink-2)",
                    border: "1px solid var(--line)",
                    display: "block",
                    overflow: "hidden",
                    position: "relative",
                  }}
                  aria-label={p.caption?.slice(0, 80) || "Instagram post"}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </a>
              );
            })}
          </div>
        </section>
      )}
    </Screen>
  );
}
