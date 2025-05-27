import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { Brain, Target, Users, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-900 dark:to-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-emerald-900 dark:text-white mb-6">
            למה בכלל בנינו את BizMentorAI?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            מכירים את זה שאתם עובדים קשה, מביאים לקוחות, עושים הכול כמו שצריך – ובסוף החודש אתם שואלים את עצמכם:
            <br />
            "רגע… איך שוב נשארתי בלי שקל?"
            <br />
            "למה זה מרגיש כאילו אני תמיד רודף אחרי העסק במקום שהוא יעבוד בשבילי?"
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-emerald-900 dark:text-white mb-6">
              אז גם אנחנו היינו שם.
            </h2>
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                אנחנו לא קואוצ'רים, לא יועצים עם עניבות. אנחנו פשוט שני יזמים צעירים, שמנהלים עסקים אמיתיים – ונתקלים בדיוק באותם אתגרים:
              </p>
              <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-emerald-600" />
                  </div>
                  לפעמים אין לך מושג כמה כסף באמת נכנס ויוצא החודש
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-emerald-600" />
                  </div>
                  אתה לא יודע איפה להוציא פחות, או איך לתמחר נכון
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-emerald-600" />
                  </div>
                  אתה מגיב במקום ליזום – רק כי לא היה לך זמן לעצור ולחשב מסלול
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  אתה משלם על טעויות שניתן היה למנוע עם קצת סדר
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-emerald-900 dark:text-white mb-6">
              המשימה שלנו
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              לעזור לעסקים קטנים לנהל את הכסף שלהם בצורה חכמה, רגועה ומדויקת יותר.
              לא רק דוחות, לא רק מספרים – אלא תובנות אמיתיות, המלצות של AI, ולוח בקרה שאתה באמת מבין.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-white mb-4">
                המערכת שלנו מדברת פשוט:
              </h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li>כמה הכנסתי, כמה הוצאתי, כמה נשאר לי.</li>
                <li>מה צריך לשנות.</li>
                <li>ומה כדאי לעשות עכשיו.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;