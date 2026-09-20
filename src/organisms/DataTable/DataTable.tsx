import React from 'react';
import { cn } from '../../utils/cn';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import { Button } from '../../atoms/Button';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T, index: number) => string | number;
  isLoading?: boolean;
  emptyMessage?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
  };
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'Tidak ada data ditemukan.',
  pagination,
  className,
}: DataTableProps<T>) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('w-full bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col', className)}>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{ width: col.width }}
                  className={cn(
                    'py-3.5 px-4 select-none',
                    alignClasses[col.align || 'left']
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-6 h-6 border-2 border-aposis-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs">Memuat data...</span>
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Inbox className="w-8 h-8 text-slate-300 stroke-[1.5]" />
                    <span className="text-xs text-slate-500">{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={keyExtractor(row, index)}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        'py-3.5 px-4',
                        alignClasses[col.align || 'left']
                      )}
                    >
                      {col.render
                        ? col.render(row, index)
                        : (row as Record<string, any>)[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between text-xs text-slate-500">
          <div>
            {pagination.totalItems !== undefined ? (
              <span>Total <strong>{pagination.totalItems}</strong> data</span>
            ) : (
              <span>Halaman {pagination.currentPage} dari {pagination.totalPages}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.currentPage <= 1}
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              leftIcon={<ChevronLeft className="w-3.5 h-3.5" />}
            >
              Sebelumnya
            </Button>
            <span className="px-2 font-semibold text-slate-700">
              {pagination.currentPage} / {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={pagination.currentPage >= pagination.totalPages}
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
