import React from 'react';
import { cn } from '../../utils/cn';
import type { Icon as TablerIconType, IconProps as TablerIconProps } from '@tabler/icons-react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg';

export interface IconProps extends Omit<TablerIconProps, 'size'> {
  icon: TablerIconType | React.ComponentType<any>;
  size?: IconSize;
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
  const config = iconSizes[size];
  const finalStrokeWidth = strokeWidth !== undefined ? strokeWidth : config.strokeWidth;

  return (
    <IconComponent
      size={config.size}
      strokeWidth={finalStrokeWidth}
      className={cn('shrink-0 transition-colors', className)}
      {...props}
    />
  );
};

Icon.displayName = 'Icon';
