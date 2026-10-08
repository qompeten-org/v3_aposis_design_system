import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ProgressStepItem {
  id?: string | number;
  label: string;
  description?: string;
}

export const mockProgressIndicatorSteps: ProgressStepItem[] = [
  { id: 'step-1', label: 'Informasi Akun', description: 'Data pribadi' },
  { id: 'step-2', label: 'Verifikasi', description: 'Konfirmasi OTP' },
  { id: 'step-3', label: 'Pembayaran', description: 'Metode transfer' },
  { id: 'step-4', label: 'Selesai', description: 'Akun aktif' },
];

export interface ProgressIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  steps?: ProgressStepItem[];
  currentStep: number; // Index step aktif (0-indexed, misal step 1 = index 0)
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  children?: React.ReactNode;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  id,
  steps = mockProgressIndicatorSteps,
  currentStep,
  onStepClick,
  className,
  children,
  ...props
}) => {
  return (
    <div id={id} className={cn('w-full flex flex-col items-center gap-4 font-sans', className)} {...props}>
      <div className="w-full flex items-start justify-center">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id ?? index}>
            {/* Step Node Container */}
            <div
              id={id ? `${id}-step-${step.id ?? index}` : undefined}
              className={cn(
                'relative flex flex-col items-center gap-2 group',
                onStepClick && 'cursor-pointer'
              )}
              onClick={() => onStepClick?.(index)}
            >
              {/* Circle Indicator */}
              <div className="relative z-10 flex items-center justify-center w-8 h-8">
                {isCompleted ? (
                  // Completed State: Blue Circle with Check Icon
                  <div className="w-8 h-8 rounded-full bg-[#0F62FE] flex items-center justify-center text-white transition-all duration-200">
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  </div>
                ) : isCurrent ? (
                  // Current State: White Circle with Blue Outline & Blue Text
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 ring-2 ring-[#0F62FE] dark:ring-blue-500 ring-inset flex items-center justify-center text-[#0F62FE] dark:text-blue-400 font-semibold text-base transition-all duration-200">
                    {index + 1}
                  </div>
                ) : (
                  // Upcoming / Disabled State: White Circle with Gray Outline
                  <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 ring-1 ring-[#94A3B8] dark:ring-slate-700 ring-inset flex items-center justify-center text-[#64748B] dark:text-slate-400 font-semibold text-base transition-all duration-200">
                    {index + 1}
                  </div>
                )}
              </div>

              {/* Step Label */}
              <div className="flex flex-col items-center text-center max-w-[120px]">
                <span
                  className={cn(
                    'text-sm font-normal leading-[18.2px] transition-colors duration-200',
                    isCurrent || isCompleted
                      ? 'text-[#0F172A] dark:text-slate-100 font-medium'
                      : 'text-[#64748B] dark:text-slate-400'
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-[#94A3B8] dark:text-slate-500 mt-0.5">
                    {step.description}
                  </span>
                )}
              </div>
            </div>

            {/* Connecting Line */}
            {!isLast && (
              <div className="flex-1 max-w-[240px] min-w-[32px] pt-4 px-2">
                <div
                  className={cn(
                    'h-[2px] w-full transition-colors duration-300',
                    index < currentStep ? 'bg-[#0F62FE]' : 'bg-[#E2E8F0] dark:bg-slate-800'
                  )}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
      </div>
      {children && <div className="w-full flex justify-center">{children}</div>}
    </div>
  );
};