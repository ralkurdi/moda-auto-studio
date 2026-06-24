"use client";

import { useState } from "react";
import { Ey, SH, GBtn } from "../_lib/design";
import { Screen } from "../_components/screen-shell";

// Each color carries:
//   v       — base body fill (solid color)
//   shine   — gradient overlay applied above the body for finish character
//             (gloss = strong highlight, satin = soft highlight, matte = subtle)
//   wheelOk — flag so chrome/flip variants don't try to recolor wheels
const COLORS = [
  {
    n: "Satin Black",
    v: "#15151a",
    finish: "satin",
  },
  {
    n: "Matte Graphite",
    v: "#2d2e33",
    finish: "matte",
  },
  {
    n: "Gloss Midnight",
    v: "#10243f",
    finish: "gloss",
  },
  {
    n: "British Racing",
    v: "#0f3324",
    finish: "gloss",
  },
  {
    n: "Blood Orange",
    v: "#8a2a1e",
    finish: "gloss",
  },
  {
    n: "Champagne",
    v: "#b49968",
    finish: "satin",
  },
  {
    n: "Chrome Silver",
    v: "#c3beb4",
    finish: "chrome",
  },
  {
    n: "Lavender Flip",
    v: "#7a6c92",
    finish: "flip",
  },
];

export default function VisualizerPage() {
  const [bodyColor, setBodyColor] = useState(COLORS[0].v);
  const [bodyName, setBodyName] = useState(COLORS[0].n);
  const [bodyFinish, setBodyFinish] = useState(COLORS[0].finish);
  const [roofColor, setRoofColor] = useState(null);
  const [roofFinish, setRoofFinish] = useState(null);
  const [wheelColor, setWheelColor] = useState("#0b0b0c");
  const [focused, setFocused] = useState("body");

  const pick = (c) => {
    if (focused === "body") {
      setBodyColor(c.v);
      setBodyName(c.n);
      setBodyFinish(c.finish);
    } else if (focused === "roof") {
      setRoofColor(c.v);
      setRoofFinish(c.finish);
    } else {
      setWheelColor(c.v);
    }
  };

  // Pick a finish-overlay gradient stop set. Same path is drawn on top
  // of the solid body fill with these stops; gives gloss / satin / matte /
  // chrome / flip its distinct character without needing per-color art.
  const finishOverlay = (finish, baseId) => {
    if (finish === "gloss") {
      return (
        <linearGradient id={baseId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="35%" stopColor="rgba(255,255,255,0)" />
          <stop offset="65%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
        </linearGradient>
      );
    }
    if (finish === "satin") {
      return (
        <linearGradient id={baseId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>
      );
    }
    if (finish === "matte") {
      return (
        <linearGradient id={baseId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.06)" />
        </linearGradient>
      );
    }
    if (finish === "chrome") {
      return (
        <linearGradient id={baseId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="35%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="45%" stopColor="rgba(60,60,70,0.55)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(20,20,28,0.7)" />
        </linearGradient>
      );
    }
    // flip — saturated shift overlay
    return (
      <linearGradient id={baseId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(80,180,200,0.35)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0)" />
        <stop offset="100%" stopColor="rgba(200,90,180,0.4)" />
      </linearGradient>
    );
  };

  return (
    <Screen title="Visualizer" noTab>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(16px, 2.5vw, 40px)",
          paddingBottom: "clamp(28px, 4vw, 56px)",
        }}
      >
        <Ey>Color Studio</Ey>
        <SH size="clamp(28px, 3.6vw, 48px)" style={{ marginTop: 6 }}>
          Porsche 911 · {bodyName}
        </SH>

        <div
          style={{
            marginTop: "clamp(20px, 3vw, 40px)",
            display: "flex",
            justifyContent: "center",
            background:
              "radial-gradient(ellipse at center 80%, rgba(201,169,97,0.05) 0%, transparent 60%)",
            padding: "20px 0",
          }}
        >
          <svg
            viewBox="0 0 600 280"
            width="100%"
            style={{
              maxHeight: "clamp(220px, 38vh, 420px)",
              filter: "drop-shadow(0 24px 30px rgba(0,0,0,.55))",
            }}
          >
            <defs>
              {finishOverlay(bodyFinish, "bodyFinish")}
              {finishOverlay(roofFinish || bodyFinish, "roofFinish")}

              {/* Glass gradient — sky-tinted at top to ground-tinted at bottom */}
              <linearGradient id="glass911" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(180,200,225,0.45)" />
                <stop offset="55%" stopColor="rgba(80,95,115,0.85)" />
                <stop offset="100%" stopColor="rgba(20,25,35,0.95)" />
              </linearGradient>

              {/* Wheel gradient — center to rim */}
              <radialGradient id="wheelGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1a1a1c" />
                <stop offset="65%" stopColor="#0b0b0c" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="300" cy="240" rx="260" ry="9" fill="rgba(0,0,0,0.55)" />
            <ellipse cx="300" cy="240" rx="180" ry="5" fill="rgba(0,0,0,0.4)" />

            {/* === 911 SIDE PROFILE === */}
            {/*
              Distinctive 911 silhouette:
              - Long sloping front
              - Iconic rear-engine fastback roofline (high point ~middle, descends to short rear deck)
              - Pronounced rear fender flare
              - Round headlights, classic ducktail rear
            */}

            {/* BODY — main silhouette */}
            <path
              d="M 60 215
                 C 60 200, 70 192, 90 188
                 L 110 184
                 C 115 178, 125 168, 140 162
                 L 170 156
                 C 185 130, 215 102, 260 92
                 C 305 84, 360 92, 395 110
                 C 425 128, 450 148, 470 162
                 L 510 174
                 C 525 178, 540 184, 548 192
                 C 555 200, 555 210, 553 218
                 L 548 226
                 L 60 226 Z"
              fill={bodyColor}
              stroke={focused === "body" ? "var(--accent)" : "none"}
              strokeWidth="1.5"
              onClick={() => setFocused("body")}
              style={{ cursor: "pointer", transition: "fill .25s" }}
            />

            {/* Body finish overlay — gloss/satin/matte character */}
            <path
              d="M 60 215
                 C 60 200, 70 192, 90 188
                 L 110 184
                 C 115 178, 125 168, 140 162
                 L 170 156
                 C 185 130, 215 102, 260 92
                 C 305 84, 360 92, 395 110
                 C 425 128, 450 148, 470 162
                 L 510 174
                 C 525 178, 540 184, 548 192
                 C 555 200, 555 210, 553 218
                 L 548 226
                 L 60 226 Z"
              fill="url(#bodyFinish)"
              pointerEvents="none"
              style={{ transition: "fill .25s" }}
            />

            {/* === GLASS / DLO === */}
            {/* The signature 911 fastback roofline glass region */}
            <path
              d="M 180 158
                 C 195 138, 220 116, 258 108
                 C 296 100, 348 108, 378 122
                 C 398 134, 408 148, 412 158
                 L 180 158 Z"
              fill="url(#glass911)"
              stroke="rgba(11,11,12,0.35)"
              strokeWidth="0.6"
            />

            {/* Roof skin (matches body unless overridden) */}
            <path
              d="M 232 110
                 C 256 102, 296 102, 332 110
                 C 350 116, 362 124, 368 134
                 L 232 134
                 C 226 126, 226 118, 232 110 Z"
              fill={roofColor || bodyColor}
              stroke={focused === "roof" ? "var(--accent)" : "rgba(11,11,12,0.2)"}
              strokeWidth={focused === "roof" ? 1.5 : 0.5}
              onClick={() => setFocused("roof")}
              style={{ cursor: "pointer", transition: "fill .25s" }}
            />
            <path
              d="M 232 110
                 C 256 102, 296 102, 332 110
                 C 350 116, 362 124, 368 134
                 L 232 134
                 C 226 126, 226 118, 232 110 Z"
              fill="url(#roofFinish)"
              pointerEvents="none"
              style={{ transition: "fill .25s" }}
            />

            {/* Window pillar shadows */}
            <line
              x1="240"
              y1="108"
              x2="232"
              y2="158"
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="1.2"
            />
            <line
              x1="365"
              y1="120"
              x2="380"
              y2="158"
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="1.2"
            />

            {/* Door cut line + handle */}
            <path
              d="M 250 160 Q 254 180, 256 220"
              stroke="rgba(0,0,0,0.25)"
              strokeWidth="0.8"
              fill="none"
            />
            <rect x="276" y="180" width="22" height="3" rx="1.5" fill="rgba(0,0,0,0.4)" />

            {/* Belt line trim (gold accent) */}
            <line
              x1="178"
              y1="160"
              x2="412"
              y2="160"
              stroke="rgba(201,169,97,0.5)"
              strokeWidth="0.8"
            />

            {/* Side mirror */}
            <path
              d="M 215 138 L 232 138 L 228 152 L 215 152 Z"
              fill="rgba(11,11,12,0.85)"
            />

            {/* === FRONT DETAILS === */}
            {/* Round headlight (classic 911 cue) */}
            <circle cx="105" cy="188" r="10" fill="rgba(245,235,200,0.95)" />
            <circle cx="105" cy="188" r="10" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="0.8" />
            <circle cx="103" cy="186" r="3" fill="rgba(255,255,255,0.85)" />

            {/* Front grille / intake hint */}
            <path
              d="M 78 210 L 130 210 L 125 222 L 82 222 Z"
              fill="rgba(0,0,0,0.6)"
            />

            {/* === REAR DETAILS === */}
            {/* Taillight bar — full-width 911 signature */}
            <path
              d="M 450 188 L 540 192 L 540 200 L 450 198 Z"
              fill="rgba(180,30,30,0.85)"
            />
            <path
              d="M 450 188 L 540 192 L 540 195 L 450 191 Z"
              fill="rgba(255,80,80,0.6)"
            />

            {/* Rear wing — ducktail */}
            <path
              d="M 400 140 L 458 144 L 460 152 L 402 150 Z"
              fill="rgba(11,11,12,0.85)"
            />

            {/* Exhaust dual tips */}
            <rect x="528" y="218" width="8" height="5" fill="#1a1a1c" rx="1" />
            <rect x="540" y="218" width="8" height="5" fill="#1a1a1c" rx="1" />

            {/* === WHEELS === */}
            <g onClick={() => setFocused("wheels")} style={{ cursor: "pointer" }}>
              {/* Front wheel */}
              <circle
                cx="148"
                cy="220"
                r="32"
                fill="url(#wheelGrad)"
                stroke={focused === "wheels" ? "var(--accent)" : "#0a0a0c"}
                strokeWidth="1.5"
              />
              <circle cx="148" cy="220" r="24" fill={wheelColor} stroke="#0a0a0c" strokeWidth="0.5" />
              <circle cx="148" cy="220" r="14" fill="rgba(11,11,12,0.6)" />
              {/* 5-spoke */}
              {[0, 1, 2, 3, 4].map((i) => {
                const ang = (i * 72 - 90) * (Math.PI / 180);
                const x2 = 148 + Math.cos(ang) * 22;
                const y2 = 220 + Math.sin(ang) * 22;
                return (
                  <line
                    key={i}
                    x1="148"
                    y1="220"
                    x2={x2}
                    y2={y2}
                    stroke="rgba(50,50,55,0.95)"
                    strokeWidth="3.5"
                  />
                );
              })}
              <circle cx="148" cy="220" r="4" fill="#C9A961" />
              {/* Gold brake caliper */}
              <path
                d="M 130 210 A 22 22 0 0 1 130 230"
                stroke="#C9A961"
                strokeWidth="3"
                fill="none"
              />

              {/* Rear wheel — slightly larger to match flared fender */}
              <circle
                cx="452"
                cy="220"
                r="34"
                fill="url(#wheelGrad)"
                stroke={focused === "wheels" ? "var(--accent)" : "#0a0a0c"}
                strokeWidth="1.5"
              />
              <circle cx="452" cy="220" r="26" fill={wheelColor} stroke="#0a0a0c" strokeWidth="0.5" />
              <circle cx="452" cy="220" r="15" fill="rgba(11,11,12,0.6)" />
              {[0, 1, 2, 3, 4].map((i) => {
                const ang = (i * 72 - 90) * (Math.PI / 180);
                const x2 = 452 + Math.cos(ang) * 24;
                const y2 = 220 + Math.sin(ang) * 24;
                return (
                  <line
                    key={i}
                    x1="452"
                    y1="220"
                    x2={x2}
                    y2={y2}
                    stroke="rgba(50,50,55,0.95)"
                    strokeWidth="3.5"
                  />
                );
              })}
              <circle cx="452" cy="220" r="4" fill="#C9A961" />
              <path
                d="M 432 210 A 24 24 0 0 1 432 230"
                stroke="#C9A961"
                strokeWidth="3"
                fill="none"
              />
            </g>

            {/* Fender flare highlight (rear, gives the 911 its hips) */}
            <path
              d="M 405 175 C 420 165, 450 165, 485 178"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: "clamp(12px, 1.6vw, 20px)",
          }}
        >
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
                height: 42,
                background: focused === id ? "var(--bone)" : "transparent",
                color: focused === id ? "var(--ink)" : "var(--bone-2)",
                border:
                  "1px solid " + (focused === id ? "var(--bone)" : "var(--line)"),
                fontFamily: "var(--mono)",
                fontSize: 10,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {lb}
            </button>
          ))}
        </div>

        <div style={{ marginTop: "clamp(20px, 2.5vw, 36px)" }}>
          <Ey>Films · cast, 10-year</Ey>
          <div
            className="grid-4"
            style={{ marginTop: "clamp(12px, 1.6vw, 20px)" }}
          >
            {COLORS.map((c) => {
              const active =
                (focused === "body" && bodyColor === c.v) ||
                (focused === "roof" && roofColor === c.v) ||
                (focused === "wheels" && wheelColor === c.v);
              return (
                <button
                  key={c.n}
                  onClick={() => pick(c)}
                  style={{ padding: 0, cursor: "pointer", background: "transparent", border: "none" }}
                >
                  <div
                    style={{
                      height: "clamp(60px, 8vw, 96px)",
                      background:
                        c.finish === "chrome"
                          ? `linear-gradient(135deg, ${c.v}, #6b6a65 50%, ${c.v})`
                          : c.finish === "flip"
                          ? `linear-gradient(135deg, ${c.v}, #b46db0 60%, #5d8aa8)`
                          : c.v,
                      border: active
                        ? "2px solid var(--accent)"
                        : "1px solid var(--line)",
                      boxShadow:
                        c.finish === "gloss"
                          ? "inset 0 18px 24px rgba(255,255,255,0.18)"
                          : c.finish === "matte"
                          ? "inset 0 -6px 12px rgba(0,0,0,0.2)"
                          : "none",
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
              );
            })}
          </div>
        </div>

        <div
          style={{
            marginTop: "clamp(24px, 3vw, 40px)",
            padding: "clamp(14px, 1.8vw, 24px)",
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
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: "clamp(28px, 3vw, 40px)",
              }}
            >
              $4,500
              <span
                style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: "var(--mute)" }}
              >
                {" "}
                +tax
              </span>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "var(--mute)", marginTop: 6 }}>
            Full body · single stage · 6-day bay
          </div>
        </div>
        <GBtn style={{ width: "100%", marginTop: 14 }}>
          Save &amp; request quote
        </GBtn>
      </section>
    </Screen>
  );
}
