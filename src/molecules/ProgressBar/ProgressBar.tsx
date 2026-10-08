import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { PlusIcon } from 'lucide-react';

export interface ProgressBarProps {
  value: number;
  label?: string;
  icon?: React.ReactNode;
  showValue?: boolean;
  size?: 'sm' | 'md';
  editableLabel?: boolean; // Prop opsional jika label mau editable
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label: initialLabel,
  icon,
  showValue = true,
  size = 'sm',
  editableLabel = false,
  className,
}) => {
  // State internal untuk label
  const [currentLabel, setCurrentLabel] = useState(initialLabel);

  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const trackHeightClass = size === 'md' ? 'h-2 rounded-full' : 'h-1 rounded-full';

  return (
    <div className={cn("w-full flex flex-col gap-1 font-['Lexend'] text-xs", className)}>
      {/* Header Area */}
      {(currentLabel || icon || editableLabel) && (
        <div className="inline-flex items-center gap-2 text-[#475569] dark:text-white">
          {icon ?? <PlusIcon className="w-3.5 h-3.5 stroke-current" />}
          {editableLabel ? (
            <input
              type="text"
              value={currentLabel ?? ''}
              onChange={(e) => setCurrentLabel(e.target.value)}
              className="bg-transparent border-b border-slate-300 dark:border-slate-700 dark:text-white focus:outline-none focus:border-blue-500 font-normal leading-[18px] tracking-[0.12px]"
            />
          ) : (
            <span className="font-normal leading-[18px] tracking-[0.12px]">
              {currentLabel}
            </span>
          )}
        </div>
      )}

      {/* Track & Value Container */}
      <div className="inline-flex items-center w-full gap-3">
        <div className="relative flex items-center flex-1 h-3">
          <div className={cn("w-full bg-[#E2E8F0] dark:bg-slate-800 overflow-hidden relative", trackHeightClass)}>
            <div
              className="h-full bg-[#0F62FE] transition-all duration-300 ease-in-out"
              style={{ width: `${normalizedValue}%` }}
            />
          </div>

          <div className="absolute right-0 w-1.5 h-2 flex items-center justify-center pointer-events-none">
            <div className="w-1 h-1 bg-[#0F62FE] rounded-full" />
          </div>
        </div>

        {showValue && (
          <span className="w-9 text-right font-normal text-[#0F172A] dark:text-white leading-[18px] tracking-[0.12px] select-none">
            {normalizedValue}%
          </span>
        )}
      </div>
    </div>
  );
};