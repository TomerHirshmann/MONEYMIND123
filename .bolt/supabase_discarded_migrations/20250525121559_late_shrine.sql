-- Ensure subscriptions table has all required columns
ALTER TABLE subscriptions 
  ADD COLUMN IF NOT EXISTS plan_name text,
  ADD COLUMN IF NOT EXISTS features text,
  ADD COLUMN IF NOT EXISTS auto_renewal boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS payment_provider text;

-- Update handle_new_user function to create initial subscription
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create profile
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
  
  -- Create initial free subscription
  INSERT INTO public.subscriptions (
    user_id,
    plan_type,
    plan_name,
    status,
    current_period_start,
    current_period_end,
    features,
    auto_renewal,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    'free',
    'Free Trial',
    'active',
    now(),
    (now() + interval '30 days'),
    'basic features',
    true,
    now(),
    now()
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure RLS is enabled
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Update subscription policies
DROP POLICY IF EXISTS "Users can view own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Users can manage own subscriptions" ON subscriptions;

CREATE POLICY "Users can view own subscriptions"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own subscriptions"
  ON subscriptions
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Update triggers
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON subscriptions;
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();