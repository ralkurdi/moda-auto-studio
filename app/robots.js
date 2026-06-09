const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://modaautostudiosf.com";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Disallow the funnel steps + every API endpoint. /book itself is
        // the indexable marketing landing for the booking flow and stays open.
        disallow: [
          "/book/vehicle",
          "/book/service",
          "/book/date",
          "/book/confirm",
          "/book/confirmed",
          "/api/",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
