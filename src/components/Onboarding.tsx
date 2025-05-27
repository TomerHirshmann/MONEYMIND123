import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile } from '../lib/supabase';
import { Brain, Target, LineChart, CheckCircle } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    businessIndustry: '',
    avgMonthlyIncome: '',
    fullName: ''
  });

  const handleNext = async () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      if (user) {
        try {
          await updateProfile(user.id, {
            ...formData,
            onboarding_step: 3, // Completed
            onboarding_completed: true
          });
          onComplete();
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      }
    }
  };

  const renderWelcome = () => (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        ברוך הבא למערכת שמנהלת את העסק שלך חכם יותר
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        בוא נבין איך העסק שלך נראה ונעזור לך לבנות תכנית חכמה
      </p>
      <button
        onClick={handleNext}
        className="btn-primary px-8 py-4 text-lg"
      >
        בוא נתחיל
      </button>
    </div>
  );

  const renderQuestionnaire = () => (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        ספר לנו קצת על העסק שלך
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            השם שלך
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="input"
            placeholder="השם המלא שלך"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            שם העסק
          </label>
          <input
            type="text"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            className="input"
            placeholder="שם העסק שלך"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            תחום העסק
          </label>
          <select
            value={formData.businessIndustry}
            onChange={(e) => setFormData({ ...formData, businessIndustry: e.target.value })}
            className="input"
          >
            <option value="">בחר תחום</option>
            <option value="tech">טכנולוגיה</option>
            <option value="consulting">ייעוץ</option>
            <option value="marketing">שיווק</option>
            <option value="retail">קמעונאות</option>
            <option value="services">שירותים</option>
            <option value="other">אחר</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            הכנסה חודשית ממוצעת
          </label>
          <select
            value={formData.avgMonthlyIncome}
            onChange={(e) => setFormData({ ...formData, avgMonthlyIncome: e.target.value })}
            className="input"
          >
            <option value="">בחר טווח</option>
            <option value="0-5000">עד 5,000 ₪</option>
            <option value="5000-10000">5,000 - 10,000 ₪</option>
            <option value="10000-20000">10,000 - 20,000 ₪</option>
            <option value="20000-50000">20,000 - 50,000 ₪</option>
            <option value="50000+">מעל 50,000 ₪</option>
          </select>
        </div>

        <button
          onClick={handleNext}
          className="btn-primary w-full"
        >
          המשך
        </button>
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        מה תקבל במערכת?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <Target className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              לוח יעדים חכם
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            הגדר יעדים חודשיים ועקוב אחר ההתקדמות שלך
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <LineChart className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              ניתוח הכנסות והוצאות
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            קבל תמונה ברורה של המצב הפיננסי שלך
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <Brain className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              תובנות AI
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            קבל המלצות חכמות לשיפור הביצועים העסקיים
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
              <CheckCircle className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              תזכורות ומעקב
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            קבל תזכורות חכמות ועדכונים על המצב העסקי
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleNext}
          className="btn-primary px-8 py-4 text-lg"
        >
          התחל להשתמש במערכת
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {step === 0 && renderWelcome()}
        {step === 1 && renderQuestionnaire()}
        {step === 2 && renderFeatures()}
      </div>
    </div>
  );
};

export default Onboarding