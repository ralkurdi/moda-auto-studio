import { BookingProvider } from "../_lib/booking-context";

export default function BookLayout({ children }) {
  return <BookingProvider>{children}</BookingProvider>;
}
