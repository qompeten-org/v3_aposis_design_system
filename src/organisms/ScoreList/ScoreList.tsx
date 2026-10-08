import React from 'react';
import { cn } from '../../utils/cn';

export interface ScoreListItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  id?: string;
  score?: number | string;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  progress?: number;
  tags?: string[];
  showTags?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const mockScoreListItems: ScoreListItemProps[] = [
  {
    score: '95',
    title: 'Penalaran Umum & Logika',
    subtitle: 'Waktu pengerjaan: 45 Menit',
    progress: 95,
    tags: ['Tinggi', 'Selesai'],
  },
  {
    score: '78',
    title: 'Pengetahuan Kuantitatif',
    subtitle: 'Waktu pengerjaan: 50 Menit',
    progress: 78,
    tags: ['Sedang', 'Perlu Evaluasi'],
  },
  {
    score: '62',
    title: 'Literasi Bahasa Inggris',
    subtitle: 'Waktu pengerjaan: 30 Menit',
    progress: 62,
    tags: ['Dasar'],
  },
];

export const ScoreListItem: React.FC<ScoreListItemProps> = ({
  id,
  score = 0,
  title = 'Subtitle',
  subtitle = 'Subtitle',
  icon,
  progress = 0,
  tags = [],
  showTags = true,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const badgeStyle = disabled
    ? 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800 dark:text-slate-500 dark:border-slate-700'
    : 'bg-[rgba(15,98,254,0.12)] text-[#0F62FE] border-[#0F62FE] dark:text-blue-400 dark:border-blue-500';

  return (
    <div
      id={id}
      className={cn(
        'w-full py-3 flex flex-col gap-3 border-b border-slate-200 dark:border-slate-800 font-sans',
        disabled && 'opacity-60',
        className
      )}
      {...props}
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
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center"
                    >
                      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 tracking-[0.66px]">
                        {tagText}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      {children}
    </div>
  );
};

export interface ScoreListProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  items?: ScoreListItemProps[];
  children?: React.ReactNode;
  className?: string;
}

export const ScoreList: React.FC<ScoreListProps> = ({
  id,
  items = mockScoreListItems,
  children,
  className,
  ...props
}) => {
  return (
    <div id={id} className={cn('w-full flex flex-col', className)} {...props}>
      {items.map((item, idx) => (
        <ScoreListItem key={idx} id={id ? `${id}-item-${idx}` : undefined} {...item} />
      ))}
      {children}
    </div>
  );
};