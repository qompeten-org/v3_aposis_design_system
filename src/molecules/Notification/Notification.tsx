import React, { forwardRef, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import {
  IconInfoCircleFilled,
  IconCircleCheckFilled,
  IconAlertCircleFilled,
  IconX,
} from '@tabler/icons-react';

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error' | 'danger';
export type NotificationPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

export type NotificationLayout = 'auto' | 'inline' | 'stacked';

export interface NotificationAction {
  label: string;
  onClick: () => void;
  className?: string;
}

export interface NotificationProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Notification primary title or header text */
  teks?: React.ReactNode;
  /** Alias for teks */
  title?: React.ReactNode;
  /** Notification secondary description / message */
  description?: React.ReactNode;
  /** Alias for description */
  message?: React.ReactNode;
  /** Semantic variant style */
  variant?: NotificationVariant;
  /** Custom icon or set false to hide */
  icon?: React.ReactNode | boolean;
  /** Interactive action button or trigger config */
  actionTrigger?: React.ReactNode | NotificationAction;
  /** Alias for actionTrigger */
  action?: React.ReactNode | NotificationAction;
  /** Auto-dismiss duration in milliseconds (default: 4000, 0 / null for persistent) */
  duration?: number | null;
  /** Screen placement when used as floating toast */
  pos?: NotificationPosition;
  /** Layout presentation style: inline or stacked */
  layout?: NotificationLayout;
  /** Whether to show countdown progress bar (default: true when duration is set) */
  showProgress?: boolean;
  /** Custom progress bar placement: 'auto' (bottom for top toasts, top for bottom toasts), 'top', or 'bottom' */
  progressPosition?: 'auto' | 'top' | 'bottom';
  /** Callback fired when dismissed */
  onClose?: () => void;
  /** Whether to show close button (default: true) */
  closable?: boolean;
}

const variantStyles: Record<
  'info' | 'success' | 'warning' | 'error',
  {
    container: string;
    icon: React.ReactNode;
    progressBar: string;
  }
> = {
  info: {
    container:
      'bg-[#EDF5FF] dark:bg-blue-950/40 border border-blue-500/80 dark:border-blue-700 border-l-4 border-l-blue-600 dark:border-l-blue-500',
    icon: (
      <IconInfoCircleFilled className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
    ),
    progressBar: 'bg-blue-600 dark:bg-blue-400',
  },
  success: {
    container:
      'bg-[#F0FDF4] dark:bg-emerald-950/40 border border-emerald-500/80 dark:border-emerald-700 border-l-4 border-l-emerald-600 dark:border-l-emerald-500',
    icon: (
      <IconCircleCheckFilled className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
    ),
    progressBar: 'bg-emerald-600 dark:bg-emerald-400',
  },
  warning: {
    container:
      'bg-[#FFFBEB] dark:bg-amber-950/40 border border-amber-500/80 dark:border-amber-700 border-l-4 border-l-amber-500 dark:border-l-amber-400',
    icon: (
      <IconAlertCircleFilled className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0" />
    ),
    progressBar: 'bg-amber-500 dark:bg-amber-400',
  },
  error: {
    container:
      'bg-[#FFEFEF] dark:bg-rose-950/40 border border-rose-500/80 dark:border-rose-700 border-l-4 border-l-rose-600 dark:border-l-rose-500',
    icon: (
      <IconAlertCircleFilled className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
    ),
    progressBar: 'bg-rose-600 dark:bg-rose-400',
  },
};

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      teks,
      title,
      description,
      message,
      variant = 'info',
      icon,
      actionTrigger,
      action,
      duration,
      pos,
      layout = 'auto',
      showProgress = true,
      progressPosition = 'auto',
      onClose,
      closable = true,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
      setIsVisible(false);
      onClose?.();
    };

    // Auto dismiss timer (continuous cooldown, does not pause on hover)
    useEffect(() => {
      if (duration === null || duration === undefined || duration <= 0) return;

      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }, [duration]);

    if (!isVisible) return null;

    const resolvedTeks = teks ?? title ?? 'Notification';
    const resolvedDesc = description ?? message ?? children;
    const resolvedAction = actionTrigger ?? action;
    const normalizedVariant: 'info' | 'success' | 'warning' | 'error' =
      variant === 'danger' ? 'error' : variant;

    const variantConfig = variantStyles[normalizedVariant] || variantStyles.info;

    // Resolve icon node
    let iconNode: React.ReactNode = null;
    if (icon !== false) {
      iconNode = React.isValidElement(icon) ? icon : variantConfig.icon;
    }

    // Determine progress bar position:
    // If location is at top (or default), progress bar is placed at bottom.
    // If location is at bottom, progress bar is placed at top.
    const hasProgress =
      showProgress && typeof duration === 'number' && duration > 0;
    const isTopBar =
      progressPosition === 'top' ||
      (progressPosition !== 'bottom' && Boolean(pos && pos.startsWith('bottom')));

    const renderAction = () => {
      if (!resolvedAction) return null;

      if (
        typeof resolvedAction === 'object' &&
        'label' in resolvedAction &&
        'onClick' in resolvedAction
      ) {
        const actionObj = resolvedAction as NotificationAction;
        return (
          <button
            type="button"
            onClick={actionObj.onClick}
            className={cn(
              'text-xs sm:text-sm font-semibold text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white px-2 py-1 rounded-md transition-colors cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 shrink-0',
              actionObj.className
            )}
          >
            {actionObj.label}
          </button>
        );
      }

      return <div className="shrink-0">{resolvedAction as React.ReactNode}</div>;
    };

    const hasDesc = Boolean(resolvedDesc);

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          'relative flex items-center justify-between rounded-xl px-4 py-3 shadow-sm transition-all overflow-hidden',
          variantConfig.container,
          className
        )}
        {...props}
      >
        <style>{`
          @keyframes notifCountdown {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>

        {/* Progress Bar */}
        {hasProgress && (
          <div
            className={cn(
              'absolute left-0 right-0 h-1 overflow-hidden pointer-events-none bg-black/5 dark:bg-white/10',
              isTopBar ? 'top-0' : 'bottom-0'
            )}
          >
            <div
              className={cn('h-full w-full origin-left', variantConfig.progressBar)}
              style={{
                animation: `notifCountdown ${duration}ms linear forwards`,
              }}
            />
          </div>
        )}

        {hasDesc ? (
          <div className="flex items-start gap-3 w-full">
            {iconNode && <div className="mt-0.5 shrink-0">{iconNode}</div>}
            <div className="flex-1 min-w-0 pr-2">
              <div className="font-semibold text-sm text-slate-900 dark:text-slate-100 leading-snug">
                {resolvedTeks}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                {resolvedDesc}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0 self-start mt-0.5">
              {renderAction()}
              {closable && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Tutup notifikasi"
                >
                  <IconX size={16} />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 w-full">
            {iconNode && <div className="shrink-0">{iconNode}</div>}
            <div className="flex-1 min-w-0 pr-2">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                {resolvedTeks}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {renderAction()}
              {closable && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Tutup notifikasi"
                >
                  <IconX size={16} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Notification.displayName = 'Notification';
