import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { useFormField } from '../../context/FormFieldContext';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  warning?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: 'xs' | 'sm' | 'md' | 'lg';
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      error,
      warning,
      leftIcon,
      rightIcon,
      inputSize = 'md',
      disabled,
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const formField = useFormField();
    const resolvedId = id || formField?.id;
    const resolvedError = error || formField?.error;
    const resolvedDisabled = disabled ?? formField?.disabled;
    const sizeClasses = {
      xs: 'text-xs py-0.5 px-2.5 rounded-md h-6',
      sm: 'text-xs py-1.5 px-3 rounded-lg h-8',
      md: 'text-sm py-2.5 px-3.5 rounded-xl h-10',
      lg: 'text-base py-3 px-4 rounded-xl h-12',
    };

    return (
      <div className={cn('relative w-full', containerClassName)}>
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3 pointer-events-auto text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={resolvedId}
          type={type}
          disabled={resolvedDisabled}
          aria-invalid={Boolean(resolvedError)}
          aria-describedby={formField?.id && formField.error ? `${formField.id}-error` : undefined}
          className={cn(
            'w-full bg-white text-slate-900 border transition-colors duration-150',
            'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
            resolvedError
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
              : warning
              ? 'border-amber-500 focus:border-amber-600 focus:ring-amber-200'
              : 'border-slate-300 hover:border-slate-400 focus:border-aposis-500 focus:ring-aposis-200',
            sizeClasses[inputSize],
            leftIcon && (inputSize === 'xs' ? 'pl-7' : inputSize === 'sm' ? 'pl-8' : inputSize === 'lg' ? 'pl-11' : 'pl-10'),
            rightIcon && (inputSize === 'xs' ? 'pr-7' : inputSize === 'sm' ? 'pr-8' : inputSize === 'lg' ? 'pr-11' : 'pr-10'),
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-3 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
