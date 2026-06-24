"use client";

import { useState } from "react";
import { Ey, SH, GBtn } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";

const VLTs = [5, 20, 35, 50, 70];

export default function WindowTintPage() {
  const [idx, setIdx] = useState(2);
  const vlt = VLTs[idx];
  // Map VLT 5–70 → window glass opacity. 5% = nearly opaque black,
  // 70% = barely darker than untinted. Curve tuned by eye for the
  // perceptual jump between each step.
  const tintAlpha = Math.max(0.08, 1 - (vlt / 100) * 0.9);

  return (
    <Screen title="Tint Studio" noTab>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(16px, 2.5vw, 40px)",
          paddingBottom: "clamp(28px, 4vw, 56px)",
        }}
      >
        <Ey>Ceramic IR-blocking</Ey>
        <SH size="clamp(28px, 3.6vw, 48px)" style={{ marginTop: 6 }}>
          See through the film.
        </SH>

        <div
          style={{
            position: "relative",
            border: "1px solid var(--line)",
            background:
              "linear-gradient(180deg,#1a2435 0%,#2c3a52 35%,#5a6478 60%,#3a3530 85%,#1a1612 100%)",
            marginTop: "clamp(18px, 2.5vw, 36px)",
            paddingTop: "62%",
          }}
        >
          {/* Backdrop scenery — distant SF skyline silhouette */}
          <svg
            viewBox="0 0 600 372"
            preserveAspectRatio="xMidYMid slice"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <defs>
              <radialGradient id="sun" cx="78%" cy="22%" r="14%">
                <stop offset="0%" stopColor="#f0c980" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#c98850" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#c98850" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Sun glow */}
            <rect width="600" height="372" fill="url(#sun)" />
            {/* Distant city silhouette */}
            <path
              d="M0,210 L0,180 L18,180 L18,160 L36,160 L36,175 L52,175 L52,150 L66,150 L66,170 L86,170 L86,135 L98,135 L98,165 L120,165 L120,145 L138,145 L138,170 L160,170 L160,158 L180,158 L180,140 L196,140 L196,165 L220,165 L220,180 L260,180 L260,162 L284,162 L284,182 L320,182 L320,170 L348,170 L348,186 L380,186 L380,172 L408,172 L408,190 L444,190 L444,176 L478,176 L478,192 L516,192 L516,182 L552,182 L552,200 L600,200 L600,372 L0,372 Z"
              fill="rgba(11,11,12,0.55)"
            />
            {/* Building windows — subtle warm dots */}
            {Array.from({ length: 30 }).map((_, i) => {
              const x = 30 + (i * 19) % 540;
              const y = 165 + (i * 13) % 30;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width="2"
                  height="3"
                  fill="rgba(240,201,128,0.5)"
                />
              );
            })}
            {/* Road */}
            <rect x="0" y="300" width="600" height="72" fill="rgba(8,7,9,0.85)" />
            <rect x="0" y="302" width="600" height="1.5" fill="rgba(201,169,97,0.4)" />
            {/* Center road dashes */}
            {[20, 90, 160, 230, 300, 370, 440, 510, 580].map((x) => (
              <rect
                key={x}
                x={x}
                y="332"
                width="40"
                height="3"
                fill="rgba(201,169,97,0.5)"
              />
            ))}
          </svg>

          {/* M3 — side profile silhouette overlay */}
          <svg
            viewBox="0 0 600 372"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <defs>
              <linearGradient id="m3body" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3a3d44" />
                <stop offset="55%" stopColor="#1a1c20" />
                <stop offset="100%" stopColor="#0b0b0c" />
              </linearGradient>
              <linearGradient id="m3shine" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
              <linearGradient id="m3glass" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8da4c2" />
                <stop offset="100%" stopColor="#3d4a5e" />
              </linearGradient>
            </defs>

            {/* Shadow under car */}
            <ellipse
              cx="300"
              cy="285"
              rx="220"
              ry="10"
              fill="rgba(0,0,0,0.45)"
            />

            {/* Body — main silhouette path: low slung sedan */}
            <path
              d="M 70 268
                 C 70 256, 80 250, 100 248
                 L 115 246
                 C 118 240, 128 232, 145 230
                 L 195 228
                 C 210 220, 230 196, 250 184
                 L 358 184
                 C 380 196, 400 220, 415 230
                 L 470 232
                 C 484 234, 500 240, 510 248
                 L 530 250
                 C 545 252, 555 258, 555 268
                 L 555 274
                 L 70 274 Z"
              fill="url(#m3body)"
            />

            {/* Top highlight — body shine */}
            <path
              d="M 100 248
                 L 195 228
                 C 210 220, 230 196, 250 184
                 L 358 184
                 C 380 196, 400 220, 415 230
                 L 510 248
                 L 510 252
                 L 415 234
                 C 400 224, 380 200, 358 188
                 L 250 188
                 C 230 200, 210 224, 195 232
                 L 100 252 Z"
              fill="url(#m3shine)"
              opacity="0.5"
            />

            {/* Roofline + window region (the "DLO" — daylight opening) */}
            {/* Background glass tint base — appears behind the variable-tint layer */}
            <path
              d="M 200 226
                 C 215 218, 232 198, 252 188
                 L 354 188
                 C 374 198, 390 218, 405 226
                 L 200 226 Z"
              fill="url(#m3glass)"
              opacity="0.9"
            />

            {/* B-pillar */}
            <rect x="298" y="188" width="6" height="38" fill="#0b0b0c" />
            {/* Mirror */}
            <path
              d="M 215 218 L 230 218 L 226 230 L 215 230 Z"
              fill="#0b0b0c"
            />

            {/* Belt-line trim (gold accent line) */}
            <line
              x1="200"
              y1="226"
              x2="405"
              y2="226"
              stroke="#C9A961"
              strokeWidth="0.8"
              opacity="0.5"
            />

            {/* Variable-tint glass overlay — the actual VLT simulation.
                Black fill with alpha that scales with the slider.
                Same path as the glass base above. */}
            <path
              d="M 200 226
                 C 215 218, 232 198, 252 188
                 L 354 188
                 C 374 198, 390 218, 405 226
                 L 200 226 Z"
              fill="#0b0b0c"
              fillOpacity={tintAlpha}
              style={{ transition: "fill-opacity .25s" }}
            />
            {/* Re-stamp B-pillar above the tint so it stays sharp */}
            <rect x="298" y="188" width="6" height="38" fill="#0b0b0c" />

            {/* Door cut lines */}
            <line
              x1="298"
              y1="226"
              x2="298"
              y2="270"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
            {/* Door handles */}
            <rect x="225" y="245" width="22" height="2.5" fill="rgba(201,169,97,0.7)" rx="1" />
            <rect x="340" y="245" width="22" height="2.5" fill="rgba(201,169,97,0.7)" rx="1" />

            {/* Front fender vent (M3 detail) */}
            <rect x="180" y="248" width="14" height="3" fill="rgba(201,169,97,0.6)" rx="0.5" />
            <rect x="180" y="253" width="10" height="2" fill="rgba(201,169,97,0.4)" rx="0.5" />

            {/* Kidney grille hint (front) */}
            <path
              d="M 78 245 L 95 235 L 95 268 L 78 268 Z"
              fill="#0b0b0c"
              stroke="#C9A961"
              strokeWidth="0.6"
              opacity="0.85"
            />

            {/* Headlight */}
            <path
              d="M 88 244 C 95 244, 110 246, 116 250 L 110 254 C 100 252, 92 252, 88 252 Z"
              fill="rgba(255,247,220,0.8)"
            />

            {/* Taillight */}
            <rect x="530" y="246" width="18" height="6" fill="rgba(180,30,30,0.8)" rx="1" />

            {/* Exhaust quad tips */}
            <rect x="525" y="270" width="6" height="3" fill="#1a1a1c" />
            <rect x="535" y="270" width="6" height="3" fill="#1a1a1c" />

            {/* Front wheel */}
            <g>
              <circle cx="145" cy="272" r="28" fill="#0b0b0c" />
              <circle cx="145" cy="272" r="20" fill="#1a1a1c" />
              <circle cx="145" cy="272" r="12" fill="#0b0b0c" />
              <circle cx="145" cy="272" r="3" fill="#C9A961" />
              {/* 5-spoke pattern */}
              {[0, 1, 2, 3, 4].map((i) => {
                const ang = (i * 72 - 90) * (Math.PI / 180);
                const x2 = 145 + Math.cos(ang) * 18;
                const y2 = 272 + Math.sin(ang) * 18;
                return (
                  <line
                    key={i}
                    x1="145"
                    y1="272"
                    x2={x2}
                    y2={y2}
                    stroke="#2c2d31"
                    strokeWidth="3"
                  />
                );
              })}
              {/* Brake disc gold caliper */}
              <path
                d="M 130 264 A 18 18 0 0 1 130 280"
                stroke="#C9A961"
                strokeWidth="2.5"
                fill="none"
              />
            </g>

            {/* Rear wheel */}
            <g>
              <circle cx="455" cy="272" r="28" fill="#0b0b0c" />
              <circle cx="455" cy="272" r="20" fill="#1a1a1c" />
              <circle cx="455" cy="272" r="12" fill="#0b0b0c" />
              <circle cx="455" cy="272" r="3" fill="#C9A961" />
              {[0, 1, 2, 3, 4].map((i) => {
                const ang = (i * 72 - 90) * (Math.PI / 180);
                const x2 = 455 + Math.cos(ang) * 18;
                const y2 = 272 + Math.sin(ang) * 18;
                return (
                  <line
                    key={i}
                    x1="455"
                    y1="272"
                    x2={x2}
                    y2={y2}
                    stroke="#2c2d31"
                    strokeWidth="3"
                  />
                );
              })}
              <path
                d="M 440 264 A 18 18 0 0 1 440 280"
                stroke="#C9A961"
                strokeWidth="2.5"
                fill="none"
              />
            </g>
          </svg>

          <div
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              padding: "8px 12px",
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: ".18em",
              background: "rgba(11,11,12,0.55)",
              backdropFilter: "blur(4px)",
            }}
          >
            VLT {vlt}%
          </div>
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              padding: "8px 12px",
              border: "1px solid rgba(237,232,222,0.25)",
              color: "rgba(237,232,222,0.6)",
              fontFamily: "var(--mono)",
              fontSize: 9,
              letterSpacing: ".22em",
              background: "rgba(11,11,12,0.45)",
              textTransform: "uppercase",
            }}
          >
            BMW M3 · ceramic IR
          </div>
        </div>

        <div style={{ marginTop: "clamp(14px, 2vw, 24px)" }}>
          <input
            type="range"
            min="0"
            max="4"
            value={idx}
            step="1"
            onChange={(e) => setIdx(+e.target.value)}
            style={{ width: "100%", accentColor: "var(--accent)" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            {VLTs.map((v, i) => (
              <button
                key={v}
                onClick={() => setIdx(i)}
                style={{
                  color: idx === i ? "var(--accent)" : "var(--mute)",
                  fontFamily: "var(--mono)",
                  fontSize: 10,
                  letterSpacing: ".14em",
                  cursor: "pointer",
                }}
              >
                {v}%
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "clamp(20px, 2.5vw, 36px)",
            padding: "clamp(14px, 1.8vw, 24px)",
            background: "var(--ink-2)",
            border: "1px solid var(--line)",
          }}
        >
          <Ey style={{ color: "var(--accent)" }}>
            {vlt <= 20 ? "Private" : vlt <= 35 ? "Balanced" : "Subtle"}
          </Ey>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(20px, 2vw, 26px)",
              marginTop: 4,
            }}
          >
            {vlt === 5 && "Limo black. Maximum privacy."}
            {vlt === 20 && "Privacy with visibility."}
            {vlt === 35 && "The crowd favorite."}
            {vlt === 50 && "OEM-plus. Subtle darkening."}
            {vlt === 70 && "Ceramic clear. IR only."}
          </div>
          <div
            style={{
              fontSize: "clamp(12px, 1vw, 14px)",
              color: "var(--bone-2)",
              marginTop: 10,
              lineHeight: 1.55,
            }}
          >
            Multi-layer nano-ceramic film. Rejects up to 88% of infrared
            heat and 99.9% of UV. Will not interfere with GPS, phone, or
            radio signals.
          </div>
        </div>

        <GBtn style={{ width: "100%", marginTop: "clamp(18px, 2.5vw, 32px)" }}>
          Add to quote · ${vlt <= 20 ? "1,295" : vlt <= 35 ? "1,195" : "1,095"}
        </GBtn>
      </section>
    </Screen>
  );
}
