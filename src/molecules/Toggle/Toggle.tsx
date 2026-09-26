import React, { useId, useState } from 'react';
import { cn } from '../../utils/cn';

export interface ToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id?: string;
  label?: string;
  description?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({
  id,
  label,
  description,
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  className,
  ...props
}) => {
  const generatedId = useId();
  const toggleId = id || generatedId;

  const [isCheckedState, setIsCheckedState] = useState<boolean>(defaultChecked);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : isCheckedState;

  const handleToggle = () => {
    if (disabled) return;

    const nextState = !isChecked;
    if (!isControlled) {
      setIsCheckedState(nextState);
    }

    onChange?.(nextState);
  };

  return (
    <div className={cn('flex flex-col gap-2 w-full', className)} {...props}>
      {label && (
        <label
          htmlFor={toggleId}
          className={cn(
            'text-xs font-normal text-slate-600 dark:text-slate-400 select-none cursor-pointer transition-colors duration-150',
            !disabled && 'hover:text-slate-900 dark:hover:text-slate-200',
            disabled && 'opacity-60 cursor-not-allowed'
          )}
        >
          {label}
        </label>
      )}

      <div className="flex items-center gap-2.5">
        <button
          id={toggleId}
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleToggle}
          className={cn(
            'relative inline-flex h-6 w-12 shrink-0 cursor-pointer items-center rounded-full p-[3px] transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
            isChecked
              ? 'bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500'
              : 'bg-slate-300 hover:bg-slate-400/80 dark:bg-slate-700 dark:hover:bg-slate-600',
            disabled && 'opacity-60 cursor-not-allowed'
          )}
        >
          <span
            className={cn(
              'pointer-events-none block h-[18px] w-[18px] rounded-full bg-white shadow-md ring-0 transition-transform duration-300 ease-in-out transform',
              isChecked ? 'translate-x-6' : 'translate-x-0'
            )}
          />
        </button>

        {description && (
          <span
            onClick={handleToggle}
            className={cn(
              'text-sm font-normal text-slate-900 dark:text-slate-100 select-none cursor-pointer transition-colors duration-150',
              !disabled && 'hover:text-slate-700 dark:hover:text-slate-300',
              disabled && 'opacity-60 cursor-not-allowed'
            )}
          >
            {description}
          </span>
        )}
      </div>
    </div>
  );
};

Toggle.displayName = 'Toggle';