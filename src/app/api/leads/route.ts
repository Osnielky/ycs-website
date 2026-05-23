import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  email: z.string().email().optional().or(z.literal("")),
  procedure: z.string().optional(),
  message: z.string().optional(),
  smsConsent: z.boolean().optional(),
});

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

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

    const { error } = await supabase.from("leads").insert([{
      name: lead.name,
      phone: lead.phone,
      email: lead.email ?? null,
      procedure: lead.procedure ?? null,
      message: lead.message ?? null,
      sms_consent: lead.smsConsent ?? false,
      created_at: new Date().toISOString(),
    }]);

    if (error) {
      console.error("[YCS Lead] Supabase error:", error.message);
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
    }

    console.log("[YCS Lead saved]", lead.name, lead.phone);
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("[YCS Lead] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
