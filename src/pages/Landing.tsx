import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { 
  ArrowRight, Brain, Target, LineChart, 
  PieChart, CheckCircle, AlertCircle, Zap,
  DollarSign, TrendingUp, Users
} from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const painPoints = [
    {
      icon: AlertCircle,
      text: "נמאס לך לסיים כל חודש בתחושת תסכול?"
    },
    {
      icon: AlertCircle,
      text: "העסק שלך מכניס, אבל אתה לא רואה מזה שקל?"
    },
    {
      icon: AlertCircle,
      text: "הגיע הזמן לשים סוף לבלגן הכלכלי שלך."
    }
  ];

  const commonProblems = [
    {
      icon: DollarSign,
      text: "אתה לא באמת יודע כמה אתה מרוויח?"
    },
    {
      icon: TrendingUp,
      text: "ההוצאות גדולות ואתה מגלה את זה רק בסוף החודש?"
    },
    {
      icon: Users,
      text: "כל חודש נראה אותו דבר ואתה שוקל לוותר?"
    }
  ];

  const benefits = [
    {
      icon: LineChart,
      title: "תדע בדיוק מה מצב העסק שלך",
      description: "בכל רגע נתון, בלחיצת כפתור"
    },
    {
      icon: Brain,
      title: "תקבל תובנות בזמן אמת",
      description: "בלי צורך ברואה חשבון"
    },
    {
      icon: Target,
      title: "תחסוך שעות של מעקב ידני",
      description: "המערכת עושה הכל בשבילך"
    },
    {
      icon: PieChart,
      title: "תקבל החלטות מבוססות נתונים",
      description: "עם המלצות AI חכמות"
    }
  ];

  const features = [
    {
      icon: LineChart,
      title: "לוח הכנסות/הוצאות",
      description: "מעקב פשוט ונוח אחר כל התנועות הכספיות"
    },
    {
      icon: PieChart,
      title: "דוחות רווחיות אוטומטיים",
      description: "קבל תמונת מצב מלאה בכל רגע"
    },
    {
      icon: Target,
      title: "מטרות חודשיות",
      description: "הגדר יעדים ועקוב אחר ההתקדמות"
    },
    {
      icon: Brain,
      title: "משימות כלכליות חכמות",
      description: "המלצות AI מותאמות אישית"
    }
  ];

  const testimonials = [
    {
      name: "תמר",
      role: "בעלת קליניקה",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      quote: "סוף סוף אני שולטת בהכנסות שלי"
    },
    {
      name: "רן",
      role: "עצמאי",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      quote: "אני לא צריך אקסלים – זה פשוט"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900 dark:to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Pain Points */}
            <div className="mb-12">
              {painPoints.map((point, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-center gap-3 mb-4 text-xl md:text-2xl text-gray-700 dark:text-gray-300"
                >
                  <point.icon className="w-6 h-6 text-error-500" />
                  <p>{point.text}</p>
                </div>
              ))}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl font-bold mb-8">
              <span className="text-emerald-900 dark:text-white">
                הדרך החדשה לנהל את הכסף שלך
              </span>
              <br />
              <span className="text-emerald-600">
                בלי כאב ראש
              </span>
            </h1>

            {/* Sub Headline */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
              אתה לא צריך להיות רואה חשבון כדי לדעת אם העסק שלך מרוויח.
              <br />
              בוא תנהל את הכסף שלך כמו מקצוען, ב-5 דקות ביום בלבד.
            </p>

            {/* CTA Button */}
            <div className="space-y-4">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl animate-pulse-slow"
              >
                בוא נעשה סדר בכסף שלך
                <ArrowRight className="mr-2 w-5 h-5" />
              </button>
              <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                שבוע ראשון חינם, בלי התחייבות
              </p>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 py-8 border-t border-gray-200 dark:border-gray-800">
              <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-emerald-500" />
                מאובטח, פרטי, ונבדק ע"י מאות בעלי עסקים בישראל
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Common Problems Section */}
      <div className="bg-white dark:bg-gray-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 dark:text-white mb-8">
              מכירים את זה ש...
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {commonProblems.map((problem, index) => (
                <div key={index} className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6">
                  <div className="flex items-center justify-center gap-3 text-xl text-gray-700 dark:text-gray-300">
                    <problem.icon className="w-6 h-6 text-emerald-500" />
                    <p>{problem.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 dark:text-white mb-8">
              הפתרון המושלם לניהול הכסף שלך
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                      <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-right">
                      <h3 className="font-semibold text-emerald-900 dark:text-white mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 dark:text-white mb-8">
              מה יש בפנים?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center">
                    <div className="inline-flex p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl mb-4">
                      <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-emerald-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 dark:text-white mb-8">
              מה הלקוחות שלנו אומרים
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-emerald-900 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">
                    "{testimonial.quote}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 dark:text-white mb-8">
            מוכן להתחיל?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            הצטרף למאות העסקים שכבר משתמשים במערכת
          </p>
          <button
            onClick={handleGetStarted}
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
          >
            התחל עכשיו
            <ArrowRight className="mr-2 w-5 h-5" />
          </button>
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Landing;