import { Resend } from "resend";

const FROM = "YCS Aesthetic Center <onboarding@resend.dev>";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function getTo() {
  return process.env.CLINIC_EMAIL ?? "info@ycosmeticsurgery.com";
}

function base(
  title: string,
  body: string,
  opts: { lang?: string; brand?: string; footer?: string } = {},
) {
  const lang = opts.lang ?? "en";
  const brand = opts.brand ?? "YCS Aesthetic Center";
  const footer = opts.footer ?? "YCS Aesthetic Center · Miami, Florida · This is an automated notification.";
  return `<!DOCTYPE html>
<html lang="${lang}">
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
            ${brand}
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
          <p style="margin:0;color:#5b6478;font-size:11px;line-height:1.6;font-family:Arial,sans-serif;">
            ${footer}
          </p>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

/** Escape text that came from a form before placing it in email HTML. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");

  const subject = `New Lead: ${lead.name}${lead.procedure ? ` — ${lead.procedure}` : ""}`;
  const phone = esc(lead.phone);
  const email = lead.email ? esc(lead.email) : "";

  const body = `
    <p style="margin:0 0 20px;color:#0d1b3e;font-size:15px;line-height:1.6;">
      A new patient inquiry just came in. Reach out as soon as possible.
    </p>
    ${table(
      row("Name",      esc(lead.name)),
      row("Phone",     `<a href="tel:${phone}" style="color:#c9a46e;text-decoration:none;">${phone}</a>`),
      email          ? row("Email",     `<a href="mailto:${email}" style="color:#c9a46e;text-decoration:none;">${email}</a>`) : "",
      lead.procedure ? row("Procedure", esc(lead.procedure)) : "",
      lead.message   ? row("Message",   esc(lead.message))   : "",
      row("Time",      new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" })),
    )}`;

  // Throws on failure so the leads route knows whether the lead reached anyone.
  const { error } = await getResend().emails.send({
    from:    FROM,
    to:      getTo(),
    subject,
    html:    base(esc(subject), body),
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}

// ── Confirmation to the patient ────────────────────────────────────────────

const CONFIRMATION = {
  en: {
    subject: "We received your request | Your Cosmetic Surgery & SPA",
    title: "We received your request",
    hello: (name: string) => (name ? `Hello ${name},` : "Hello,"),
    p1: "Thank you for contacting Your Cosmetic Surgery & SPA. We received your request for a free consultation, and a patient coordinator will contact you within 24 hours at the phone number you gave us.",
    p2: "If you would rather not wait, call or text us:",
    hoursLabel: "Office hours",
    hours: ["Monday – Friday: 9:00 AM – 6:00 PM", "Saturday: 10:00 AM – 3:00 PM", "Sunday: Closed"],
    addressLabel: "Address",
    footer: "You are receiving this message because this email address was entered in a consultation request on ycosmeticsurgery.com. If that was not you, you can ignore this email.",
  },
  es: {
    subject: "Recibimos su solicitud | Your Cosmetic Surgery & SPA",
    title: "Recibimos su solicitud",
    hello: (name: string) => (name ? `Hola, ${name}:` : "Hola:"),
    p1: "Gracias por comunicarse con Your Cosmetic Surgery & SPA. Recibimos su solicitud de consulta gratuita y una coordinadora de pacientes le contactará dentro de 24 horas al número de teléfono que nos indicó.",
    p2: "Si prefiere no esperar, llámenos o envíenos un mensaje de texto:",
    hoursLabel: "Horario",
    hours: ["Lunes a viernes: 9:00 AM – 6:00 PM", "Sábado: 10:00 AM – 3:00 PM", "Domingo: cerrado"],
    addressLabel: "Dirección",
    footer: "Usted recibe este mensaje porque esta dirección de correo se ingresó en una solicitud de consulta en ycosmeticsurgery.com. Si no fue usted, puede ignorar este correo.",
  },
} as const;

/**
 * First name for the greeting, or "" when the submitted name is not a plain name.
 * The address is typed by whoever fills the form, so nothing free-form from the
 * form may reach this email: it would let a stranger send their own text to a
 * third party under the clinic's name.
 */
function greetingName(name: string): string {
  const first = name.trim().split(/\s+/)[0] ?? "";
  return /^[\p{L}'-]{2,30}$/u.test(first) ? first : "";
}

/**
 * Sends the patient a short "we received your request" email.
 * Returns false (and sends nothing) until RESEND_FROM_EMAIL is set to an address
 * on a domain verified in Resend: the shared onboarding@resend.dev sender can
 * only deliver to the Resend account owner, not to patients.
 * The message never mentions the procedure the patient asked about.
 */
export async function sendLeadConfirmationEmail(lead: {
  name: string;
  email: string;
  locale?: "en" | "es";
}): Promise<boolean> {
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  if (!process.env.RESEND_API_KEY || !fromEmail) return false;

  const lang = lead.locale === "es" ? "es" : "en";
  const c = CONFIRMATION[lang];
  const text = "margin:0 0 16px;color:#0d1b3e;font-size:15px;line-height:1.6;";
  const label = "margin:20px 0 4px;color:#85602e;font-size:11px;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;";

  const body = `
    <p style="${text}">${esc(c.hello(greetingName(lead.name)))}</p>
    <p style="${text}">${esc(c.p1)}</p>
    <p style="${text}">${esc(c.p2)}
      <a href="tel:+13052183513" style="color:#85602e;font-weight:bold;text-decoration:none;white-space:nowrap;">(305) 218-3513</a>
    </p>
    <p style="${label}">${esc(c.hoursLabel)}</p>
    <p style="${text}">${c.hours.map(esc).join("<br />")}</p>
    <p style="${label}">${esc(c.addressLabel)}</p>
    <p style="${text}">1255 W 46th St Suite #6 &amp; 7A<br />Hialeah, FL 33012</p>`;

  const { error } = await getResend().emails.send({
    from:    `Your Cosmetic Surgery & SPA <${fromEmail}>`,
    to:      lead.email,
    replyTo: getTo(),
    subject: c.subject,
    html:    base(esc(c.title), body, {
      lang,
      brand: "Your Cosmetic Surgery &amp; SPA",
      footer: `Your Cosmetic Surgery &amp; SPA · Hialeah, Florida<br />${esc(c.footer)}`,
    }),
  });
  if (error) throw new Error(`Resend: ${error.message}`);
  return true;
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
        : `A patient scheduled a <strong>virtual consultation</strong> for ${dateStr} at ${esc(appt.scheduled_time ?? "")}.`
      }
    </p>
    ${table(
      row("Name",      esc(appt.name)),
      row("Phone",     `<a href="tel:${esc(appt.phone)}" style="color:#c9a46e;text-decoration:none;">${esc(appt.phone)}</a>`),
      appt.procedure    ? row("Procedure",  esc(appt.procedure)) : "",
      row("Type",       typeLabel),
      dateStr           ? row("Date",       dateStr)         : "",
      appt.scheduled_time ? row("Time",    esc(appt.scheduled_time)) : "",
      row("Submitted",  new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "full", timeStyle: "short" })),
    )}`;

  await getResend().emails.send({
    from:    FROM,
    to:      getTo(),
    subject,
    html:    base(esc(subject), body),
  }).catch((err: unknown) => {
    console.error("[YCS Email] Appointment notification failed:", err);
  });
}
