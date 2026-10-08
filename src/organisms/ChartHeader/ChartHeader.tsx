import React from 'react';
import { Plus, SlidersHorizontal, Table, Maximize2, MoreVertical, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ChartTypeOption {
  id: string;
  label: string;
}

export const mockChartTypes: ChartTypeOption[] = [
  { id: 'bar', label: 'Bar' },
  { id: 'treemap', label: 'Treemap' },
  { id: 'pie', label: 'Pie' },
  { id: 'sankey', label: 'Sankey' },
];

export interface ChartHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  id?: string;
  title: string;
  subtitle?: string;
  chartTypes?: ChartTypeOption[];
  activeChartType?: string;
  onChartTypeChange?: (id: string) => void;
  activeTags?: string[];
  onRemoveTag?: (tag: string) => void;
  onFilterClick?: () => void;
  onTableClick?: () => void;
  onExpandClick?: () => void;
  onMoreClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const ChartHeader: React.FC<ChartHeaderProps> = ({
  id,
  title,
  subtitle,
  chartTypes = mockChartTypes,
  activeChartType = 'bar',
  onChartTypeChange,
  activeTags = [],
  onRemoveTag,
  onFilterClick,
  onTableClick,
  onExpandClick,
  onMoreClick,
  className,
  children,
  ...props
}) => {
  return (
    <div id={id} className={cn('w-full flex flex-col gap-3 p-4 bg-white dark:bg-slate-900 font-sans', className)} {...props}>
      {/* Top Bar: Chart Type Pills & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Side: Chart Type Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {chartTypes.map((type) => {
            const isSelected = activeChartType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => onChartTypeChange?.(type.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-[11px] font-semibold tracking-[0.66px] transition-all duration-150 outline-none ${
                  isSelected
                    ? 'bg-[#283445] text-white ring-1 ring-white ring-inset'
                    : 'bg-[#E2E8F0] text-[#475569] ring-1 ring-[#CBD5E1] ring-inset hover:bg-slate-300'
                }`}
              >
                <Plus className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#0F172A]'}`} />
                <span>{type.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Side: Action Controls */}
        <div className="flex items-center gap-1">
          {/* Filter Button */}
          <button
            onClick={onFilterClick}
            className="inline-flex items-center gap-2 px-4 py-[7px] text-sm text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors"
          >
            <span>Filter</span>
            <SlidersHorizontal className="w-4 h-4 text-[#0F172A]" />
          </button>

          <div className="h-4 w-[1px] bg-slate-200 mx-1" />

          {/* Table View Button */}
          <button
            onClick={onTableClick}
            className="p-2 text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors"
            title="Table view"
          >
            <Table className="w-4 h-4" />
          </button>

          {/* Expand/Fullscreen Button */}
          <button
            onClick={onExpandClick}
            className="p-2 text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors"
            title="Expand"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* More Option Button */}
          <button
            onClick={onMoreClick}
            className="p-2 text-[#0F172A] hover:bg-slate-100 rounded-lg transition-colors"
            title="More options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle Row: Active Filter Tags*/}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {activeTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#E2E8F0] text-[#475569] text-xs font-medium"
            >
              {tag}
              <button
                onClick={() => onRemoveTag?.(tag)}
                className="hover:text-slate-900 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Bottom Row: Title & Subtitle */}
      <div className="flex flex-col gap-0.5 mt-1">
        <h3 className="text-base font-medium text-[#475569] dark:text-slate-200 leading-snug">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs font-normal text-[#475569] dark:text-slate-400 tracking-[0.12px]">
            {subtitle}
          </p>
        )}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};