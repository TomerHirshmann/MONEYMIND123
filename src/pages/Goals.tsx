import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Target, DollarSign, PiggyBank, Megaphone, AlertCircle, CheckCircle } from 'lucide-react';

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  type: 'salary' | 'savings' | 'advertising';
}

const Goals: React.FC = () => {
  const { t } = useTranslation();
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', name: 'משכורת חודשית', target: 8000, current: 6000, type: 'salary' },
    { id: '2', name: 'חיסכון', target: 2000, current: 1500, type: 'savings' },
    { id: '3', name: 'תקציב פרסום', target: 1200, current: 800, type: 'advertising' }
  ]);

  const getProgressColor = (current: number, target: number) => {
    const progress = (current / target) * 100;
    if (progress >= 100) return 'bg-success-500';
    if (progress >= 75) return 'bg-warning-500';
    return 'bg-primary-500';
  };

  const getStatusMessage = (current: number, target: number) => {
    const progress = (current / target) * 100;
    if (progress >= 100) return 'הכל תקין';
    if (progress >= 75) return 'אתה קרוב לחריגה';
    return 'חריגה בתקציב – בדוק מחדש';
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'salary':
        return DollarSign;
      case 'savings':
        return PiggyBank;
      case 'advertising':
        return Megaphone;
      default:
        return Target;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">היעדים שלך לחודש</h1>
        <button className="btn-primary flex items-center gap-2">
          <Target className="w-5 h-5" />
          הוסף יעד חדש
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const Icon = getIcon(goal.type);
          const progressColor = getProgressColor(goal.current, goal.target);
          const progress = (goal.current / goal.target) * 100;
          const statusMessage = getStatusMessage(goal.current, goal.target);

          return (
            <div key={goal.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{goal.name}</h3>
                </div>
                <button className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">התקדמות</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ₪{goal.current.toLocaleString()} / ₪{goal.target.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${progressColor} transition-all duration-500`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                {progress >= 100 ? (
                  <CheckCircle className="w-4 h-4 text-success-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-warning-500" />
                )}
                <span className={`${progress >= 100 ? 'text-success-600' : 'text-warning-600'}`}>
                  {statusMessage}
                </span>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                {progress < 100 && `נותרו ₪${(goal.target - goal.current).toLocaleString()} להשגת היעד`}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">המלצת המערכת</h2>
        <p className="mb-4">
          כדי להגיע ליעד המשכורת שלך, אתה צריך להרוויח עוד ₪2,100 החודש.
        </p>
        <button className="bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 text-sm transition-colors">
          קבל תוכנית פעולה
        </button>
      </div>
    </div>
  );
};

export default Goals;