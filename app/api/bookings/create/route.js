import { NextResponse } from "next/server";
import { supabaseServer } from "../../../_lib/supabase/server";

export const dynamic = "force-dynamic";

const generateRef = () => `MA-${Math.floor(1000 + Math.random() * 8999)}`;

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

  // TODO Phase 2.2/2.3/2.4: trigger Stripe deposit link, Gmail confirmation,
  // and Twilio SMS to client + owner. For now, the row is just stored.

  return NextResponse.json({
    ok: true,
    id: inserted.id,
    reservation_ref: inserted.reservation_ref,
  });
}
