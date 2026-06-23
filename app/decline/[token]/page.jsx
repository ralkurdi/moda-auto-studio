import { Ey, SH, GBtn } from "../../_lib/design";
import { Screen } from "../../_components/screen-shell";
import { supabaseServer } from "../../_lib/supabase/server";
import { verifyConfirmToken } from "../../_lib/booking-confirm";
import { declineBookingAction } from "../../_lib/booking-actions";

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

export default async function DeclinePage({ params }) {
  const { token } = await params;
  const data = verifyConfirmToken(token, "decline");
  if (!data) return <InvalidState />;

  const supabase = supabaseServer();
  const { data: booking, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", data.booking_id)
    .single();

  if (error || !booking) return <InvalidState />;

  if (booking.status === "cancelled") {
    return <AlreadyDeclinedState booking={booking} />;
  }
  if (booking.status === "confirmed") {
    return <AlreadyConfirmedState booking={booking} />;
  }

  return <PendingState booking={booking} token={token} />;
}

function PendingState({ booking, token }) {
  const car =
    [booking.vehicle_year, booking.vehicle_make, booking.vehicle_model]
      .filter(Boolean)
      .join(" ") || "—";

  return (
    <Screen title="Decline" noTab>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(28px, 4vw, 64px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
        }}
      >
        <Ey style={{ color: "var(--accent)" }}>
          Decline request · #{booking.reservation_ref}
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
          Declining sends a friendly email to the client letting them know
          we couldn&rsquo;t accommodate this slot. They&rsquo;ll be invited
          to reply for alternates. The reason below (optional) is included
          verbatim if you provide one.
        </div>

        <div
          style={{
            marginTop: "clamp(20px, 3vw, 36px)",
            padding: "clamp(16px, 2vw, 22px)",
            border: "1px solid var(--line)",
            background: "var(--ink-2)",
          }}
        >
          <Row k="Date" v={`${fmtDate(booking.requested_date)} · ${booking.requested_slot || "—"}`} />
          <Row k="Phone" v={booking.client_phone || "—"} />
          <Row k="Email" v={booking.client_email || "—"} />
          <Row k="Services" v={(booking.services || []).join(", ") || "—"} />
          <Row
            k="Estimate"
            v={
              booking.estimated_total
                ? `$${booking.estimated_total.toLocaleString()}`
                : "—"
            }
            last
          />
        </div>

        <form action={declineBookingAction} style={{ marginTop: "clamp(20px, 3vw, 36px)" }}>
          <input type="hidden" name="token" value={token} />
          <Ey style={{ marginBottom: 8 }}>Reason (optional, included in client email)</Ey>
          <textarea
            name="reason"
            rows={4}
            placeholder="e.g. Bay is committed to a full-body PPF that week — can we look at the following Tuesday?"
            style={{
              width: "100%",
              padding: 14,
              background: "var(--ink-2)",
              border: "1px solid var(--line)",
              color: "var(--bone)",
              fontFamily: "var(--sans)",
              fontSize: 14,
              resize: "vertical",
              minHeight: 110,
              lineHeight: 1.55,
            }}
          />
          <GBtn
            v="ghost"
            type="submit"
            style={{
              width: "100%",
              marginTop: 14,
            }}
          >
            Decline + send client email
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
          BAY STAYS OPEN · CLIENT GETS A FRIENDLY DECLINE
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
        <Ey>#{booking.reservation_ref} already declined</Ey>
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
          The decline email was already sent to{" "}
          <span style={{ color: "var(--bone)" }}>{booking.client_email || "—"}</span>.
        </div>
      </section>
    </Screen>
  );
}

function AlreadyConfirmedState({ booking }) {
  return (
    <Screen title="Already confirmed" noTab>
      <section
        className="container-narrow"
        style={{
          paddingTop: "clamp(40px, 5vw, 80px)",
          paddingBottom: "clamp(36px, 5vw, 80px)",
          textAlign: "center",
        }}
      >
        <Ey>#{booking.reservation_ref} was already confirmed</Ey>
        <SH size="clamp(26px, 3.2vw, 36px)" style={{ marginTop: 12 }}>
          This bay is locked.
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
          To cancel a confirmed booking, edit{" "}
          <span style={{ fontFamily: "var(--mono)" }}>status</span> to{" "}
          <span style={{ fontFamily: "var(--mono)" }}>cancelled</span> in
          Supabase Table Editor — and reach out to the client manually.
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
        <Ey>Invalid decline link</Ey>
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
          exists.
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
