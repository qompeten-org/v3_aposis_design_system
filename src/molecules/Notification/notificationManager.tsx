import React, { useState, useEffect, useCallback } from 'react';
import {
  Notification,
  NotificationProps,
  NotificationPosition,
} from './Notification';
import { cn } from '../../utils/cn';

export type NotificationMultiStyle = 'default' | 'stacking';

export interface ToastItem extends NotificationProps {
  id: string;
}

type Listener = (items: ToastItem[]) => void;

let listeners: Listener[] = [];
let memoryToasts: ToastItem[] = [];
let toastCount = 0;
let globalMultiStyle: NotificationMultiStyle = 'default';

function notifyListeners() {
  listeners.forEach((listener) => listener([...memoryToasts]));
}

export const notification = {
  show: (props: NotificationProps): string => {
    const id = props.id || `notif-${Date.now()}-${++toastCount}`;
    const defaultPos = props.pos || 'top-right';
    const defaultDuration = props.duration !== undefined ? props.duration : 4000;

    const item: ToastItem = {
      ...props,
      id,
      pos: defaultPos,
      duration: defaultDuration,
    };

    memoryToasts = [...memoryToasts, item];
    notifyListeners();
    return id;
  },

  info: (props: NotificationProps): string => {
    return notification.show({ ...props, variant: 'info' });
  },

  success: (props: NotificationProps): string => {
    return notification.show({ ...props, variant: 'success' });
  },

  warning: (props: NotificationProps): string => {
    return notification.show({ ...props, variant: 'warning' });
  },

  error: (props: NotificationProps): string => {
    return notification.show({ ...props, variant: 'error' });
  },

  dismiss: (id: string) => {
    const target = memoryToasts.find((t) => t.id === id);
    if (target?.onClose) {
      target.onClose();
    }
    memoryToasts = memoryToasts.filter((t) => t.id !== id);
    notifyListeners();
  },

  dismissAll: () => {
    memoryToasts.forEach((t) => t.onClose?.());
    memoryToasts = [];
    notifyListeners();
  },

  setMultiStyle: (style: NotificationMultiStyle) => {
    globalMultiStyle = style;
    notifyListeners();
  },

  getMultiStyle: (): NotificationMultiStyle => {
    return globalMultiStyle;
  },
};

export function useNotification() {
  return {
    show: notification.show,
    info: notification.info,
    success: notification.success,
    warning: notification.warning,
    error: notification.error,
    dismiss: notification.dismiss,
    dismissAll: notification.dismissAll,
    setMultiStyle: notification.setMultiStyle,
    getMultiStyle: notification.getMultiStyle,
  };
}

const positionContainers: Record<NotificationPosition, string> = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

interface ToastCardProps {
  item: ToastItem;
  pos: NotificationPosition;
  onDismiss: (id: string) => void;
  isStackedCollapsed?: boolean;
}

const ToastCard: React.FC<ToastCardProps> = ({
  item,
  pos,
  onDismiss,
  isStackedCollapsed = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const getEntranceClass = (position: NotificationPosition) => {
    switch (position) {
      case 'top-right':
        return 'translate-x-12 opacity-0 scale-95';
      case 'top-left':
        return '-translate-x-12 opacity-0 scale-95';
      case 'top-center':
        return '-translate-y-8 opacity-0 scale-95';
      case 'bottom-right':
        return 'translate-x-12 translate-y-4 opacity-0 scale-95';
      case 'bottom-left':
        return '-translate-x-12 translate-y-4 opacity-0 scale-95';
      case 'bottom-center':
        return 'translate-y-8 opacity-0 scale-95';
      default:
        return 'translate-y-4 opacity-0 scale-95';
    }
  };

  return (
    <div
      className={cn(
        'pointer-events-auto w-full transition-all duration-300 ease-out transform',
        !isMounted ? getEntranceClass(pos) : 'translate-x-0 translate-y-0 opacity-100 scale-100',
        isStackedCollapsed && 'pointer-events-none select-none'
      )}
    >
      <Notification
        {...item}
        pos={pos}
        onClose={() => onDismiss(item.id)}
      />
    </div>
  );
};

interface ToastGroupProps {
  pos: NotificationPosition;
  items: ToastItem[];
  multiStyle: NotificationMultiStyle;
  onDismiss: (id: string) => void;
}

const ToastGroup: React.FC<ToastGroupProps> = ({
  pos,
  items,
  multiStyle,
  onDismiss,
}) => {
  const [isHoveredStack, setIsHoveredStack] = useState(false);
  const isTop = pos.startsWith('top');
  const isStacking = multiStyle === 'stacking';

  // For default style:
  // If bottom position, newest is at bottom; if top position, newest is at top
  if (!isStacking) {
    const displayItems = isTop ? items : [...items].reverse();

    return (
      <div
        className={cn(
          'fixed z-[9999] flex flex-col gap-2.5 pointer-events-none p-3 sm:p-4 max-w-sm sm:max-w-md w-full',
          positionContainers[pos]
        )}
        aria-live="polite"
      >
        {displayItems.map((item) => (
          <ToastCard
            key={item.id}
            item={item}
            pos={pos}
            onDismiss={onDismiss}
          />
        ))}
      </div>
    );
  }

  // Stacking style:
  // Newest item is at the front of the stack
  const newestFirst = [...items].reverse();

  return (
    <div
      className={cn(
        'fixed z-[9999] flex flex-col pointer-events-none p-3 sm:p-4 max-w-sm sm:max-w-md w-full transition-all duration-300',
        positionContainers[pos]
      )}
      aria-live="polite"
      onMouseEnter={() => setIsHoveredStack(true)}
      onMouseLeave={() => setIsHoveredStack(false)}
    >
      {/* Stack Count Indicator Badge when collapsed and more than 1 notification */}
      {!isHoveredStack && items.length > 1 && (
        <div
          onClick={() => setIsHoveredStack(true)}
          className={cn(
            'pointer-events-auto cursor-pointer self-center z-50 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-slate-800/90 text-white dark:bg-slate-100/90 dark:text-slate-900 shadow-md backdrop-blur-sm transition-all hover:scale-105',
            isTop ? 'order-last mt-2' : 'order-first mb-2'
          )}
        >
          +{items.length - 1} notifikasi lainnya (hover untuk buka)
        </div>
      )}

      <div
        className={cn(
          'w-full transition-all duration-300 ease-out',
          isHoveredStack ? 'flex flex-col gap-2.5' : 'relative'
        )}
        style={{
          minHeight: isHoveredStack ? undefined : '64px',
        }}
      >
        {newestFirst.map((item, index) => {
          const offset = isTop ? index * 10 : -index * 10;
          const scale = Math.max(0.85, 1 - index * 0.05);
          const opacity = index > 2 ? 0 : Math.max(0.55, 1 - index * 0.15);
          const zIndex = 50 - index;

          return (
            <div
              key={item.id}
              className={cn(
                'w-full transition-all duration-300 ease-out',
                !isHoveredStack && 'absolute left-0 right-0 top-0',
                !isHoveredStack && index > 2 && 'pointer-events-none'
              )}
              style={
                !isHoveredStack
                  ? {
                      transform: `translateY(${offset}px) scale(${scale})`,
                      opacity: opacity,
                      zIndex: zIndex,
                      transformOrigin: isTop ? 'top center' : 'bottom center',
                    }
                  : {
                      zIndex: 50 - index,
                    }
              }
            >
              <ToastCard
                item={item}
                pos={pos}
                onDismiss={onDismiss}
                isStackedCollapsed={!isHoveredStack && index > 0}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export interface NotificationContainerProps {
  multiStyle?: NotificationMultiStyle;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({
  multiStyle,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>(memoryToasts);
  const activeMultiStyle = multiStyle || globalMultiStyle;

  useEffect(() => {
    const handleUpdate = (updated: ToastItem[]) => {
      setToasts(updated);
    };

    listeners.push(handleUpdate);
    return () => {
      listeners = listeners.filter((l) => l !== handleUpdate);
    };
  }, []);

  const handleDismiss = useCallback((id: string) => {
    notification.dismiss(id);
  }, []);

  // Group active toasts by position
  const groupedByPos = toasts.reduce<Record<NotificationPosition, ToastItem[]>>(
    (acc, toast) => {
      const pos = toast.pos || 'top-right';
      if (!acc[pos]) acc[pos] = [];
      acc[pos].push(toast);
      return acc;
    },
    {
      'top-right': [],
      'top-left': [],
      'top-center': [],
      'bottom-right': [],
      'bottom-left': [],
      'bottom-center': [],
    }
  );

  return (
    <>
      {(Object.keys(groupedByPos) as NotificationPosition[]).map((pos) => {
        const items = groupedByPos[pos];
        if (!items || items.length === 0) return null;

        return (
          <ToastGroup
            key={pos}
            pos={pos}
            items={items}
            multiStyle={activeMultiStyle}
            onDismiss={handleDismiss}
          />
        );
      })}
    </>
  );
};
