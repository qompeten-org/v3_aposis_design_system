import React from 'react';

export interface ScoreListItemProps {
  score?: number | string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  progress?: number;
  tags?: string[];
  showTags?: boolean;
  disabled?: boolean;
  className?: string;
}

export const ScoreListItem: React.FC<ScoreListItemProps> = ({
  score = 0,
  title = 'Subtitle',
  subtitle = 'Subtitle',
  icon,
  progress = 0,
  tags = [],
  showTags = true,
  disabled = false,
  className = '',
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const badgeStyle = disabled
    ? 'bg-slate-100 text-slate-400 border-slate-200'
    : 'bg-[rgba(15,98,254,0.12)] text-[#0F62FE] border-[#0F62FE]';

  return (
    <div
      className={`w-full py-3 flex flex-col gap-3 border-b border-[#E2E8F0] ${
        disabled ? 'opacity-60' : ''
      } ${className}`}
    >
      <div className="flex items-start w-full gap-4">
        {/* 1. Score Badge */}
        <div
          className={`w-[56px] h-[44px] px-2 py-[11px] rounded-[12px] border flex items-center justify-center font-['Lexend'] font-medium text-[16px] leading-[22.4px] ${badgeStyle}`}
        >
          {score}
        </div>

        {/* 2. Main Content Area */}
        <div className="flex flex-col flex-1 gap-2">
          {/* Title */}
          <div className="text-[14px] font-['Lexend'] font-normal text-[#0F172A] leading-[18.2px]">
            {title}
          </div>
          <div className="flex flex-col gap-1">
            {subtitle && (
            <div className="flex items-center gap-2">
                {icon && <span className="text-[#475569]">{icon}</span>}
                <span className="text-[12px] font-['Lexend'] text-[#475569] leading-[18px] tracking-[0.12px]">
                {subtitle}
                </span>
            </div>
            )}

            {/* Progress Bar & Percentage */}
            <div className="flex items-center w-full gap-3">
              {/* Line Container */}
              <div className="flex-1 h-[8px] bg-[#E2E8F0] rounded-full relative overflow-hidden">
                <div
                  className="h-full bg-[#0F62FE] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${clampedProgress}%` }}
                />
              </div>

              {/* Percentage Text */}
              <span className="w-[36px] text-right text-[12px] font-['Lexend'] text-[#0F172A] leading-[18px]">
                {clampedProgress}%
              </span>
            </div>

            {/* 3. Tags List (Flex Wrap) */}
            {showTags && tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {tags.map((tagText, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1 bg-[#E2E8F0] border border-[#CBD5E1] rounded-full flex items-center justify-center"
                  >
                    <span className="text-[11px] font-['Lexend'] font-semibold text-[#475569] leading-[15.95px] tracking-[0.66px]">
                      {tagText}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};