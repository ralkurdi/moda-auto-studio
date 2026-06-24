import Link from "next/link";
import { Ey, SH } from "../_lib/design";
import { Screen } from "../_components/screen-shell";

// Avery Dennison's official car visualizer — covers their full
// Supreme Wrapping Film lineup with model-specific previews. We install
// Avery Dennison cast films (alongside 3M and KPMF), so handing off to
// their tool is both more useful than anything we could build inline
// and stays brand-aligned with what we actually wrap with.
const AVERY_VISUALIZER_URL =
  "https://graphics.averydennison.com/en/home/resources-and-learning/carvisualizer.html";

export default function VisualizerPage() {
  return (
    <Screen title="Color Studio" noTab>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(28px, 4vw, 64px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <Ey>Powered by Avery Dennison</Ey>
        <SH size="clamp(36px, 4.5vw, 60px)" style={{ marginTop: 8 }}>
          Preview your finish.
        </SH>
        <div
          style={{
            fontSize: "clamp(14px, 1.2vw, 17px)",
            color: "var(--bone-2)",
            marginTop: 18,
            lineHeight: 1.65,
            maxWidth: 560,
          }}
        >
          Avery&rsquo;s official car visualizer renders their full Supreme
          Wrapping Film lineup on your specific make and model — satin,
          gloss, matte, chrome, color-flip. We install Avery Dennison cast
          films, so what you see in the tool is what you&rsquo;ll see on
          your car.
        </div>

        <a
          href={AVERY_VISUALIZER_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "clamp(28px, 4vw, 48px)",
            padding: "clamp(18px, 2.4vw, 28px) clamp(20px, 2.4vw, 28px)",
            background: "var(--accent)",
            color: "var(--ink)",
            border: "1px solid var(--accent)",
            fontFamily: "var(--mono)",
            fontSize: 12,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "filter .15s",
          }}
        >
          <span>Open Avery&rsquo;s visualizer</span>
          <span style={{ fontFamily: "var(--serif)", fontSize: 18 }}>↗</span>
        </a>
        <div
          style={{
            marginTop: 10,
            fontSize: 11,
            color: "var(--mute)",
            fontFamily: "var(--mono)",
            letterSpacing: ".06em",
          }}
        >
          Opens in a new tab · averydennison.com
        </div>

        <div
          style={{
            marginTop: "clamp(32px, 4vw, 56px)",
            padding: "clamp(16px, 2vw, 24px)",
            background: "var(--ink-2)",
            border: "1px solid var(--line)",
          }}
        >
          <Ey>Once you&rsquo;ve picked a color</Ey>
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(20px, 2vw, 26px)",
              marginTop: 8,
              lineHeight: 1.35,
              color: "var(--bone)",
            }}
          >
            Bring the Avery code (e.g. SW900-180-S Satin Black) when you
            book.
          </div>
          <div
            style={{
              fontSize: "clamp(13px, 1.1vw, 15px)",
              color: "var(--bone-2)",
              marginTop: 12,
              lineHeight: 1.6,
            }}
          >
            We&rsquo;ll confirm the film is in stock or sourceable, walk
            through any panel-specific options, and lock in your bay.
          </div>
          <Link
            href="/book"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 16,
              color: "var(--accent)",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Reserve a bay <span>→</span>
          </Link>
        </div>
      </section>
    </Screen>
  );
}
