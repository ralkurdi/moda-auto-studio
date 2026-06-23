import "./globals.css";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--serif-font",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--sans-font",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--mono-font",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://modaautostudiosf.com";

// LocalBusiness / AutomotiveBusiness JSON-LD — emitted once per page in <head>.
// Coordinates are approximate for 52 S Linden Ave, South San Francisco
// (refine when we have the precise survey).
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "MODA Auto Studio",
  description:
    "Premium automotive finishing studio in South San Francisco offering vinyl wraps, paint protection film, ceramic window tint, ceramic coating, and paint correction. By appointment only.",
  image: `${SITE_URL}/opengraph-image`,
  url: SITE_URL,
  telephone: "+1-415-555-0192",
  email: "book@modaautostudio.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "52 S Linden Ave #2",
    addressLocality: "South San Francisco",
    addressRegion: "CA",
    postalCode: "94080",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.6532,
    longitude: -122.4204,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "$$$",
  sameAs: ["https://instagram.com/modaautostudio"],
  areaServed: [
    { "@type": "City", name: "South San Francisco" },
    { "@type": "City", name: "San Francisco" },
    { "@type": "City", name: "Burlingame" },
    { "@type": "City", name: "San Mateo" },
    { "@type": "City", name: "Palo Alto" },
    { "@type": "City", name: "Daly City" },
  ],
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "MODA Auto Studio — Premium Automotive Finishing · South San Francisco",
    template: "%s · MODA Auto Studio",
  },
  description:
    "Vinyl wraps, paint protection film, ceramic window tint, ceramic coating, and paint correction in South San Francisco. By appointment only.",
  keywords: [
    "vinyl wrap",
    "paint protection film",
    "PPF",
    "window tint",
    "ceramic coating",
    "paint correction",
    "South San Francisco",
    "Bay Area",
    "automotive detailing",
  ],
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "MODA Auto Studio",
    title:
      "MODA Auto Studio — Premium Automotive Finishing · South San Francisco",
    description:
      "Vinyl wraps, paint protection film, ceramic window tint, ceramic coating, and paint correction in South San Francisco. By appointment only.",
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "MODA Auto Studio",
    description:
      "Premium automotive finishing in South San Francisco — wraps, PPF, tint, ceramic.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport = {
  themeColor: "#0B0B0C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
