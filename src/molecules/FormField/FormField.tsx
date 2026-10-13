import React, { useId } from 'react';
import { cn } from '../../utils/cn';
import { FormFieldContext } from '../../context/FormFieldContext';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required,
  error,
  helperText,
  disabled,
  children,
  className,
  ...props
}) => {
  const generatedId = useId();
  const fieldId = id || generatedId;

  return (
    <FormFieldContext.Provider
      value={{
        id: fieldId,
        error,
        helperText,
        required,
        disabled,
        isInvalid: Boolean(error),
      }}
    >
      <div id={id ? `${id}-container` : undefined} className={cn('flex flex-col gap-1.5 w-full', className)} {...props}>
        {label && (
          <label
            id={`${fieldId}-label`}
            htmlFor={fieldId}
            className={cn(
              'text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1 select-none',
              disabled && 'opacity-60 cursor-not-allowed'
            )}
          >
            <span>{label}</span>
            {required && <span className="text-rose-500 font-bold" aria-hidden="true">*</span>}
          </label>
        )}
        {children}
        {error ? (
          <p id={`${fieldId}-error`} role="alert" className="text-xs font-medium text-rose-500 mt-0.5">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${fieldId}-helper`} className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {helperText}
          </p>
        ) : null}
      </div>
    </FormFieldContext.Provider>
  );
};

FormField.displayName = 'FormField';
