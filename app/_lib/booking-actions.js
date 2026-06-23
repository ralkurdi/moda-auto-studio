"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "./supabase/server";
import { verifyConfirmToken } from "./booking-confirm";
import {
  sendClientConfirmation,
  sendClientDecline,
} from "./mail";
import { createDepositSession } from "./stripe";

function reconstructBookingForEmail(row) {
  // The /api/bookings/create route stores requested_slot (time) but not the
  // slot.kind. Inferred here: 4 PM = Consultation, anything else = Appointment.
  // If we add more consultation-style slots later, persist slot_kind on the
  // row instead of inferring.
  const kind =
    row.requested_slot && row.requested_slot.startsWith("4:")
      ? "Consultation"
      : "Appointment";

  // Parse stored notes shape: "<service notes>\n\n---\n\n<confirm notes>"
  let notes = row.notes || "";

  return {
    reservation_ref: row.reservation_ref,
    slot: { t: row.requested_slot, kind },
    date: row.requested_date,
    vehicle: {
      year: row.vehicle_year,
      make: row.vehicle_make,
      model: row.vehicle_model,
      trim: row.vehicle_trim,
    },
    tier: row.vehicle_tier,
    services: row.services,
    notes,
    client_phone: row.client_phone,
    client_email: row.client_email,
    total: row.estimated_total,
    deposit_required: row.deposit_required,
    deposit_url: row.deposit_stripe_url,
  };
}

export async function confirmBookingAction(formData) {
  const token = formData.get("token");
  const data = verifyConfirmToken(token, "confirm");
  if (!data) redirect("/confirm/invalid");

  const supabase = supabaseServer();

  const { data: booking, error: fetchErr } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", data.booking_id)
    .single();

  if (fetchErr || !booking) redirect("/confirm/invalid");

  // Already actioned — just redirect to the page, which will render the
  // appropriate "already confirmed/declined" state.
  if (booking.status !== "pending") {
    redirect(`/confirm/${token}`);
  }

  // Generate Stripe Checkout URL if deposit is required. Stripe Checkout
  // Sessions stay valid 24h; we generate at confirm time so the URL is
  // fresh when the client gets the email.
  let depositUrl = null;
  let depositId = null;
  if (booking.deposit_required) {
    const carLabel = [
      booking.vehicle_year,
      booking.vehicle_make,
      booking.vehicle_model,
    ]
      .filter(Boolean)
      .join(" ");

    const session = await createDepositSession({
      reservation_ref: booking.reservation_ref,
      booking_id: booking.id,
      client_email: booking.client_email,
      vehicle_label: carLabel,
    });

    if (session.ok) {
      depositUrl = session.url;
      depositId = session.id;
    } else {
      console.error(
        "[confirmBookingAction] Stripe deposit session failed:",
        session.error
      );
    }
  }

  // Update booking row
  const { error: updateErr } = await supabase
    .from("bookings")
    .update({
      status: "confirmed",
      deposit_stripe_url: depositUrl,
      deposit_stripe_id: depositId,
    })
    .eq("id", booking.id);

  if (updateErr) {
    console.error(
      "[confirmBookingAction] Supabase update failed:",
      updateErr.message
    );
    redirect("/confirm/invalid");
  }

  // Send the client confirmation email (with deposit URL if generated)
  const emailShape = reconstructBookingForEmail({
    ...booking,
    deposit_stripe_url: depositUrl,
  });
  const result = await sendClientConfirmation(emailShape);
  if (!result.ok) {
    console.error(
      "[confirmBookingAction] client confirmation email failed:",
      result.error
    );
  }

  redirect(`/confirm/${token}`);
}

export async function declineBookingAction(formData) {
  const token = formData.get("token");
  const reason = (formData.get("reason") || "").toString().trim();
  const data = verifyConfirmToken(token, "decline");
  if (!data) redirect("/decline/invalid");

  const supabase = supabaseServer();

  const { data: booking, error: fetchErr } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", data.booking_id)
    .single();

  if (fetchErr || !booking) redirect("/decline/invalid");

  if (booking.status !== "pending") {
    redirect(`/decline/${token}`);
  }

  // Persist decline reason in notes (appended) so it's queryable later.
  const declineNote =
    `[DECLINED ${new Date().toISOString()}]` +
    (reason ? ` ${reason}` : "");
  const newNotes = booking.notes
    ? `${booking.notes}\n\n---\n\n${declineNote}`
    : declineNote;

  const { error: updateErr } = await supabase
    .from("bookings")
    .update({
      status: "cancelled",
      notes: newNotes,
    })
    .eq("id", booking.id);

  if (updateErr) {
    console.error(
      "[declineBookingAction] Supabase update failed:",
      updateErr.message
    );
    redirect("/decline/invalid");
  }

  const emailShape = reconstructBookingForEmail(booking);
  const result = await sendClientDecline({ ...emailShape, decline_reason: reason });
  if (!result.ok) {
    console.error(
      "[declineBookingAction] client decline email failed:",
      result.error
    );
  }

  redirect(`/decline/${token}`);
}
