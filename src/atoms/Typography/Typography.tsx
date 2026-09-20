import React from 'react';
import { cn } from '../../utils/cn';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h2',
  size,
  className,
  children,
  ...props
}) => {
  const defaultSizeMap = {
    h1: 'text-3xl lg:text-4xl font-extrabold tracking-tight',
    h2: 'text-2xl lg:text-3xl font-bold tracking-tight',
    h3: 'text-xl lg:text-2xl font-bold',
    h4: 'text-lg lg:text-xl font-semibold',
    h5: 'text-base font-semibold',
    h6: 'text-sm font-semibold uppercase tracking-wider',
  };

  const explicitSizes = {
    xs: 'text-xs font-semibold uppercase tracking-wider',
    sm: 'text-sm font-semibold',
    md: 'text-base font-semibold',
    lg: 'text-lg lg:text-xl font-bold',
    xl: 'text-xl lg:text-2xl font-bold',
    '2xl': 'text-2xl lg:text-3xl font-extrabold tracking-tight',
    '3xl': 'text-3xl lg:text-4xl font-extrabold tracking-tight',
  };

  return (
    <Component
      className={cn(
        'text-slate-900',
        size ? explicitSizes[size] : defaultSizeMap[Component],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'label';
  variant?: 'lead' | 'body' | 'small' | 'caption' | 'muted';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  variant = 'body',
  weight = 'normal',
  className,
  children,
  ...props
}) => {
  const variants = {
    lead: 'text-lg text-slate-700 leading-relaxed',
    body: 'text-sm text-slate-600 leading-normal',
    small: 'text-xs text-slate-600',
    caption: 'text-[11px] text-slate-500 tracking-wide',
    muted: 'text-sm text-slate-400',
  };

  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <Component
      className={cn(variants[variant], weights[weight], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
