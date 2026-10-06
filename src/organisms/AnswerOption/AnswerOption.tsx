import React from 'react';

export type AnswerOptionType = 'radio' | 'checkbox';

export interface AnswerOptionProps {
  type?: AnswerOptionType;
  label?: string;
  value?: string;
  placeholder?: string;
  helperText?: string;
  selected?: boolean;
  disabled?: boolean;
  onTextChange?: (value: string) => void;
  onSelect?: () => void;
  className?: string;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  type = 'radio',
  label = 'Label',
  value = '',
  placeholder = 'Input Text',
  helperText = 'Helper text',
  selected = false,
  disabled = false,
  onTextChange,
  onSelect,
  className = '',
}) => {
  const containerBg = selected
    ? 'bg-[rgba(15,98,254,0.06)]'
    : 'bg-transparent hover:bg-slate-50';

  const borderInteractive = selected
    ? 'border-b-2 border-[#0F62FE]'
    : 'border-b border-[#CBD5E1]';

  const helperTextColor = selected
    ? 'text-[#0F62FE] font-bold'
    : 'text-[#64748B] font-normal';

  return (
    <div
      onClick={!disabled ? onSelect : undefined}
      className={`w-full min-h-[56px] px-2 py-1 rounded-[12px] transition-colors duration-150 ease-in-out cursor-pointer flex items-center gap-4 ${containerBg} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      {/* Selector Icon (Radio / Checkbox) */}
      <div className="flex items-center justify-center min-w-[20px] h-[20px]">
        {type === 'radio' ? (
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className="w-[15px] h-[15px] rounded-full border-[1.5px] border-[#0F172A] flex items-center justify-center">
              {selected && (
                <div className="w-[8px] h-[8px] bg-[#0F172A] rounded-full" />
              )}
            </div>
          </div>
        ) : (
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div
              className={`w-[16px] h-[16px] rounded-[4px] border-[1.5px] border-[#0F172A] flex items-center justify-center ${
                selected ? 'bg-[#0F172A]' : 'bg-transparent'
              }`}
            >
              {selected && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex items-center gap-2">
        {/* Label */}
        <div className="py-[15px] flex items-center">
          <span className="text-[14px] font-['Lexend'] font-normal text-[#475569]">
            {label}
          </span>
        </div>

        {/* Input Text Field & Helper Text Wrapper */}
        <div className="flex-1 flex items-center gap-2">
          <div className={`flex-1 ${borderInteractive} flex items-center`}>
            <input
              type="text"
              value={value}
              placeholder={placeholder}
              disabled={disabled}
              onChange={(e) => onTextChange?.(e.target.value)}
              onClick={(e) => e.stopPropagation()} // Mencegah trigger onSelect saat mengetik
              className="w-full h-12 px-4 py-[15px] bg-transparent text-[14px] font-['Lexend'] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none"
            />
          </div>

          {/* Helper Text */}
          {helperText && (
            <div className="w-[100px] py-[15px] overflow-hidden flex items-start">
              <span
                className={`text-[12px] font-['Lexend'] leading-[18px] tracking-[0.12px] truncate ${helperTextColor}`}
              >
                {helperText}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};