-- ============================================================
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. Appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id        uuid        NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  procedure      text,
  type           text        NOT NULL CHECK (type IN ('asap', 'scheduled')),
  scheduled_date date,
  scheduled_time text,
  status         text        NOT NULL DEFAULT 'pending'
                             CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes          text,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- 2. Index for fast lead lookups
CREATE INDEX IF NOT EXISTS appointments_lead_id_idx ON public.appointments(lead_id);
CREATE INDEX IF NOT EXISTS appointments_status_idx  ON public.appointments(status);
CREATE INDEX IF NOT EXISTS appointments_date_idx    ON public.appointments(scheduled_date);

-- 3. Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- 4. Service-role policy (your API uses SUPABASE_SERVICE_KEY which bypasses RLS,
--    but the policy is required for RLS to be active)
CREATE POLICY "service_role_all" ON public.appointments
  FOR ALL USING (true) WITH CHECK (true);
