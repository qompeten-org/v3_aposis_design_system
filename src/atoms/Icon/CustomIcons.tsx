import React from 'react';
import { cn } from '../../utils/cn';
import { iconSizes, type IconSize } from './Icon';

export interface CustomIconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: IconSize;
  strokeWidth?: number;
}

export const IconLanguageId: React.FC<CustomIconProps> = ({
  size = 'md',
  strokeWidth,
  className,
  ...props
}) => {
  const config = iconSizes[size];
  const sw = strokeWidth ?? config.strokeWidth;
  return (
    <svg
      width={config.size}
      height={config.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0', className)}
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <text
        x="12"
        y="13"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="bold"
        fill="currentColor"
        stroke="none"
      >
        ID
      </text>
    </svg>
  );
};

export const IconLanguageEn: React.FC<CustomIconProps> = ({
  size = 'md',
  strokeWidth,
  className,
  ...props
}) => {
  const config = iconSizes[size];
  const sw = strokeWidth ?? config.strokeWidth;
  return (
    <svg
      width={config.size}
      height={config.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0', className)}
      {...props}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <text
        x="12"
        y="13"
        textAnchor="middle"
        fontSize="7.5"
        fontWeight="bold"
        fill="currentColor"
        stroke="none"
      >
        EN
      </text>
    </svg>
  );
};

export const IconMathSqrt: React.FC<CustomIconProps> = ({
  size = 'md',
  strokeWidth,
  className,
  ...props
}) => {
  const config = iconSizes[size];
  const sw = strokeWidth ?? config.strokeWidth;
  return (
    <svg
      width={config.size}
      height={config.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0', className)}
      {...props}
    >
      {/* Sqrt symbol and x */}
      <path d="M3 12h2l3 8 4-15h9" />
      <path d="M14 12l4 4" />
      <path d="M18 12l-4 4" />
    </svg>
  );
};
