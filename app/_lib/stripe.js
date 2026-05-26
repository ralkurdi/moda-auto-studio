import Stripe from "stripe";

let cached = null;

function getClient() {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  cached = new Stripe(key, { apiVersion: "2024-12-18.acacia" });
  return cached;
}

/**
 * Create a one-time Stripe Checkout Session for a $300 refundable deposit.
 * Returns { ok, url, id } or { ok: false, error }.
 *
 * Resolves rather than rejecting so the booking response isn't taken down
 * by a Stripe outage — the row is already in Supabase, we can retry later.
 */
export async function createDepositSession({
  reservation_ref,
  booking_id,
  client_email,
  vehicle_label,
}) {
  const stripe = getClient();
  if (!stripe) {
    return { ok: false, error: "Stripe not configured (missing secret key)" };
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            // TODO(future): per-service deposit amounts. Today every booking
            // ≥ $1,000 holds the same flat $300. Source the amount from the
            // service catalog (e.g., full-body PPF = $500, ceramic = $200,
            // tint-only = $0) so high-ticket holds match risk and low-margin
            // services can opt out. Likely lives on each entry in
            // app/_lib/services-catalog.js as a `deposit` field, with the
            // booking-create route picking max() across selected services.
            unit_amount: 30000, // $300.00 in cents
            product_data: {
              name: "MODA Auto Studio · Reservation Deposit",
              description: `Refundable deposit for reservation #${reservation_ref}${
                vehicle_label ? ` (${vehicle_label})` : ""
              }. Fully refundable up to 72 hours before your appointment.`,
            },
          },
        },
      ],
      customer_email: client_email || undefined,
      metadata: {
        booking_id,
        reservation_ref,
      },
      // After payment, return to a "paid" success state on /book/confirmed.
      success_url: `${origin}/book/confirmed?ref=${encodeURIComponent(
        reservation_ref
      )}&paid=true`,
      cancel_url: `${origin}/book/confirmed?ref=${encodeURIComponent(
        reservation_ref
      )}&paid=false`,
    });

    return { ok: true, url: session.url, id: session.id };
  } catch (e) {
    return { ok: false, error: e.message, code: e.code };
  }
}

/**
 * Verify a webhook signature using the configured signing secret.
 * Returns the parsed event or throws if the signature is invalid.
 * Caller must read the raw request body (NOT JSON.parse) — Stripe verifies
 * against bytes, not parsed JSON.
 */
export function verifyWebhook(rawBody, signature) {
  const stripe = getClient();
  if (!stripe) throw new Error("Stripe not configured");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET not set");
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}
