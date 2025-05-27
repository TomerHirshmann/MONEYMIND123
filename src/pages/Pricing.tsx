import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Check, ArrowRight, Target, Brain, FileText, Users, Phone, MessageSquare } from 'lucide-react';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const plans = [
    {
      name: 'Pro',
      price: '59',
      description: 'לבעלי עסקים שרוצים לצמוח',
      features: [
        'מערכת יעדים',
        'תובנות AI מתקדמות',
        'גרפים ודו"חות',
        'קובץ ייצוא אקסל',
        'תמיכה בוואטסאפ'
      ],
      icon: Target,
      color: 'emerald'
    },
    {
      name: 'Business',
      price: '129',
      description: 'לעסקים שרוצים ליווי מקצועי צמוד',
      features: [
        'כל מה שב-Pro +',
        'דוח עסקי מותאם אישית',
        'פגישת ייעוץ חודשית',
        'תמיכה טלפונית',
        'מערכת למעקב עובדים'
      ],
      icon: Brain,
      color: 'emerald',
      popular: true
    }
  ];

  const handleGetStarted = (plan: string) => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900 dark:to-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 dark:text-white mb-6">
            בחר את המסלול שמתאים לעסק שלך
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            התחל עכשיו – תוכל לשדרג בכל רגע
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 ${
                  plan.popular ? 'ring-2 ring-emerald-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 right-8 bg-emerald-500 text-white px-4 py-1 rounded-full text-sm">
                    הכי פופולרי
                  </div>
                )}

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {plan.description}
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                    <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-emerald-900 dark:text-white">
                      ₪{plan.price}
                    </span>
                    <span className="mr-2 text-gray-600 dark:text-gray-400">/ חודש</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleGetStarted(plan.name)}
                  className={`w-full py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors ${
                    plan.popular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-700 dark:bg-emerald-900/50 dark:hover:bg-emerald-900/70 dark:text-emerald-300'
                  }`}
                >
                  התחל עכשיו
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-white text-center mb-12">
            כל התכונות המתקדמות במקום אחד
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: 'דוחות מתקדמים',
                description: 'דוחות מפורטים ומותאמים אישית לעסק שלך'
              },
              {
                icon: Brain,
                title: 'תובנות AI',
                description: 'קבל המלצות חכמות לשיפור הביצועים העסקיים'
              },
              {
                icon: Target,
                title: 'מעקב יעדים',
                description: 'הגדר יעדים ועקוב אחר ההתקדמות שלך'
              },
              {
                icon: Users,
                title: 'ניהול צוות',
                description: 'נהל את העובדים והמשימות במקום אחד'
              },
              {
                icon: Phone,
                title: 'תמיכה אישית',
                description: 'תמיכה טלפונית ופגישות ייעוץ חודשיות'
              },
              {
                icon: MessageSquare,
                title: 'תמיכה בוואטסאפ',
                description: 'קבל מענה מהיר לכל שאלה דרך וואטסאפ'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl w-fit mb-4">
                    <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-900 dark:text-white mb-2">
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
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Pricing;