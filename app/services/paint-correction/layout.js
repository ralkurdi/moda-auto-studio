// Standalone /services/paint-correction page no longer exists — the
// route now redirects to /services/ceramic-coating, which carries the
// combined Ceramic + Paint Correction content. Canonical points to
// the merged page so search engines reconcile cleanly.
export const metadata = {
  title: "Paint Correction",
  description:
    "Multi-stage machine polish to remove swirl marks, oxidation, and light scratches. Required prep before ceramic coating. Now combined with Ceramic Coating on a single service page.",
  alternates: { canonical: "/services/ceramic-coating" },
  robots: { index: false, follow: true },
};

export default function PaintCorrectionLayout({ children }) {
  return children;
}
