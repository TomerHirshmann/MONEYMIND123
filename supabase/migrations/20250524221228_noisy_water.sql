/*
  # Fix Authentication Issues

  1. Updates
    - Add missing columns to profiles table
    - Update handle_new_user function
    - Fix RLS policies
    
  2. Security
    - Enable RLS
    - Add policies for profile management
*/

-- Ensure profiles table has all required columns
DO $$ 
BEGIN
  ALTER TABLE profiles 
    ADD COLUMN IF NOT EXISTS full_name text DEFAULT '',
    ADD COLUMN IF NOT EXISTS business_name text,
    ADD COLUMN IF NOT EXISTS business_industry text,
    ADD COLUMN IF NOT EXISTS avg_monthly_income text,
    ADD COLUMN IF NOT EXISTS onboarding_step integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}'::jsonb,
    ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false;
END $$;

-- Update handle_new_user function to properly initialize profile
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    onboarding_step,
    onboarding_completed,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    new.email,
    '',
    0,
    false,
    now(),
    now()
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Update profile policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

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

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);