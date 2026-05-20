import twilio from "twilio";

let cached = null;

function getClient() {
  if (cached) return cached;
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) return null;
  cached = twilio(sid, token);
  return cached;
}

/**
 * Normalize a user-entered US phone number to E.164 (+1XXXXXXXXXX).
 * Returns null if it doesn't look like a valid 10- or 11-digit US number.
 */
export function toE164(raw) {
  if (!raw) return null;
  // Strip everything that isn't a digit, including unicode directional marks.
  const digits = String(raw).replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

/**
 * Send an SMS via Twilio. Returns { ok, sid, error }.
 * Resolves rather than rejecting so callers can fire-and-forget without try/catch.
 */
export async function sendSMS({ to, body }) {
  const client = getClient();
  if (!client) {
    return { ok: false, error: "Twilio not configured (missing SID/token)" };
  }
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!from) return { ok: false, error: "Missing TWILIO_FROM_NUMBER" };

  const normalized = toE164(to);
  if (!normalized) return { ok: false, error: `Invalid phone: ${to}` };

  try {
    const msg = await client.messages.create({
      from,
      to: normalized,
      body,
    });
    return { ok: true, sid: msg.sid };
  } catch (e) {
    return { ok: false, error: e.message, code: e.code };
  }
}

/**
 * Format a Date as "Mon Jun 8" for SMS bodies.
 */
export function fmtDate(d) {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}
