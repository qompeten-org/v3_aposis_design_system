import React, {
  forwardRef,
  useState,
  useRef,
  useId,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { cn } from '../../utils/cn';

export type TooltipPosition =
  | 'auto'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export type TooltipSize = 'sm' | 'md' | 'lg';
export type TooltipVariant = 'default' | 'definition';

export interface TooltipProps {
  id?: string;
  /** Tooltip text or complex ReactNode content (childrenable) */
  text?: ReactNode;
  /** Trigger element (or content if text is not provided) */
  children?: ReactNode;
  /** Custom class for the tooltip bubble (e.g. override background, text, border) */
  className?: string;
  /** Alias for className */
  classname?: string;
  /** Custom class for the trigger container wrapper */
  containerClassName?: string;
  /** Custom class for the arrow pointer */
  arrowClassName?: string;
  /** Size scale of the tooltip */
  size?: TooltipSize;
  /** Placement position (default: 'auto') */
  pos?: TooltipPosition;
  /** Visual variant: default trigger or definition dotted underline */
  variant?: TooltipVariant;
  /** Whether to show the triangular arrow pointer (default: true) */
  arrow?: boolean;
  /** Hover show delay in milliseconds (default: 100) */
  delay?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Initial uncontrolled open state */
  defaultOpen?: boolean;
  /** Callback fired when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Trigger element when not using children as trigger */
  trigger?: ReactNode;
}

const positionStyles: Record<
  Exclude<TooltipPosition, 'auto'>,
  {
    bubble: string;
    arrow: string;
  }
> = {
  top: {
    bubble: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow: 'bottom-[-4px] left-1/2 -translate-x-1/2',
  },
  'top-start': {
    bubble: 'bottom-full left-0 mb-2',
    arrow: 'bottom-[-4px] left-3.5',
  },
  'top-end': {
    bubble: 'bottom-full right-0 mb-2',
    arrow: 'bottom-[-4px] right-3.5',
  },
  bottom: {
    bubble: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow: 'top-[-4px] left-1/2 -translate-x-1/2',
  },
  'bottom-start': {
    bubble: 'top-full left-0 mt-2',
    arrow: 'top-[-4px] left-3.5',
  },
  'bottom-end': {
    bubble: 'top-full right-0 mt-2',
    arrow: 'top-[-4px] right-3.5',
  },
  left: {
    bubble: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow: 'right-[-4px] top-1/2 -translate-y-1/2',
  },
  'left-start': {
    bubble: 'right-full top-0 mr-2',
    arrow: 'right-[-4px] top-2.5',
  },
  'left-end': {
    bubble: 'right-full bottom-0 mr-2',
    arrow: 'right-[-4px] bottom-2.5',
  },
  right: {
    bubble: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow: 'left-[-4px] top-1/2 -translate-y-1/2',
  },
  'right-start': {
    bubble: 'left-full top-0 ml-2',
    arrow: 'left-[-4px] top-2.5',
  },
  'right-end': {
    bubble: 'left-full bottom-0 ml-2',
    arrow: 'left-[-4px] bottom-2.5',
  },
};

const sizeStyles: Record<TooltipSize, string> = {
  sm: 'text-[11px] py-1 px-2.5 rounded-md font-medium leading-tight',
  md: 'text-xs py-1.5 px-3 rounded-lg font-medium leading-normal',
  lg: 'text-sm py-2 px-3.5 rounded-lg font-medium leading-normal',
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      text,
      children,
      className,
      classname,
      containerClassName,
      arrowClassName,
      size = 'md',
      pos = 'auto',
      variant = 'default',
      arrow = true,
      delay = 100,
      disabled = false,
      isOpen: explicitIsOpen,
      defaultOpen = false,
      onOpenChange,
      trigger,
      id,
    },
    ref
  ) => {
    const generatedId = useId();
    const tooltipId = id || generatedId;
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const [calculatedPos, setCalculatedPos] = useState<Exclude<TooltipPosition, 'auto'>>('top');
    const triggerContainerRef = useRef<HTMLSpanElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const isControlled = explicitIsOpen !== undefined;
    const isVisible = !disabled && (isControlled ? explicitIsOpen : uncontrolledOpen);

    const setOpen = useCallback(
      (nextOpen: boolean) => {
        if (!isControlled) {
          setUncontrolledOpen(nextOpen);
        }
        onOpenChange?.(nextOpen);
      },
      [isControlled, onOpenChange]
    );

    // Auto positioning calculation based on viewport bounds
    useEffect(() => {
      if (pos !== 'auto' || !isVisible || !triggerContainerRef.current) return;

      const rect = triggerContainerRef.current.getBoundingClientRect();
      const spaceTop = rect.top;
      const spaceBottom = window.innerHeight - rect.bottom;
      const spaceLeft = rect.left;
      const spaceRight = window.innerWidth - rect.right;

      let vertical: 'top' | 'bottom' = 'top';
      if (spaceTop < 75 && spaceBottom > spaceTop) {
        vertical = 'bottom';
      }

      let align = '';
      if (spaceLeft < 80) {
        align = '-start';
      } else if (spaceRight < 80) {
        align = '-end';
      }

      const resolved = `${vertical}${align}` as Exclude<TooltipPosition, 'auto'>;
      setCalculatedPos(resolved);
    }, [pos, isVisible]);

    const handleMouseEnter = () => {
      if (disabled) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (delay > 0) {
        timerRef.current = setTimeout(() => setOpen(true), delay);
      } else {
        setOpen(true);
      }
    };

    const handleMouseLeave = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setOpen(false);
    };

    const handleFocus = () => {
      if (disabled) return;
      if (timerRef.current) clearTimeout(timerRef.current);
      setOpen(true);
    };

    const handleBlur = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);

    const effectivePos: Exclude<TooltipPosition, 'auto'> =
      pos === 'auto' ? calculatedPos : pos;

    const currentPosConfig = positionStyles[effectivePos] || positionStyles.top;

    // Content resolution: text takes priority as tooltip content
    // If text is provided, children/trigger is the anchor trigger.
    // If text is not provided and trigger is not provided, children acts as tooltip content.
    const tooltipContent = text !== undefined ? text : trigger ? children : null;
    const triggerContent = trigger !== undefined ? trigger : text !== undefined ? children : children;

    // Default dark appearance, overrideable via className
    const defaultBubbleStyles = 'bg-slate-900 dark:bg-slate-950 text-white';

    // Render standalone tooltip bubble if no trigger content exists
    if (!triggerContent && tooltipContent) {
      return (
        <div
          ref={ref}
          role="tooltip"
          className={cn(
            'relative inline-flex items-center text-center shadow-md',
            defaultBubbleStyles,
            sizeStyles[size],
            classname,
            className
          )}
        >
          {tooltipContent}
          {arrow && (
            <span
              className={cn(
                'absolute w-2 h-2 rotate-45 bg-inherit pointer-events-none',
                currentPosConfig.arrow,
                arrowClassName
              )}
              aria-hidden="true"
            />
          )}
        </div>
      );
    }

    const isDefinition = variant === 'definition';

    return (
      <span
        ref={triggerContainerRef}
        className={cn('relative inline-flex items-center', containerClassName)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        {/* Trigger Node */}
        {isDefinition ? (
          <span
            tabIndex={0}
            aria-describedby={isVisible ? tooltipId : undefined}
            className="underline decoration-dotted decoration-slate-400 dark:decoration-slate-500 underline-offset-4 cursor-help hover:text-blue-600 hover:decoration-blue-600 dark:hover:text-blue-400 dark:hover:decoration-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xs"
          >
            {triggerContent}
          </span>
        ) : typeof triggerContent === 'string' ? (
          <span
            tabIndex={0}
            aria-describedby={isVisible ? tooltipId : undefined}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xs cursor-default"
          >
            {triggerContent}
          </span>
        ) : (
          <span
            aria-describedby={isVisible ? tooltipId : undefined}
            className="inline-flex"
          >
            {triggerContent}
          </span>
        )}

        {/* Tooltip Bubble */}
        <div
          ref={ref}
          id={tooltipId}
          role="tooltip"
          aria-hidden={!isVisible}
          className={cn(
            'absolute z-50 pointer-events-none whitespace-nowrap shadow-md',
            'transition-all duration-150 ease-out',
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none',
            defaultBubbleStyles,
            currentPosConfig.bubble,
            sizeStyles[size],
            classname,
            className
          )}
        >
          {tooltipContent}
          {arrow && (
            <span
              className={cn(
                'absolute w-2 h-2 rotate-45 bg-inherit pointer-events-none',
                currentPosConfig.arrow,
                arrowClassName
              )}
              aria-hidden="true"
            />
          )}
        </div>
      </span>
    );
  }
);

Tooltip.displayName = 'Tooltip';
