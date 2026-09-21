import React, { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import { useRadioGroup } from './RadioGroupContext';
import { useFormField } from '../../context/FormFieldContext';

export type RadioVariant = 'default' | 'card';
export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioLabelPosition = 'right' | 'left' | 'top' | 'bottom';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Text or element label */
  label?: React.ReactNode;
  /** Subtext description below label */
  description?: React.ReactNode;
  /** Label position relative to radio circle */
  labelPosition?: RadioLabelPosition;
  /** Visual presentation style */
  variant?: RadioVariant;
  /** Component size scale */
  size?: RadioSize;
  /** Error message string */
  error?: string;
  /** Explicit invalid/error state boolean */
  isInvalid?: boolean;
  /** Custom class for outer wrapper */
  containerClassName?: string;
  /** Custom class for the centered active dot */
  dotClassName?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      id,
      name,
      value,
      checked: controlledChecked,
      defaultChecked,
      disabled: explicitDisabled,
      label,
      description,
      labelPosition: explicitLabelPosition,
      variant: explicitVariant,
      size: explicitSize,
      error,
      isInvalid: explicitIsInvalid,
      className,
      containerClassName,
      dotClassName,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const radioId = id || generatedId;
    const group = useRadioGroup();
    const formField = useFormField();

    // Context inheritance with fallback to explicit props
    const resolvedSize: RadioSize = explicitSize || group?.size || 'md';
    const resolvedVariant: RadioVariant = explicitVariant || group?.variant || 'default';
    const resolvedLabelPosition: RadioLabelPosition =
      explicitLabelPosition || group?.labelPosition || 'right';
    const resolvedDisabled = explicitDisabled ?? group?.disabled ?? formField?.disabled ?? false;
    const resolvedRequired = props.required ?? group?.required ?? formField?.required ?? false;
    const resolvedIsInvalid = Boolean(explicitIsInvalid || error || group?.isInvalid || (!group && formField?.isInvalid));
    const resolvedName = name || group?.name;

    const isGroupControlled = group !== null && group.value !== undefined;
    const isChecked = isGroupControlled
      ? group.value === value
      : controlledChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (group && value !== undefined) {
        group.onChange(String(value));
      }
    };

    // Dimension scales (circle, dot, fonts)
    const circleSizes: Record<RadioSize, string> = {
      sm: 'w-4 h-4 border-[1.5px]',
      md: 'w-5 h-5 border-2',
      lg: 'w-6 h-6 border-2',
    };

    const dotSizes: Record<RadioSize, string> = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5',
    };

    const textSizes: Record<RadioSize, string> = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    const descSizes: Record<RadioSize, string> = {
      sm: 'text-[11px]',
      md: 'text-xs',
      lg: 'text-sm',
    };

    // Default black/dark outline; turns blue when selected
    const defaultOuterStyles =
      'border-slate-900 dark:border-slate-300 checked:border-blue-600 dark:checked:border-blue-500 group-hover:border-black dark:group-hover:border-white focus-visible:ring-blue-500';
    const defaultDotStyles = 'bg-blue-600 dark:bg-blue-500';

    // Disabled styling
    const disabledStyles = {
      outer: 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 cursor-not-allowed group-hover:border-slate-300 dark:group-hover:border-slate-700',
      dot: 'bg-slate-300 dark:bg-slate-600',
      text: 'text-slate-300 dark:text-slate-600 cursor-not-allowed',
    };

    // Layout orientations
    const positionStyles: Record<RadioLabelPosition, string> = {
      right: 'flex-row items-center gap-2.5 text-left',
      left: 'flex-row-reverse items-center justify-between gap-2.5 text-left',
      top: 'flex-col-reverse items-center gap-1.5 text-center',
      bottom: 'flex-col items-center gap-1.5 text-center',
    };

    // Card variant container styles
    const cardVariantStyles =
      resolvedVariant === 'card'
        ? cn(
            'p-4 rounded-xl border transition-all duration-150 cursor-pointer',
            'has-[:checked]:border-blue-600 dark:has-[:checked]:border-blue-500',
            'has-[:checked]:bg-blue-50/40 dark:has-[:checked]:bg-blue-950/20 has-[:checked]:shadow-xs',
            'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 bg-white dark:bg-slate-900',
            resolvedDisabled && 'opacity-50 pointer-events-none',
            resolvedIsInvalid && 'border-red-300 dark:border-red-800 has-[:checked]:border-red-600'
          )
        : '';

    return (
      <div className={cn('inline-flex flex-col', containerClassName)}>
        <label
          htmlFor={radioId}
          className={cn(
            'group relative inline-flex cursor-pointer select-none transition-colors duration-150',
            positionStyles[resolvedLabelPosition],
            resolvedDisabled && 'cursor-not-allowed',
            cardVariantStyles
          )}
        >
          {/* Custom Radio Circle Container */}
          <div className="relative flex shrink-0 items-center justify-center">
            <input
              ref={ref}
              type="radio"
              id={radioId}
              name={resolvedName}
              value={value}
              checked={isGroupControlled || controlledChecked !== undefined ? isChecked : undefined}
              defaultChecked={defaultChecked}
              disabled={resolvedDisabled}
              required={resolvedRequired}
              aria-invalid={resolvedIsInvalid}
              onChange={handleChange}
              className={cn(
                'peer appearance-none rounded-full transition-all duration-150 cursor-pointer',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
                circleSizes[resolvedSize],
                resolvedDisabled
                  ? disabledStyles.outer
                  : resolvedIsInvalid
                  ? 'border-red-500 checked:border-red-500 focus-visible:ring-red-400'
                  : defaultOuterStyles,
                className
              )}
              {...props}
            />

            {/* Centered Solid Dot */}
            <span
              className={cn(
                'pointer-events-none absolute rounded-full transition-transform duration-150 ease-out scale-0 peer-checked:scale-100',
                dotSizes[resolvedSize],
                resolvedDisabled
                  ? disabledStyles.dot
                  : resolvedIsInvalid
                  ? 'bg-red-500'
                  : defaultDotStyles,
                dotClassName
              )}
              aria-hidden="true"
            />
          </div>

          {/* Label and Description */}
          {(label || description) && (
            <div className={cn('flex flex-col', resolvedLabelPosition === 'top' || resolvedLabelPosition === 'bottom' ? 'items-center' : '')}>
              {label && (
                <span
                  className={cn(
                    'font-medium transition-colors duration-150',
                    textSizes[resolvedSize],
                    resolvedDisabled
                      ? disabledStyles.text
                      : 'text-slate-900 dark:text-slate-100 group-hover:text-black dark:group-hover:text-white'
                  )}
                >
                  {label}
                </span>
              )}
              {description && (
                <span
                  className={cn(
                    'transition-colors duration-150',
                    descSizes[resolvedSize],
                    resolvedDisabled ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'
                  )}
                >
                  {description}
                </span>
              )}
            </div>
          )}
        </label>

        {/* Validation Error (only when not wrapped by FormField or error message differs) */}
        {error && (!formField || formField.error !== error) && (
          <p className="mt-1 text-xs font-medium text-red-500" role="alert">{error}</p>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';
