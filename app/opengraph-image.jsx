/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

// Next.js Metadata file convention — this file auto-generates the og:image
// meta tag (and twitter:image when a sibling twitter-image file is missing).
// The image is rendered at request time via @vercel/og, cached server-side
// after first hit, and most social platforms cache it indefinitely after
// scraping.
//
// Brand fidelity note: ImageResponse renders text with system-fallback
// fonts unless we explicitly load font files. For V1, we use the serif
// keyword which falls back to NotoSerif on the edge runtime (similar look
// to Cormorant Garamond, not pixel-perfect). To upgrade to Cormorant
// proper later, fetch the font binary and pass it in the `fonts` option.

export const runtime = "edge";
export const alt =
  "MODA Auto Studio — Premium Automotive Finishing in South San Francisco";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0B0C",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Top-left mono tag */}
        <div
          style={{
            position: "absolute",
            top: 56,
            left: 72,
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#8a857a",
            fontFamily: "monospace",
          }}
        >
          Auto Studio · South San Francisco
        </div>

        {/* Top-right reservation badge */}
        <div
          style={{
            position: "absolute",
            top: 56,
            right: 72,
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 14,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C9A961",
            fontFamily: "monospace",
          }}
        >
          By appointment
          <div
            style={{
              width: 8,
              height: 8,
              background: "#C9A961",
              borderRadius: 4,
            }}
          />
        </div>

        {/* MOD-A wordmark — large, centered */}
        <div
          style={{
            fontSize: 240,
            fontWeight: 500,
            letterSpacing: "0.22em",
            paddingLeft: "0.22em",
            display: "flex",
            color: "#EDE8DE",
            lineHeight: 1,
          }}
        >
          <span>MOD</span>
          <span style={{ color: "#C9A961" }}>A</span>
        </div>

        {/* Italic tagline below */}
        <div
          style={{
            marginTop: 48,
            fontSize: 36,
            fontStyle: "italic",
            color: "#D8D2C4",
            display: "flex",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          The finish your car deserved from the factory.
        </div>

        {/* Bottom edge — fine line + service strip */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 72,
            right: 72,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 16,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8a857a",
            fontFamily: "monospace",
            borderTop: "1px solid rgba(237,232,222,0.14)",
            paddingTop: 24,
          }}
        >
          <div>Wraps · PPF · Tint · Ceramic · Correction</div>
          <div style={{ color: "#C9A961" }}>modaautostudiosf.com</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
