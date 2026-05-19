"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronL, Crest, Wordmark } from "../_lib/design";

const TAB_MAP = [
  { id: "home",     label: "Studio",   href: "/",          match: (p) => p === "/" },
  { id: "services", label: "Services", href: "/services",  match: (p) => p.startsWith("/services") || p === "/visualizer" },
  { id: "work",     label: "Work",     href: "/work",      match: (p) => p.startsWith("/work") },
  { id: "book",     label: "Book",     href: "/book",      match: (p) => p.startsWith("/book") },
  { id: "us",       label: "Us",       href: "/about",     match: (p) => ["/about", "/reviews", "/pricing"].some((r) => p === r || p.startsWith(r + "/")) },
];

/* ── Mobile top bar (back/crest + title + right slot) ───────────────────── */
const MobileTopBar = ({ title, right }) => {
  const router = useRouter();
  const pathname = usePathname();
  const canBack = pathname !== "/";

  return (
    <div
      className="mobile-only"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 18px",
        background: "var(--ink)",
        borderBottom: "1px solid var(--line)",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {canBack ? (
          <button
            onClick={() => router.back()}
            style={{ color: "var(--bone)", padding: 6, display: "flex" }}
            aria-label="Back"
          >
            <ChevronL />
          </button>
        ) : (
          <Crest />
        )}
        {!title || title === "MODA" ? (
          <Wordmark />
        ) : (
          <div
            style={{
              fontFamily: "var(--serif)",
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: ".02em",
              color: "var(--bone)",
            }}
          >
            {title}
          </div>
        )}
      </div>
      <div>{right}</div>
    </div>
  );
};

/* ── Mobile bottom tab bar ──────────────────────────────────────────────── */
const MobileTabBar = () => {
  const pathname = usePathname();
  return (
    <div
      className="mobile-only"
      style={{
        position: "sticky",
        bottom: 0,
        zIndex: 10,
        height: 72,
        display: "flex",
        borderTop: "1px solid var(--line)",
        background: "var(--ink)",
        flexShrink: 0,
      }}
    >
      {TAB_MAP.map((t) => {
        const on = t.match(pathname);
        return (
          <Link
            key={t.id}
            href={t.href}
            style={{
              flex: 1,
              color: on ? "var(--bone)" : "var(--mute)",
              fontFamily: "var(--mono)",
              fontSize: 10,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              paddingTop: 12,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                background: on ? "var(--accent)" : "transparent",
              }}
            />
            {t.label}
          </Link>
        );
      })}
    </div>
  );
};

/* ── Desktop top header (logo + horizontal nav) ─────────────────────────── */
const DesktopHeader = () => {
  const pathname = usePathname();
  return (
    <header
      className="desktop-only"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        height: 72,
        background: "rgba(11, 11, 12, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--line)",
        flexShrink: 0,
      }}
    >
      <div
        className="container"
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            textDecoration: "none",
          }}
          aria-label="MODA Auto Studio — Home"
        >
          <Crest size={32} />
          <Wordmark size={20} />
        </Link>
        <div style={{ flex: 1 }} />
        <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {TAB_MAP.map((t) => {
            const on = t.match(pathname);
            return (
              <Link
                key={t.id}
                href={t.href}
                style={{
                  color: on ? "var(--bone)" : "var(--mute)",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  paddingBottom: 4,
                  borderBottom: `1px solid ${
                    on ? "var(--accent)" : "transparent"
                  }`,
                  transition: "color .15s, border-color .15s",
                }}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

/* ── Screen wrapper ─────────────────────────────────────────────────────── */
export const Screen = ({ children, title, right, noTab }) => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "var(--ink)",
      color: "var(--bone)",
    }}
  >
    <MobileTopBar title={title} right={right} />
    <DesktopHeader />
    <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {children}
    </main>
    {!noTab && <MobileTabBar />}
  </div>
);

// Backwards-compat exports — older imports referenced TopBar/TabBar directly.
export const TopBar = MobileTopBar;
export const TabBar = MobileTabBar;
