"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ey, SH, GBtn, Rule, Progress } from "../../_lib/design";
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

export default function BookConfirmPage() {
  const router = useRouter();
  const { booking, setBooking } = useBooking();
  const [phone, setPhone] = useState(booking.phone || "(415) ");
  const [email, setEmail] = useState(booking.email || "");
  const [notes, setNotes] = useState(booking.confirmNotes || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isConsultation = booking.slot?.kind === "Consultation";
  const requiresDeposit = !isConsultation && (booking.total || 0) >= 1000;
  const phoneValid = phone.replace(/\D/g, "").length >= 10;
  const emailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const valid = phoneValid && emailValid;

  const handleSubmit = async () => {
    if (!valid) return;
    setLoading(true);
    setError(null);
    setBooking({ phone, email, confirmNotes: notes });

    try {
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_phone: phone,
          client_email: email || null,
          vehicle: {
            year: booking.year,
            make: booking.make,
            model: booking.model,
            trim: booking.trim,
          },
          tier: booking.tier,
          services: booking.services,
          notes: booking.notes,
          confirmNotes: notes,
          total: booking.total,
          date: booking.date,
          slot: booking.slot,
        }),
      });

      const data = await res.json();
      if (!data.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setBooking({ reservation_ref: data.reservation_ref, id: data.id });
      router.push("/book/confirmed");
    } catch (e) {
      setError(e.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Screen title="Confirm" noTab>
      <Progress step={4} />
      <div className="container-narrow" style={{ paddingTop: 8 }}>
        <Ey>Step 04 of 04</Ey>
        <SH
          size="clamp(30px, 3.6vw, 44px)"
          style={{ marginTop: 6, marginBottom: 20 }}
        >
          Hold your window.
        </SH>
      </div>
      <div className="container-narrow" style={{ marginBottom: 20 }}>
       <div
        style={{
          padding: 18,
          border: "1px solid var(--line)",
          background: "var(--ink-2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Ey>Reservation</Ey>
          <Ey style={{ color: "var(--accent)" }}>Bay 01</Ey>
        </div>
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: 22,
            marginTop: 10,
          }}
        >
          {booking.year} {booking.make} {booking.model}
        </div>
        <div style={{ fontSize: 12, color: "var(--mute)", marginTop: 2 }}>
          {booking.trim || "—"}
        </div>
        <Rule style={{ margin: "14px 0" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
          }}
        >
          <span style={{ color: "var(--bone-2)" }}>Date</span>
          <span style={{ fontFamily: "var(--serif)" }}>
            {fmt(booking.date)} · {booking.slot?.t}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            marginTop: 6,
          }}
        >
          <span style={{ color: "var(--bone-2)" }}>
            {isConsultation ? "Tentative quote" : "Estimate"}
          </span>
          <span style={{ fontFamily: "var(--serif)" }}>
            ${(booking.total || 0).toLocaleString()}
          </span>
        </div>
       </div>
      </div>

      <div className="container-narrow" style={{ marginBottom: 20 }}>
       <div
        style={{
          padding: 16,
          border: "1px solid var(--accent)",
          background: "rgba(201,169,97,0.04)",
        }}
      >
        <div
          style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 14,
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 15,
              flexShrink: 0,
            }}
          >
            i
          </div>
          <div>
            <Ey style={{ color: "var(--accent)" }}>
              {isConsultation ? "Consultation policy" : "Deposit policy"}
            </Ey>
            <div
              style={{
                fontSize: 13,
                color: "var(--bone-2)",
                marginTop: 6,
                lineHeight: 1.5,
              }}
            >
              {isConsultation ? (
                <>
                  Consultations are{" "}
                  <span style={{ color: "var(--bone)" }}>complimentary</span>{" "}
                  and run about 45 minutes. Bring the car as it is —
                  we&rsquo;ll walk through paint condition, service options,
                  and timing. No deposit, no obligation.
                </>
              ) : requiresDeposit ? (
                <>
                  For jobs over $1,000, a{" "}
                  <span style={{ color: "var(--bone)" }}>
                    $300 refundable deposit
                  </span>{" "}
                  is required to reserve your bay. We&rsquo;ll text you a
                  secure payment link once we confirm your slot — fully
                  refundable up to 72 hours before your appointment.
                </>
              ) : (
                <>
                  This service doesn&rsquo;t require a deposit. We&rsquo;ll
                  confirm your reservation by text within the hour.
                </>
              )}
            </div>
          </div>
        </div>
       </div>
      </div>

      <div className="container-narrow">
        <Ey style={{ marginBottom: 10 }}>Mobile — for confirmation & updates</Ey>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          inputMode="tel"
          autoComplete="tel"
          style={{
            width: "100%",
            padding: 14,
            background: "var(--ink-2)",
            border: "1px solid var(--line)",
            color: "var(--bone)",
            fontFamily: "var(--mono)",
            fontSize: 15,
          }}
        />
        <div
          style={{
            marginTop: 8,
            fontSize: 11,
            lineHeight: 1.5,
            color: "var(--mute)",
          }}
        >
          By submitting, you agree to receive SMS confirmations and reminders
          from MODA Auto Studio. Reply STOP to opt out at any time. Standard
          message and data rates may apply.
        </div>

        <Ey style={{ marginTop: 20, marginBottom: 10 }}>
          Email — optional
        </Ey>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          inputMode="email"
          autoComplete="email"
          style={{
            width: "100%",
            padding: 14,
            background: "var(--ink-2)",
            border:
              "1px solid " + (email && !emailValid ? "var(--accent-deep)" : "var(--line)"),
            color: "var(--bone)",
            fontFamily: "var(--mono)",
            fontSize: 15,
          }}
        />

        <Ey style={{ marginTop: 20, marginBottom: 10 }}>
          Comments / requests (optional)
        </Ey>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Anything we should know? Color direction, mods, drop-off preferences, special requests…"
          style={{
            width: "100%",
            padding: 14,
            background: "var(--ink-2)",
            border: "1px solid var(--line)",
            color: "var(--bone)",
            fontFamily: "var(--sans)",
            fontSize: 14,
            resize: "none",
            lineHeight: 1.5,
          }}
        />
      </div>

      <div
        className="container-narrow"
        style={{
          paddingTop: "clamp(16px, 2vw, 24px)",
          paddingBottom: "clamp(22px, 3vw, 40px)",
        }}
      >
        {error && (
          <div
            style={{
              marginBottom: 14,
              padding: "12px 14px",
              border: "1px solid var(--accent-deep)",
              background: "rgba(140, 107, 47, 0.12)",
              color: "var(--bone)",
              fontFamily: "var(--mono)",
              fontSize: 11,
              letterSpacing: ".08em",
              lineHeight: 1.5,
            }}
          >
            {error}
          </div>
        )}
        <GBtn
          style={{ width: "100%", position: "relative" }}
          disabled={!valid || loading}
          onClick={handleSubmit}
        >
          {loading ? (
            <span
              style={{
                width: 16,
                height: 16,
                border: "2px solid var(--ink)",
                borderTopColor: "transparent",
                borderRadius: 8,
                display: "inline-block",
                animation: "spin .8s linear infinite",
              }}
            />
          ) : (
            "Confirm reservation"
          )}
        </GBtn>
        <div
          style={{
            textAlign: "center",
            fontSize: 10.5,
            color: "var(--mute)",
            marginTop: 10,
            fontFamily: "var(--mono)",
            letterSpacing: ".14em",
          }}
        >
          WE&rsquo;LL TEXT YOU TO CONFIRM · NO CARD CHARGED NOW
        </div>
      </div>
    </Screen>
  );
}
