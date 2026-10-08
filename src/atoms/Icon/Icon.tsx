import React from 'react';
import { cn } from '../../utils/cn';
import type { Icon as TablerIconType, IconProps as TablerIconProps } from '@tabler/icons-react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg';

export interface IconProps extends Omit<TablerIconProps, 'size'> {
  icon: TablerIconType | React.ComponentType<any>;
  size?: IconSize | number | string;
  className?: string;
}

export const iconSizes = {
  xs: { size: 14, strokeWidth: 1.25 },
  sm: { size: 16, strokeWidth: 1.25 },
  md: { size: 20, strokeWidth: 1.5 },
  lg: { size: 24, strokeWidth: 2 },
} as const;

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  strokeWidth,
  className,
  ...props
}) => {
  if (!IconComponent) {
    return null;
  }

  let resolvedSize: number | string = 20;
  let defaultStroke = 1.5;

  if (typeof size === 'string' && size in iconSizes) {
    const config = iconSizes[size as IconSize];
    resolvedSize = config.size;
    defaultStroke = config.strokeWidth;
  } else if (typeof size === 'number') {
    resolvedSize = size;
  } else if (typeof size === 'string') {
    const num = Number(size);
    if (!isNaN(num) && num > 0) {
      resolvedSize = num;
    } else {
      resolvedSize = size;
    }
  }

  const finalStrokeWidth = strokeWidth !== undefined ? strokeWidth : defaultStroke;

  return (
    <IconComponent
      size={resolvedSize}
      strokeWidth={finalStrokeWidth}
      stroke={finalStrokeWidth}
      className={cn('shrink-0 transition-colors', className)}
      {...props}
    />
  );
};

Icon.displayName = 'Icon';
