import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export type LinkVariant = 'default' | 'underlined';
export type LinkSize = 'sm' | 'md' | 'lg';
export type LinkArrow = 'left' | 'right' | 'none';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Target URL or route destination */
  to?: string;
  /** Visual presentation style */
  variant?: LinkVariant;
  /** Text and icon sizing scale */
  size?: LinkSize;
  /** Arrow direction helper */
  arrow?: LinkArrow;
  /** Custom leading icon slot */
  leftIcon?: React.ReactNode;
  /** Custom trailing icon slot */
  rightIcon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      to,
      href,
      variant = 'default',
      size = 'md',
      arrow = 'none',
      leftIcon,
      rightIcon,
      disabled = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const targetHref = disabled ? undefined : to || href;

    const baseStyles =
      'group inline-flex items-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm cursor-pointer select-none';

    // Standard base Tailwind font sizes and spacing
    const sizeStyles: Record<LinkSize, string> = {
      sm: 'text-xs gap-1.5',
      md: 'text-sm gap-2',
      lg: 'text-base gap-2.5',
    };

    const iconSizeStyles: Record<LinkSize, string> = {
      sm: 'w-3.5 h-3.5',
      md: 'w-4 h-4',
      lg: 'w-4.5 h-4.5',
    };

    // Default link color is blue, overrideable via className
    const defaultColorStyles =
      'text-blue-600 hover:text-blue-700 active:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 focus-visible:ring-blue-600';

    const variantStyles: Record<LinkVariant, string> = {
      default: 'no-underline hover:underline underline-offset-4 decoration-current/60',
      underlined: 'underline underline-offset-4 decoration-current hover:decoration-2',
    };

    const disabledStyles = 'opacity-40 cursor-not-allowed pointer-events-none no-underline';

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    };

    const renderLeftArrow = arrow === 'left' && (
      <ArrowLeft
        className={cn(
          iconSizeStyles[size],
          'shrink-0 transition-transform duration-150 group-hover:-translate-x-0.5'
        )}
        aria-hidden="true"
      />
    );

    const renderRightArrow = arrow === 'right' && (
      <ArrowRight
        className={cn(
          iconSizeStyles[size],
          'shrink-0 transition-transform duration-150 group-hover:translate-x-0.5'
        )}
        aria-hidden="true"
      />
    );

    return (
      <a
        ref={ref}
        href={targetHref}
        onClick={handleClick}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : props.tabIndex}
        className={cn(
          baseStyles,
          sizeStyles[size],
          defaultColorStyles,
          variantStyles[variant],
          disabled && disabledStyles,
          className
        )}
        {...props}
      >
        {leftIcon}
        {renderLeftArrow}
        <span>{children}</span>
        {renderRightArrow}
        {rightIcon}
      </a>
    );
  }
);

Link.displayName = 'Link';
