-- Trade Learning Hub - Supabase Database Schema

-- 1. Create Tables
CREATE TABLE IF NOT EXISTS courses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  description text,
  cover_image_url text,
  preview_video_url text,
  qr_image_url text,
  video_title text,
  curriculum text,
  price numeric,
  original_price numeric,
  locked_urls jsonb DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id uuid NOT NULL,
  course_id uuid NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_verifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  user_id uuid NOT NULL,
  user_email text NOT NULL,
  course_id uuid NOT NULL,
  sender_name text NOT NULL,
  transaction_id text NOT NULL,
  amount text NOT NULL,
  status text DEFAULT 'pending' NOT NULL
);

CREATE TABLE IF NOT EXISTS platform_settings (
  id bigint PRIMARY KEY,
  universal_qr_url text
);

-- 2. Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;

-- 3. Security Policies
-- Public read access
CREATE POLICY "Allow public read access" ON courses FOR SELECT USING (true);
CREATE POLICY "Allow public read settings" ON platform_settings FOR SELECT USING (true);

-- Admin Management (Replace 'tradelearninghub@gmail.com' with your admin email)
CREATE POLICY "Allow admin to manage courses" ON courses FOR ALL 
USING ((auth.jwt() ->> 'email') = 'tradelearninghub@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'tradelearninghub@gmail.com');

CREATE POLICY "Admin manage all access" ON purchases FOR ALL 
USING ((auth.jwt() ->> 'email') = 'tradelearninghub@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'tradelearninghub@gmail.com');

CREATE POLICY "Admin manage verifications" ON payment_verifications FOR ALL 
USING ((auth.jwt() ->> 'email') = 'tradelearninghub@gmail.com')
WITH CHECK ((auth.jwt() ->> 'email') = 'tradelearninghub@gmail.com');

-- User Policies
CREATE POLICY "Users can view own purchases" ON purchases FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own verification" ON payment_verifications FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- 4. Updates
ALTER TABLE courses ADD COLUMN IF NOT EXISTS original_price numeric;
