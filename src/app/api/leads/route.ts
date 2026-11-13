import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { sendLeadConfirmationEmail, sendLeadEmail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal("")),
  procedure: z.string().optional(),
  message: z.string().optional(),
  smsConsent: z.boolean().optional(),
  locale: z.enum(["en", "es"]).optional(),
});

const getSupabase = () => createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

// Caps on confirmation emails. In memory, so they are per server instance: a
// coarse brake on bursts, with the per-address check in the handler as the
// main limit.
const CONFIRM_WINDOW_MS = 60 * 60 * 1000;
const CONFIRM_MAX_PER_VISITOR = 3;
const CONFIRM_MAX_TOTAL = 30;
const confirmHits = new Map<string, number[]>();
let confirmTotal: number[] = [];

/**
 * The address Google's front end saw. It appends to X-Forwarded-For, so the
 * last entry is the one the client cannot forge; earlier entries are whatever
 * the client sent.
 */
function clientIp(req: NextRequest): string {
  const parts = (req.headers.get("x-forwarded-for") ?? "").split(",").map((p) => p.trim()).filter(Boolean);
  return parts[parts.length - 1] ?? "unknown";
}

function allowConfirmation(ip: string): boolean {
  const now = Date.now();
  const fresh = (t: number) => now - t < CONFIRM_WINDOW_MS;

  confirmTotal = confirmTotal.filter(fresh);
  if (confirmTotal.length >= CONFIRM_MAX_TOTAL) return false;

  // Drop expired visitors instead of ever resetting the whole table.
  if (confirmHits.size > 2000) {
    for (const [key, times] of confirmHits) {
      if (!times.some(fresh)) confirmHits.delete(key);
    }
  }

  const recent = (confirmHits.get(ip) ?? []).filter(fresh);
  if (recent.length >= CONFIRM_MAX_PER_VISITOR) {
    confirmHits.set(ip, recent);
    return false;
  }
  recent.push(now);
  confirmHits.set(ip, recent);
  confirmTotal.push(now);
  return true;
}

/** Escape the wildcard characters of a SQL LIKE pattern. */
function likeLiteral(value: string): string {
  return value.replace(/[\\%_]/g, (c) => `\\${c}`);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid data", details: parsed.error.issues },
        { status: 400 }
      );
    }

    // Email addresses are compared case-insensitively everywhere, so keep one form.
    const lead = { ...parsed.data, email: parsed.data.email?.trim().toLowerCase() };

    let saved = false;
    try {
      const { error } = await getSupabase().from("leads").insert([{
        name: lead.name,
        phone: lead.phone,
        email: lead.email ?? null,
        procedure: lead.procedure ?? null,
        message: lead.message ?? null,
        sms_consent: lead.smsConsent ?? false,
        created_at: new Date().toISOString(),
      }]);
      if (error) console.error("[YCS Lead] Supabase error:", error.message);
      else saved = true;
    } catch (err) {
      console.error("[YCS Lead] Supabase unreachable:", err);
    }

    if (saved) console.log("[YCS Lead saved]", lead.name, lead.phone);

    // Email is sent regardless of the DB result so a database outage can't
    // silently drop leads. Awaited so Cloud Run doesn't cut it off post-response.
    let emailed = false;
    try {
      await sendLeadEmail({
        name:      lead.name,
        phone:     lead.phone,
        email:     lead.email,
        procedure: lead.procedure,
        message:   lead.message,
      });
      emailed = true;
      console.log("[YCS Email] Lead notification sent for:", lead.name);
    } catch (err) {
      console.error("[YCS Email] Lead notification FAILED for:", lead.name, err);
    }

    if (!saved && !emailed) {
      console.error("[YCS Lead] LOST — not saved or emailed:", JSON.stringify(lead));
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    // Confirmation to the patient. Best effort: the lead is already safe, so a
    // failure here is logged and never turns the request into an error.
    // The address is typed by whoever fills the form, so sending is limited:
    // only for a lead that was saved, once per address per day, and a few per
    // visitor. Anything over the limit is still a lead, just without the email.
    // Addresses with a "+tag" are skipped: the tag makes endless variants of one
    // inbox, which would defeat the once-per-address limit.
    if (lead.email && !lead.email.includes("+") && saved && allowConfirmation(clientIp(req))) {
      try {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const { count, error } = await getSupabase()
          .from("leads")
          .select("*", { count: "exact", head: true })
          .ilike("email", likeLiteral(lead.email))
          .gte("created_at", since);
        // count includes the lead saved above, so 1 means first in 24 hours.
        if (!error && count === 1) {
          const sent = await sendLeadConfirmationEmail({
            name: lead.name,
            email: lead.email,
            locale: lead.locale,
          });
          if (sent) console.log("[YCS Email] Patient confirmation sent");
        }
      } catch (err) {
        console.error("[YCS Email] Patient confirmation FAILED:", err);
      }
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[YCS Lead] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
