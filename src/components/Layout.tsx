import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { LayoutGrid, Receipt, LineChart, Target, Settings, MessageSquare, ArrowUpRight, ArrowDownRight, ChevronRight, ChevronLeft } from 'lucide-react';

const Layout: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'he';
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const navigationItems = [
    { icon: LayoutGrid, label: 'common.dashboard', path: '/' },
    { icon: ArrowUpRight, label: 'common.income', path: '/income' },
    { icon: ArrowDownRight, label: 'common.expenses', path: '/expenses' },
    { icon: Receipt, label: 'common.transactions', path: '/transactions' },
    { icon: LineChart, label: 'common.insights', path: '/insights' },
    { icon: Target, label: 'common.goals', path: '/goals' },
    { icon: MessageSquare, label: 'common.aiChat', path: '/ai-chat' },
    { icon: Settings, label: 'common.settings', path: '/settings' }
  ];

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className={`fixed inset-y-0 flex transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <Sidebar items={navigationItems} isCollapsed={isSidebarCollapsed} />
        <button
          onClick={toggleSidebar}
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {isRTL ? (
            isSidebarCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
          ) : (
            isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'} min-h-screen`}>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;