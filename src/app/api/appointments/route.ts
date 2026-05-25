import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { sendAppointmentEmail } from "@/lib/email";

const schema = z.object({
  name:           z.string().min(2),
  phone:          z.string().min(7),
  procedure:      z.string().optional(),
  type:           z.enum(["asap", "scheduled"]),
  scheduled_date: z.string().optional(), // "YYYY-MM-DD"
  scheduled_time: z.string().optional(), // "9:00 AM"
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

    const { name, phone, procedure, type, scheduled_date, scheduled_time } = parsed.data;

    // ── 1. Find existing lead by phone, or create a new one ──────────────────
    let leadId: string;

    const { data: existing } = await supabase
      .from("leads")
      .select("id")
      .eq("phone", phone)
      .limit(1)
      .maybeSingle();

    if (existing?.id) {
      leadId = existing.id;
      console.log(`[YCS Appt] Existing lead ${leadId} matched by phone ${phone}`);
    } else {
      const { data: newLead, error: leadErr } = await supabase
        .from("leads")
        .insert([{
          name,
          phone,
          procedure: procedure ?? null,
          created_at: new Date().toISOString(),
        }])
        .select("id")
        .single();

      if (leadErr || !newLead) {
        console.error("[YCS Appt] Lead creation error:", leadErr?.message);
        return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
      }

      leadId = newLead.id;
      console.log(`[YCS Appt] New lead created: ${leadId}`);
    }

    // ── 2. Create the appointment ─────────────────────────────────────────────
    const { data: appt, error: apptErr } = await supabase
      .from("appointments")
      .insert([{
        lead_id:        leadId,
        procedure:      procedure ?? null,
        type,
        scheduled_date: scheduled_date ?? null,
        scheduled_time: scheduled_time ?? null,
        status:         "pending",
        created_at:     new Date().toISOString(),
      }])
      .select("id")
      .single();

    if (apptErr || !appt) {
      console.error("[YCS Appt] Appointment creation error:", apptErr?.message);
      return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
    }

    console.log(
      `[YCS Appt] ${type.toUpperCase()} | ${name} (${phone}) | ${procedure ?? "—"} | appt: ${appt.id}`
    );

    // Fire-and-forget — never blocks the response
    sendAppointmentEmail({
      name,
      phone,
      procedure,
      type,
      scheduled_date: scheduled_date,
      scheduled_time: scheduled_time,
    });

    return NextResponse.json({ success: true, appointment_id: appt.id });

  } catch (err) {
    console.error("[YCS Appt] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
