import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';

export type DropdownSize = 'small' | 'medium' | 'large' | 'extra-small';
export type DropdownState = 'default' | 'error' | 'success' | 'warning';

export interface OptionItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface DropdownProps {
  label?: string;
  options: OptionItem[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  size?: DropdownSize;
  state?: DropdownState;
  helperText?: string;
  errorMessage?: string;
  warningMessage?: string;
  disabled?: boolean;
  readOnly?: boolean;
  isMulti?: boolean;
  required?: boolean;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder = 'Pilih Opsi',
  options = [],
  value,
  onChange,
  size = 'medium',
  state = 'default',
  helperText,
  errorMessage,
  warningMessage,
  disabled = false,
  readOnly = false,
  isMulti = false,
  required = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isSelected = (optionValue: string) => {
    if (Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  const handleSelect = (option: OptionItem) => {
    if (disabled || readOnly || option.disabled) return;

    if (isMulti) {
      const currentValue = Array.isArray(value) ? value : [];
      const exists = currentValue.includes(option.value);
      const updated = exists
        ? currentValue.filter((v) => v !== option.value)
        : [...currentValue, option.value];
      onChange?.(updated);
    } else {
      onChange?.(option.value);
      setIsOpen(false);
    }
  };

  // Handler untuk menghapus semua pilihan pada mode Multiselect
  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah dropdown terbuka/tertutup saat tombol 'X' diklik
    if (disabled || readOnly) return;
    onChange?.([]);
  };

  const sizeStyles = {
    small: 'h-9 px-3 py-2 text-xs rounded-lg',
    medium: 'h-11 px-4 py-3 text-sm rounded-xl',
    large: 'h-12 px-4 py-3.5 text-base rounded-xl',
    'extra-small': 'h-8 px-2 py-1 text-xs rounded-md',
  };

  const getFieldStateStyles = () => {
    if (disabled) return 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed';
    if (readOnly) return 'bg-slate-100 border-slate-300 text-slate-900 cursor-default';
    if (state === 'error') return 'bg-slate-100 border-red-500 ring-2 ring-red-100';
    if (state === 'warning') return 'bg-slate-100 border-amber-500 ring-2 ring-amber-100';
    if (isOpen) return 'bg-slate-100 border-[#0F62FE] ring-2 ring-[#0F62FE]/20';
    return 'bg-[#F1F5F9] border-b border-[#94A3B8] hover:border-slate-500 focus:ring-2 focus:ring-[#0F62FE]';
  };

  const renderValueContent = () => {
    // Mode Multiselect jika ada item terpilih
    if (isMulti && Array.isArray(value) && value.length > 0) {
      return (
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="inline-flex items-center gap-1.5 bg-[#1E293B] text-white text-xs font-semibold rounded-full px-2.5 py-1">
            <span>{value.length}</span>
            {!disabled && !readOnly && (
              <button
                type="button"
                onClick={handleClearAll}
                className="hover:text-red-300 focus:outline-none transition-colors p-0.5 rounded-full"
                title="Hapus semua pilihan"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <span className="font-normal truncate text-slate-900">Opsi</span>
        </div>
      );
    }

    // Mode Single Select / Default jika ada isi
    if (!isMulti && value && typeof value === 'string') {
      const selectedObj = options.find((opt) => opt.value === value);
      return <span className="truncate text-[#0F172A] font-normal">{selectedObj?.label || value}</span>;
    }

    // Placeholder
    return <span className="font-normal truncate text-slate-400">{readOnly ? 'No option selected' : placeholder}</span>;
  };

  const displayMessage = state === 'error' ? errorMessage : state === 'warning' ? warningMessage : helperText;
  const messageColor = state === 'error' ? 'text-red-500' : state === 'warning' ? 'text-amber-600' : 'text-slate-500';

  return (
    <div className={cn('w-full flex flex-col gap-1.5 font-sans', className)} ref={dropdownRef}>
      {/* Label */}
      {label && (
        <label className="flex items-center gap-1 text-xs font-medium text-slate-700">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Trigger Box */}
      <div className="relative w-full">
        <button
          type="button"
          disabled={disabled || readOnly}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-full flex items-center justify-between gap-2 transition-all outline-none',
            sizeStyles[size],
            getFieldStateStyles()
          )}
        >
          <div className="flex-1 flex items-center overflow-hidden text-left font-normal text-sm leading-[18.2px]">
            {renderValueContent()}
          </div>

          {/* Icon Status & Chevron */}
          <div className="flex items-center gap-2 shrink-0">
            {state === 'error' && (
              <div className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">
                !
              </div>
            )}
            {state === 'warning' && (
              <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                !
              </div>
            )}
            {!readOnly && (
              <svg
                className={cn('w-4 h-4 text-[#0F172A] transition-transform duration-200', isOpen && 'rotate-180')}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </button>

        {/* Dropdown Menu Listbox */}
        {isOpen && !disabled && !readOnly && (
          <div className="absolute z-50 w-full py-1 mt-1 overflow-y-auto bg-white border shadow-lg border-slate-200 rounded-xl max-h-60">
            {options.length === 0 ? (
              <div className="px-4 py-2.5 text-sm text-slate-400">Tidak ada opsi</div>
            ) : (
              options.map((option) => {
                const selected = isSelected(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={option.disabled}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      'w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors',
                      option.disabled && 'opacity-50 cursor-not-allowed bg-slate-50 text-slate-400',
                      !option.disabled && 'hover:bg-slate-100 cursor-pointer text-slate-900',
                      selected && 'bg-blue-50 text-[#0F62FE] font-medium'
                    )}
                  >
                    <span>{option.label}</span>
                    {selected && <span className="text-[#0F62FE]">✓</span>}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Helper Text / Error Message */}
      {displayMessage && <p className={cn('text-xs mt-0.5', messageColor)}>{displayMessage}</p>}
    </div>
  );
};