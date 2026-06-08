const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://modaautostudio.com";

// Indexable routes. Booking flow steps (/book/vehicle, /book/service,
// /book/date, /book/confirm, /book/confirmed) are intentionally excluded —
// they're funnel steps, not standalone destinations. /work/[slug] is also
// excluded for now; when we backend the gallery in Supabase we'll generate
// per-item entries here.
const ROUTES = [
  { path: "", priority: 1.0, freq: "weekly" },
  { path: "/services", priority: 0.9, freq: "monthly" },
  { path: "/services/vinyl-wraps", priority: 0.8, freq: "monthly" },
  { path: "/services/paint-protection-film", priority: 0.8, freq: "monthly" },
  { path: "/services/window-tint", priority: 0.8, freq: "monthly" },
  { path: "/services/ceramic-coating", priority: 0.8, freq: "monthly" },
  { path: "/services/paint-correction", priority: 0.8, freq: "monthly" },
  { path: "/services/chrome-delete", priority: 0.8, freq: "monthly" },
  { path: "/visualizer", priority: 0.6, freq: "monthly" },
  { path: "/work", priority: 0.8, freq: "weekly" },
  { path: "/book", priority: 0.9, freq: "weekly" },
  { path: "/pricing", priority: 0.7, freq: "monthly" },
  { path: "/about", priority: 0.7, freq: "monthly" },
  { path: "/reviews", priority: 0.6, freq: "weekly" },
];

export default function sitemap() {
  const now = new Date();
  return ROUTES.map(({ path, priority, freq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
