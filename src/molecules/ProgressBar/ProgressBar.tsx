import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressBarProps {
  value: number; // Nilai persentase (0 - 100)
  label?: string;
  icon?: React.ReactNode;
  showValue?: boolean;
  size?: 'sm' | 'md'; // Thickness: sm (4px) atau md (8px)
  className?: string;
}

const PlusIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#475569] shrink-0"
  >
    <path
      d="M8 3.33334V12.6667M3.33334 8H12.6667"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  icon,
  showValue = true,
  size = 'sm',
  className,
}) => {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const trackHeightClass = size === 'md' ? 'h-2 rounded-full' : 'h-1 rounded-full';

  return (
    <div className={cn("w-full flex flex-col gap-1 font-['Lexend'] text-xs", className)}>
      {/* Header Area */}
      {(label || icon) && (
        <div className="inline-flex items-center gap-2 text-[#475569]">
          {icon ?? <PlusIcon />}
          <span className="font-normal leading-[18px] tracking-[0.12px]">
            {label}
          </span>
        </div>
      )}

      {/* Track & Value Container */}
      <div className="inline-flex items-center w-full gap-3">
        <div className="relative flex items-center flex-1 h-3">
          {/* Track Bar (Dinamis tinggi sesuai size) */}
          <div className={cn("w-full bg-[#E2E8F0] overflow-hidden relative", trackHeightClass)}>
            <div
              className="h-full bg-[#0F62FE] transition-all duration-300 ease-in-out"
              style={{ width: `${normalizedValue}%` }}
            />
          </div>

          {/* End Dot */}
          <div className="absolute right-0 w-1.5 h-2 flex items-center justify-center pointer-events-none">
            <div className="w-1 h-1 bg-[#0F62FE] rounded-full" />
          </div>
        </div>

        {/* Text Percentage */}
        {showValue && (
          <span className="w-9 text-right font-normal text-[#0F172A] leading-[18px] tracking-[0.12px] select-none">
            {normalizedValue}%
          </span>
        )}
      </div>
    </div>
  );
};