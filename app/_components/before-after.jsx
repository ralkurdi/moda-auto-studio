"use client";

import { useRef, useState } from "react";
import { Ph } from "../_lib/design";

export const BeforeAfter = ({ label = "Porsche 911 · matte PPF" }) => {
  const [pos, setPos] = useState(54);
  const ref = useRef(null);

  const drag = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
    setPos(Math.max(4, Math.min(96, (x / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      onMouseMove={(e) => e.buttons === 1 && drag(e)}
      onMouseDown={drag}
      onTouchMove={drag}
      style={{
        position: "relative",
        height: 240,
        userSelect: "none",
        cursor: "ew-resize",
        overflow: "hidden",
        border: "1px solid var(--line)",
      }}
    >
      <Ph h={240} label={`After · ${label}`} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      >
        <div
          className="ph ph-bone"
          data-lbl="Before · raw paint"
          style={{ position: "absolute", inset: 0, height: "100%" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: 2,
          background: "var(--accent)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 34,
            height: 34,
            borderRadius: 17,
            background: "var(--accent)",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--mono)",
            fontSize: 9,
          }}
        >
          ◀▶
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: ".16em",
          color: "var(--ink)",
          background: "var(--bone)",
          padding: "3px 8px",
        }}
      >
        BEFORE
      </div>
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          fontFamily: "var(--mono)",
          fontSize: 9,
          letterSpacing: ".16em",
          color: "var(--accent)",
          border: "1px solid var(--accent)",
          padding: "3px 8px",
        }}
      >
        AFTER
      </div>
    </div>
  );
};
