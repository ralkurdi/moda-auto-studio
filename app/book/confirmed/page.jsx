"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Crest } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";
import { useBooking } from "../../_lib/booking-context";

const fmt = (d) =>
  d
    ? d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

const NEXT_APPOINTMENT = [
  ["Within 1 hour", "A technician reviews your request + checks the bay schedule."],
  ["After confirm", "Reservation email + (if applicable) $300 deposit link."],
  ["Day of", "Drop the car at your slot sharp. Coffee on us."],
  ["Handoff", "Walkthrough + care kit + warranty QR."],
];

const NEXT_CONSULTATION = [
  ["Within 1 hour", "A technician reviews your request + checks the bay schedule."],
  ["After confirm", "Reservation email locks in your consultation slot."],
  ["Day of", "Bring the car in. We walk through scope together."],
  ["Within 24h after", "Tailored quote sent to your phone or email."],
];

export default function BookConfirmedPage() {
  const router = useRouter();
  const { booking, resetBooking } = useBooking();
  const [showSms, setShowSms] = useState(false);
  const reservationRef = booking.reservation_ref || "—";
  const isConsultation = booking.slot?.kind === "Consultation";
  const refLabel = isConsultation
    ? "Consultation request received"
    : "Request received";
  const timeline = isConsultation ? NEXT_CONSULTATION : NEXT_APPOINTMENT;

  useEffect(() => {
    const t = setTimeout(() => setShowSms(true), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <Screen title="Confirmed" noTab>
      <div
        className="container-narrow"
        style={{
          paddingTop: "clamp(40px, 5vw, 80px)",
          paddingBottom: "clamp(30px, 4vw, 56px)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            width: 64,
            height: 64,
            borderRadius: 32,
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 34,
          }}
        >
          ✓
        </div>
        <Ey style={{ color: "var(--accent)", marginTop: 18 }}>
          {refLabel} · #{reservationRef}
        </Ey>
        <SH size={36} style={{ marginTop: 12 }}>
          Thanks &mdash; we&rsquo;ll be in touch shortly.
        </SH>
        <div
          style={{
            fontSize: 13,
            color: "var(--bone-2)",
            marginTop: 12,
            lineHeight: 1.55,
            maxWidth: 340,
            marginInline: "auto",
          }}
        >
          We received your request for{" "}
          <span style={{ color: "var(--bone)" }}>
            {booking.slot?.t || "your slot"}
          </span>{" "}
          on{" "}
          <span style={{ color: "var(--bone)" }}>
            {fmt(booking.date) || "your date"}
          </span>
          . A technician will review availability and email your final
          reservation
          {!isConsultation && (booking.total || 0) >= 1000
            ? " with the $300 deposit link"
            : ""}{" "}
          within an hour.
        </div>
      </div>
      <div className="container-narrow">
        <Ey>Acknowledgment</Ey>
        <div
          style={{
            marginTop: 12,
            padding: 14,
            border: "1px solid var(--line)",
            background: "var(--ink-2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  background: "var(--ink)",
                  border: "1px solid var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Crest size={20} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontFamily: "var(--serif)" }}>
                  MODA Studio
                </div>
                <Ey>+1 (415) 555-0192</Ey>
              </div>
            </div>
            <Ey>Just now</Ey>
          </div>
          <div style={{ marginTop: 14, minHeight: 90 }}>
            {showSms ? (
              <div
                style={{
                  background: "var(--ink)",
                  padding: 12,
                  borderRadius: 14,
                  borderTopLeftRadius: 3,
                  fontSize: 13.5,
                  color: "var(--bone)",
                  lineHeight: 1.5,
                  animation: "fadeUp .4s",
                }}
              >
                Got it. We received your request for {booking.slot?.t} on{" "}
                {fmt(booking.date)}.
                <br />
                <br />
                A technician will confirm bay availability and send your
                final reservation email shortly.
                <br />
                <br />
                Reply to this thread anytime with questions.
              </div>
            ) : (
              <div style={{ display: "flex", gap: 4, padding: "18px 14px" }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      background: "var(--mute)",
                      animation: `blink 1s ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className="container-narrow"
        style={{
          paddingTop: "clamp(24px, 3vw, 40px)",
          paddingBottom: "clamp(8px, 1vw, 16px)",
        }}
      >
        <Ey>What happens next</Ey>
        {timeline.map(([w, t], i) => (
          <div
            key={w}
            style={{
              display: "grid",
              gridTemplateColumns: "100px 1fr",
              padding: "12px 0",
              borderBottom:
                i < timeline.length - 1 ? "1px solid var(--line)" : "none",
              gap: 12,
            }}
          >
            <Ey style={{ color: "var(--accent)" }}>{w}</Ey>
            <div style={{ fontSize: 13.5 }}>{t}</div>
          </div>
        ))}
      </div>
      <div
        className="container-narrow"
        style={{ paddingBottom: "clamp(32px, 4vw, 56px)" }}
      >
        <GBtn
          v="ghost"
          style={{ width: "100%" }}
          onClick={() => {
            resetBooking();
            router.push("/");
          }}
        >
          Back to studio
        </GBtn>
      </div>
    </Screen>
  );
}
