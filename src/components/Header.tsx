import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navItems = [
    { path: '/', label: 'יתרונות' },
    { path: '/about', label: 'עלינו' },
    { path: '/pricing', label: 'מחירים' },
    { path: '/blog', label: 'כלים עסקיים' },
    { path: '/how-it-works', label: 'איך זה עובד' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-emerald-600">
              BizMentorAI
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-base font-medium text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400"
                >
                  דשבורד
                </Link>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  התנתק
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAuthClick}
                  className="text-base font-medium text-gray-600 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  התחברות
                </button>
                <button
                  onClick={handleAuthClick}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                >
                  התחל עכשיו
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;