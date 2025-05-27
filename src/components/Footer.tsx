import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-white mb-4">
              BizMentorAI
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              המערכת המקצועית לניהול פיננסי חכם לעסקים קטנים
            </p>
            <div className="space-y-2">
              <a href="mailto:support@bizmentor.ai" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600">
                <Mail className="w-4 h-4 ml-2" />
                support@bizmentor.ai
              </a>
              <a href="tel:+972-3-000-0000" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600">
                <Phone className="w-4 h-4 ml-2" />
                03-000-0000
              </a>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 ml-2" />
                תל אביב, ישראל
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-white mb-4">
              ניווט מהיר
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600">
                  עלינו
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600">
                  מחירים
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600">
                  כלים עסקיים
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600">
                  איך זה עובד
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-white mb-4">
              מידע משפטי
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600">
                  תנאי שימוש
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600">
                  מדיניות פרטיות
                </Link>
              </li>
              <li>
                <Link to="/cancellation" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600">
                  מדיניות ביטולים
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-white mb-4">
              צור קשר
            </h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="אימייל"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <textarea
                placeholder="הודעה"
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                שלח
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} BizMentorAI. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;