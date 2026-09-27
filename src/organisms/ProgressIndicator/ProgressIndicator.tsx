import React from 'react';
import { Check } from 'lucide-react';

export interface ProgressStepItem {
  id?: string | number;
  label: string;
  description?: string;
}

export interface ProgressIndicatorProps {
  steps: ProgressStepItem[];
  currentStep: number; // Index step aktif (0-indexed, misal step 1 = index 0)
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
  className = '',
}) => {
  return (
    <div className={`w-full flex items-start justify-center font-['Lexend'] ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id ?? index}>
            {/* Step Node Container */}
            <div
              className={`relative flex flex-col items-center gap-2 group ${
                onStepClick ? 'cursor-pointer' : ''
              }`}
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
                  <div className="w-8 h-8 rounded-full bg-white ring-2 ring-[#0F62FE] ring-inset flex items-center justify-center text-[#0F62FE] font-semibold text-base transition-all duration-200">
                    {index + 1}
                  </div>
                ) : (
                  // Upcoming / Disabled State: White Circle with Gray Outline
                  <div className="w-8 h-8 rounded-full bg-white ring-1 ring-[#94A3B8] ring-inset flex items-center justify-center text-[#64748B] font-semibold text-base transition-all duration-200">
                    {index + 1}
                  </div>
                )}
              </div>

              {/* Step Label */}
              <div className="flex flex-col items-center text-center max-w-[120px]">
                <span
                  className={`text-sm font-normal leading-[18.2px] transition-colors duration-200 ${
                    isCurrent || isCompleted
                      ? 'text-[#0F172A] font-medium'
                      : 'text-[#64748B]'
                  }`}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-[#94A3B8] mt-0.5">
                    {step.description}
                  </span>
                )}
              </div>
            </div>

            {/* Connecting Line */}
            {!isLast && (
              <div className="flex-1 max-w-[240px] min-w-[32px] pt-4 px-2">
                <div
                  className={`h-[2px] w-full transition-colors duration-300 ${
                    index < currentStep ? 'bg-[#0F62FE]' : 'bg-[#E2E8F0]'
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};