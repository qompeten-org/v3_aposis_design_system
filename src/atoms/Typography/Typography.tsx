import React from 'react';
import { cn } from '../../utils/cn';

export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'title'
  | 'body-lg'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'overline';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
  variant?: 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'title';
}

export const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h2',
  variant,
  className,
  children,
  ...props
}) => {
  const variantMap = {
    display: 'text-[36px] md:text-[60px] font-light leading-[1.1] tracking-[-0.02em]',
    h1: 'text-[30px] md:text-[48px] font-medium leading-[1.15] tracking-[-0.02em]',
    h2: 'text-[24px] md:text-[36px] font-medium leading-[1.2] tracking-[-0.01em]',
    h3: 'text-[20px] md:text-[30px] font-medium leading-[1.25] tracking-[-0.01em]',
    h4: 'text-[18px] md:text-[24px] font-medium leading-[1.3] tracking-[0]',
    h5: 'text-[17px] md:text-[20px] font-medium leading-[1.4] tracking-[0]',
    title: 'text-[16px] md:text-[18px] font-medium leading-[1.4] tracking-[0]',
  };

  const defaultForTag: Record<string, string> = {
    h1: variantMap.h1,
    h2: variantMap.h2,
    h3: variantMap.h3,
    h4: variantMap.h4,
    h5: variantMap.h5,
    h6: variantMap.h5,
  };

  const chosenClass = variant ? variantMap[variant] : defaultForTag[Component] || variantMap.h2;

  return (
    <Component
      className={cn('text-slate-900 font-sans', chosenClass, className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'label';
  variant?: 'body-lg' | 'subtitle' | 'body' | 'caption' | 'overline';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  variant = 'body',
  weight,
  className,
  children,
  ...props
}) => {
  const variants = {
    'body-lg': 'text-[16px] leading-[1.3] tracking-[0] font-normal text-slate-700',
    subtitle: 'text-[14px] leading-[1.3] tracking-[0] font-semibold text-slate-800',
    body: 'text-[14px] leading-[1.3] tracking-[0] font-normal text-slate-600',
    caption: 'text-[12px] leading-[1.5] tracking-[0.01em] font-normal text-slate-500',
    overline: 'text-[11px] leading-[1.3] tracking-[0.06em] font-semibold uppercase text-slate-500',
  };

  const weights = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  return (
    <Component
      className={cn(
        'font-sans',
        variants[variant],
        weight && weights[weight],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Heading.displayName = 'Heading';
Text.displayName = 'Text';
