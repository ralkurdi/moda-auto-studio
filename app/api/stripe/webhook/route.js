import { NextResponse } from "next/server";
import { verifyWebhook } from "../../../_lib/stripe";
import { supabaseServer } from "../../../_lib/supabase/server";

export const dynamic = "force-dynamic";
// Next.js App Router gives us the raw body via req.text() — that's what
// Stripe needs for signature verification (it hashes the raw bytes).
export const runtime = "nodejs";

export async function POST(req) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { ok: false, error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const rawBody = await req.text();

  let event;
  try {
    event = verifyWebhook(rawBody, signature);
  } catch (e) {
    console.error("[stripe.webhook] signature verification failed:", e.message);
    return NextResponse.json(
      { ok: false, error: `Signature verification failed: ${e.message}` },
      { status: 400 }
    );
  }

  // We only care about the success event for now. Stripe also fires
  // checkout.session.expired and checkout.session.async_payment_failed
  // which we can wire up later if needed.
  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ ok: true, ignored: event.type });
  }

  const session = event.data.object;
  const booking_id = session.metadata?.booking_id;
  const reservation_ref = session.metadata?.reservation_ref;

  if (!booking_id) {
    console.error("[stripe.webhook] checkout.session.completed without booking_id metadata", {
      session_id: session.id,
    });
    return NextResponse.json(
      { ok: false, error: "Missing booking_id metadata on session" },
      { status: 400 }
    );
  }

  const supabase = supabaseServer();
  const { error } = await supabase
    .from("bookings")
    .update({
      deposit_paid: true,
      deposit_stripe_id: session.id,
    })
    .eq("id", booking_id);

  if (error) {
    console.error("[stripe.webhook] supabase update failed:", error.message);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  console.log(
    `[stripe.webhook] deposit_paid=true on booking_id=${booking_id} (ref=${reservation_ref})`
  );
  return NextResponse.json({ ok: true });
}
