import crypto from "node:crypto";

/**
 * HMAC-signed token used for owner-confirm magic links in the booking
 * notification email.
 *
 * Token format: <base64url_payload>.<hex_hmac>
 * Payload:      JSON({ booking_id, action })  where action is "confirm" or "decline"
 *
 * The token is the auth — anyone with it can perform the action. That's by
 * design: owner clicks link in email, lands on confirm page, clicks button.
 * The cost of a wrong confirm is low (owner can manually fix via SQL),
 * the cost of requiring login + 2FA every time owner gets a booking is high
 * UX-wise.
 *
 * The action is bound into the token so a "confirm" token can't be used to
 * decline (and vice versa) even if intercepted. There's no expiration —
 * once the booking's status is no longer "pending", subsequent calls are
 * idempotent / rejected at the application layer.
 */

function getSecret() {
  const secret = process.env.BOOKING_CONFIRM_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      "BOOKING_CONFIRM_SECRET env var missing or too short (need ≥32 chars)"
    );
  }
  return secret;
}

function base64urlEncode(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(str) {
  let padded = str.replace(/-/g, "+").replace(/_/g, "/");
  while (padded.length % 4) padded += "=";
  return Buffer.from(padded, "base64");
}

function hmac(payload) {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createConfirmToken(booking_id, action) {
  if (action !== "confirm" && action !== "decline") {
    throw new Error(`Invalid action: ${action}`);
  }
  const payload = base64urlEncode(JSON.stringify({ booking_id, action }));
  const signature = hmac(payload);
  return `${payload}.${signature}`;
}

export function verifyConfirmToken(token, expectedAction) {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  let expectedSig;
  try {
    expectedSig = hmac(payload);
  } catch {
    return null; // secret not configured
  }

  // Constant-time compare to defeat timing attacks
  if (signature.length !== expectedSig.length) return null;
  try {
    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature, "hex"),
        Buffer.from(expectedSig, "hex")
      )
    ) {
      return null;
    }
  } catch {
    return null;
  }

  let data;
  try {
    data = JSON.parse(base64urlDecode(payload).toString("utf8"));
  } catch {
    return null;
  }

  if (!data || typeof data !== "object") return null;
  if (!data.booking_id || typeof data.booking_id !== "string") return null;
  if (data.action !== "confirm" && data.action !== "decline") return null;
  if (expectedAction && data.action !== expectedAction) return null;

  return data;
}
