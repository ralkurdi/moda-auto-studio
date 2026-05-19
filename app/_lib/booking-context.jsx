"use client";

import { createContext, useContext, useEffect, useState } from "react";

const BookingCtx = createContext(null);
const STORAGE_KEY = "moda.booking.v1";

const reviveDate = (booking) => {
  if (!booking) return {};
  if (booking.date && typeof booking.date === "string") {
    const d = new Date(booking.date);
    if (!isNaN(d.getTime())) booking.date = d;
  }
  return booking;
};

export function BookingProvider({ children }) {
  const [booking, setBookingRaw] = useState({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setBookingRaw(reviveDate(JSON.parse(raw)));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booking));
    } catch {}
  }, [booking, hydrated]);

  const setBooking = (patch) => setBookingRaw((b) => ({ ...b, ...patch }));
  const resetBooking = () => {
    setBookingRaw({});
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <BookingCtx.Provider value={{ booking, setBooking, resetBooking }}>
      {children}
    </BookingCtx.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingCtx);
  if (!ctx)
    throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
