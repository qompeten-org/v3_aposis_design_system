import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export const mockTabsItems: TabItem[] = [
  { id: 'tab1', label: 'Ringkasan' },
  { id: 'tab2', label: 'Detail Nilai' },
  { id: 'tab3', label: 'Pengaturan' },
];

export interface TabsProps {
  id?: string;
  items?: TabItem[];
  activeTab?: string;
  onChange?: (id: string) => void;
  variant?: 'underline' | 'pills';
  className?: string;
  children?: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  id,
  items = mockTabsItems,
  activeTab = items[0]?.id || '',
  onChange,
  variant = 'underline',
  className,
  children,
}) => {
  if (variant === 'pills') {
    return (
      <div id={id} className="inline-flex flex-col gap-3">
        <div
          className={cn(
            'inline-flex items-center p-1 bg-slate-100 dark:bg-slate-900/80 border border-transparent dark:border-slate-800 rounded-xl gap-1',
            className
          )}
        >
          {items.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                id={id ? `${id}-tab-${tab.id}` : undefined}
                key={tab.id}
                type="button"
                disabled={tab.disabled}
                onClick={() => onChange?.(tab.id)}
                className={cn(
                  'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 select-none',
                  isActive
                    ? 'bg-white text-aposis-700 shadow-xs dark:bg-blue-600 dark:text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800',
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
        {children && <div>{children}</div>}
      </div>
    );
  }

  return (
    <div id={id} className="flex flex-col gap-3 w-full">
      <div
        className={cn(
          'flex items-center border-b border-slate-200 dark:border-slate-800 gap-6',
          className
        )}
      >
        {items.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              id={id ? `${id}-tab-${tab.id}` : undefined}
              key={tab.id}
              type="button"
              disabled={tab.disabled}
              onClick={() => onChange?.(tab.id)}
              className={cn(
                'relative inline-flex items-center gap-2 pb-3 pt-1 text-sm font-medium transition-colors select-none',
                isActive
                  ? 'text-aposis-600 dark:text-blue-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white',
                tab.disabled && 'opacity-40 cursor-not-allowed'
              )}
            >
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge}
              {isActive && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-aposis-600 dark:bg-blue-500 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

Tabs.displayName = 'Tabs';
