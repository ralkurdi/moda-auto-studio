import { BookingProvider } from "../_lib/booking-context";

export const metadata = {
  title: "Book",
  description:
    "Reserve a bay or schedule a complimentary consultation. Four-step booking flow with live availability. By appointment only — 52 S Linden Ave #2, South San Francisco.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book · MODA Auto Studio",
    description:
      "Reserve a bay or schedule a complimentary consultation.",
    url: "/book",
  },
};

export default function BookLayout({ children }) {
  return <BookingProvider>{children}</BookingProvider>;
}
