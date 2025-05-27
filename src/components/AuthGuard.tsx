import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getProfile, hasActiveSubscription } from '../lib/supabase';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUserStatus = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        // Skip checks for auth callback
        if (location.pathname === '/auth/callback') {
          return;
        }

        const profile = await getProfile(user.id);
        
        // Handle missing profile
        if (!profile) {
          navigate('/auth');
          return;
        }

        // New user (onboarding not completed)
        if (!profile.onboarding_completed) {
          navigate('/auth');
          return;
        }

        // Check subscription only for protected routes
        const subscription = await hasActiveSubscription(user.id);
        if (!subscription && !location.pathname.includes('/pricing')) {
          navigate('/pricing');
          return;
        }
      } catch (error) {
        console.error('Error checking user status:', error);
        navigate('/auth');
      }
    };

    checkUserStatus();
  }, [user, navigate, location.pathname]);

  return <>{children}</>;
};

export default AuthGuard;