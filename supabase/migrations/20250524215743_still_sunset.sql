/*
  # Update profiles table for onboarding

  1. Changes
    - Add new fields to profiles table for onboarding flow
    - Add business-related fields for user categorization
    - Add preferences field for user settings

  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to profiles table if they don't exist
DO $$ 
BEGIN
  ALTER TABLE profiles 
    ADD COLUMN IF NOT EXISTS full_name text DEFAULT '',
    ADD COLUMN IF NOT EXISTS business_name text,
    ADD COLUMN IF NOT EXISTS business_industry text,
    ADD COLUMN IF NOT EXISTS avg_monthly_income text,
    ADD COLUMN IF NOT EXISTS onboarding_step integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS preferences jsonb;
END $$;

-- Update handle_new_user function to set default values
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    onboarding_step,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    new.email,
    '',
    0,
    now(),
    now()
  );
  
  -- Create free subscription for new user
  INSERT INTO public.subscriptions (
    user_id,
    plan_type,
    status,
    current_period_start,
    current_period_end
  )
  VALUES (
    new.id,
    'free',
    'active',
    now(),
    (now() + interval '30 days')
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;