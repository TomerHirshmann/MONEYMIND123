import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, PieChart, ArrowUpRight, ArrowDownRight, DollarSign, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();

  // Mock data - will be replaced with real data from Firebase
  const mockData = {
    totalIncome: 15000,
    totalExpenses: 8500,
    profit: 6500,
    profitChange: 12.5,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{t('common.dashboard')}</h1>
        <p className="text-sm text-gray-600">
          {new Date().toLocaleDateString('he-IL', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <p className="text-gray-600">
        {t('dashboard.description')}
      </p>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-500">{t('dashboard.summary.totalIncome')}</p>
            <div className="bg-green-100 p-2 rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold mt-2">₪{mockData.totalIncome.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-2">+8.2% מהחודש שעבר</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-500">{t('dashboard.summary.totalExpenses')}</p>
            <div className="bg-red-100 p-2 rounded-lg">
              <ArrowDownRight className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold mt-2">₪{mockData.totalExpenses.toLocaleString()}</p>
          <p className="text-sm text-red-600 mt-2">+2.4% מהחודש שעבר</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-500">{t('dashboard.summary.netBalance')}</p>
            <div className="bg-blue-100 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold mt-2">₪{mockData.profit.toLocaleString()}</p>
          <p className="text-sm text-blue-600 mt-2">יתרה נוכחית</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-500">{t('dashboard.summary.monthlyProfit')}</p>
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-semibold mt-2">₪{mockData.profit.toLocaleString()}</p>
          <p className="text-sm text-purple-600 mt-2">+{mockData.profitChange}% מהחודש שעבר</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold">{t('dashboard.charts.profitLoss')}</h2>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart will be implemented with Recharts
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold">{t('dashboard.charts.expensesByCategory')}</h2>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Chart will be implemented with Recharts
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-sm p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">תובנה יומית</h2>
        <p className="mb-4">
          ההוצאות על פרסום גדלו ב-30% החודש. שקול לבחון את אפקטיביות קמפיין הפרסום הנוכחי.
        </p>
        <button className="text-sm bg-white/10 hover:bg-white/20 rounded-lg px-4 py-2 transition-colors">
          צפה בניתוח מלא
        </button>
      </div>
    </div>
  );
};

export default Dashboard;