-- Initial Schema for One Vision Platform
-- Created at: 2026-09-24

-- 1. Create Custom Types
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'volunteer', 'user');
CREATE TYPE application_status AS ENUM ('pending', 'reviewed', 'accepted', 'rejected');
CREATE TYPE request_urgency AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE request_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE donation_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- 2. Create Tables

-- Profiles: Extended user data tied to Supabase Auth
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  role user_role DEFAULT 'user'::user_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Volunteer Applications
CREATE TABLE public.volunteer_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Nullable if they apply without an account
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  availability TEXT,
  message TEXT,
  status application_status DEFAULT 'pending'::application_status NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Help Requests
CREATE TABLE public.help_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  requester_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  request_type TEXT NOT NULL,
  description TEXT NOT NULL,
  urgency request_urgency DEFAULT 'medium'::request_urgency NOT NULL,
  status request_status DEFAULT 'open'::request_status NOT NULL,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Donations (Metadata only, no PCI data)
CREATE TABLE public.donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  donor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  pan_number TEXT, -- Specific to Indian NGOs for tax
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR' NOT NULL,
  is_recurring BOOLEAN DEFAULT false NOT NULL,
  allocation_preference TEXT DEFAULT 'general',
  status donation_status DEFAULT 'pending'::donation_status NOT NULL,
  payment_intent_id TEXT, -- Stripe / Razorpay reference
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.help_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policies

-- Profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Volunteer Applications
-- Public can submit (INSERT)
CREATE POLICY "Anyone can submit volunteer applications" ON public.volunteer_applications FOR INSERT WITH CHECK (true);
-- Only admins can read/update
CREATE POLICY "Admins can view volunteer applications" ON public.volunteer_applications FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins can update volunteer applications" ON public.volunteer_applications FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Help Requests
-- Public can submit (INSERT)
CREATE POLICY "Anyone can submit help requests" ON public.help_requests FOR INSERT WITH CHECK (true);
-- Users can view their own, Admins can view all
CREATE POLICY "Users can view own help requests" ON public.help_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins and volunteers can view all help requests" ON public.help_requests FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'volunteer'))
);
CREATE POLICY "Admins and volunteers can update help requests" ON public.help_requests FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'volunteer'))
);

-- Donations
-- Public can submit (INSERT) metadata prior to gateway redirect
CREATE POLICY "Anyone can create donation intents" ON public.donations FOR INSERT WITH CHECK (true);
-- Users can view own donations
CREATE POLICY "Users can view own donations" ON public.donations FOR SELECT USING (auth.uid() = donor_id);
-- Only admins can view all donations
CREATE POLICY "Admins can view all donations" ON public.donations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- 5. Triggers for updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_volunteer_applications_updated_at BEFORE UPDATE ON public.volunteer_applications FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_help_requests_updated_at BEFORE UPDATE ON public.help_requests FOR EACH ROW EXECUTE FUNCTION set_updated_at();
CREATE TRIGGER set_donations_updated_at BEFORE UPDATE ON public.donations FOR EACH ROW EXECUTE FUNCTION set_updated_at();
