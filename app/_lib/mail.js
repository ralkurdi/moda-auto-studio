import nodemailer from "nodemailer";

let cached = null;

function getTransporter() {
  if (cached) return cached;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  // Gmail SMTP via App Password (not OAuth). 2FA must be enabled on the
  // account. App Passwords removed the trailing spaces, so we strip them
  // defensively in case the user pasted with spacing.
  cached = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass: pass.replace(/\s+/g, ""),
    },
  });
  return cached;
}

/**
 * Generic send helper. Resolves rather than rejecting so callers can fire-
 * and-forget the result without try/catch.
 */
export async function sendEmail({ to, subject, html, text, replyTo }) {
  const transporter = getTransporter();
  if (!transporter) {
    return { ok: false, error: "Gmail SMTP not configured (missing user/pass)" };
  }
  const from = process.env.GMAIL_USER;
  try {
    const info = await transporter.sendMail({
      from: `MODA Auto Studio <${from}>`,
      to,
      replyTo: replyTo || from,
      subject,
      text,
      html,
    });
    return { ok: true, messageId: info.messageId };
  } catch (e) {
    return { ok: false, error: e.message, code: e.code };
  }
}

const fmtDateLong = (d) => {
  if (!d) return "your date";
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return "your date";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const fmtWeekday = (d) => {
  if (!d) return "soon";
  const date = d instanceof Date ? d : new Date(d);
  if (isNaN(date.getTime())) return "soon";
  return date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
};

const STUDIO = {
  name: "MODA Auto Studio",
  address: "52 S Linden Ave #2, South San Francisco, CA 94080",
  hours: "Mon–Sat · 9–6 · by appointment",
  email: "book@modaautostudio.com",
};

// Inline-styled HTML email template. Tables for layout, web-safe fonts as
// fallbacks for Cormorant Garamond. 600px max width.
//
// TODO(future): email layout polish pass — check typography hierarchy on
// Gmail mobile + Apple Mail + Outlook web, add a small Stripe security badge
// or lock icon next to the deposit CTA so clients recognize "this is a
// secure payment link" at a glance, tighten the spacing in the
// what-happens-next timeline, and consider a brand-tinted hero image at the
// top of each email once we have real photos.
//
// TODO(future): owner email currently shows the deposit URL as a plain text
// link in buildOwnerHTML (search for "Stripe Checkout:"). Promote that to
// the same gold button treatment the client email uses so the owner can
// one-tap the link from their phone inbox.
function shell({ preheader, bodyHtml }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${STUDIO.name}</title>
</head>
<body style="margin:0;padding:0;background:#EDE8DE;font-family:Georgia,'Times New Roman',serif;color:#0B0B0C;">
<div style="display:none;font-size:1px;color:#EDE8DE;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader || ""}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#EDE8DE;">
  <tr><td align="center" style="padding:40px 16px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;">
      <tr><td style="padding:40px 40px 24px;text-align:center;border-bottom:1px solid rgba(0,0,0,0.08);">
        <div style="font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:22px;letter-spacing:0.22em;color:#0B0B0C;">
          MOD<span style="color:#C9A961;">A</span>
        </div>
        <div style="margin-top:8px;font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#8a857a;">
          Auto Studio · South San Francisco
        </div>
      </td></tr>
      ${bodyHtml}
      <tr><td style="padding:24px 40px 40px;border-top:1px solid rgba(0,0,0,0.08);text-align:center;font-size:11px;line-height:1.6;color:#8a857a;font-family:'Courier New',Courier,monospace;letter-spacing:0.08em;">
        ${STUDIO.address}<br>
        ${STUDIO.hours}<br>
        <a href="mailto:${STUDIO.email}" style="color:#8C6B2F;text-decoration:none;">${STUDIO.email}</a>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function buildClientHTML(booking) {
  const isConsultation = booking.slot?.kind === "Consultation";
  const date = fmtDateLong(booking.date);
  const weekday = fmtWeekday(booking.date);
  const slotTime = booking.slot?.t || "your slot";
  const car = [booking.vehicle?.year, booking.vehicle?.make, booking.vehicle?.model]
    .filter(Boolean)
    .join(" ") || "Your vehicle";

  const headline = isConsultation
    ? `See you ${weekday}.`
    : `See you ${weekday}.`;

  const description = isConsultation
    ? `We've set aside ${slotTime} on ${date} for your consultation. Bring the car as it is — we'll walk through paint condition, service options, and timing together. Allow about 45 minutes.`
    : `We've blocked ${slotTime} on ${date} for your fitting. The bay is yours for the day.`;

  const timeline = isConsultation
    ? [
        ["72h before", "We'll confirm by text. Reply to reschedule."],
        ["Day of", "Bring the car in. We walk through scope together."],
        ["At the studio", "Paint inspection, service options, and timing."],
        ["Within 24h", "Tailored quote sent to your phone or email."],
      ]
    : [
        ["72h before", "We'll confirm by text. Reply to reschedule."],
        ["Day of", "Drop the car at your slot sharp. Coffee on us."],
        ["During", "Daily progress photos from the bay."],
        ["Handoff", "Walkthrough + care kit + warranty QR."],
      ];

  const estLabel = isConsultation ? "Tentative quote" : "Estimate";
  const estValue = booking.total
    ? `$${booking.total.toLocaleString()}`
    : "—";

  const body = `
    <tr><td style="padding:32px 40px 8px;">
      <div style="font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#C9A961;">
        ${isConsultation ? "Consultation booked" : "Bay reserved"} · #${booking.reservation_ref}
      </div>
      <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:36px;line-height:1.1;letter-spacing:-0.5px;margin:14px 0 0;color:#0B0B0C;">
        ${headline}
      </h1>
      <p style="font-size:14px;line-height:1.6;color:#3a3a3f;margin:16px 0 0;">
        ${description}
      </p>
    </td></tr>

    <tr><td style="padding:24px 40px 8px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid rgba(0,0,0,0.08);background:#F5F1E8;">
        ${row("Vehicle", car)}
        ${row("Date", `${date} · ${slotTime}`)}
        ${row("Type", booking.slot?.kind || "Booking")}
        ${row(estLabel, estValue)}
      </table>
    </td></tr>

    ${
      booking.deposit_url
        ? `
    <tr><td style="padding:28px 40px 8px;text-align:center;">
      <div style="font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#C9A961;margin-bottom:12px;">
        Reserve your bay
      </div>
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:1.3;color:#0B0B0C;margin-bottom:18px;">
        A $300 refundable deposit secures your slot.
      </div>
      <a href="${booking.deposit_url}" style="display:inline-block;background:#C9A961;color:#0B0B0C;padding:16px 36px;font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;border:1px solid #C9A961;">
        Pay $300 deposit
      </a>
      <div style="margin-top:14px;font-size:11px;line-height:1.5;color:#8a857a;">
        Fully refundable up to 72 hours before your appointment.
      </div>
    </td></tr>`
        : ""
    }

    <tr><td style="padding:24px 40px 8px;">
      <div style="font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#8a857a;margin-bottom:8px;">
        What happens next
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${timeline
          .map(
            ([when, what]) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.06);width:130px;vertical-align:top;font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#C9A961;">
            ${when}
          </td>
          <td style="padding:12px 0;border-bottom:1px solid rgba(0,0,0,0.06);font-size:13.5px;line-height:1.5;color:#0B0B0C;">
            ${what}
          </td>
        </tr>`
          )
          .join("")}
      </table>
    </td></tr>

    <tr><td style="padding:24px 40px 32px;font-size:13px;line-height:1.6;color:#3a3a3f;">
      Reply to this email if you need to change anything before your appointment.
    </td></tr>
  `;

  return shell({
    preheader: `${headline} ${slotTime} on ${date}.`,
    bodyHtml: body,
  });
}

function row(label, value) {
  return `
    <tr>
      <td style="padding:14px 16px;font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#8a857a;border-bottom:1px solid rgba(0,0,0,0.05);">${label}</td>
      <td style="padding:14px 16px;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#0B0B0C;text-align:right;border-bottom:1px solid rgba(0,0,0,0.05);">${value}</td>
    </tr>`;
}

function buildClientText(booking) {
  const isConsultation = booking.slot?.kind === "Consultation";
  const date = fmtDateLong(booking.date);
  const slotTime = booking.slot?.t || "your slot";
  const car = [booking.vehicle?.year, booking.vehicle?.make, booking.vehicle?.model]
    .filter(Boolean)
    .join(" ") || "Your vehicle";

  return `MODA Auto Studio

${isConsultation ? "Consultation booked" : "Bay reserved"} · #${booking.reservation_ref}

We've ${isConsultation ? "set aside" : "blocked"} ${slotTime} on ${date}${
    isConsultation ? " for your consultation" : ""
  }.

Vehicle:  ${car}
Date:     ${date} · ${slotTime}
Type:     ${booking.slot?.kind || "Booking"}
${
  booking.total
    ? `${isConsultation ? "Tentative quote" : "Estimate"}: $${booking.total.toLocaleString()}\n`
    : ""
}${
    booking.deposit_url
      ? `\nReserve your bay — pay the $300 refundable deposit:\n${booking.deposit_url}\n(Fully refundable up to 72 hours before your appointment.)\n`
      : ""
  }
${STUDIO.address}
${STUDIO.hours}

Reply to this email if you need to change anything.
`;
}

function buildOwnerHTML(booking) {
  const date = fmtDateLong(booking.date);
  const slotTime = booking.slot?.t || "—";
  const car = [booking.vehicle?.year, booking.vehicle?.make, booking.vehicle?.model, booking.vehicle?.trim]
    .filter(Boolean)
    .join(" ") || "—";
  const services = (booking.services || []).join(", ") || "—";

  const body = `
    <tr><td style="padding:32px 40px;">
      <div style="font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#C9A961;">
        New ${booking.slot?.kind || "Booking"} · #${booking.reservation_ref}
      </div>
      <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:24px;line-height:1.2;margin:10px 0 20px;color:#0B0B0C;">
        ${car}
      </h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid rgba(0,0,0,0.08);background:#F5F1E8;">
        ${row("Date", `${date} · ${slotTime}`)}
        ${row("Phone", booking.client_phone || "—")}
        ${row("Email", booking.client_email || "—")}
        ${row("Tier", booking.tier || "—")}
        ${row("Services", services)}
        ${row("Estimate", booking.total ? `$${booking.total.toLocaleString()}` : "—")}
        ${row("Deposit", booking.deposit_required ? (booking.deposit_url ? "$300 link sent" : "Required ($300) — link failed") : "Not required")}
      </table>
      ${
        booking.deposit_url
          ? `
      <div style="margin-top:14px;font-size:12px;color:#3a3a3f;">
        Stripe Checkout: <a href="${booking.deposit_url}" style="color:#8C6B2F;">${booking.deposit_url}</a>
      </div>`
          : ""
      }
      ${
        booking.notes
          ? `
      <div style="margin-top:20px;padding:14px;background:#F5F1E8;border:1px solid rgba(0,0,0,0.08);">
        <div style="font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#8a857a;margin-bottom:8px;">Notes from client</div>
        <div style="font-size:13.5px;line-height:1.55;color:#0B0B0C;white-space:pre-wrap;">${booking.notes}</div>
      </div>`
          : ""
      }
    </td></tr>
  `;

  return shell({
    preheader: `${car} · ${slotTime} on ${date}`,
    bodyHtml: body,
  });
}

export async function sendClientConfirmation(booking) {
  if (!booking.client_email) {
    return { ok: false, error: "No client email — skipped" };
  }
  const isConsultation = booking.slot?.kind === "Consultation";
  const subject = isConsultation
    ? `Your MODA consultation is booked · #${booking.reservation_ref}`
    : `Your MODA reservation is confirmed · #${booking.reservation_ref}`;
  return sendEmail({
    to: booking.client_email,
    subject,
    html: buildClientHTML(booking),
    text: buildClientText(booking),
  });
}

function buildConsultationHTML(c) {
  const body = `
    <tr><td style="padding:32px 40px;">
      <div style="font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#C9A961;">
        New consultation request
      </div>
      <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:24px;line-height:1.2;margin:10px 0 20px;color:#0B0B0C;">
        ${c.client_name}
      </h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid rgba(0,0,0,0.08);background:#F5F1E8;">
        ${row("Phone", c.client_phone || "—")}
        ${row("Email", c.client_email || "—")}
        ${row("Vehicle", c.vehicle || "—")}
        ${row("Interested in", c.service_interest || "—")}
        ${row("Heard about us", c.referral_source || "—")}
      </table>
      <div style="margin-top:20px;padding:14px;background:#F5F1E8;border:1px solid rgba(0,0,0,0.08);">
        <div style="font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#8a857a;margin-bottom:8px;">Message</div>
        <div style="font-size:13.5px;line-height:1.55;color:#0B0B0C;white-space:pre-wrap;">${c.notes}</div>
      </div>
    </td></tr>
  `;
  return shell({
    preheader: `${c.client_name} · ${c.vehicle || "no vehicle listed"}`,
    bodyHtml: body,
  });
}

export async function sendConsultationNotification(consultation) {
  const ownerEmail = process.env.OWNER_EMAIL;
  if (!ownerEmail) return { ok: false, error: "Missing OWNER_EMAIL" };
  const subject = `New consultation request · ${consultation.client_name}${
    consultation.vehicle ? ` · ${consultation.vehicle}` : ""
  }`;
  return sendEmail({
    to: ownerEmail,
    subject,
    html: buildConsultationHTML(consultation),
    replyTo: consultation.client_email || undefined,
  });
}

export async function sendOwnerNotification(booking) {
  const ownerEmail = process.env.OWNER_EMAIL;
  if (!ownerEmail) return { ok: false, error: "Missing OWNER_EMAIL" };
  const car = [booking.vehicle?.year, booking.vehicle?.make, booking.vehicle?.model]
    .filter(Boolean)
    .join(" ") || "—";
  const totalLabel = booking.total ? ` · $${booking.total.toLocaleString()}` : "";
  const subject = `New ${booking.slot?.kind || "booking"} · #${booking.reservation_ref} · ${car}${totalLabel}`;
  return sendEmail({
    to: ownerEmail,
    subject,
    html: buildOwnerHTML(booking),
  });
}
