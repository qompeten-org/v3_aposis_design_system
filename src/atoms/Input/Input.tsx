import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      error,
      leftIcon,
      rightIcon,
      inputSize = 'md',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'text-xs py-1.5 px-3 rounded-lg',
      md: 'text-sm py-2.5 px-3.5 rounded-xl',
      lg: 'text-base py-3 px-4 rounded-xl',
    };

    return (
      <div className={cn('relative w-full', containerClassName)}>
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full bg-white text-slate-900 border transition-colors duration-150',
            'placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-0',
            'disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed',
            error
              ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
              : 'border-slate-300 hover:border-slate-400 focus:border-aposis-500 focus:ring-aposis-200',
            sizeClasses[inputSize],
            leftIcon && (inputSize === 'sm' ? 'pl-8' : inputSize === 'lg' ? 'pl-11' : 'pl-10'),
            rightIcon && (inputSize === 'sm' ? 'pr-8' : inputSize === 'lg' ? 'pr-11' : 'pr-10'),
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
