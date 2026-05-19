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
      <div style={{ padding: "16px 22px 0" }}>
        <Ey>Ceramic IR-blocking</Ey>
        <SH size={28} style={{ marginTop: 6 }}>
          See through the film.
        </SH>
      </div>
      <div style={{ padding: "18px 22px" }}>
        <div
          style={{
            position: "relative",
            height: 240,
            border: "1px solid var(--line)",
            overflow: "hidden",
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
              top: 12,
              right: 12,
              padding: "6px 10px",
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: ".18em",
            }}
          >
            VLT {vlt}%
          </div>
        </div>
      </div>
      <div style={{ padding: "6px 22px 0" }}>
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
              }}
            >
              {v}%
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "18px 22px 8px" }}>
        <div
          style={{
            padding: 14,
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
              fontSize: 20,
              marginTop: 4,
            }}
          >
            {vlt === 5 && "Limo — rear only in CA."}
            {vlt === 20 && "Privacy with visibility."}
            {vlt === 35 && "The crowd favorite."}
            {vlt === 50 && "OEM-plus. Legal front."}
            {vlt === 70 && "Ceramic clear. IR only."}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--bone-2)",
              marginTop: 8,
              lineHeight: 1.5,
            }}
          >
            {vlt <= 35
              ? "California law requires front doors ≥ 70% VLT. We install the legal complement on the front."
              : "Fully street-legal all-around. Rejects up to 88% of infrared heat."}
          </div>
        </div>
      </div>
      <div style={{ padding: "18px 22px 22px" }}>
        <GBtn style={{ width: "100%" }}>
          Add to quote · ${vlt <= 20 ? "1,295" : vlt <= 35 ? "1,195" : "1,095"}
        </GBtn>
      </div>
    </Screen>
  );
}
