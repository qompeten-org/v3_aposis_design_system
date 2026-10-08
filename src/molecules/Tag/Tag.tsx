import React from 'react';
import { cn } from '../../utils/cn';

export type TagSize = 'large' | 'medium' | 'small' | 'extra-small';
export type TagColor = 'slate' | 'blue' | 'emerald' | 'amber' | 'rose';

export interface TagProps {
  children: React.ReactNode;
  size?: TagSize;
  color?: TagColor;
  icon?: React.ReactNode;
  onClose?: () => void;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Tag: React.FC<TagProps> = ({
  children,
  size = 'large',
  color = 'slate',
  icon,
  onClose,
  readOnly = true,
  disabled = false,
  className,
  onClick,
}) => {

  const sizeStyles: Record<TagSize, string> = {
    large: 'px-3 py-2 text-xs gap-2 h-8 rounded-full',
    medium: 'px-2.5 py-1.5 text-xs gap-1.5 h-7 rounded-full',
    small: 'px-2 py-1 text-[11px] gap-1 h-6 rounded-full',
    'extra-small': 'px-1.5 py-0.5 text-[10px] gap-1 h-5 rounded-full',
  };

  // Size Ikon
  const iconSizeStyles: Record<TagSize, string> = {
    large: 'w-4 h-4',
    medium: 'w-3.5 h-3.5',
    small: 'w-3 h-3',
    'extra-small': 'w-2.5 h-2.5',
  };

  const colorStyles: Record<TagColor, string> = {
    slate: 'bg-[#E2E8F0] dark:bg-slate-800 text-[#475569] dark:text-slate-200 border-[#CBD5E1] dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700',
    blue: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/80 hover:bg-blue-200 dark:hover:bg-blue-900/60',
    emerald: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-200 dark:hover:bg-emerald-900/60',
    amber: 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/80 hover:bg-amber-200 dark:hover:bg-amber-900/60',
    rose: 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/80 hover:bg-rose-200 dark:hover:bg-rose-900/60',
  };

  return (
    <div
      onClick={!disabled && !readOnly ? onClick : undefined}
      className={cn(
        'inline-flex items-center justify-center font-[#Lexend] font-semibold tracking-wider transition-all border border-transparent select-none',
        sizeStyles[size],
        colorStyles[color],
        disabled && 'opacity-50 cursor-not-allowed',
        !readOnly && !disabled && 'cursor-pointer active:scale-95',
        className
      )}
    >
      {/* Leading Icon */}
      {icon && <span className={cn('shrink-0 flex items-center justify-center', iconSizeStyles[size])}>{icon}</span>}

      {/* Label Text */}
      <span className="truncate">{children}</span>

      {/* Close Button (✕) */}
      {onClose && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="hover:bg-slate-400/20 rounded-full p-0.5 transition-colors focus:outline-none"
          aria-label="Remove tag"
        >
          <svg className={cn('stroke-current', iconSizeStyles[size])} fill="none" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export interface TagGroupProps {
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export const TagGroup: React.FC<TagGroupProps> = ({ label, children, className }) => {
  return (
    <div className={cn('flex flex-col gap-2 w-full', className)}>
      {label && <span className="text-xs font-normal text-[#475569] dark:text-white tracking-wide">{label}</span>}
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
};