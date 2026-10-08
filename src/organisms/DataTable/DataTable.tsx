import React, { useState, useMemo } from 'react';
import { cn } from '../../utils/cn';
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconInbox,
  IconArrowsSort,
  IconSortAscending,
  IconSortDescending,
  IconLoader,
} from '@tabler/icons-react';
import { Checkbox } from '../../atoms/Checkbox/Checkbox';

export type SortDirection = 'asc' | 'desc' | null;

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  truncate?: boolean;
  className?: string;
  headerClassName?: string;
}

export interface PaginationConfig {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  showItemCount?: boolean;
  showFirstLast?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'underline' | 'pill' | 'bordered';
  enableQuickJump?: boolean;
}

export {
  Pagination,
  type PaginationProps,
  type PaginationSize,
  type PaginationVariant,
} from '../Pagination/Pagination';

/** @deprecated Toolbar actions have been removed from DataTable. Use external Card or layout wrappers. */
export interface PrimaryActionConfig {
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

/** @deprecated Toolbar actions have been removed from DataTable. Use external Card or layout wrappers. */
export interface SecondaryActionConfig {
  icon?: React.ReactNode;
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  tooltip?: string;
  ariaLabel?: string;
}

export interface DataTableProps<T>
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Column configuration definitions */
  columns: Column<T>[];
  /** Data records */
  data: T[];
  /** Key extractor to identify unique row key */
  keyExtractor?: (item: T, index: number) => string | number;

  /** Enable row selection with checkboxes */
  selectable?: boolean;
  selectedRowKeys?: (string | number)[];
  onSelectionChange?: (selectedKeys: (string | number)[], selectedRows: T[]) => void;

  /** Enable expandable rows with chevron indicator */
  expandable?: boolean;
  expandedRowKeys?: (string | number)[];
  onExpandRow?: (key: string | number, expanded: boolean) => void;
  expandedRowRender?: (row: T, index: number) => React.ReactNode;

  /** Controlled sort state */
  sortColumn?: string | null;
  sortDirection?: SortDirection;
  onSortChange?: (columnKey: string, direction: SortDirection) => void;

  /** Loading state and custom messages */
  isLoading?: boolean;
  loadingMessage?: string;
  emptyMessage?: string;

  /** Pagination options */
  pagination?: PaginationConfig;

  /** Additional element class overrides */
  tableClassName?: string;
  headerRowClassName?: string;
  bodyRowClassName?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  selectable = false,
  selectedRowKeys,
  onSelectionChange,
  expandable = false,
  expandedRowKeys,
  onExpandRow,
  expandedRowRender,
  sortColumn,
  sortDirection,
  onSortChange,
  isLoading = false,
  loadingMessage = 'Memuat data...',
  emptyMessage = 'Tidak ada data ditemukan.',
  pagination,
  className,
  tableClassName,
  headerRowClassName,
  bodyRowClassName,
  id,
  ...props
}: DataTableProps<T>) {
  // Row key resolution helper
  const getRowKey = (row: T, index: number): string | number => {
    if (keyExtractor) return keyExtractor(row, index);
    return (row as Record<string, any>)?.id ?? index;
  };

  // Internal selection state (if uncontrolled)
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<(string | number)[]>([]);
  const currentSelectedKeys = selectedRowKeys !== undefined ? selectedRowKeys : internalSelectedKeys;

  // Internal expansion state (if uncontrolled)
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<(string | number)[]>([]);
  const currentExpandedKeys = expandedRowKeys !== undefined ? expandedRowKeys : internalExpandedKeys;

  // Internal sorting state (if uncontrolled)
  const [internalSortColumn, setInternalSortColumn] = useState<string | null>(null);
  const [internalSortDirection, setInternalSortDirection] = useState<SortDirection>(null);

  const currentSortCol = sortColumn !== undefined ? sortColumn : internalSortColumn;
  const currentSortDir = sortDirection !== undefined ? sortDirection : internalSortDirection;

  const handleColumnSort = (colKey: string) => {
    let nextDir: SortDirection = 'asc';
    if (currentSortCol === colKey) {
      if (currentSortDir === 'asc') nextDir = 'desc';
      else if (currentSortDir === 'desc') nextDir = null;
      else nextDir = 'asc';
    }

    if (sortColumn === undefined) {
      setInternalSortColumn(nextDir ? colKey : null);
      setInternalSortDirection(nextDir);
    }
    onSortChange?.(colKey, nextDir);
  };

  // Sort data if uncontrolled
  const sortedData = useMemo(() => {
    if (!currentSortCol || !currentSortDir || sortColumn !== undefined) {
      return data;
    }
    return [...data].sort((a, b) => {
      const aVal = (a as Record<string, any>)[currentSortCol];
      const bVal = (b as Record<string, any>)[currentSortCol];

      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return currentSortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }

      const strA = String(aVal).toLowerCase();
      const strB = String(bVal).toLowerCase();
      return currentSortDir === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }, [data, currentSortCol, currentSortDir, sortColumn]);

  // Handle select all checkbox
  const allRowKeys = useMemo(
    () => sortedData.map((row, idx) => getRowKey(row, idx)),
    [sortedData]
  );

  const isAllSelected =
    allRowKeys.length > 0 && allRowKeys.every((k) => currentSelectedKeys.includes(k));
  const isPartiallySelected =
    currentSelectedKeys.length > 0 && !isAllSelected && allRowKeys.some((k) => currentSelectedKeys.includes(k));

  const handleSelectAll = (checked: boolean) => {
    let nextKeys: (string | number)[] = [];
    if (checked) {
      const set = new Set([...currentSelectedKeys, ...allRowKeys]);
      nextKeys = Array.from(set);
    } else {
      nextKeys = currentSelectedKeys.filter((k) => !allRowKeys.includes(k));
    }

    if (selectedRowKeys === undefined) {
      setInternalSelectedKeys(nextKeys);
    }

    const nextRows = sortedData.filter((r, idx) => nextKeys.includes(getRowKey(r, idx)));
    onSelectionChange?.(nextKeys, nextRows);
  };

  const handleSelectRow = (key: string | number) => {
    const isSelected = currentSelectedKeys.includes(key);
    const nextKeys = isSelected
      ? currentSelectedKeys.filter((k) => k !== key)
      : [...currentSelectedKeys, key];

    if (selectedRowKeys === undefined) {
      setInternalSelectedKeys(nextKeys);
    }

    const nextRows = sortedData.filter((r, idx) => nextKeys.includes(getRowKey(r, idx)));
    onSelectionChange?.(nextKeys, nextRows);
  };

  const handleToggleExpand = (key: string | number) => {
    const isExpanded = currentExpandedKeys.includes(key);
    const nextKeys = isExpanded
      ? currentExpandedKeys.filter((k) => k !== key)
      : [...currentExpandedKeys, key];

    if (expandedRowKeys === undefined) {
      setInternalExpandedKeys(nextKeys);
    }
    onExpandRow?.(key, !isExpanded);
  };

  // Alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Total columns calculation for span
  const totalColumnCount = columns.length + (expandable ? 1 : 0) + (selectable ? 1 : 0);

  // Smart Pagination Page Numbers Generator
  const paginationPages = useMemo(() => {
    if (!pagination) return [];
    const { currentPage, totalPages } = pagination;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  }, [pagination]);

  return (
    <div id={id} className={cn('w-full flex flex-col font-sans', className)} {...props}>
      {/* Table Container Card */}
      <div className="flex flex-col w-full overflow-hidden bg-white border shadow-xs dark:bg-slate-900 rounded-2xl border-slate-200/80 dark:border-slate-800">
        <div className="w-full overflow-x-auto">
          <table className={cn('w-full text-left border-collapse', tableClassName)}>
            {/* Table Header */}
            <thead>
              <tr
                className={cn(
                  'bg-[#F1F5F9] dark:bg-slate-800/90 border-b border-slate-200/80 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100 tracking-normal select-none',
                  headerRowClassName
                )}
              >
                {/* Expander column header */}
                {expandable && (
                  <th className="w-12 px-3 py-4 text-center shrink-0" aria-label="Expand row" />
                )}

                {/* Checkbox column header */}
                {selectable && (
                  <th className="w-12 px-4 py-4 text-center shrink-0">
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={isAllSelected}
                        indeterminate={isPartiallySelected}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        aria-label="Pilih semua baris"
                      />
                    </div>
                  </th>
                )}

                {/* Data columns header */}
                {columns.map((col) => {
                  const isSorted = currentSortCol === col.key;
                  return (
                    <th
                      key={col.key}
                      style={{ width: col.width }}
                      onClick={() => col.sortable && handleColumnSort(col.key)}
                      className={cn(
                        'py-4 px-4 font-bold text-xs md:text-sm text-slate-800 dark:text-slate-200 whitespace-nowrap',
                        col.sortable && 'cursor-pointer hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition-colors',
                        alignClasses[col.align || 'left'],
                        col.headerClassName
                      )}
                    >
                      <div
                        className={cn(
                          'inline-flex items-center gap-1.5',
                          col.align === 'center' && 'justify-center',
                          col.align === 'right' && 'justify-end'
                        )}
                      >
                        <span className={cn(col.truncate && 'truncate max-w-[120px] md:max-w-xs')}>
                          {col.header}
                        </span>
                        {col.sortable && (
                          <span className="text-slate-400 dark:text-slate-500">
                            {isSorted ? (
                              currentSortDir === 'asc' ? (
                                <IconSortAscending size={16} className="text-aposis-blue-60" />
                              ) : (
                                <IconSortDescending size={16} className="text-aposis-blue-60" />
                              )
                            ) : (
                              <IconArrowsSort size={15} className="opacity-40 hover:opacity-100" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800/90 text-slate-700 dark:text-slate-300">
              {isLoading ? (
                <tr>
                  <td colSpan={totalColumnCount} className="text-center py-14 text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2.5">
                      <IconLoader className="w-6 h-6 text-aposis-blue-60 animate-spin" />
                      <span className="text-xs font-medium text-slate-500">{loadingMessage}</span>
                    </div>
                  </td>
                </tr>
              ) : sortedData.length === 0 ? (
                <tr>
                  <td colSpan={totalColumnCount} className="text-center py-14 text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <IconInbox className="w-9 h-9 text-slate-300 dark:text-slate-600 stroke-[1.5]" />
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {emptyMessage}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                sortedData.map((row, index) => {
                  const rowKey = getRowKey(row, index);
                  const isSelected = currentSelectedKeys.includes(rowKey);
                  const isExpanded = currentExpandedKeys.includes(rowKey);

                  return (
                    <React.Fragment key={rowKey}>
                      <tr
                        className={cn(
                          'transition-colors duration-100',
                          isSelected
                            ? 'bg-blue-50/60 dark:bg-blue-950/30'
                            : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40',
                          bodyRowClassName
                        )}
                      >
                        {/* Expander cell */}
                        {expandable && (
                          <td className="w-12 px-3 py-3.5 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleExpand(rowKey)}
                              aria-expanded={isExpanded}
                              aria-label={isExpanded ? 'Tutup detail' : 'Buka detail'}
                              className={cn(
                                'w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 inline-flex items-center justify-center transition-all duration-200 cursor-pointer',
                                isExpanded && 'rotate-180 text-aposis-blue-60 dark:text-aposis-blue-40'
                              )}
                            >
                              <IconChevronDown size={18} />
                            </button>
                          </td>
                        )}

                        {/* Checkbox cell */}
                        {selectable && (
                          <td className="w-12 px-4 py-3.5 text-center">
                            <div className="flex items-center justify-center">
                              <Checkbox
                                checked={isSelected}
                                onChange={() => handleSelectRow(rowKey)}
                                aria-label={`Pilih baris ${index + 1}`}
                              />
                            </div>
                          </td>
                        )}

                        {/* Data cells */}
                        {columns.map((col) => (
                          <td
                            key={col.key}
                            style={{ width: col.width }}
                            className={cn(
                              'py-3.5 px-4 text-xs md:text-sm text-slate-700 dark:text-slate-300',
                              alignClasses[col.align || 'left'],
                              col.className
                            )}
                          >
                            {col.render ? (
                              col.render(row, index)
                            ) : col.truncate ? (
                              <div className="truncate max-w-[120px] md:max-w-xs">
                                {String((row as Record<string, any>)[col.key] ?? '')}
                              </div>
                            ) : (
                              (row as Record<string, any>)[col.key]
                            )}
                          </td>
                        ))}
                      </tr>

                      {/* Expandable row detail container */}
                      {expandable && isExpanded && expandedRowRender && (
                        <tr className="border-b bg-slate-50/70 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800">
                          <td colSpan={totalColumnCount} className="px-6 py-4">
                            {expandedRowRender(row, index)}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* 4. Pagination Footer */}
        {pagination && (
          <div className="px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 select-none">
            {/* Info / item count */}
            <div className="order-2 text-center sm:order-1 sm:text-left">
              {pagination.totalItems !== undefined ? (
                <span>
                  Total <strong className="text-slate-700 dark:text-slate-200">{pagination.totalItems}</strong> data
                </span>
              ) : (
                <span>
                  Halaman <strong className="text-slate-700 dark:text-slate-200">{pagination.currentPage}</strong> dari{' '}
                  <strong className="text-slate-700 dark:text-slate-200">{pagination.totalPages}</strong>
                </span>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center order-1 gap-1 sm:order-2">
              {/* First button */}
              {pagination.showFirstLast && (
                <button
                  type="button"
                  disabled={pagination.currentPage <= 1}
                  onClick={() => pagination.onPageChange(1)}
                  aria-label="Halaman pertama"
                  title="Halaman pertama"
                  className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg cursor-pointer text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold"
                >
                  &laquo;
                </button>
              )}

              {/* Previous button */}
              <button
                type="button"
                disabled={pagination.currentPage <= 1}
                onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                aria-label="Halaman sebelumnya"
                className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg cursor-pointer text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <IconChevronLeft size={16} />
              </button>

              {/* Numbered page buttons */}
              {paginationPages.map((page, idx) => {
                if (page === '...') {
                  return (
                    <span key={`dots-${idx}`} className="flex items-center justify-center w-8 h-8 text-slate-400">
                      ...
                    </span>
                  );
                }

                const pageNum = page as number;
                const isActive = pageNum === pagination.currentPage;

                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => pagination.onPageChange(pageNum)}
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all cursor-pointer',
                      isActive
                        ? 'font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 shadow-2xs'
                        : 'font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next button */}
              <button
                type="button"
                disabled={pagination.currentPage >= pagination.totalPages}
                onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                aria-label="Halaman selanjutnya"
                className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg cursor-pointer text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <IconChevronRight size={16} />
              </button>

              {/* Last button */}
              {pagination.showFirstLast && (
                <button
                  type="button"
                  disabled={pagination.currentPage >= pagination.totalPages}
                  onClick={() => pagination.onPageChange(pagination.totalPages)}
                  aria-label="Halaman terakhir"
                  title="Halaman terakhir"
                  className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg cursor-pointer text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold"
                >
                  &raquo;
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
