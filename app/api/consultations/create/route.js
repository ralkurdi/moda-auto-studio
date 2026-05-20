import { NextResponse } from "next/server";
import { supabaseServer } from "../../../_lib/supabase/server";
import { sendConsultationNotification } from "../../../_lib/mail";

export const dynamic = "force-dynamic";

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
    client_name,
    client_phone,
    client_email,
    vehicle,
    service_interest,
    referral_source,
    notes,
  } = body;

  if (!client_name || client_name.trim().length < 2) {
    return NextResponse.json(
      { ok: false, error: "Your name is required." },
      { status: 400 }
    );
  }

  const phoneDigits = (client_phone || "").replace(/\D/g, "");
  if (phoneDigits.length < 10) {
    return NextResponse.json(
      { ok: false, error: "A valid phone number is required." },
      { status: 400 }
    );
  }

  if (!notes || notes.trim().length < 4) {
    return NextResponse.json(
      { ok: false, error: "Tell us a little about what you're looking for." },
      { status: 400 }
    );
  }

  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from("consultations")
    .insert({
      status: "new",
      client_name: client_name.trim(),
      client_phone,
      client_email: client_email?.trim() || null,
      vehicle: vehicle?.trim() || null,
      service_interest: service_interest || null,
      referral_source: referral_source || null,
      notes: notes.trim(),
    })
    .select("id")
    .single();

  if (error) {
    console.error("[consultations.create] insert failed:", error.message);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  // Fire owner notification email (fire-and-forget — failure is logged
  // but the inbound submission is already stored).
  const notifyResult = await sendConsultationNotification({
    id: data.id,
    client_name: client_name.trim(),
    client_phone,
    client_email: client_email?.trim() || null,
    vehicle: vehicle?.trim() || null,
    service_interest: service_interest || null,
    referral_source: referral_source || null,
    notes: notes.trim(),
  });
  if (!notifyResult.ok) {
    console.error(
      "[consultations.create] owner email failed:",
      notifyResult.error
    );
  }

  return NextResponse.json({ ok: true, id: data.id });
}
