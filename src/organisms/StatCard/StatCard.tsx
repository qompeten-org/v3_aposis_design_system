import React from 'react';
import { cn } from '../../utils/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    trend: 'up' | 'down' | 'neutral';
    label?: string;
  };
  icon?: React.ReactNode;
  iconBg?: string;
  subtitle?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  iconBg = 'bg-aposis-50 dark:bg-blue-950/50 text-aposis-blue-60 dark:text-blue-400',
  subtitle,
  className,
  id,
  ...props
}) => {
  return (
    <div
      id={id}
      className={cn(
        'p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between',
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {title}
          </span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1 tracking-tight">
            {value}
          </div>
        </div>
        {icon && (
          <div
            className={cn(
              'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800',
              iconBg
            )}
          >
            {icon}
          </div>
        )}
      </div>

      {(change || subtitle) && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          {change && (
            <div className="flex items-center gap-1.5 font-medium">
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md font-semibold text-[11px]',
                  change.trend === 'up'
                    ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/40'
                    : change.trend === 'down'
                    ? 'text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/40'
                    : 'text-slate-600 bg-slate-100 dark:text-slate-300 dark:bg-slate-800'
                )}
              >
                {change.trend === 'up' && <TrendingUp className="w-3 h-3 stroke-[2.5]" />}
                {change.trend === 'down' && <TrendingDown className="w-3 h-3 stroke-[2.5]" />}
                {change.value}
              </span>
              {change.label && <span className="text-slate-500 dark:text-slate-400">{change.label}</span>}
            </div>
          )}
          {subtitle && <span className="text-slate-400 dark:text-slate-500 ml-auto">{subtitle}</span>}
        </div>
      )}
    </div>
  );
};

StatCard.displayName = 'StatCard';
