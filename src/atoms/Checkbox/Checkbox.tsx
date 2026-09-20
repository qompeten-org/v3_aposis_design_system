import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Check } from 'lucide-react';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, disabled, id, checked, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex items-start gap-2.5">
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            checked={checked}
            className={cn(
              'peer appearance-none w-4 h-4 rounded-md border transition-all duration-150',
              'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
              'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-aposis-400',
              'checked:bg-aposis-600 checked:border-aposis-600',
              error ? 'border-rose-400' : 'border-slate-300 hover:border-aposis-500',
              className
            )}
            {...props}
          />
          <Check className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-150 stroke-[3]" />
        </div>
        {(label || description) && (
          <div className="flex flex-col select-none">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  'text-sm font-medium text-slate-700 cursor-pointer',
                  disabled && 'opacity-60 cursor-not-allowed',
                  error && 'text-rose-600'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-xs text-slate-500 mt-0.5">{description}</span>
            )}
            {error && <span className="text-xs text-rose-500 mt-0.5">{error}</span>}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
