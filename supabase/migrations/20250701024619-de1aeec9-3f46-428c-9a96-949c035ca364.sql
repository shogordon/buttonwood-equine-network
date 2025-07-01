
-- Add missing columns to horse_profiles table to store radio button states
ALTER TABLE public.horse_profiles 
ADD COLUMN IF NOT EXISTS user_role TEXT,
ADD COLUMN IF NOT EXISTS owner_type TEXT,
ADD COLUMN IF NOT EXISTS listing_type TEXT[],
ADD COLUMN IF NOT EXISTS agent_contact_visibility TEXT;
