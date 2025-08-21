import React from 'react';
import { Link, navigate } from 'gatsby';

interface Tab {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, className = '' }) => {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.href}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              tab.id === activeTab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            aria-current={tab.id === activeTab ? 'page' : undefined}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;