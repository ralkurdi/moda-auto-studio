"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronL, Crest, Wordmark } from "../_lib/design";

export const TopBar = ({ title, right }) => {
  const router = useRouter();
  const pathname = usePathname();
  const canBack = pathname !== "/";

  return (
    <div
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 18px",
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

const TAB_MAP = [
  {
    id: "home",
    label: "Studio",
    href: "/",
    match: (p) => p === "/",
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    match: (p) => p.startsWith("/services") || p === "/visualizer",
  },
  {
    id: "work",
    label: "Work",
    href: "/work",
    match: (p) => p.startsWith("/work"),
  },
  {
    id: "book",
    label: "Book",
    href: "/book",
    match: (p) => p.startsWith("/book"),
  },
  {
    id: "us",
    label: "Us",
    href: "/about",
    match: (p) =>
      ["/about", "/reviews", "/pricing"].some(
        (r) => p === r || p.startsWith(r + "/")
      ),
  },
];

export const TabBar = () => {
  const pathname = usePathname();
  return (
    <div
      style={{
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

export const Screen = ({ children, title, right, noTab }) => (
  <div
    style={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      background: "var(--ink)",
      color: "var(--bone)",
    }}
  >
    <TopBar title={title} right={right} />
    <div
      className="noscroll"
      style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}
    >
      {children}
    </div>
    {!noTab && <TabBar />}
  </div>
);
