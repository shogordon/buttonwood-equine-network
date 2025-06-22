
-- Add new columns to horse_profiles table for enhanced listing information
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS pros TEXT[];
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS cons TEXT[];
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS sale_type TEXT DEFAULT 'for_sale';
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS trial_available BOOLEAN DEFAULT false;
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS xrays_available BOOLEAN DEFAULT false;
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS temperament TEXT[];
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS rideability TEXT[];
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS program_details TEXT[];
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS maintenance_details TEXT[];
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS show_record TEXT;
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS pedigree TEXT;
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS verification_status TEXT DEFAULT 'pending';
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS listing_status TEXT DEFAULT 'draft';
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS year_of_birth INTEGER;
ALTER TABLE horse_profiles ADD COLUMN IF NOT EXISTS sex TEXT;

-- Create media table for horse images and videos
CREATE TABLE IF NOT EXISTS horse_media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_profile_id UUID REFERENCES horse_profiles(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  url TEXT NOT NULL,
  caption TEXT,
  is_primary BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create trial requests table
CREATE TABLE IF NOT EXISTS trial_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_profile_id UUID REFERENCES horse_profiles(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  requested_date DATE,
  message TEXT,
  seller_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create inquiries table for contact requests
CREATE TABLE IF NOT EXISTS horse_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_profile_id UUID REFERENCES horse_profiles(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  buyer_email TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'responded', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create commission disclosures table
CREATE TABLE IF NOT EXISTS commission_disclosures (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  horse_profile_id UUID REFERENCES horse_profiles(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  commission_type TEXT CHECK (commission_type IN ('none', 'buyer_agent', 'seller_agent', 'both')),
  commission_amount DECIMAL(5,2),
  disclosure_text TEXT,
  acknowledged_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add RLS policies for new tables
ALTER TABLE horse_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE trial_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE horse_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_disclosures ENABLE ROW LEVEL SECURITY;

-- RLS policies for horse_media
CREATE POLICY "Anyone can view horse media" ON horse_media FOR SELECT USING (true);
CREATE POLICY "Horse owners can manage their horse media" ON horse_media 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM horse_profiles 
      WHERE horse_profiles.id = horse_media.horse_profile_id 
      AND horse_profiles.user_id = auth.uid()
    )
  );

-- RLS policies for trial_requests
CREATE POLICY "Users can view their own trial requests" ON trial_requests 
  FOR SELECT USING (
    buyer_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM horse_profiles 
      WHERE horse_profiles.id = trial_requests.horse_profile_id 
      AND horse_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Buyers can create trial requests" ON trial_requests 
  FOR INSERT WITH CHECK (buyer_id = auth.uid());

CREATE POLICY "Horse owners can update trial requests for their horses" ON trial_requests 
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM horse_profiles 
      WHERE horse_profiles.id = trial_requests.horse_profile_id 
      AND horse_profiles.user_id = auth.uid()
    )
  );

-- RLS policies for horse_inquiries
CREATE POLICY "Users can view their own inquiries" ON horse_inquiries 
  FOR SELECT USING (
    buyer_id = auth.uid() OR 
    EXISTS (
      SELECT 1 FROM horse_profiles 
      WHERE horse_profiles.id = horse_inquiries.horse_profile_id 
      AND horse_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create inquiries" ON horse_inquiries 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Horse owners can update inquiries for their horses" ON horse_inquiries 
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM horse_profiles 
      WHERE horse_profiles.id = horse_inquiries.horse_profile_id 
      AND horse_profiles.user_id = auth.uid()
    )
  );

-- RLS policies for commission_disclosures
CREATE POLICY "Anyone can view commission disclosures" ON commission_disclosures FOR SELECT USING (true);
CREATE POLICY "Horse owners can manage their commission disclosures" ON commission_disclosures 
  FOR ALL USING (seller_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_horse_media_horse_id ON horse_media(horse_profile_id);
CREATE INDEX IF NOT EXISTS idx_trial_requests_horse_id ON trial_requests(horse_profile_id);
CREATE INDEX IF NOT EXISTS idx_horse_inquiries_horse_id ON horse_inquiries(horse_profile_id);
CREATE INDEX IF NOT EXISTS idx_commission_disclosures_horse_id ON commission_disclosures(horse_profile_id);
CREATE INDEX IF NOT EXISTS idx_horse_profiles_listing_status ON horse_profiles(listing_status);
CREATE INDEX IF NOT EXISTS idx_horse_profiles_is_available ON horse_profiles(is_available);
