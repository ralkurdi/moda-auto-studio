export const metadata = {
  // default applies to /services itself; template cascades to detail pages
  // (vinyl-wraps, paint-protection-film, window-tint, ceramic-coating,
  // paint-correction) because root layout's template only reaches direct
  // children, not grandchildren.
  title: {
    default: "Services",
    template: "%s · MODA Auto Studio",
  },
  description:
    "Studio disciplines: vinyl wraps, paint protection film, window tinting, ceramic coating, paint correction, and chrome delete. Premium materials, by appointment in South San Francisco.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services · MODA Auto Studio",
    description:
      "Studio disciplines: vinyl wraps, PPF, window tinting, ceramic coating, paint correction, and chrome delete.",
    url: "/services",
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
