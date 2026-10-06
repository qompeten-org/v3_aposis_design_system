import React from 'react';
import { Plus, CheckCircle2, AlertTriangle, AlertCircle, X, FileText } from 'lucide-react';

export type StatusPlaceholderVariant = 'empty' | 'success' | 'warning' | 'danger';

export interface StatusPlaceholderProps {
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
  variant = 'empty',
  title,
  description,
  icon,
  showDivider = true,
  slotComponent,
  actionButton,
  className = '',
  children,
}) => {
  const variantStyles = {
    empty: {
      container: 'bg-[#F1F5F9] border border-[#94A3B8]',
      iconColor: 'text-[#475569]',
      defaultIcon: <Plus className="w-6 h-6 text-[#475569]" />,
    },
    success: {
      container: 'bg-white border border-slate-200',
      iconColor: 'text-[#0F62FE]',
      defaultIcon: <CheckCircle2 className="w-6 h-6 text-[#0F62FE] fill-[#0F62FE] text-white" />,
    },
    warning: {
      container: 'bg-[#FFFBEB] border border-[#F59E0B]',
      iconColor: 'text-[#F59E0B]',
      defaultIcon: <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />,
    },
    danger: {
      container: 'bg-[#FFEFEF] border border-[#FF3941]',
      iconColor: 'text-[#E6212A]',
      defaultIcon: <AlertCircle className="w-6 h-6 text-[#E6212A]" />,
    },
  }[variant];

  return (
    <div
      className={`w-full p-5 rounded-[20px] flex flex-col items-center justify-center gap-4 text-center font-lexend ${variantStyles.container} ${className}`}
    >
      {/* Icon Header */}
      <div className="flex items-center justify-center w-6 h-6">
        {icon || variantStyles.defaultIcon}
      </div>

      {/* Title & Description */}
      <div className="w-full flex flex-col items-center gap-1">
        <h4 className="text-sm font-semibold text-[#0F172A] leading-snug">{title}</h4>
        {description && (
          <p className="text-xs text-[#475569] leading-relaxed tracking-wide">{description}</p>
        )}
      </div>

      {/* Divider */}
      {showDivider && <div className="w-full border-t border-[#94A3B8]/60 my-0.5" />}

      {/* Slot Component Tag */}
      {slotComponent && (
        <div className="w-full px-2 py-1 bg-[#D0E2FF] outline outline-1 outline-[#0F62FE] rounded-xl flex items-center justify-start gap-2 text-xs text-[#0F62FE] font-normal">
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

export interface FilePreviewPlaceholderProps {
  fileType?: string;
  imageUrl?: string;
  pageNumber?: number | string;
  isSelected?: boolean;
  onRemove?: () => void;
  className?: string;
}

export const FilePreviewPlaceholder: React.FC<FilePreviewPlaceholderProps> = ({
  fileType = 'PDF',
  imageUrl,
  pageNumber = 1,
  isSelected = false,
  onRemove,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex flex-col items-center justify-end pb-2 bg-white rounded-xl overflow-hidden transition-all font-lexend ${
        isSelected
          ? 'outline outline-3 outline-[#0F62FE]'
          : 'outline outline-1 outline-[#CBD5E1]'
      } ${className}`}
    >
      {/* Card Preview Box (120x170 px) */}
      <div className="relative w-[120px] h-[170px] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] overflow-hidden bg-[#F1F5F9] flex flex-col items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            <FileText className="w-8 h-8 text-slate-400" />
            <span className="text-xs font-bold text-slate-600 tracking-widest">{fileType}</span>
          </div>
        )}
      </div>

      {/* Footer Number */}
      <div className="text-xs text-[#64748B] pt-2 font-normal">{pageNumber}</div>

      {/* Absolute Remove Button (Pojok Kanan Atas) */}
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute top-1 right-1 bg-[#283445] text-white p-1 rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.16)] hover:bg-slate-800 transition-colors"
          title="Hapus"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};