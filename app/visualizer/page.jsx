"use client";

import { useState } from "react";
import { Ey, SH, GBtn } from "../_lib/design";
import { Screen } from "../_components/screen-shell";

const COLORS = [
  { n: "Satin Black", v: "#15151a" },
  { n: "Matte Graphite", v: "#2d2e33" },
  { n: "Gloss Midnight", v: "#10243f" },
  { n: "British Racing", v: "#0f3324" },
  { n: "Blood Orange", v: "#8a2a1e" },
  { n: "Champagne", v: "#b49968" },
  { n: "Chrome Silver", v: "#c3beb4" },
  { n: "Lavender Flip", v: "#7a6c92" },
];

export default function VisualizerPage() {
  const [bodyColor, setBodyColor] = useState(COLORS[0].v);
  const [bodyName, setBodyName] = useState(COLORS[0].n);
  const [roofColor, setRoofColor] = useState(null);
  const [wheelColor, setWheelColor] = useState("#0b0b0c");
  const [focused, setFocused] = useState("body");

  const pick = (c) => {
    if (focused === "body") {
      setBodyColor(c.v);
      setBodyName(c.n);
    } else if (focused === "roof") {
      setRoofColor(c.v);
    } else {
      setWheelColor(c.v);
    }
  };

  return (
    <Screen title="Visualizer" noTab>
      <div style={{ padding: "16px 22px 0" }}>
        <Ey>Color Studio</Ey>
        <SH size={28} style={{ marginTop: 6 }}>
          2024 Porsche Cayenne · {bodyName}
        </SH>
      </div>
      <div
        style={{
          padding: "24px 22px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 360 160"
          width="100%"
          height="180"
          style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,.5))" }}
        >
          <ellipse cx="180" cy="148" rx="140" ry="6" fill="rgba(201,169,97,0.08)" />
          <path
            d="M30 110 Q40 80 90 72 L130 62 Q180 52 230 62 L270 72 Q320 80 330 110 L330 124 Q300 132 180 132 Q60 132 30 124 Z"
            fill={bodyColor}
            stroke={focused === "body" ? "var(--accent)" : "none"}
            strokeWidth="1.5"
            onClick={() => setFocused("body")}
            style={{ cursor: "pointer" }}
          />
          <path
            d="M110 80 Q130 62 175 60 Q220 58 240 78 L240 92 L110 92 Z"
            fill="rgba(237,232,222,0.12)"
            stroke="rgba(237,232,222,0.25)"
            strokeWidth="0.5"
          />
          <path
            d="M115 78 Q135 66 175 64 Q215 62 235 78 L235 84 L115 84 Z"
            fill={roofColor || bodyColor}
            stroke={focused === "roof" ? "var(--accent)" : "none"}
            strokeWidth="1.2"
            onClick={() => setFocused("roof")}
            style={{ cursor: "pointer" }}
          />
          <line
            x1="180"
            y1="90"
            x2="180"
            y2="128"
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="0.6"
          />
          <ellipse cx="312" cy="100" rx="10" ry="5" fill="rgba(237,232,222,0.85)" />
          <ellipse cx="48" cy="100" rx="7" ry="4" fill="rgba(201,169,97,0.8)" />
          <g
            onClick={() => setFocused("wheels")}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx="90"
              cy="130"
              r="20"
              fill="#050505"
              stroke={focused === "wheels" ? "var(--accent)" : "#222"}
              strokeWidth="1.5"
            />
            <circle cx="90" cy="130" r="14" fill={wheelColor} />
            <circle cx="90" cy="130" r="3" fill="var(--bone)" />
            <circle
              cx="270"
              cy="130"
              r="20"
              fill="#050505"
              stroke={focused === "wheels" ? "var(--accent)" : "#222"}
              strokeWidth="1.5"
            />
            <circle cx="270" cy="130" r="14" fill={wheelColor} />
            <circle cx="270" cy="130" r="3" fill="var(--bone)" />
          </g>
        </svg>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "0 22px" }}>
        {[
          ["body", "Body"],
          ["roof", "Roof"],
          ["wheels", "Wheels"],
        ].map(([id, lb]) => (
          <button
            key={id}
            onClick={() => setFocused(id)}
            style={{
              flex: 1,
              height: 38,
              background:
                focused === id ? "var(--bone)" : "transparent",
              color: focused === id ? "var(--ink)" : "var(--bone-2)",
              border:
                "1px solid " +
                (focused === id ? "var(--bone)" : "var(--line)"),
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: ".18em",
              textTransform: "uppercase",
            }}
          >
            {lb}
          </button>
        ))}
      </div>
      <div style={{ padding: "20px 22px" }}>
        <Ey>Films · cast, 10-year</Ey>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 10,
            marginTop: 12,
          }}
        >
          {COLORS.map((c) => (
            <button key={c.n} onClick={() => pick(c)} style={{ padding: 0 }}>
              <div
                style={{
                  height: 60,
                  background: c.v,
                  border:
                    focused === "body" && bodyColor === c.v
                      ? "2px solid var(--accent)"
                      : "1px solid var(--line)",
                }}
              />
              <div
                style={{
                  fontSize: 9.5,
                  color: "var(--bone-2)",
                  marginTop: 6,
                  textAlign: "left",
                  fontFamily: "var(--mono)",
                  letterSpacing: ".08em",
                }}
              >
                {c.n}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 22px 24px" }}>
        <div
          style={{
            padding: 16,
            background: "var(--ink-2)",
            border: "1px solid var(--line)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Ey>Estimate</Ey>
            <div style={{ fontFamily: "var(--serif)", fontSize: 28 }}>
              $4,500
              <span style={{ fontSize: 14, color: "var(--mute)" }}> +tax</span>
            </div>
          </div>
          <div
            style={{ fontSize: 11, color: "var(--mute)", marginTop: 6 }}
          >
            Full body · single stage · 6-day bay
          </div>
        </div>
        <GBtn style={{ width: "100%", marginTop: 14 }}>
          Save & request quote
        </GBtn>
      </div>
    </Screen>
  );
}
