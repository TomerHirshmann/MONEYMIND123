import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SidebarProps {
  items: {
    icon: LucideIcon;
    label: string;
    path: string;
  }[];
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ items, isCollapsed }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className={`flex flex-shrink-0 items-center px-4 py-5 ${isCollapsed ? 'justify-center' : ''}`}>
        {!isCollapsed && (
          <h1 className="text-xl font-semibold text-primary-600">{t('common.appName')}</h1>
        )}
      </div>
      <nav className="mt-5 flex-1 space-y-1 px-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/50 dark:text-primary-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-gray-200'
              }`
            }
          >
            <item.icon
              className={`h-5 w-5 flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`}
              aria-hidden="true"
            />
            {!isCollapsed && t(item.label)}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;