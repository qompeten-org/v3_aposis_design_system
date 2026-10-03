import React, { useState } from 'react';
import {
  IconChevronDown,
  IconChevronUp,
  IconPlus,
  IconSettings,
  IconSparkles,
  TablerIcon,
} from '@tabler/icons-react';

export interface LeftPanelNavItem {
  id: string;
  label: string;
  icon?: TablerIcon;
  badge?: string;
  disabled?: boolean;
  children?: LeftPanelNavItem[];
}

export interface LeftPanelNavGroup {
  subtitle?: string;
  items: LeftPanelNavItem[];
}

export interface LeftPanelProps {
  isCompact?: boolean;
  onToggleCompact?: () => void;
  logoUrl?: string;
  compactLogoUrl?: string;
  navGroups?: LeftPanelNavGroup[];
  selectedId?: string;
  onSelectNav?: (id: string) => void;
  showCtaBanner?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  onCtaClick?: () => void;
  ctaCustomSlot?: React.ReactNode;
  profileName?: string;
  profileCode?: string;
  profileAvatarUrl?: string;
  onProfileClick?: () => void;
  className?: string;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  isCompact = false,
  logoUrl = 'https://placehold.co/116x32?text=APOSIS',
  compactLogoUrl = 'https://placehold.co/32x32?text=A',
  navGroups = [],
  selectedId,
  onSelectNav,
  showCtaBanner = true,
  ctaTitle = 'Action State Title',
  ctaDescription = 'Description / helper text goes here',
  ctaButtonText = 'Button',
  onCtaClick,
  ctaCustomSlot,
  profileName = 'Link',
  profileCode = 'ABC',
  profileAvatarUrl,
  onProfileClick,
  className = '',
}) => {
  // State accordion sub-menu
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (id: string) => {
    setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside
      className={`flex flex-col h-full border-r border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 font-['Lexend'] p-4 transition-all duration-300 select-none ${
        isCompact ? 'w-20 items-center gap-1.5' : 'w-64 items-start gap-1.5'
      } ${className}`}
    >
      {/* 1. Header Logo Section */}
      <div
        className={`w-full py-2 flex items-center ${
          isCompact ? 'justify-center' : 'justify-start'
        }`}
      >
        {isCompact ? (
          <img
            src={compactLogoUrl}
            alt="Aposis Compact Logo"
            className="object-contain w-8 h-8 rounded"
          />
        ) : (
          <img
            src={logoUrl}
            alt="Aposis Logo"
            className="h-8 max-w-[120px] object-contain"
          />
        )}
      </div>

      {/* 2. Scrollable Navigation List */}
      <div className="flex-1 w-full overflow-y-auto space-y-3 pr-0.5 custom-scrollbar">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="w-full space-y-1">
            {/* Subtitle Section Header */}
            {group.subtitle && (
              <div
                className={`w-full h-4 text-[11px] font-semibold text-[#64748B] dark:text-slate-400 tracking-[0.66px] uppercase ${
                  isCompact ? 'text-center' : 'text-left px-1'
                }`}
              >
                {isCompact ? '...' : group.subtitle}
              </div>
            )}

            {/* Nav Items */}
            {group.items.map((item) => {
              const isSelected = selectedId === item.id;
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = !!expandedMenus[item.id];
              const IconComp = item.icon || IconPlus;

              return (
                <div key={item.id} className="w-full space-y-1">
                  {/* Parent Item */}
                  <button
                    type="button"
                    disabled={item.disabled}
                    onClick={() => {
                      if (hasChildren) {
                        toggleSubMenu(item.id);
                      } else if (onSelectNav) {
                        onSelectNav(item.id);
                      }
                    }}
                    title={isCompact ? item.label : undefined}
                    className={`w-full flex items-center rounded-lg text-sm transition-all ${
                      isCompact
                        ? 'p-2 justify-center gap-0'
                        : 'px-4 py-1.5 justify-between gap-3'
                    } ${
                      item.disabled
                        ? 'opacity-40 cursor-not-allowed text-[#0F172A]/24 dark:text-slate-600'
                        : isSelected
                        ? 'bg-[#0F62FE]/[0.06] dark:bg-blue-950/40 text-[#0F172A] dark:text-slate-100 font-medium'
                        : 'text-[#475569] dark:text-slate-300 hover:bg-[#0F62FE]/12 hover:text-[#0F172A] dark:hover:bg-slate-800'
                    }`}
                  >
                    {/* Compact Mode View */}
                    {isCompact ? (
                      <IconComp size={16} stroke={1.5} className="shrink-0" />
                    ) : (
                      /* Expanded Mode View */
                      <>
                        <div className="flex items-center gap-3 overflow-hidden">
                          <IconComp size={16} stroke={1.5} className="shrink-0" />
                          <span className="truncate text-sm leading-[18.2px]">
                            {item.label}
                          </span>
                        </div>

                        {/* Right Control (Chevron Accordion or Badge) */}
                        {hasChildren ? (
                          isExpanded ? (
                            <IconChevronUp size={16} stroke={1.5} />
                          ) : (
                            <IconChevronDown size={16} stroke={1.5} />
                          )
                        ) : (
                          item.badge && (
                            <span className="px-1.5 py-0.5 text-[10px] bg-blue-100 text-blue-700 rounded-full font-semibold">
                              {item.badge}
                            </span>
                          )
                        )}
                      </>
                    )}
                  </button>

                  {/* Sub-menu Items (Level 2) - Only in Expanded Mode */}
                  {!isCompact && hasChildren && isExpanded && (
                    <div className="pl-6 ml-4 space-y-1 border-l-2 border-slate-100 dark:border-slate-800">
                      {item.children?.map((child) => {
                        const isChildSelected = selectedId === child.id;
                        const ChildIcon = child.icon;

                        return (
                          <button
                            key={child.id}
                            type="button"
                            disabled={child.disabled}
                            onClick={() => onSelectNav && onSelectNav(child.id)}
                            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors ${
                              child.disabled
                                ? 'opacity-40 cursor-not-allowed'
                                : isChildSelected
                                ? 'bg-[#0F62FE]/[0.06] text-[#0F62FE] font-medium'
                                : 'text-[#475569] hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            {ChildIcon && <ChildIcon size={14} stroke={1.5} />}
                            <span className="truncate">{child.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Divider antara grup */}
            {groupIdx < navGroups.length - 1 && (
              <div className="w-full py-1.5">
                <div className="h-[1px] w-full bg-[#E2E8F0] dark:bg-slate-800" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 3. Bottom CTA Action State Banner (Optional) */}
      {showCtaBanner && (
        <div className="w-full pt-2">
          {isCompact ? (
            /* CTA Compact Mode Button */
            <button
              type="button"
              onClick={onCtaClick}
              className="w-full p-3 bg-[#0F62FE] text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
              title={ctaTitle}
            >
              <IconPlus size={16} stroke={1.5} />
            </button>
          ) : (
            /* CTA Expanded Mode Banner Card */
            <div className="w-full p-4 bg-[#EDF5FF] dark:bg-slate-800/80 border border-[#0F62FE] rounded-2xl flex flex-col items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center text-[#0F62FE]">
                <IconSparkles size={20} stroke={1.5} />
              </div>

              <div className="space-y-1 text-center">
                <div className="text-sm font-semibold text-[#0F172A] dark:text-slate-100 leading-[18.2px]">
                  {ctaTitle}
                </div>
                <div className="text-xs text-[#475569] dark:text-slate-400 leading-[18px]">
                  {ctaDescription}
                </div>
              </div>

              <div className="w-full h-[1px] bg-[#94A3B8]" />

              {/* Slot Placeholder Gambar / Custom Content (Arahan PD) */}
              {ctaCustomSlot ? (
                ctaCustomSlot
              ) : (
                <div className="w-full px-2 py-1 bg-[#D0E2FF] border border-[#0F62FE] rounded-xl flex items-center gap-2 text-xs text-[#0F62FE]">
                  <IconSparkles size={16} stroke={1.5} className="shrink-0" />
                  <span className="truncate">Slot component</span>
                </div>
              )}

              <button
                type="button"
                onClick={onCtaClick}
                className="w-full py-2 px-4 bg-[#0F62FE] text-white rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-sm font-normal"
              >
                {ctaButtonText}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 4. Footer Profile / Bottom Item */}
      <div className="w-full pt-2 border-t border-[#E2E8F0] dark:border-slate-800">
        <button
          type="button"
          onClick={onProfileClick}
          className={`w-full flex items-center rounded-lg p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 ${
            isCompact ? 'justify-center' : 'justify-between gap-3'
          }`}
        >
          {isCompact ? (
            <div className="w-9 h-9 rounded-full bg-[#EDF5FF] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 flex items-center justify-center overflow-hidden">
              {profileAvatarUrl ? (
                <img
                  src={profileAvatarUrl}
                  alt="Profile Avatar"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-[11px] font-semibold text-[#475569] dark:text-slate-300">
                  {profileCode}
                </span>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-[#EDF5FF] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                  {profileAvatarUrl ? (
                    <img
                      src={profileAvatarUrl}
                      alt="Profile Avatar"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-[11px] font-semibold text-[#475569] dark:text-slate-300">
                      {profileCode}
                    </span>
                  )}
                </div>
                <span className="text-sm text-[#475569] dark:text-slate-300 truncate">
                  {profileName}
                </span>
              </div>
              <IconSettings size={16} stroke={1.5} className="text-[#0F172A] shrink-0" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default LeftPanel;