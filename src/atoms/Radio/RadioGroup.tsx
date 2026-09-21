import React, { forwardRef, useState, useId } from 'react';
import { cn } from '../../utils/cn';
import { RadioGroupContext } from './RadioGroupContext';
import { useFormField } from '../../context/FormFieldContext';
import type { RadioSize, RadioVariant, RadioLabelPosition } from './Radio';

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Group form field name */
  name?: string;
  /** Controlled active value */
  value?: string;
  /** Default uncontrolled active value */
  defaultValue?: string;
  /** Callback fired on selection change */
  onChange?: (value: string) => void;
  /** Layout flow orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Size inherited by child radio items */
  size?: RadioSize;
  /** Visual variant inherited by child radio items */
  variant?: RadioVariant;
  /** Label position inherited by child radio items */
  labelPosition?: RadioLabelPosition;
  /** Top-level group heading label */
  label?: string;
  /** Auxiliary description for the group */
  description?: string;
  /** Validation error message */
  error?: string;
  /** Explicit error/invalid state indicator */
  isInvalid?: boolean;
  /** Whether selection in this group is required for form submission */
  required?: boolean;
  /** Disables all radio items in the group */
  disabled?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value: controlledValue,
      defaultValue,
      onChange,
      orientation = 'vertical',
      size = 'md',
      variant = 'default',
      labelPosition = 'right',
      label,
      description,
      error,
      isInvalid: explicitIsInvalid,
      required: explicitRequired,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const formField = useFormField();
    const generatedName = useId();

    const resolvedDisabled = disabled || formField?.disabled || false;
    const resolvedRequired = explicitRequired ?? formField?.required ?? false;
    const resolvedIsInvalid = Boolean(explicitIsInvalid || error || formField?.isInvalid);
    const resolvedName = name || (formField?.id ? `${formField.id}-radiogroup` : `radio-group-${generatedName}`);

    const [uncontrolledValue, setUncontrolledValue] = useState<string | undefined>(
      defaultValue
    );

    const isControlled = controlledValue !== undefined;
    const activeValue = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = (val: string) => {
      if (!isControlled) {
        setUncontrolledValue(val);
      }
      onChange?.(val);
    };

    const orientationClasses = {
      vertical: 'flex-col gap-3',
      horizontal: 'flex-row flex-wrap gap-5',
    };

    return (
      <RadioGroupContext.Provider
        value={{
          name: resolvedName,
          value: activeValue,
          onChange: handleValueChange,
          size,
          variant,
          labelPosition,
          disabled: resolvedDisabled,
          required: resolvedRequired,
          isInvalid: resolvedIsInvalid,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-invalid={resolvedIsInvalid}
          aria-required={resolvedRequired}
          aria-labelledby={props['aria-labelledby'] || (formField?.id ? `${formField.id}-label` : undefined)}
          aria-describedby={
            props['aria-describedby'] ||
            (formField?.id && formField.error
              ? `${formField.id}-error`
              : formField?.id && formField.helperText
              ? `${formField.id}-helper`
              : undefined)
          }
          className={cn('flex flex-col gap-2', className)}
          {...props}
        >
          {(label || description) && (
            <div className="flex flex-col gap-0.5 select-none mb-1">
              {label && (
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {label}
                </span>
              )}
              {description && (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {description}
                </span>
              )}
            </div>
          )}

          <div className={cn('flex', orientationClasses[orientation])}>
            {children}
          </div>

          {error && (!formField || formField.error !== error) && (
            <p className="text-xs font-medium text-red-500 mt-1" role="alert">{error}</p>
          )}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
