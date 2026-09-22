import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'subtle'
  | 'danger'
  | 'danger-outline'
  | 'danger-subtle'
  | 'success';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  skeleton?: boolean;
  iconOnly?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      skeleton = false,
      iconOnly = false,
      leftIcon,
      rightIcon,
      disabled,
      fullWidth = false,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    // If skeleton mode is active, render skeleton placeholder matching button dimensions
    if (skeleton) {
      const skeletonSizes = {
        xs: iconOnly || !children ? 'w-7 h-7' : 'h-7 w-24',
        sm: iconOnly || !children ? 'w-8 h-8' : 'h-8 w-28',
        md: iconOnly || !children ? 'w-10 h-10' : 'h-10 w-32',
        lg: iconOnly || !children ? 'w-12 h-12' : 'h-12 w-40',
      };
      const skeletonRadius = {
        xs: 'rounded-md',
        sm: 'rounded-lg',
        md: 'rounded-xl',
        lg: 'rounded-xl',
      };
      return (
        <div
          aria-hidden="true"
          className={cn(
            'bg-slate-200/90 dark:bg-slate-700/80 animate-pulse pointer-events-none select-none shrink-0 inline-block',
            skeletonSizes[size],
            skeletonRadius[size],
            fullWidth && 'w-full',
            className
          )}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        />
      );
    }

    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed select-none active:scale-[0.98] shrink-0';

    const variants: Record<ButtonVariant, string> = {
      primary:
        'bg-aposis-blue-60 text-white hover:bg-aposis-blue-70 active:bg-aposis-blue-80 shadow-xs hover:shadow focus-visible:ring-aposis-blue-60 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 border border-transparent disabled:bg-aposis-blue-60/45 disabled:text-white/70 disabled:shadow-none',
      secondary:
        'bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-950 shadow-xs focus-visible:ring-slate-900 dark:focus-visible:ring-slate-400 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 border border-slate-900 dark:border-slate-800 disabled:bg-slate-900/40 disabled:text-white/60 disabled:border-transparent',
      outline:
        'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 active:bg-slate-100 hover:border-slate-400 focus-visible:ring-aposis-blue-60 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 shadow-xs disabled:border-slate-200 disabled:text-slate-400 disabled:bg-slate-50/50 dark:disabled:border-slate-800 dark:disabled:text-slate-600 dark:disabled:bg-slate-900/40',
      ghost:
        'text-slate-700 hover:bg-slate-100 active:bg-slate-200 focus-visible:ring-slate-400 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700 border border-transparent disabled:text-slate-400 dark:disabled:text-slate-600 disabled:hover:bg-transparent',
      subtle:
        'bg-blue-50 text-aposis-blue-70 hover:bg-blue-100 active:bg-blue-200 border border-transparent focus-visible:ring-aposis-blue-60 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 dark:bg-blue-950/40 dark:text-blue-300 dark:hover:bg-blue-950/70 disabled:bg-blue-50/40 disabled:text-blue-300 dark:disabled:bg-blue-950/20 dark:disabled:text-blue-500',
      danger:
        'bg-rose-600 text-white hover:bg-rose-700 active:bg-rose-800 shadow-xs hover:shadow focus-visible:ring-rose-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 border border-transparent disabled:bg-rose-600/45 disabled:text-white/70 disabled:shadow-none',
      'danger-outline':
        'border border-rose-300 bg-white text-rose-600 hover:bg-rose-50 active:bg-rose-100 hover:border-rose-400 focus-visible:ring-rose-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 dark:bg-slate-900 dark:border-rose-900/70 dark:text-rose-400 dark:hover:bg-rose-950/30 shadow-xs disabled:border-rose-200 disabled:text-rose-300 dark:disabled:border-rose-950 dark:disabled:text-rose-600',
      'danger-subtle':
        'bg-rose-50 text-rose-700 hover:bg-rose-100 active:bg-rose-200 border border-transparent focus-visible:ring-rose-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-950/70 disabled:bg-rose-50/40 disabled:text-rose-300 dark:disabled:bg-rose-950/20',
      success:
        'bg-emerald-600 text-white hover:bg-emerald-700 active:bg-emerald-800 shadow-xs hover:shadow focus-visible:ring-emerald-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 border border-transparent disabled:bg-emerald-600/45 disabled:text-white/70 disabled:shadow-none',
    };

    const isIconOnly = iconOnly || (!children && (leftIcon || rightIcon || isLoading));

    // Standard button padding and sizing
    const standardSizes: Record<ButtonSize, string> = {
      xs: 'text-xs h-7 px-2.5 rounded-md gap-1.5',
      sm: 'text-xs h-8 px-3 rounded-lg gap-1.5',
      md: 'text-sm h-10 px-4 rounded-xl gap-2',
      lg: 'text-base h-12 px-5 rounded-xl gap-2.5',
    };

    // Square icon-only button sizing
    const iconOnlySizes: Record<ButtonSize, string> = {
      xs: 'w-7 h-7 p-0 rounded-md',
      sm: 'w-8 h-8 p-0 rounded-lg',
      md: 'w-10 h-10 p-0 rounded-xl',
      lg: 'w-12 h-12 p-0 rounded-xl',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          isIconOnly ? iconOnlySizes[size] : standardSizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && (
          <Loader2
            className={cn(
              'animate-spin text-current shrink-0',
              size === 'xs' ? 'w-3.5 h-3.5' : size === 'sm' ? 'w-4 h-4' : 'w-4.5 h-4.5'
            )}
          />
        )}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0 items-center justify-center">{leftIcon}</span>}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && <span className="inline-flex shrink-0 items-center justify-center">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
