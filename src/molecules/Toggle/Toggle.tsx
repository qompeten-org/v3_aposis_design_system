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
            'text-xs font-normal text-slate-600 dark:text-slate-400 select-none cursor-pointer',
            disabled && 'opacity-60 cursor-not-allowed'
          )}
        >
          {label}
        </label>
      )}

      <div className="flex items-center gap-2">
        <button
          id={toggleId}
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleToggle}
          className={cn(
            'w-12 h-6 p-[3px] rounded-full flex items-center transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
            isChecked ? 'bg-emerald-700 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start',
            disabled && 'opacity-60 cursor-not-allowed'
          )}
        >
          <span className="w-[18px] h-[18px] bg-white rounded-full shadow-md transition-transform duration-200 ease-in-out" />
        </button>

        {description && (
          <span
            onClick={handleToggle}
            className={cn(
              'text-sm font-normal text-slate-900 dark:text-slate-100 select-none cursor-pointer',
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