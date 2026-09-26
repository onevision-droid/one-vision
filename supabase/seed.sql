-- Seed data for testing local setup
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'admin@onevision.org', crypt('password123', gen_salt('bf')), now(), 'authenticated')
ON CONFLICT DO NOTHING;

INSERT INTO public.fund_allocations (title, date, location, amount, status)
VALUES 
    ('Emergency Medical Camp', '2026-09-01T10:00:00Z', 'Imphal Valley', '₹150,000', 'completed'),
    ('Solar Microgrid Installation', '2026-09-15T08:00:00Z', 'Koutruk', '₹500,000', 'in progress')
ON CONFLICT DO NOTHING;
