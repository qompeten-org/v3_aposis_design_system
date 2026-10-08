import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
export interface OverflowMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export const mockOverflowMenuItems: OverflowMenuItem[] = [
  { id: 'edit', label: 'Edit Data' },
  { id: 'duplicate', label: 'Duplikat' },
  { id: 'delete', label: 'Hapus Data', danger: true },
];

export interface OverflowMenuProps {
  id?: string;
  items?: OverflowMenuItem[];
  align?: 'left' | 'right'; 
  position?: 'bottom' | 'top';
  size?: 'small' | 'medium';
  className?: string;
  triggerAriaLabel?: string;
}

export const OverflowMenu: React.FC<OverflowMenuProps> = ({
  id,
  items = mockOverflowMenuItems,
  align = 'left',
  position = 'bottom',
  size = 'small',
  className,
  triggerAriaLabel = 'Opsi Lanjutan',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (item: OverflowMenuItem) => {
    if (item.disabled) return;
    item.onClick?.();
    setIsOpen(false);
  };

  const alignStyles = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
  };

  const positionStyles = {
    bottom: 'top-full mt-1',
    top: 'bottom-full mb-1 origin-bottom-left', // Menembak ke atas
  };

  const getOriginStyle = () => {
    if (position === 'top' && align === 'right') return 'bottom-full mb-1 right-0 origin-bottom-right';
    if (position === 'top' && align === 'left') return 'bottom-full mb-1 left-0 origin-bottom-left';
    return `${positionStyles[position]} ${alignStyles[align]}`;
  };

  return (
    <div id={id} className={cn('relative inline-block font-["IBM_Plex_Sans",sans-serif]', className)} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={triggerAriaLabel}
        className={cn(
          size === 'medium' ? 'p-2' : 'p-1.5',
          'rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors outline-none focus:ring-2 focus:ring-[#0F62FE]',
          isOpen && 'bg-slate-100 dark:bg-slate-800 text-slate-900'
        )}
      >
        <svg
          className={cn(size === 'medium' ? 'w-5 h-5' : 'w-4 h-4', 'fill-current')}
          viewBox="0 0 16 16"
        >
          <circle cx="8" cy="3" r="1.5" />
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="8" cy="13" r="1.5" />
        </svg>
      </button>

      {/* Popover Menu Dropdown / Dropup */}
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-md overflow-hidden py-0.5 transition-all duration-150',
            getOriginStyle()
          )}
        >
          {items.map((item, index) => (
            <button
              id={id ? `${id}-item-${item.id || index}` : undefined}
              key={item.id || index}
              type="button"
              disabled={item.disabled}
              onClick={() => handleItemClick(item)}
              className={cn(
                'w-full text-left px-4 py-2 text-xs md:text-sm flex items-center gap-3 transition-colors relative border-b border-slate-100 dark:border-slate-800/80 last:border-b-0',
                !item.disabled &&
                  !item.danger &&
                  'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer',
                item.danger && 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer',
                item.disabled && 'opacity-40 cursor-not-allowed text-slate-400'
              )}
            >
              {item.icon && (
                <div className="flex items-center justify-center w-4 h-4 shrink-0 text-slate-500 dark:text-slate-400">
                  {item.icon}
                </div>
              )}
              <span className="flex-1 truncate">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};