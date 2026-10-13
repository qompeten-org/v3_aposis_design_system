import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, MoreHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';

export type PaginationSize = 'xs' | 'sm' | 'md' | 'lg';
export type PaginationVariant = 'underline' | 'pill' | 'bordered';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onPageChange'> {
  id?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  size?: PaginationSize;
  variant?: PaginationVariant;
  showFirstLast?: boolean;
  enableQuickJump?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  id,
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  size = 'md',
  variant = 'underline',
  showFirstLast = false,
  enableQuickJump = true,
  className,
  ...props
}) => {
  const [openDropdown, setOpenDropdown] = useState<'left' | 'right' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const generatePageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3; 
    const totalBlocks = totalNumbers + 2; 

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, 'DOTS_RIGHT', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
      return [1, 'DOTS_LEFT', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [1, 'DOTS_LEFT', ...middleRange, 'DOTS_RIGHT', totalPages];
    }

    return [];
  };

  const pages = generatePageNumbers();

  const sizeStyles = {
    xs: {
      button: 'w-7 h-7 text-xs',
      icon: 'w-3.5 h-3.5',
      indicatorHeight: 'h-0.5',
      padding: 'py-1 px-1.5',
    },
    sm: {
      button: 'w-8 h-8 text-xs',
      icon: 'w-4 h-4',
      indicatorHeight: 'h-0.5',
      padding: 'py-1.5 px-2',
    },
    md: {
      button: 'w-10 h-10 text-sm',
      icon: 'w-4 h-4',
      indicatorHeight: 'h-[3px]',
      padding: 'py-2 px-3',
    },
    lg: {
      button: 'w-12 h-12 text-sm',
      icon: 'w-5 h-5',
      indicatorHeight: 'h-1',
      padding: 'py-2.5 px-4',
    },
  }[size];

  const renderPageButton = (page: number) => {
    const isSelected = currentPage === page;

    return (
      <button
        key={page}
        id={id ? `${id}-page-${page}` : undefined}
        onClick={() => onPageChange(page)}
        aria-current={isSelected ? 'page' : undefined}
        className={cn(
          'relative flex flex-col items-center justify-center font-sans rounded-xl transition-all duration-150',
          sizeStyles.button,
          isSelected
            ? 'font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800'
            : 'font-normal text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
        )}
      >
        <span className="flex items-center justify-center flex-1">{page}</span>
        {isSelected && variant === 'underline' && (
          <div className={cn('w-4 bg-[#0F62FE] rounded-full', sizeStyles.indicatorHeight)} />
        )}
      </button>
    );
  };

  const renderEllipsis = (position: 'left' | 'right') => {
    const isOpen = openDropdown === position;

    const dropdownPages = position === 'left'
      ? Array.from({ length: Math.max(0, currentPage - siblingCount - 1) }, (_, i) => i + 1)
      : Array.from({ length: totalPages - (currentPage + siblingCount) }, (_, i) => currentPage + siblingCount + i + 1);

    return (
      <div key={position} className="relative inline-block" ref={dropdownRef}>
        <button
          id={id ? `${id}-ellipsis-${position}` : undefined}
          onClick={() => enableQuickJump && setOpenDropdown(isOpen ? null : position)}
          className={cn(
            'flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors',
            sizeStyles.button
          )}
          title={enableQuickJump ? 'Lompat ke halaman' : undefined}
        >
          <MoreHorizontal className={sizeStyles.icon} />
        </button>

        {isOpen && enableQuickJump && (
          <div className="absolute z-50 py-1 mt-2 overflow-y-auto -translate-x-1/2 border rounded-lg shadow-lg top-full left-1/2 w-28 max-h-48 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 scrollbar-thin">
            {dropdownPages.map((p) => (
              <button
                key={p}
                id={id ? `${id}-jump-${p}` : undefined}
                onClick={() => {
                  onPageChange(p);
                  setOpenDropdown(null);
                }}
                className={cn(
                  'w-full text-left px-3 py-1.5 text-xs font-sans flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700/60 transition-colors',
                  currentPage === p ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-medium' : 'text-slate-700 dark:text-slate-200'
                )}
              >
                <div className="flex items-center justify-center w-4 h-4">
                  {currentPage === p && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                </div>
                <span>{p}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      id={id}
      aria-label="Pagination Navigation"
      className={cn('inline-flex items-center gap-1 border-t border-slate-200 dark:border-slate-800 pt-2', className)}
      {...props}
    >
      {/* First Page Button */}
      {showFirstLast && (
        <button
          id={id ? `${id}-first` : undefined}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={cn(
            'flex items-center justify-center rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
            sizeStyles.button
          )}
          title="Halaman Pertama"
        >
          &laquo;
        </button>
      )}

      {/* Prev Button*/}
      <button
        id={id ? `${id}-prev` : undefined}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={cn(
          'flex items-center justify-center rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
          sizeStyles.button
        )}
        aria-label="Halaman Sebelumnya"
      >
        <ChevronLeft className={sizeStyles.icon} />
      </button>

      {/* Pages Item */}
      {pages.map((item) => {
        if (item === 'DOTS_LEFT') return renderEllipsis('left');
        if (item === 'DOTS_RIGHT') return renderEllipsis('right');
        return renderPageButton(item as number);
      })}

      {/* Next Button */}
      <button
        id={id ? `${id}-next` : undefined}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={cn(
          'flex items-center justify-center rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
          sizeStyles.button
        )}
        aria-label="Halaman Selanjutnya"
      >
        <ChevronRight className={sizeStyles.icon} />
      </button>

      {/* Last Page Button */}
      {showFirstLast && (
        <button
          id={id ? `${id}-last` : undefined}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={cn(
            'flex items-center justify-center rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800',
            sizeStyles.button
          )}
          title="Halaman Terakhir"
        >
          &raquo;
        </button>
      )}
    </nav>
  );
};