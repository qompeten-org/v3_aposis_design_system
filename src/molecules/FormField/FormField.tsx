import React from 'react';
import { cn } from '../../utils/cn';

export interface FormFieldProps {
  id?: string;
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  required,
  error,
  helperText,
  children,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-1.5 w-full', className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-slate-700 flex items-center gap-1"
        >
          <span>{label}</span>
          {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-xs font-medium text-rose-500 mt-0.5">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
};

FormField.displayName = 'FormField';
