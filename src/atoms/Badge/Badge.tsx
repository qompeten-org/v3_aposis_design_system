import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
  appearance?: 'subtle' | 'solid' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'primary',
  appearance = 'subtle',
  size = 'md',
  dot = false,
  ...props
}) => {
  const styles = {
    primary: {
      subtle: 'bg-sky-50 text-sky-700 border-sky-200',
      solid: 'bg-aposis-600 text-white border-transparent',
      outline: 'border-sky-300 text-sky-700 bg-transparent',
      dotColor: 'bg-sky-500',
    },
    secondary: {
      subtle: 'bg-slate-100 text-slate-700 border-slate-200',
      solid: 'bg-slate-700 text-white border-transparent',
      outline: 'border-slate-300 text-slate-700 bg-transparent',
      dotColor: 'bg-slate-500',
    },
    success: {
      subtle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      solid: 'bg-emerald-600 text-white border-transparent',
      outline: 'border-emerald-300 text-emerald-700 bg-transparent',
      dotColor: 'bg-emerald-500',
    },
    warning: {
      subtle: 'bg-amber-50 text-amber-800 border-amber-200',
      solid: 'bg-amber-500 text-white border-transparent',
      outline: 'border-amber-300 text-amber-800 bg-transparent',
      dotColor: 'bg-amber-500',
    },
    danger: {
      subtle: 'bg-rose-50 text-rose-700 border-rose-200',
      solid: 'bg-rose-600 text-white border-transparent',
      outline: 'border-rose-300 text-rose-700 bg-transparent',
      dotColor: 'bg-rose-500',
    },
    neutral: {
      subtle: 'bg-slate-50 text-slate-600 border-slate-200',
      solid: 'bg-slate-800 text-white border-transparent',
      outline: 'border-slate-200 text-slate-600 bg-transparent',
      dotColor: 'bg-slate-400',
    },
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 rounded-md gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 rounded-lg gap-1.5 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center border transition-colors',
        styles[variant][appearance],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full shrink-0',
            appearance === 'solid' ? 'bg-white' : styles[variant].dotColor
          )}
        />
      )}
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
