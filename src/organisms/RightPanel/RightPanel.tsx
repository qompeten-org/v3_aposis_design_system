import React from 'react';
import { IconX, IconPlus, IconRefresh, TablerIcon } from '@tabler/icons-react';

export interface RightPanelTab {
  id: string;
  label: string;
}

export interface ActivityItem {
  id: string;
  userName: string;
  timestamp: string;
  description: string;
  badgeText?: string;
}

export interface RightPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
  showHeaderIcon?: boolean;
  headerIcon?: TablerIcon;
  title?: string;
  showCloseButton?: boolean;
  tabs?: RightPanelTab[];
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  descriptionText?: string;
  showSlotComponent?: boolean;
  customSlot?: React.ReactNode;
  activities?: ActivityItem[];
  children?: React.ReactNode;
  showFooter?: boolean;
  cancelLabel?: string;
  onCancel?: () => void;
  primaryLabel?: string;
  onPrimaryAction?: () => void;
  widthClass?: string;
  className?: string;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  isOpen = true,
  onClose,
  showHeaderIcon = true,
  headerIcon: HeaderIcon = IconPlus,
  title = 'Title',
  showCloseButton = true,
  tabs = [
    { id: 'tab-1', label: 'Tab' },
    { id: 'tab-2', label: 'Tab' },
    { id: 'tab-3', label: 'Tab' },
    { id: 'tab-4', label: 'Tab' },
    { id: 'tab-5', label: 'Tab' },
    { id: 'tab-6', label: 'Tab' },
  ],
  activeTabId = 'tab-1',
  onTabChange,
  descriptionText = 'Lorem ipsum dolor sit lorem a amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
  showSlotComponent = true,
  customSlot,
  activities = [],
  children,
  showFooter = true,
  cancelLabel = 'Batal',
  onCancel,
  primaryLabel = 'Button',
  onPrimaryAction,
  widthClass = 'w-[440px]',
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <aside
      className={`flex flex-col h-full bg-white dark:bg-slate-900 border-l border-[#E2E8F0] dark:border-slate-800 font-['Lexend'] shadow-lg transition-all duration-300 ${widthClass} ${className}`}
    >
      {/* 1. Header Section */}
      <div className="pt-5 px-5 bg-white dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-800 flex flex-col gap-2 shrink-0">
        <div className="relative flex items-center justify-between pb-4 pr-10">
          <div className="flex items-center gap-2.5">
            {showHeaderIcon && (
              <div className="w-5 h-5 flex items-center justify-center text-[#0F172A] dark:text-slate-200">
                <HeaderIcon size={20} stroke={1.5} />
              </div>
            )}
            <h2 className="text-base font-medium text-[#0F172A] dark:text-slate-100 leading-[22.4px]">
              {title}
            </h2>
          </div>

          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-0 -top-1.5 p-2 rounded-xl text-[#0F172A] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              aria-label="Close Panel"
            >
              <IconX size={16} stroke={1.5} />
            </button>
          )}
        </div>

        {/* Horizontal Tab Navigation */}
        {tabs && tabs.length > 0 && (
          <div className="flex items-center overflow-x-auto custom-scrollbar border-b border-[#E2E8F0] dark:border-slate-800">
            {tabs.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange && onTabChange(tab.id)}
                  className={`px-4 py-2 text-sm transition-colors whitespace-nowrap border-b-2 font-['Lexend'] ${
                    isActive
                      ? 'border-[#0F62FE] text-[#0043CE] dark:text-blue-400 font-semibold'
                      : 'border-transparent text-[#475569] dark:text-slate-400 font-normal hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 border-t border-[#E2E8F0] dark:border-slate-800 border-b custom-scrollbar">
        {/* Paragraph Description */}
        {descriptionText && (
          <p className="text-sm text-[#475569] dark:text-slate-300 leading-[18.2px]">
            {descriptionText}
          </p>
        )}

        {/* Slot / Placeholder Component */}
        {showSlotComponent && (
          customSlot ? (
            customSlot
          ) : (
            <div className="p-4 bg-[#D0E2FF] dark:bg-blue-950/60 border border-[#0F62FE] rounded-xl flex flex-col gap-4">
              <div className="w-6 h-6 flex items-center justify-center text-[#0F62FE] dark:text-blue-400">
                <IconRefresh size={20} stroke={2} />
              </div>
              <div className="space-y-1">
                <div className="text-base font-medium text-[#0F62FE] dark:text-blue-300 leading-[22.4px]">
                  Slot component
                </div>
                <div className="text-sm text-[#0F62FE] dark:text-blue-200 leading-[18.2px]">
                  Optional placeholder component. Replace it with any component using the “Component Instance” swapper, or delete if not needed.
                </div>
              </div>
            </div>
          )
        )}

        {/* Custom Children Container */}
        {children}

        {/* Activity Log Feed Cards */}
        {activities && activities.length > 0 && (
          <div className="flex flex-col gap-4 pt-2">
            {activities.map((act) => (
              <div
                key={act.id}
                className="p-5 bg-white dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-800 rounded-2xl shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-start gap-2">
                  {/* Circle Avatar Badge */}
                  <div className="w-9 h-9 rounded-full bg-[#EDF5FF] dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold text-[#475569] dark:text-slate-300">
                      {act.badgeText || 'ID'}
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-base font-medium text-[#0F172A] dark:text-slate-100 leading-[22.4px]">
                      {act.userName}
                    </span>
                    <span className="text-xs text-[#64748B] dark:text-slate-400 tracking-[0.12px]">
                      {act.timestamp}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#475569] dark:text-slate-300 leading-[18.2px]">
                  {act.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Bottom Sticky Action Bar */}
      {showFooter && (
        <div className="p-5 bg-[#EDF5FF] dark:bg-slate-800/80 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-3 rounded-xl text-sm font-normal text-[#0F172A] dark:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onPrimaryAction}
            className="px-4 py-3 rounded-xl bg-[#0F62FE] hover:bg-blue-700 text-white text-sm font-normal transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            {primaryLabel}
          </button>
        </div>
      )}
    </aside>
  );
};

export default RightPanel;