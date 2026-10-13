import React from 'react';
import { cn } from '../../utils/cn';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';

export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  className,
  id,
  ...props
}) => {
  const configs = {
    info: {
      container: 'bg-sky-50/80 border-sky-200 text-sky-900',
      icon: <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />,
      closeBtn: 'text-sky-500 hover:text-sky-800 hover:bg-sky-100',
    },
    success: {
      container: 'bg-emerald-50/80 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
      closeBtn: 'text-emerald-500 hover:text-emerald-800 hover:bg-emerald-100',
    },
    warning: {
      container: 'bg-amber-50/80 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
      closeBtn: 'text-amber-500 hover:text-amber-800 hover:bg-amber-100',
    },
    danger: {
      container: 'bg-rose-50/80 border-rose-200 text-rose-900',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
      closeBtn: 'text-rose-500 hover:text-rose-800 hover:bg-rose-100',
    },
  };

  const config = configs[variant];

  return (
    <div
      role="alert"
      id={id}
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-xl border text-sm transition-all',
        config.container,
        className
      )}
      {...props}
    >
      {config.icon}
      <div className="flex-1 min-w-0 pr-4">
        {title && <h5 className="font-semibold text-sm mb-1 leading-tight">{title}</h5>}
        <div className="text-xs leading-relaxed opacity-90">{children}</div>
      </div>
      {onClose && (
        <button
          id={id ? `${id}-close` : undefined}
          type="button"
          onClick={onClose}
          className={cn(
            'absolute top-3 right-3 p-1 rounded-lg transition-colors',
            config.closeBtn
          )}
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
