import React from 'react';
import { cn } from '../../utils/cn';
import { iconSizes, type IconSize } from './Icon';

export interface CustomIconProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'stroke'> {
  size?: IconSize | number | string;
  strokeWidth?: number | string;
  stroke?: number | string;
}

const resolveIconConfig = (
  size?: IconSize | number | string,
  strokeWidth?: number | string,
  stroke?: number | string
) => {
  let resolvedSize: number | string = 20;
  let resolvedStroke: number | string = 1.5;

  if (typeof size === 'string' && size in iconSizes) {
    const config = iconSizes[size as IconSize];
    resolvedSize = config.size;
    resolvedStroke = config.strokeWidth;
  } else if (typeof size === 'number') {
    resolvedSize = size;
  } else if (typeof size === 'string') {
    const num = Number(size);
    if (!isNaN(num) && num > 0) {
      resolvedSize = num;
    } else if (size.endsWith('px') || size.endsWith('rem') || size.endsWith('em') || size.endsWith('%')) {
      resolvedSize = size;
    }
  }

  const finalStroke = strokeWidth ?? stroke ?? resolvedStroke;

  return {
    size: resolvedSize,
    strokeWidth: finalStroke,
  };
};

export const IconLanguageId: React.FC<CustomIconProps> = ({
  size = 'md',
  strokeWidth,
  stroke,
  className,
  ...props
}) => {
  const config = resolveIconConfig(size, strokeWidth, stroke);
  return (
    <svg
      width={config.size}
      height={config.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={config.strokeWidth}
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
IconLanguageId.displayName = 'IconLanguageId';

export const IconLanguageEn: React.FC<CustomIconProps> = ({
  size = 'md',
  strokeWidth,
  stroke,
  className,
  ...props
}) => {
  const config = resolveIconConfig(size, strokeWidth, stroke);
  return (
    <svg
      width={config.size}
      height={config.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={config.strokeWidth}
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
IconLanguageEn.displayName = 'IconLanguageEn';

export const IconMathSqrt: React.FC<CustomIconProps> = ({
  size = 'md',
  strokeWidth,
  stroke,
  className,
  ...props
}) => {
  const config = resolveIconConfig(size, strokeWidth, stroke);
  return (
    <svg
      width={config.size}
      height={config.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={config.strokeWidth}
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
IconMathSqrt.displayName = 'IconMathSqrt';
