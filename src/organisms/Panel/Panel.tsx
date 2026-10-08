import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconPlus,
  IconMoon,
  IconSun,
  IconChevronDown,
  IconChevronUp,
  IconSettings,
  IconSparkles,
  IconX,
  IconRefresh,
  TablerIcon,
} from '@tabler/icons-react';

// ==========================================
// 1. HEADER PANEL TYPES & SUB-COMPONENT
// ==========================================
export interface HeaderPanelBreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface HeaderPanelProps {
  breadcrumbs?: HeaderPanelBreadcrumbItem[];
  onToggleLeftSidebar?: () => void;
  onToggleRightSidebar?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  language?: string;
  onLanguageChange?: () => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  className?: string;
}

export const HeaderPanel: React.FC<HeaderPanelProps> = ({
  breadcrumbs = [
    { label: 'Link', href: '#' },
    { label: 'Link', href: '#' },
    { label: 'Link', href: '#' },
    { label: 'Link', href: '#' },
    { label: 'Link' },
  ],
  onToggleLeftSidebar,
  onToggleRightSidebar,
  onPrimaryAction,
  onSecondaryAction,
  language = 'EN',
  onLanguageChange,
  theme = 'light',
  onThemeToggle,
  className = '',
}) => {
  return (
    <header
      className={cn(
        "flex h-12 w-full items-center justify-start gap-2 border-b border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-2 font-['Lexend'] text-xs leading-[18px] tracking-[0.12px] transition-colors",
        className
      )}
    >
      {/* Left Controls */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onToggleLeftSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent p-2 text-[#0F172A] dark:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/20"
          aria-label="Toggle Left Sidebar"
        >
          <IconLayoutSidebarLeftCollapse size={16} stroke={1.5} />
        </button>

        <button
          type="button"
          onClick={onPrimaryAction}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent p-2 text-[#0F172A] dark:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/20"
          aria-label="Action 1"
        >
          <IconPlus size={16} stroke={1.5} />
        </button>

        <button
          type="button"
          onClick={onSecondaryAction}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent p-2 text-[#0F172A] dark:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/20"
          aria-label="Action 2"
        >
          <IconPlus size={16} stroke={1.5} />
        </button>
      </div>

      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center">
        <ol className="flex items-center gap-1">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && (
                  <span className="select-none text-[#64748B] dark:text-slate-500">
                    /
                  </span>
                )}

                {isLast ? (
                  <span
                    className="rounded px-0.5 font-normal text-[#0F172A] dark:text-slate-100"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href || '#'}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className="font-normal text-[#0F62FE] dark:text-blue-400 transition-colors hover:underline"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="flex-1" />

      {/* Right Utility Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleRightSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent p-2 text-[#0F172A] dark:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/20"
          aria-label="Toggle Right Sidebar"
        >
          <IconLayoutSidebarRightCollapse size={16} stroke={1.5} />
        </button>

        <button
          type="button"
          onClick={onLanguageChange}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#CBD5E1] dark:border-slate-700 bg-transparent text-xs font-normal text-[#475569] dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/20"
          aria-label="Change Language"
        >
          {language}
        </button>

        <button
          type="button"
          onClick={onThemeToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#CBD5E1] dark:border-slate-700 bg-transparent text-[#475569] dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/20"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            <IconMoon size={16} stroke={1.5} />
          ) : (
            <IconSun size={16} stroke={1.5} className="text-amber-400" />
          )}
        </button>
      </div>
    </header>
  );
};


// ==========================================
// 2. LEFT PANEL TYPES & SUB-COMPONENT
// ==========================================
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
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleSubMenu = (id: string) => {
    setExpandedMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-full border-r border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 font-['Lexend'] p-4 transition-all duration-300 select-none",
        isCompact ? 'w-20 items-center gap-1.5' : 'w-64 items-start gap-1.5',
        className
      )}
    >
      {/* Header Logo */}
      <div className={cn("w-full py-2 flex items-center", isCompact ? 'justify-center' : 'justify-start')}>
        {isCompact ? (
          <img src={compactLogoUrl} alt="Aposis Compact Logo" className="object-contain w-8 h-8 rounded" />
        ) : (
          <img src={logoUrl} alt="Aposis Logo" className="h-8 max-w-[120px] object-contain" />
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 w-full overflow-y-auto space-y-3 pr-0.5 custom-scrollbar">
        {navGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="w-full space-y-1">
            {group.subtitle && (
              <div
                className={cn(
                  "w-full h-4 text-[11px] font-semibold text-[#64748B] dark:text-slate-400 tracking-[0.66px] uppercase",
                  isCompact ? 'text-center' : 'text-left px-1'
                )}
              >
                {isCompact ? '...' : group.subtitle}
              </div>
            )}

            {group.items.map((item) => {
              const isSelected = selectedId === item.id;
              const hasChildren = item.children && item.children.length > 0;
              const isExpanded = !!expandedMenus[item.id];
              const IconComp = item.icon || IconPlus;

              return (
                <div key={item.id} className="w-full space-y-1">
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
                    className={cn(
                      "w-full flex items-center rounded-lg text-sm transition-all",
                      isCompact ? 'p-2 justify-center gap-0' : 'px-4 py-1.5 justify-between gap-3',
                      item.disabled
                        ? 'opacity-40 cursor-not-allowed text-[#0F172A]/24 dark:text-slate-600'
                        : isSelected
                        ? 'bg-[#0F62FE]/[0.06] dark:bg-blue-950/40 text-[#0F172A] dark:text-slate-100 font-medium'
                        : 'text-[#475569] dark:text-slate-300 hover:bg-[#0F62FE]/12 hover:text-[#0F172A] dark:hover:bg-slate-800'
                    )}
                  >
                    {isCompact ? (
                      <IconComp size={16} stroke={1.5} className="shrink-0" />
                    ) : (
                      <>
                        <div className="flex items-center gap-3 overflow-hidden">
                          <IconComp size={16} stroke={1.5} className="shrink-0" />
                          <span className="truncate text-sm leading-[18.2px]">{item.label}</span>
                        </div>
                        {hasChildren ? (
                          isExpanded ? <IconChevronUp size={16} stroke={1.5} /> : <IconChevronDown size={16} stroke={1.5} />
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
                            className={cn(
                              "w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-colors",
                              child.disabled
                                ? 'opacity-40 cursor-not-allowed'
                                : isChildSelected
                                ? 'bg-[#0F62FE]/[0.06] text-[#0F62FE] font-medium'
                                : 'text-[#475569] hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-300'
                            )}
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

            {groupIdx < navGroups.length - 1 && (
              <div className="w-full py-1.5">
                <div className="h-[1px] w-full bg-[#E2E8F0] dark:bg-slate-800" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      {showCtaBanner && (
        <div className="w-full pt-2">
          {isCompact ? (
            <button
              type="button"
              onClick={onCtaClick}
              className="w-full p-3 bg-[#0F62FE] text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors shadow-sm"
              title={ctaTitle}
            >
              <IconPlus size={16} stroke={1.5} />
            </button>
          ) : (
            <div className="w-full p-4 bg-[#EDF5FF] dark:bg-slate-800/80 border border-[#0F62FE] rounded-2xl flex flex-col items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center text-[#0F62FE]">
                <IconSparkles size={20} stroke={1.5} />
              </div>
              <div className="space-y-1 text-center">
                <div className="text-sm font-semibold text-[#0F172A] dark:text-slate-100 leading-[18.2px]">{ctaTitle}</div>
                <div className="text-xs text-[#475569] dark:text-slate-400 leading-[18px]">{ctaDescription}</div>
              </div>
              <div className="w-full h-[1px] bg-[#94A3B8]" />
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

      {/* Footer Profile */}
      <div className="w-full pt-2 border-t border-[#E2E8F0] dark:border-slate-800">
        <button
          type="button"
          onClick={onProfileClick}
          className={cn(
            "w-full flex items-center rounded-lg p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
            isCompact ? 'justify-center' : 'justify-between gap-3'
          )}
        >
          {isCompact ? (
            <div className="w-9 h-9 rounded-full bg-[#EDF5FF] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 flex items-center justify-center overflow-hidden">
              {profileAvatarUrl ? (
                <img src={profileAvatarUrl} alt="Profile Avatar" className="object-cover w-full h-full" />
              ) : (
                <span className="text-[11px] font-semibold text-[#475569] dark:text-slate-300">{profileCode}</span>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-full bg-[#EDF5FF] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
                  {profileAvatarUrl ? (
                    <img src={profileAvatarUrl} alt="Profile Avatar" className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-[11px] font-semibold text-[#475569] dark:text-slate-300">{profileCode}</span>
                  )}
                </div>
                <span className="text-sm text-[#475569] dark:text-slate-300 truncate">{profileName}</span>
              </div>
              <IconSettings size={16} stroke={1.5} className="text-[#0F172A] dark:text-slate-200 shrink-0" />
            </>
          )}
        </button>
      </div>
    </aside>
  );
};


// ==========================================
// 3. RIGHT PANEL TYPES & SUB-COMPONENT
// ==========================================
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
      className={cn(
        "flex flex-col h-full bg-white dark:bg-slate-900 border-l border-[#E2E8F0] dark:border-slate-800 font-['Lexend'] shadow-lg transition-all duration-300",
        widthClass,
        className
      )}
    >
      {/* Header Section */}
      <div className="pt-5 px-5 bg-white dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-800 flex flex-col gap-2 shrink-0">
        <div className="relative flex items-center justify-between pb-4 pr-10">
          <div className="flex items-center gap-2.5">
            {showHeaderIcon && (
              <div className="w-5 h-5 flex items-center justify-center text-[#0F172A] dark:text-slate-200">
                <HeaderIcon size={20} stroke={1.5} />
              </div>
            )}
            <h2 className="text-base font-medium text-[#0F172A] dark:text-slate-100 leading-[22.4px]">{title}</h2>
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

        {/* Tab Navigation */}
        {tabs && tabs.length > 0 && (
          <div className="flex items-center overflow-x-auto custom-scrollbar border-b border-[#E2E8F0] dark:border-slate-800">
            {tabs.map((tab) => {
              const isActive = activeTabId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange && onTabChange(tab.id)}
                  className={cn(
                    "px-4 py-2 text-sm transition-colors whitespace-nowrap border-b-2 font-['Lexend']",
                    isActive
                      ? 'border-[#0F62FE] text-[#0043CE] dark:text-blue-400 font-semibold'
                      : 'border-transparent text-[#475569] dark:text-slate-400 font-normal hover:text-slate-900 dark:hover:text-slate-200'
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 border-t border-[#E2E8F0] dark:border-slate-800 border-b custom-scrollbar">
        {descriptionText && (
          <p className="text-sm text-[#475569] dark:text-slate-300 leading-[18.2px]">
            {descriptionText}
          </p>
        )}

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

        {children}

        {activities && activities.length > 0 && (
          <div className="flex flex-col gap-4 pt-2">
            {activities.map((act) => (
              <div
                key={act.id}
                className="p-5 bg-white dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-800 rounded-2xl shadow-sm flex flex-col gap-3"
              >
                <div className="flex items-start gap-2">
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

      {/* Bottom Sticky Action Bar */}
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


// ==========================================
// 4. UNIFIED MAIN PANEL COMPONENT & EXPORTS
// ==========================================
export interface UnifiedPanelProps {
  variant?: 'left' | 'right' | 'header' | 'custom';
  leftProps?: LeftPanelProps;
  rightProps?: RightPanelProps;
  headerProps?: HeaderPanelProps;
  children?: React.ReactNode;
  className?: string;
}

export const PanelComponent: React.FC<UnifiedPanelProps> & {
  Header: typeof HeaderPanel;
  Left: typeof LeftPanel;
  Right: typeof RightPanel;
} = ({
  variant = 'custom',
  leftProps,
  rightProps,
  headerProps,
  children,
  className,
}) => {
  if (variant === 'header') return <HeaderPanel {...headerProps} className={className} />;
  if (variant === 'left') return <LeftPanel {...leftProps} className={className} />;
  if (variant === 'right') return <RightPanel {...rightProps} className={className} />;

  return (
    <div className={cn("bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl", className)}>
      {children}
    </div>
  );
};

// Compound Components Attachment
PanelComponent.Header = HeaderPanel;
PanelComponent.Left = LeftPanel;
PanelComponent.Right = RightPanel;

export const Panel = PanelComponent;
export default Panel;