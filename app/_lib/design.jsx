"use client";

export const Ey = ({ children, style }) => (
  <div
    style={{
      fontFamily: "var(--mono)",
      fontSize: 10,
      letterSpacing: ".18em",
      textTransform: "uppercase",
      color: "var(--mute)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const SH = ({ children, size = 34, style }) => (
  <div
    style={{
      fontFamily: "var(--serif)",
      fontWeight: 500,
      fontSize: size,
      lineHeight: 1.05,
      letterSpacing: -0.3,
      color: "var(--bone)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Rule = ({ style }) => (
  <hr
    style={{
      border: 0,
      borderTop: "1px solid var(--line)",
      margin: 0,
      ...style,
    }}
  />
);

export const GBtn = ({
  children,
  onClick,
  style,
  v = "solid",
  disabled,
  type = "button",
}) => {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    padding: "0 20px",
    borderRadius: 2,
    fontFamily: "var(--mono)",
    fontSize: 11,
    letterSpacing: ".18em",
    textTransform: "uppercase",
    border: "1px solid var(--accent)",
    transition: "filter .15s",
    cursor: "pointer",
  };
  const vs = {
    solid: { background: "var(--accent)", color: "var(--ink)" },
    ghost: { background: "transparent", color: "var(--accent)" },
    bone: {
      background: "var(--bone)",
      color: "var(--ink)",
      borderColor: "var(--bone)",
    },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        ...base,
        ...vs[v],
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? "none" : "auto",
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export const Crest = ({ size = 24 }) => (
  <svg
    viewBox="0 0 200 200"
    width={size}
    height={size}
    style={{ display: "block" }}
  >
    <circle
      cx="100"
      cy="100"
      r="94"
      fill="none"
      stroke="var(--bone)"
      strokeOpacity=".35"
      strokeWidth="1.2"
    />
    <circle
      cx="100"
      cy="100"
      r="88"
      fill="none"
      stroke="var(--bone)"
      strokeOpacity=".95"
      strokeWidth="1.2"
    />
    {[0, 90, 180, 270].map((d) => (
      <line
        key={d}
        x1="100"
        y1="6"
        x2="100"
        y2="16"
        stroke="var(--accent)"
        strokeWidth="2"
        transform={`rotate(${d} 100 100)`}
      />
    ))}
    <text
      x="80"
      y="118"
      fontSize="82"
      fontFamily="var(--serif)"
      fontWeight="500"
      fill="var(--bone)"
      textAnchor="middle"
    >
      M
    </text>
    <text
      x="122"
      y="118"
      fontSize="82"
      fontFamily="var(--serif)"
      fontWeight="500"
      fill="var(--accent)"
      textAnchor="middle"
    >
      A
    </text>
  </svg>
);

export const Wordmark = ({ size = 18 }) => (
  <div
    style={{
      fontFamily: "var(--serif)",
      fontWeight: 500,
      fontSize: size,
      letterSpacing: ".22em",
      paddingLeft: ".22em",
      display: "inline-flex",
      color: "var(--bone)",
    }}
  >
    <span>MOD</span>
    <span style={{ color: "var(--accent)" }}>A</span>
  </div>
);

export const ChevronR = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M6 3l5 5-5 5" />
  </svg>
);

export const ChevronL = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
  >
    <path d="M10 3L5 8l5 5" />
  </svg>
);

export const Ph = ({ h, label, bone, style }) => (
  <div
    className={`ph${bone ? " ph-bone" : ""}`}
    data-lbl={label}
    style={{ height: h, flexShrink: 0, ...style }}
  />
);

export const Progress = ({ step }) => (
  <div style={{ display: "flex", gap: 6, padding: "12px 22px" }}>
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        style={{
          flex: 1,
          height: 2,
          background: i <= step ? "var(--accent)" : "var(--line)",
        }}
      />
    ))}
  </div>
);
