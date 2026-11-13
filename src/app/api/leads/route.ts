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

// Per-visitor cap on confirmation emails. In memory, so it is per server
// instance: a coarse brake on bursts, with the per-address check as the real limit.
const CONFIRM_WINDOW_MS = 60 * 60 * 1000;
const CONFIRM_MAX_PER_WINDOW = 3;
const confirmHits = new Map<string, number[]>();

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function allowConfirmation(ip: string): boolean {
  const now = Date.now();
  const recent = (confirmHits.get(ip) ?? []).filter((t) => now - t < CONFIRM_WINDOW_MS);
  if (recent.length >= CONFIRM_MAX_PER_WINDOW) {
    confirmHits.set(ip, recent);
    return false;
  }
  recent.push(now);
  confirmHits.set(ip, recent);
  if (confirmHits.size > 5000) confirmHits.clear();
  return true;
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

    const lead = parsed.data;

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
    if (lead.email && saved && allowConfirmation(clientIp(req))) {
      try {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const { count, error } = await getSupabase()
          .from("leads")
          .select("*", { count: "exact", head: true })
          .eq("email", lead.email)
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
