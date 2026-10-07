import React, { useState } from 'react';
import { Input, InputProps } from '../Input/Input';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {
  state?: 'default' | 'warning' | 'error';
  helperText?: string;
  label?: string;
}

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current">
    <path d="M1.333 8S4 3.333 8 3.333 14.667 8 14.667 8 12 12.667 8 12.667 1.333 8 1.333 8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current">
    <path d="M2 2l12 12M6.5 6.5a2 2 0 002.83 2.83M1.333 8S4 3.333 8 3.333c1.5 0 2.8.4 3.9 1.05M14.667 8S12 12.667 8 12.667c-1.5 0-2.8-.4-3.9-1.05" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-500 dark:text-amber-400 shrink-0">
    <path d="M8 1.333L1.333 13.333h13.334L8 1.333zM8 6v3.333M8 11.333h.007" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  helperText,
  state = 'default',
  warning,
  error,
  inputSize = 'md',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const activeWarning = warning || (state === 'warning' ? helperText : undefined);
  const activeError = error || (state === 'error' ? helperText : undefined);

  return (
    <div className="flex flex-col w-full gap-1.5 font-sans">
      {label && (
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <Input
        {...props}
        inputSize={inputSize}
        type={showPassword ? 'text' : 'password'}
        warning={activeWarning}
        error={activeError}
        rightIcon={
          <div className="flex items-center gap-1.5">
            {/* Tampilkan Ikon Warning jika state warning */}
            {activeWarning && <WarningIcon />}
            
            {/* Button Toggle Eye dengan style Dark Mode */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="p-1 transition-colors rounded-md text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        }
      />

      {/* Helper / Warning / Error message di bawah input */}
      {(helperText || activeWarning || activeError) && (
        <span
          className={`text-xs mt-0.5 ${
            activeError
              ? 'text-rose-500'
              : activeWarning
              ? 'text-amber-600 dark:text-amber-400'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {activeError || activeWarning || helperText}
        </span>
      )}
    </div>
  );
};

PasswordInput.displayName = 'PasswordInput';