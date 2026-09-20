import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  variant?: 'underline' | 'pills';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onChange,
  variant = 'underline',
  className,
}) => {
  if (variant === 'pills') {
    return (
      <div
        className={cn(
          'inline-flex items-center p-1 bg-slate-100 rounded-xl gap-1',
          className
        )}
      >
        {items.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={tab.disabled}
              onClick={() => onChange(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 select-none',
                isActive
                  ? 'bg-white text-aposis-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60',
                tab.disabled && 'opacity-40 cursor-not-allowed'
              )}
            >
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center border-b border-slate-200 gap-6',
        className
      )}
    >
      {items.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative inline-flex items-center gap-2 pb-3 pt-1 text-sm font-medium transition-colors select-none',
              isActive
                ? 'text-aposis-600 font-semibold'
                : 'text-slate-500 hover:text-slate-800',
              tab.disabled && 'opacity-40 cursor-not-allowed'
            )}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge}
            {isActive && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-aposis-600 rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

Tabs.displayName = 'Tabs';
