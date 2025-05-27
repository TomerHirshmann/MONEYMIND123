import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { ArrowRight, CheckCircle, Clock, Brain, LineChart, MessageSquare } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: CheckCircle,
      title: 'נרשמים בקליק אחד',
      description: 'תהליך הרשמה פשוט ומהיר, אפשר גם עם חשבון גוגל'
    },
    {
      icon: Brain,
      title: 'מגדירים מטרות חודשיות',
      description: 'מה אתה רוצה להרוויח ואיך נגיע לשם'
    },
    {
      icon: Clock,
      title: 'מוסיפים הכנסות והוצאות',
      description: 'לוקח פחות מדקה, עם ממשק פשוט ונוח'
    },
    {
      icon: LineChart,
      title: 'המערכת מנתחת ומציעה פעולות',
      description: 'תובנות AI חכמות שיעזרו לך לקבל החלטות נכונות'
    },
    {
      icon: MessageSquare,
      title: 'מקבלים דוח חכם לוואטסאפ',
      description: 'כל שבוע וחודש – ישירות לנייד שלך'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900 dark:to-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 dark:text-white mb-6">
            איך זה עובד?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            תוך פחות מ-5 דקות ביום אתה יודע בדיוק מה קורה בעסק שלך
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          <div className="absolute top-0 bottom-0 right-12 w-0.5 bg-emerald-200 dark:bg-emerald-800" />
          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative flex items-start gap-8">
                  <div className="absolute right-10 -translate-x-1/2 w-6 h-6 rounded-full bg-emerald-600 border-4 border-emerald-100 dark:border-emerald-900" />
                  <div className="mr-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow w-full">
                    <div className="flex items-start gap-6">
                      <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                        <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-emerald-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-white mb-4">
            מוכנים להתחיל?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            הצטרפו למאות העסקים שכבר משתמשים במערכת
          </p>
          <button className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
            התחל עכשיו
            <ArrowRight className="mr-2 w-5 h-5" />
          </button>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default HowItWorks;