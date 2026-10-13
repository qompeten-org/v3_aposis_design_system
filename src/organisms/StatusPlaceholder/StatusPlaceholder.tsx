import React from 'react';
import { Plus, CheckCircle2, AlertTriangle, AlertCircle, X, FileText } from 'lucide-react';
import { cn } from '../../utils/cn';

export type StatusPlaceholderVariant = 'empty' | 'success' | 'warning' | 'danger';

export interface StatusPlaceholderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  id?: string;
  variant?: StatusPlaceholderVariant;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  showDivider?: boolean;
  slotComponent?: React.ReactNode;
  actionButton?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export const StatusPlaceholder: React.FC<StatusPlaceholderProps> = ({
  id,
  variant = 'empty',
  title,
  description,
  icon,
  showDivider = true,
  slotComponent,
  actionButton,
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    empty: {
      container: 'bg-[#F1F5F9] dark:bg-slate-800/60 border border-[#94A3B8] dark:border-slate-700',
      iconColor: 'text-[#475569] dark:text-slate-400',
      defaultIcon: <Plus className="w-6 h-6 text-[#475569] dark:text-slate-400" />,
    },
    success: {
      container: 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800',
      iconColor: 'text-[#0F62FE] dark:text-blue-400',
      defaultIcon: <CheckCircle2 className="w-6 h-6 fill-[#0F62FE] text-white dark:fill-blue-500 dark:text-white" />,
    },
    warning: {
      container: 'bg-[#FFFBEB] dark:bg-amber-950/20 border border-[#F59E0B] dark:border-amber-500/50',
      iconColor: 'text-[#F59E0B] dark:text-amber-400',
      defaultIcon: <AlertTriangle className="w-6 h-6 text-[#F59E0B] dark:text-amber-400" />,
    },
    danger: {
      container: 'bg-[#FFEFEF] dark:bg-rose-950/20 border border-[#FF3941] dark:border-rose-500/50',
      iconColor: 'text-[#E6212A] dark:text-rose-400',
      defaultIcon: <AlertCircle className="w-6 h-6 text-[#E6212A] dark:text-rose-400" />,
    },
  }[variant];

  return (
    <div
      id={id}
      className={cn(
        'w-full p-5 rounded-[20px] flex flex-col items-center justify-center gap-4 text-center font-sans',
        variantStyles.container,
        className
      )}
      {...props}
    >
      {/* Icon Header */}
      <div className="flex items-center justify-center w-6 h-6">
        {icon || variantStyles.defaultIcon}
      </div>

      {/* Title & Description */}
      <div className="w-full flex flex-col items-center gap-1">
        <h4 className="text-sm font-semibold text-[#0F172A] dark:text-slate-100 leading-snug">{title}</h4>
        {description && (
          <p className="text-xs text-[#475569] dark:text-slate-400 leading-relaxed tracking-wide">{description}</p>
        )}
      </div>

      {/* Divider */}
      {showDivider && <div className="w-full border-t border-[#94A3B8]/60 dark:border-slate-800 my-0.5" />}

      {/* Slot Component Tag */}
      {slotComponent && (
        <div className="w-full px-2 py-1 bg-[#D0E2FF] dark:bg-blue-950/50 outline outline-1 outline-[#0F62FE] dark:outline-blue-500 rounded-xl flex items-center justify-start gap-2 text-xs text-[#0F62FE] dark:text-blue-300 font-normal">
          <div className="w-4 h-4 flex items-center justify-center">
            <span className="text-[10px]">🔄</span>
          </div>
          <div className="flex-1 text-left truncate">{slotComponent}</div>
        </div>
      )}

      {children}

      {/* Action Button */}
      {actionButton && <div className="w-full flex justify-center mt-1">{actionButton}</div>}
    </div>
  );
};

export interface FilePreviewPlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  fileType?: string;
  imageUrl?: string;
  pageNumber?: number | string;
  isSelected?: boolean;
  onRemove?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const FilePreviewPlaceholder: React.FC<FilePreviewPlaceholderProps> = ({
  id,
  fileType = 'PDF',
  imageUrl,
  pageNumber = 1,
  isSelected = false,
  onRemove,
  className,
  children,
  ...props
}) => {
  return (
    <div
      id={id}
      className={cn(
        'relative inline-flex flex-col items-center justify-end pb-2 bg-white dark:bg-slate-900 rounded-xl overflow-hidden transition-all font-sans',
        isSelected
          ? 'outline outline-3 outline-[#0F62FE] dark:outline-blue-500'
          : 'outline outline-1 outline-[#CBD5E1] dark:outline-slate-700',
        className
      )}
      {...props}
    >
      {/* Card Preview Box (120x170 px) */}
      <div className="relative w-[120px] h-[170px] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] overflow-hidden bg-[#F1F5F9] dark:bg-slate-800 flex flex-col items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            <FileText className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 tracking-widest">{fileType}</span>
          </div>
        )}
      </div>

      {/* Footer Number */}
      <div className="text-xs text-[#64748B] dark:text-slate-400 pt-2 font-normal">{pageNumber}</div>
      {children}

      {/* Absolute Remove Button (Pojok Kanan Atas) */}
      {onRemove && (
        <button
          id={id ? `${id}-remove` : undefined}
          onClick={onRemove}
          className="absolute top-1 right-1 bg-[#283445] dark:bg-slate-700 text-white p-1 rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.16)] hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
          title="Hapus"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};