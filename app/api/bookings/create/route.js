import { NextResponse } from "next/server";
import { supabaseServer } from "../../../_lib/supabase/server";
import { sendSMS, fmtDate } from "../../../_lib/twilio";
import { sendOwnerNotification } from "../../../_lib/mail";
import { createConfirmToken } from "../../../_lib/booking-confirm";

export const dynamic = "force-dynamic";

const generateRef = () => `MA-${Math.floor(1000 + Math.random() * 8999)}`;

const STUDIO_ADDR = "52 S Linden Ave #2, South SF 94080";

function buildClientSMS({ slot, date }) {
  const isConsultation = slot?.kind === "Consultation";
  const when = `${slot?.t || "your slot"} on ${fmtDate(date) || "your date"}`;
  if (isConsultation) {
    return `MODA Studio: Consultation confirmed at ${when}. ${STUDIO_ADDR}. Reply R to reschedule, D for directions.`;
  }
  return `MODA Studio: You're in. ${when}. ${STUDIO_ADDR}. Reply R to reschedule, D for directions.`;
}

function buildOwnerSMS({ reservation_ref, slot, date, vehicle, client_phone, total }) {
  const kind = slot?.kind || "Booking";
  const car = [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ") || "—";
  const totalLabel = total ? ` · est $${total.toLocaleString()}` : "";
  return `New ${kind} #${reservation_ref} · ${car} · ${client_phone} · ${slot?.t || ""} ${fmtDate(date) || ""}${totalLabel}`;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
  }

  const {
    client_phone,
    client_name,
    client_email,
    vehicle = {},
    tier,
    services = [],
    notes,
    confirmNotes,
    total,
    date,
    slot,
  } = body;

  // Minimum-viable validation — phone is the one field we truly need to text back.
  const digits = (client_phone || "").replace(/\D/g, "");
  if (digits.length < 10) {
    return NextResponse.json(
      { ok: false, error: "A valid phone number is required." },
      { status: 400 }
    );
  }

  const combinedNotes = [notes, confirmNotes].filter(Boolean).join("\n\n---\n\n");
  const deposit_required = (total || 0) >= 1000;
  const requested_date = date ? new Date(date).toISOString().slice(0, 10) : null;

  const supabase = supabaseServer();

  // Generate a unique 4-digit reservation_ref. Retry on collision (UNIQUE constraint).
  let inserted = null;
  let lastError = null;

  for (let attempt = 0; attempt < 5; attempt++) {
    const reservation_ref = generateRef();
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        status: "pending",
        client_phone,
        client_name: client_name || null,
        client_email: client_email || null,
        vehicle_year: vehicle.year || null,
        vehicle_make: vehicle.make || null,
        vehicle_model: vehicle.model || null,
        vehicle_trim: vehicle.trim || null,
        vehicle_tier: tier || null,
        services,
        notes: combinedNotes || null,
        estimated_total: total || null,
        requested_date,
        requested_slot: slot?.t || null,
        deposit_required,
        reservation_ref,
      })
      .select("id, reservation_ref")
      .single();

    if (!error) {
      inserted = data;
      break;
    }

    // Postgres unique-violation code; surface anything else immediately.
    if (error.code !== "23505") {
      lastError = error;
      break;
    }
  }

  if (!inserted) {
    return NextResponse.json(
      {
        ok: false,
        error:
          lastError?.message ||
          "Couldn't reserve a unique reference after several tries. Please try again.",
      },
      { status: 500 }
    );
  }

  // Generate signed tokens for the owner's confirm/decline magic links.
  // Stripe deposit URL is no longer generated here — it's created later in
  // the confirm flow (app/_lib/booking-actions.js), so the link in the
  // client's confirmation email is always fresh (Stripe Checkout Sessions
  // expire after 24h).
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://modaautostudiosf.com";

  let confirmUrl = null;
  let declineUrl = null;
  try {
    confirmUrl = `${siteUrl}/confirm/${createConfirmToken(
      inserted.id,
      "confirm"
    )}`;
    declineUrl = `${siteUrl}/decline/${createConfirmToken(
      inserted.id,
      "decline"
    )}`;
  } catch (e) {
    console.error(
      "[bookings.create] failed to mint confirm/decline tokens:",
      e.message
    );
    // Owner still gets the email, just without action buttons — they can
    // confirm by editing the booking row directly in Supabase.
  }

  // Fire SMS + owner notification only. Client confirmation email is
  // deferred to the owner-confirm step so the studio reviews availability
  // before the client receives an "all locked in" email.
  // Promise.allSettled prevents one transport failure from taking down
  // the booking response.
  const notifyBooking = {
    reservation_ref: inserted.reservation_ref,
    slot,
    date,
    vehicle,
    tier,
    services,
    notes: combinedNotes,
    client_phone,
    client_email,
    total,
    deposit_required,
    confirm_url: confirmUrl,
    decline_url: declineUrl,
  };

  const notifyResults = await Promise.allSettled([
    sendSMS({
      to: client_phone,
      body: buildClientSMS({ slot, date }),
    }),
    sendSMS({
      to: process.env.OWNER_PHONE,
      body: buildOwnerSMS({
        reservation_ref: inserted.reservation_ref,
        slot,
        date,
        vehicle,
        client_phone,
        total,
      }),
    }),
    sendOwnerNotification(notifyBooking),
  ]);

  const labels = ["SMS→client", "SMS→owner", "email→owner"];
  notifyResults.forEach((r, i) => {
    const who = labels[i];
    if (r.status === "rejected") {
      console.error(`[bookings.create] ${who} threw:`, r.reason);
    } else if (!r.value.ok) {
      console.error(`[bookings.create] ${who} failed:`, r.value.error);
    }
  });

  return NextResponse.json({
    ok: true,
    id: inserted.id,
    reservation_ref: inserted.reservation_ref,
  });
}
