import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, BarChart, TrendingUp, TrendingDown, AlertTriangle, RefreshCw, Filter } from 'lucide-react';

interface Insight {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'danger';
  category: string;
  date: string;
}

const Insights: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const insights: Insight[] = [
    {
      id: '1',
      message: 'ההוצאה שלך על פרסום עלתה ב־42% ביחס לשבוע שעבר.',
      type: 'warning',
      category: 'advertising',
      date: new Date().toISOString()
    },
    {
      id: '2',
      message: 'הכנסותיך ירדו ב־18% לעומת חודש קודם – שקול קמפיין חיזוק.',
      type: 'danger',
      category: 'income',
      date: new Date().toISOString()
    },
    {
      id: '3',
      message: 'אתה משקיע יותר מדי בתוכנות – שווה לבדוק עלויות מיותרות.',
      type: 'warning',
      category: 'software',
      date: new Date().toISOString()
    }
  ];

  const categories = [
    { id: 'all', name: 'הכל' },
    { id: 'advertising', name: 'פרסום' },
    { id: 'income', name: 'הכנסות' },
    { id: 'software', name: 'תוכנות' }
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success':
        return TrendingUp;
      case 'warning':
        return AlertTriangle;
      case 'danger':
        return TrendingDown;
      default:
        return TrendingUp;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-success-500 bg-success-50 dark:bg-success-900/20';
      case 'warning':
        return 'text-warning-500 bg-warning-50 dark:bg-warning-900/20';
      case 'danger':
        return 'text-error-500 bg-error-50 dark:bg-error-900/20';
      default:
        return 'text-primary-500 bg-primary-50 dark:bg-primary-900/20';
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const filteredInsights = selectedCategory === 'all'
    ? insights
    : insights.filter(insight => insight.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">תובנות חכמות</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            תובנות AI מותאמות אישית לעסק שלך, מתעדכנות בכל יום
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="btn-secondary flex items-center gap-2"
          disabled={loading}
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          רענן תובנות
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm">
          <Filter className="w-4 h-4 text-gray-400" />
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-md text-sm transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInsights.map(insight => {
          const Icon = getInsightIcon(insight.type);
          const colorClass = getInsightColor(insight.type);

          return (
            <div key={insight.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${colorClass}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white">{insight.message}</p>
                  <div className="mt-4 flex items-center gap-4">
                    {insight.type !== 'success' && (
                      <button className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        קבל המלצות לשיפור
                      </button>
                    )}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(insight.date).toLocaleDateString('he-IL')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 h-32 bg-gray-50 dark:bg-gray-900/50 rounded-lg flex items-center justify-center">
                {insight.type === 'warning' ? (
                  <BarChart className="w-6 h-6 text-gray-400" />
                ) : (
                  <LineChart className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Insights;