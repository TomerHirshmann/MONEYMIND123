import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Profile operations
export const getProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
};

export const updateProfile = async (userId: string, profile: any) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Add viewer access
export const addViewer = async (userId: string, viewerEmail: string) => {
  try {
    // First get the viewer's user ID from their email
    const { data: viewerData, error: viewerError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', viewerEmail)
      .single();

    if (viewerError) throw viewerError;
    if (!viewerData) throw new Error('Viewer not found');

    // Update the profile with the viewer ID
    const { error } = await supabase
      .from('profiles')
      .update({ viewer_id: viewerData.id })
      .eq('id', userId);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error('Error adding viewer:', error);
    throw error;
  }
};

// Remove viewer access
export const removeViewer = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ viewer_id: null })
      .eq('id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error removing viewer:', error);
    throw error;
  }
};

// Subscription operations
export const getSubscription = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting subscription:', error);
    return null;
  }
};

// User type checks
export const isNewUser = async (userId: string) => {
  try {
    const profile = await getProfile(userId);
    return !profile?.onboarding_completed;
  } catch (error) {
    console.error('Error checking if new user:', error);
    return true; // Assume new user if error occurs
  }
};

export const hasActiveSubscription = async (userId: string) => {
  try {
    const subscription = await getSubscription(userId);
    if (!subscription) return true; // Allow access if no subscription record exists
    
    return (
      subscription.status === 'active' &&
      new Date(subscription.current_period_end) > new Date()
    );
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return true; // Allow access if error occurs
  }
};