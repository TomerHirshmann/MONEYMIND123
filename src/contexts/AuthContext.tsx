import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthError = (error: any): string => {
    console.error('Auth error details:', error);

    // Map common error messages to user-friendly Hebrew messages
    const errorMessages: Record<string, string> = {
      'Invalid login credentials': 'פרטי ההתחברות שגויים',
      'Email not confirmed': 'האימייל טרם אומת',
      'User already registered': 'משתמש זה כבר רשום במערכת',
      'Invalid email': 'כתובת האימייל אינה תקינה',
      'Incorrect password': 'הסיסמה שגויה',
      'Email already in use': 'כתובת האימייל כבר בשימוש',
      'Password is too weak': 'הסיסמה חלשה מדי',
      'Network request failed': 'בעיית תקשורת. אנא בדוק את החיבור לאינטרנט',
    };

    const message = error?.message || 'Unknown error';
    return errorMessages[message] || 'אירעה שגיאה. אנא נסה שוב';
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(handleAuthError(error));
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(handleAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            created_at: new Date().toISOString(),
            last_sign_in_at: new Date().toISOString()
          }
        }
      });

      if (error) {
        throw new Error(handleAuthError(error));
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(handleAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        }
      });

      if (error) {
        throw new Error(handleAuthError(error));
      }

      // If we have a provider token, the sign-in was successful
      if (data?.provider) {
        navigate('/auth/callback');
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw new Error('אירעה שגיאה בהתחברות עם Google. אנא נסה שוב');
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw new Error(handleAuthError(error));
      }
      
      navigate('/');
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error('אירעה שגיאה בהתנתקות. אנא נסה שוב');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}