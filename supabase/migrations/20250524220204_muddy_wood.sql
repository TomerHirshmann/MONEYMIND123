/*
  # Add onboarding fields to profiles table

  1. Changes
    - Add new columns to profiles table:
      - `business_name` (text)
      - `business_industry` (text)
      - `avg_monthly_income` (text)
      - `full_name` (text)
      - `onboarding_step` (integer)
      - `preferences` (jsonb)
      - `onboarding_completed` (boolean)

  2. Security
    - Update RLS policies to allow users to update their own profiles
*/

-- Add new columns to profiles table if they don't exist
DO $$ 
BEGIN
  ALTER TABLE profiles 
    ADD COLUMN IF NOT EXISTS business_name text,
    ADD COLUMN IF NOT EXISTS business_industry text,
    ADD COLUMN IF NOT EXISTS avg_monthly_income text,
    ADD COLUMN IF NOT EXISTS full_name text DEFAULT '',
    ADD COLUMN IF NOT EXISTS onboarding_step integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false;
END $$;

-- Drop existing policies if they exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create updated policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);