import React, { useState } from 'react';
import { 
  IconDotsVertical, 
  IconSearch, 
  IconX, 
  IconPlus, 
  IconChevronRight,
  TablerIcon
} from '@tabler/icons-react';

export type ContainedListSize = 'large' | 'medium' | 'small';
export type ContainedListItemState = 'enabled' | 'hover' | 'focus' | 'active' | 'disabled';
export type ContainedListOrientation = 'horizontal' | 'vertical';

export interface ContainedListItemData {
  id: string;
  subtitle?: string;
  itemText: string;
  icon?: TablerIcon | React.ComponentType<{ size?: number | string; className?: string }>;
  badge?: string | number;
  status?: 'success' | 'warning' | 'danger' | 'info';
  actionType?: 'overflow' | 'button' | 'link' | 'chevron' | 'custom';
  actionLabel?: string;
  onActionClick?: () => void;
  state?: ContainedListItemState;
}

export interface ContainedListProps {
  title?: string;
  size?: ContainedListSize;
  headerActionType?: 'overflow' | 'button' | 'link' | 'tag' | 'none';
  headerActionLabel?: string;
  onHeaderActionClick?: () => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (query: string) => void;
  itemOrientation?: ContainedListOrientation;
  showDividers?: boolean;
  items?: ContainedListItemData[];
  children?: React.ReactNode;
  className?: string;
}

export const ContainedList: React.FC<ContainedListProps> = ({
  title = 'List title',
  size = 'large',
  headerActionType = 'overflow',
  headerActionLabel = 'Link',
  onHeaderActionClick,
  onSearchChange,
  searchable = false,
  searchPlaceholder = 'Search...',
  itemOrientation = 'horizontal',
  showDividers = true,
  items = [],
  children,
  className = '',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearchChange) onSearchChange(e.target.value);
  };

  // Size styling map for Header
  const headerPaddingMap: Record<ContainedListSize, string> = {
    large: 'py-[15px] px-4',
    medium: 'py-[11px] px-4',
    small: 'py-[7px] px-4',
  };

  const filteredItems = items.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.itemText.toLowerCase().includes(q) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q))
    );
  });

  return (
    <div
      className={`w-full flex flex-col gap-1 rounded-xl bg-white text-slate-900 border border-slate-200 overflow-hidden shadow-sm ${className}`}
    >
      {/* HEADER SECTION */}
      {(title || searchable || headerActionType !== 'none') && (
        <div
          className={`w-full flex items-center justify-between bg-white border-b border-slate-100 transition-all ${headerPaddingMap[size]}`}
        >
          {/* Header Left: Title or Search Field */}
          <div className="flex items-center flex-1 gap-2 mr-3">
            {searchable ? (
              <div
                className={`flex-1 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border transition-all ${
                  isSearchFocused
                    ? 'border-blue-600 ring-2 ring-blue-600/20 bg-white'
                    : 'border-transparent'
                }`}
              >
                <IconSearch className="w-4 h-4 text-slate-500 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder={searchPlaceholder}
                  className="w-full text-sm bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      if (onSearchChange) onSearchChange('');
                    }}
                    className="p-0.5 rounded-full hover:bg-slate-200 text-slate-500"
                  >
                    <IconX className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ) : (
              <h3 className="text-sm font-semibold truncate text-slate-900">
                {title}
              </h3>
            )}
          </div>

          {/* Header Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {headerActionType === 'overflow' && (
              <button
                type="button"
                onClick={onHeaderActionClick}
                className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                title="More options"
              >
                <IconDotsVertical className="w-4 h-4" />
              </button>
            )}

            {headerActionType === 'button' && (
              <button
                type="button"
                onClick={onHeaderActionClick}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium transition-colors flex items-center gap-1"
              >
                <IconPlus className="w-3.5 h-3.5" />
                <span>{headerActionLabel || 'Add'}</span>
              </button>
            )}

            {headerActionType === 'link' && (
              <button
                type="button"
                onClick={onHeaderActionClick}
                className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
              >
                {headerActionLabel}
              </button>
            )}

            {headerActionType === 'tag' && (
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-slate-200 text-slate-700">
                {headerActionLabel || 'Tag'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ITEMS LIST SECTION */}
      <div className="flex flex-col">
        {children
          ? children
          : filteredItems.map((item, idx) => (
              <ContainedListItem
                key={item.id || idx}
                subtitle={item.subtitle}
                itemText={item.itemText}
                icon={item.icon}
                badge={item.badge}
                status={item.status}
                actionType={item.actionType}
                actionLabel={item.actionLabel}
                onActionClick={item.onActionClick}
                size={size}
                orientation={itemOrientation}
                showDivider={showDividers && idx < filteredItems.length - 1}
                state={item.state}
              />
            ))}

        {!children && filteredItems.length === 0 && (
          <div className="py-8 text-xs text-center text-slate-400">
            Tidak ada item untuk ditampilkan
          </div>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   SUB-COMPONENT: ContainedListItem
   ========================================================================== */

export interface ContainedListItemProps {
  subtitle?: string;
  itemText: string;
  icon?: TablerIcon | React.ComponentType<{ size?: number | string; className?: string }>;
  badge?: string | number;
  status?: 'success' | 'warning' | 'danger' | 'info';
  actionType?: 'overflow' | 'button' | 'link' | 'chevron' | 'custom';
  actionLabel?: string;
  onActionClick?: () => void;
  size?: ContainedListSize;
  orientation?: ContainedListOrientation;
  showDivider?: boolean;
  state?: ContainedListItemState;
  className?: string;
}

export const ContainedListItem: React.FC<ContainedListItemProps> = ({
  subtitle = 'List subtitle',
  itemText = 'List item',
  icon: Icon = IconPlus,
  badge,
  status,
  actionType = 'overflow',
  actionLabel = 'Action',
  onActionClick,
  size = 'large',
  orientation = 'horizontal',
  showDivider = true,
  state = 'enabled',
  className = '',
}) => {
  const itemPaddingMap: Record<ContainedListSize, string> = {
    large: 'py-[14px] px-4',
    medium: 'py-[10px] px-4',
    small: 'py-[6px] px-4',
  };

  // States style mapping
  const stateStyleMap: Record<ContainedListItemState, string> = {
    enabled: 'bg-transparent text-slate-700 hover:bg-slate-50',
    hover: 'bg-slate-100 text-slate-900',
    focus: 'bg-slate-100 ring-2 ring-blue-600 ring-inset',
    active: 'bg-slate-200 text-slate-900 font-medium',
    disabled: 'opacity-50 pointer-events-none text-slate-400',
  };

  // Status Badge Colors
  const statusColorMap = {
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div
      className={`relative w-full flex items-center justify-between transition-colors ${
        itemPaddingMap[size]
      } ${stateStyleMap[state]} ${
        showDivider ? 'border-b border-slate-200' : ''
      } ${className}`}
    >
      {/* LEFT & CONTENT AREA */}
      <div className="flex items-center flex-1 min-w-0 gap-3 mr-3">
        {/* Leading Icon */}
        {Icon && (
          <div className="shrink-0 p-0.5 text-slate-700">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {/* Text Content Area */}
        <div
          className={`flex-1 min-w-0 ${
            orientation === 'horizontal'
              ? 'flex items-center gap-3'
              : 'flex flex-col gap-0.5'
          }`}
        >
          {subtitle && (
            <span className="text-xs font-semibold text-slate-600 shrink-0">
              {subtitle}
            </span>
          )}
          <span className="text-sm truncate text-slate-800">{itemText}</span>
        </div>
      </div>

      {/* RIGHT TRAILING ACTIONS */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Status Indicator */}
        {status && (
          <span
            className={`w-2.5 h-2.5 rounded-full ${statusColorMap[status]}`}
          />
        )}

        {/* Badge / Tag */}
        {badge !== undefined && (
          <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-slate-200 text-slate-700">
            {badge}
          </span>
        )}

        {/* Action Type */}
        {actionType === 'overflow' && (
          <button
            type="button"
            onClick={onActionClick}
            className="p-1 transition-colors rounded-lg text-slate-500 hover:bg-slate-200/60"
          >
            <IconDotsVertical className="w-4 h-4" />
          </button>
        )}

        {actionType === 'chevron' && (
          <button
            type="button"
            onClick={onActionClick}
            className="p-1 transition-colors rounded-lg text-slate-400 hover:text-slate-700"
          >
            <IconChevronRight className="w-4 h-4" />
          </button>
        )}

        {actionType === 'button' && (
          <button
            type="button"
            onClick={onActionClick}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors"
          >
            {actionLabel}
          </button>
        )}

        {actionType === 'link' && (
          <button
            type="button"
            onClick={onActionClick}
            className="text-xs font-medium text-blue-600 hover:underline"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};