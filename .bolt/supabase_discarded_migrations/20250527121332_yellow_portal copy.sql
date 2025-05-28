/*
  # Add Viewer Role Support
  
  1. New Features
    - Add viewer_id column to profiles for view-only access
    - Add policies for viewer access to transactions, goals, and profiles
    
  2. Security
    - Viewers can only read data, no write access
    - Original user maintains full control
*/

-- Add viewer_id to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS viewer_id uuid REFERENCES auth.users(id);

-- Create policies for viewer access to transactions
CREATE POLICY "Viewers can read transactions"
ON transactions
FOR SELECT
TO authenticated
USING (
  auth.uid() IN (
    SELECT viewer_id 
    FROM profiles 
    WHERE id = transactions.user_id
  )
);

-- Create policies for viewer access to goals
CREATE POLICY "Viewers can read goals"
ON goals
FOR SELECT
TO authenticated
USING (
  auth.uid() IN (
    SELECT viewer_id 
    FROM profiles 
    WHERE id = goals.user_id
  )
);

-- Create policies for viewer access to profiles
CREATE POLICY "Viewers can read profiles"
ON profiles
FOR SELECT
TO authenticated
USING (
  auth.uid() = viewer_id
);