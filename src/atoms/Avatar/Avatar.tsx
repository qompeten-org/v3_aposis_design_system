import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'busy' | 'away' | 'offline';
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = '',
  alt,
  size = 'md',
  status,
  className,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const getInitials = (n: string) => {
    if (!n) return '?';
    const parts = n.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const sizeClasses = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-medium',
    lg: 'w-12 h-12 text-base font-medium',
    xl: 'w-16 h-16 text-lg font-semibold',
  };

  const statusSize = {
    xs: 'w-1.5 h-1.5 border',
    sm: 'w-2 h-2 border',
    md: 'w-2.5 h-2.5 border-2',
    lg: 'w-3 h-3 border-2',
    xl: 'w-4 h-4 border-2',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    busy: 'bg-rose-500',
    away: 'bg-amber-500',
    offline: 'bg-slate-400',
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full shrink-0 overflow-visible select-none',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-aposis-100 text-aposis-700 border border-aposis-200">
        {src && !hasError ? (
          <img
            src={src}
            alt={alt || name}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-white',
            statusSize[size],
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';
