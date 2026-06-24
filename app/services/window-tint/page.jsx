"use client";

import { useState } from "react";
import { Ey, SH, GBtn } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";

const VLTs = [5, 20, 35, 50, 70];

export default function WindowTintPage() {
  const [idx, setIdx] = useState(2);
  const vlt = VLTs[idx];
  const overlay = `rgba(11,11,12,${1 - (vlt / 100) * 0.95})`;

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
            height: "clamp(240px, 40vh, 480px)",
            border: "1px solid var(--line)",
            overflow: "hidden",
            marginTop: "clamp(18px, 2.5vw, 36px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg,#4a5e78 0%,#6e7a8a 40%,#a4a095 60%,#8a7a5a 80%,#3d3a30 100%)",
            }}
          />
          <svg
            viewBox="0 0 300 240"
            preserveAspectRatio="xMidYMid slice"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <rect x="20" y="100" width="40" height="140" fill="rgba(11,11,12,0.55)" />
            <rect x="70" y="70" width="50" height="170" fill="rgba(11,11,12,0.65)" />
            <rect x="130" y="110" width="36" height="130" fill="rgba(11,11,12,0.5)" />
            <rect x="175" y="50" width="55" height="190" fill="rgba(11,11,12,0.72)" />
            <rect x="240" y="95" width="50" height="145" fill="rgba(11,11,12,0.6)" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((r) => (
              <g key={r}>
                {[0, 1, 2].map((c) => (
                  <rect
                    key={c}
                    x={28 + c * 10}
                    y={110 + r * 14}
                    width="6"
                    height="6"
                    fill="rgba(201,169,97,0.5)"
                  />
                ))}
              </g>
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((r) => (
              <g key={r}>
                {[0, 1, 2, 3].map((c) => (
                  <rect
                    key={c}
                    x={180 + c * 10}
                    y={60 + r * 14}
                    width="6"
                    height="6"
                    fill="rgba(201,169,97,0.55)"
                  />
                ))}
              </g>
            ))}
            <polygon
              points="0,240 120,180 180,180 300,240"
              fill="rgba(11,11,12,0.8)"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: overlay,
              transition: "background .25s",
            }}
          />
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
            }}
          >
            VLT {vlt}%
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
