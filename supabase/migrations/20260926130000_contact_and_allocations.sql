-- Migration: 20260926130000_contact_and_allocations
-- Add missing tables for contact_messages and fund_allocations

CREATE TABLE public.contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'unread'::text NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for anonymous users" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Enable read for authenticated users only" ON public.contact_messages FOR SELECT TO authenticated USING (true);


CREATE TABLE public.fund_allocations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    title text NOT NULL,
    date timestamp with time zone NOT NULL,
    location text NOT NULL,
    amount text NOT NULL,
    status text NOT NULL
);

ALTER TABLE public.fund_allocations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read for anonymous users" ON public.fund_allocations FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Enable write for authenticated users only" ON public.fund_allocations FOR ALL TO authenticated USING (true) WITH CHECK (true);
