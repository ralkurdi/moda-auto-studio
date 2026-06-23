import { Ey, SH, GBtn } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";
import { supabaseServer } from "../../_lib/supabase/server";
import { verifyConfirmToken } from "../../_lib/booking-confirm";
import { confirmBookingAction } from "../../_lib/booking-actions";

// Owner-facing landing — opens from the "Confirm" button in the booking
// notification email. The token is the auth. Page reads the booking's
// current status and branches: pending → show summary + confirm form;
// confirmed → show "already confirmed" state; cancelled → "this one was
// declined"; invalid token → bounce to /confirm/invalid.

export const dynamic = "force-dynamic";

const fmtDate = (d) => {
  if (!d) return "—";
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default async function ConfirmPage({ params }) {
  const { token } = await params;
  const data = verifyConfirmToken(token, "confirm");
  if (!data) return <InvalidState />;

  const supabase = supabaseServer();
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", data.booking_id)
    .single();

  if (error || !booking) return <InvalidState />;

  if (booking.status === "confirmed") {
    return <AlreadyConfirmedState booking={booking} />;
  }
  if (booking.status === "cancelled") {
    return <AlreadyDeclinedState booking={booking} />;
  }

  // status === "pending" — show summary + confirm form
  return <PendingState booking={booking} token={token} />;
}

function PendingState({ booking, token }) {
  const car =
    [booking.vehicle_year, booking.vehicle_make, booking.vehicle_model]
      .filter(Boolean)
      .join(" ") || "—";
  const slotKind =
    booking.requested_slot?.startsWith("4:") ? "Consultation" : "Appointment";

  return (
    <Screen title="Confirm" noTab>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(28px, 4vw, 64px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <Ey style={{ color: "var(--accent)" }}>
          Confirm request · #{booking.reservation_ref}
        </Ey>
        <SH size="clamp(30px, 3.6vw, 44px)" style={{ marginTop: 10 }}>
          {car}
        </SH>
        <div
          style={{
            fontSize: "clamp(13px, 1.1vw, 15px)",
            color: "var(--bone-2)",
            marginTop: 14,
            lineHeight: 1.55,
          }}
        >
          Confirming sends the client their reservation email
          {booking.deposit_required ? " with the $300 deposit link" : ""}.
          The bay locks at confirm. Reject the request via the Decline link in
          the original email if you can&rsquo;t accommodate this slot.
        </div>

        <div
          style={{
            marginTop: "clamp(20px, 3vw, 36px)",
            padding: "clamp(16px, 2vw, 22px)",
            border: "1px solid var(--line)",
            background: "var(--ink-2)",
          }}
        >
          <Row k="Date" v={`${fmtDate(booking.requested_date)} · ${booking.requested_slot || "—"} (${slotKind})`} />
          <Row k="Phone" v={booking.client_phone || "—"} />
          <Row k="Email" v={booking.client_email || "—"} />
          <Row k="Tier" v={booking.vehicle_tier || "—"} />
          <Row k="Services" v={(booking.services || []).join(", ") || "—"} />
          <Row
            k="Estimate"
            v={
              booking.estimated_total
                ? `$${booking.estimated_total.toLocaleString()}`
                : "—"
            }
          />
          <Row
            k="Deposit"
            v={
              booking.deposit_required
                ? "Required ($300) — generated on confirm"
                : "Not required"
            }
            last
          />
        </div>

        {booking.notes && (
          <div
            style={{
              marginTop: 16,
              padding: 14,
              background: "var(--ink-2)",
              border: "1px solid var(--line)",
            }}
          >
            <Ey>Notes from client</Ey>
            <div
              style={{
                fontSize: 13.5,
                color: "var(--bone-2)",
                marginTop: 8,
                lineHeight: 1.55,
                whiteSpace: "pre-wrap",
              }}
            >
              {booking.notes}
            </div>
          </div>
        )}

        <form action={confirmBookingAction}>
          <input type="hidden" name="token" value={token} />
          <GBtn
            type="submit"
            style={{
              width: "100%",
              marginTop: "clamp(22px, 3vw, 36px)",
            }}
          >
            Confirm appointment
          </GBtn>
        </form>
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
          THIS SENDS THE CLIENT EMAIL · BAY LOCKS AT CONFIRM
        </div>
      </section>
    </Screen>
  );
}

function AlreadyConfirmedState({ booking }) {
  const car =
    [booking.vehicle_year, booking.vehicle_make, booking.vehicle_model]
      .filter(Boolean)
      .join(" ") || "—";

  return (
    <Screen title="Confirmed" noTab>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(40px, 5vw, 80px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
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
          #{booking.reservation_ref} confirmed
        </Ey>
        <SH size="clamp(28px, 3.4vw, 40px)" style={{ marginTop: 12 }}>
          {car} is in.
        </SH>
        <div
          style={{
            fontSize: 13,
            color: "var(--bone-2)",
            marginTop: 12,
            lineHeight: 1.55,
            maxWidth: 380,
            marginInline: "auto",
          }}
        >
          The client confirmation email
          {booking.deposit_stripe_url ? " (with deposit link)" : ""} was sent
          to <span style={{ color: "var(--bone)" }}>{booking.client_email || "—"}</span>.
          You can manage this booking from Supabase Table Editor → bookings
          (status now reads <span style={{ fontFamily: "var(--mono)" }}>confirmed</span>).
        </div>
      </section>
    </Screen>
  );
}

function AlreadyDeclinedState({ booking }) {
  return (
    <Screen title="Declined" noTab>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(40px, 5vw, 80px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
          textAlign: "center",
        }}
      >
        <Ey>#{booking.reservation_ref} was declined</Ey>
        <SH size="clamp(26px, 3.2vw, 36px)" style={{ marginTop: 12 }}>
          This request is closed.
        </SH>
        <div
          style={{
            fontSize: 13,
            color: "var(--bone-2)",
            marginTop: 12,
            lineHeight: 1.55,
            maxWidth: 380,
            marginInline: "auto",
          }}
        >
          The booking was already marked cancelled. The client received the
          decline email. If you want to re-open it, edit
          <span style={{ fontFamily: "var(--mono)" }}> status </span>
          back to <span style={{ fontFamily: "var(--mono)" }}>pending</span> in
          Supabase.
        </div>
      </section>
    </Screen>
  );
}

function InvalidState() {
  return (
    <Screen title="Invalid link" noTab>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(40px, 5vw, 80px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
          textAlign: "center",
        }}
      >
        <Ey>Invalid confirmation link</Ey>
        <SH size="clamp(26px, 3.2vw, 36px)" style={{ marginTop: 12 }}>
          This link can&rsquo;t be used.
        </SH>
        <div
          style={{
            fontSize: 13,
            color: "var(--bone-2)",
            marginTop: 12,
            lineHeight: 1.55,
            maxWidth: 380,
            marginInline: "auto",
          }}
        >
          The token is invalid, expired, or for a booking that no longer
          exists. Confirm manually by editing the row in Supabase Table
          Editor.
        </div>
      </section>
    </Screen>
  );
}

function Row({ k, v, last }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr",
        padding: "10px 0",
        borderBottom: last ? "none" : "1px solid var(--line)",
        gap: 14,
      }}
    >
      <Ey>{k}</Ey>
      <div style={{ fontSize: 14, color: "var(--bone)" }}>{v}</div>
    </div>
  );
}
