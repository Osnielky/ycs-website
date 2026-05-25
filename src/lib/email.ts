import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = "YCS Aesthetic Center <onboarding@resend.dev>";
const TO     = process.env.CLINIC_EMAIL ?? "info@ycosmeticsurgery.com";

function base(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f0ece6;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ece6;padding:40px 20px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

      <!-- Header -->
      <tr>
        <td style="background:#0d1b3e;padding:28px 36px;">
          <p style="margin:0;color:#c9a46e;font-size:11px;letter-spacing:4px;text-transform:uppercase;font-family:Arial,sans-serif;">
            YCS Aesthetic Center
          </p>
          <p style="margin:6px 0 0;color:#ffffff;font-size:22px;font-weight:300;letter-spacing:1px;">
            ${title}
          </p>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:32px 36px;">
          ${body}
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#faf9f7;border-top:1px solid #f0ece6;padding:18px 36px;">
          <p style="margin:0;color:#0d1b3e;opacity:.35;font-size:11px;font-family:Arial,sans-serif;letter-spacing:1px;">
            YCS Aesthetic Center · Miami, Florida · This is an automated notification.
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string) {
  return `
  <tr>
    <td style="padding:8px 0;border-bottom:1px solid #f0ece6;width:140px;color:#0d1b3e;opacity:.45;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;vertical-align:top;">
      ${label}
    </td>
    <td style="padding:8px 0 8px 16px;border-bottom:1px solid #f0ece6;color:#0d1b3e;font-size:15px;font-family:Georgia,serif;vertical-align:top;">
      ${value}
    </td>
  </tr>`;
}

function table(...rows: string[]) {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;">${rows.join("")}</table>`;
}

// ── Lead notification ──────────────────────────────────────────────────────

export async function sendLeadEmail(lead: {
  name: string;
  phone: string;
  email?: string;
  procedure?: string;
  message?: string;
}) {
  if (!process.env.RESEND_API_KEY) return;

  const subject = `New Lead: ${lead.name}${lead.procedure ? ` — ${lead.procedure}` : ""}`;

  const body = `
    <p style="margin:0 0 20px;color:#0d1b3e;font-size:15px;line-height:1.6;">
      A new patient inquiry just came in. Reach out as soon as possible.
    </p>
    ${table(
      row("Name",      lead.name),
      row("Phone",     `<a href="tel:${lead.phone}" style="color:#c9a46e;text-decoration:none;">${lead.phone}</a>`),
      lead.email    ? row("Email",     `<a href="mailto:${lead.email}" style="color:#c9a46e;text-decoration:none;">${lead.email}</a>`) : "",
      lead.procedure ? row("Procedure", lead.procedure) : "",
      lead.message   ? row("Message",   lead.message)   : "",
      row("Time",      new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" })),
    )}`;

  await resend.emails.send({
    from:    FROM,
    to:      TO,
    subject,
    html:    base(subject, body),
  }).catch((err: unknown) => {
    console.error("[YCS Email] Lead notification failed:", err);
  });
}

// ── Appointment notification ───────────────────────────────────────────────

export async function sendAppointmentEmail(appt: {
  name: string;
  phone: string;
  procedure?: string;
  type: "asap" | "scheduled";
  scheduled_date?: string;
  scheduled_time?: string;
}) {
  if (!process.env.RESEND_API_KEY) return;

  const typeLabel = appt.type === "asap" ? "Call ASAP" : "Scheduled Virtual Appointment";
  const subject = `New Appointment: ${appt.name} — ${typeLabel}`;

  const dateStr = appt.scheduled_date
    ? new Date(appt.scheduled_date + "T12:00:00").toLocaleDateString("en-US", {
        weekday: "long", month: "long", day: "numeric", year: "numeric",
      })
    : null;

  const body = `
    <p style="margin:0 0 20px;color:#0d1b3e;font-size:15px;line-height:1.6;">
      ${appt.type === "asap"
        ? "A patient requested an <strong>immediate call</strong>. Please reach out within minutes."
        : `A patient scheduled a <strong>virtual consultation</strong> for ${dateStr} at ${appt.scheduled_time}.`
      }
    </p>
    ${table(
      row("Name",      appt.name),
      row("Phone",     `<a href="tel:${appt.phone}" style="color:#c9a46e;text-decoration:none;">${appt.phone}</a>`),
      appt.procedure    ? row("Procedure",  appt.procedure) : "",
      row("Type",       typeLabel),
      dateStr           ? row("Date",       dateStr)         : "",
      appt.scheduled_time ? row("Time",    appt.scheduled_time) : "",
      row("Submitted",  new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" })),
    )}`;

  await resend.emails.send({
    from:    FROM,
    to:      TO,
    subject,
    html:    base(subject, body),
  }).catch((err: unknown) => {
    console.error("[YCS Email] Appointment notification failed:", err);
  });
}
