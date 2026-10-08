import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface AnswerOptionItem {
  /** Nilai unik opsi jawaban */
  value: string;
  /** Teks label opsi jawaban */
  label: string;
  /** Jika true, menampilkan input teks untuk mengetik jawaban kustom */
  customAnswer?: boolean;
  /** Teks placeholder untuk input jawaban kustom */
  placeholder?: string;
  /** Keterangan bantuan atau catatan tambahan */
  helperText?: string;
  /** Kondisi nonaktif untuk opsi ini */
  disabled?: boolean;
}

export interface AnswerOptionProps {
  /** Jenis opsi input: 'radio' atau 'checkbox' (opsional, alternatif pengganti prop multi) */
  type?: 'radio' | 'checkbox';
  /** Mode pilihan: true untuk checkbox (multi-select), false untuk radio (single-select). Default: false */
  multi?: boolean;
  /** Daftar opsi jawaban yang disediakan */
  options?: AnswerOptionItem[];
  /** Nilai terpilih saat ini (string untuk single, string[] untuk multi) */
  value?: string | string[];
  /** Callback ketika pilihan atau nilai jawaban kustom berubah */
  onChange?: (value: any) => void;
  /** Apakah seluruh grup dinonaktifkan */
  disabled?: boolean;
  /** Nama grup input untuk kebutuhan form */
  name?: string;
  /** ClassName kustom untuk container pembungkus */
  className?: string;

  // Single Item Mode (kompatibilitas penggunaan per-elemen)
  /** Label untuk penggunaan mode satuan */
  label?: string;
  /** Apakah opsi berstatus selected (mode satuan) */
  selected?: boolean;
  /** Apakah opsi ini menerima input teks kustom (mode satuan) */
  customAnswer?: boolean;
  /** Placeholder teks kustom (mode satuan) */
  placeholder?: string;
  /** Keterangan bantuan (mode satuan) */
  helperText?: string;
  /** Callback ketika opsi dipilih (mode satuan) */
  onSelect?: () => void;
  /** Callback ketika teks kustom berubah (mode satuan) */
  onTextChange?: (value: string) => void;
  /** Nilai teks kustom saat ini (mode satuan) */
  customValue?: string;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  type,
  multi: multiProp = false,
  options,
  value,
  onChange,
  disabled: groupDisabled = false,
  name,
  className = '',

  // Single item props
  label = 'Label',
  selected: singleSelected = false,
  customAnswer: singleCustomAnswer = false,
  placeholder = 'Tuliskan jawaban...',
  helperText: singleHelperText,
  onSelect,
  onTextChange,
  customValue = '',
}) => {
  // Gabungkan penentuan mode multi: prioritaskan prop `type`, lalu fallback ke `multiProp`
  const isMulti = type ? type === 'checkbox' : multiProp;

  // State untuk menyimpan teks custom answer per opsi (key: option.value)
  const [customTextMap, setCustomTextMap] = useState<Record<string, string>>({});

  // 1. Single Item Mode (jika options tidak diberikan)
  if (!options || options.length === 0) {
    const isSelected = singleSelected;
    const isDisabled = groupDisabled;

    const handleSingleSelect = () => {
      if (!isDisabled && onSelect) {
        onSelect();
      }
    };

    return (
      <div
        role={isMulti ? 'checkbox' : 'radio'}
        aria-checked={isSelected}
        aria-disabled={isDisabled}
        data-name={name}
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleSingleSelect}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
            e.preventDefault();
            handleSingleSelect();
          }
        }}
        className={cn(
          'w-full min-h-[52px] px-4 py-3 rounded-xl border transition-all duration-150 ease-out cursor-pointer flex items-center gap-3.5 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aposis-blue-60 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-950',
          isSelected
            ? 'bg-blue-50/80 dark:bg-blue-950/50 border-aposis-blue-60 dark:border-blue-500 ring-1 ring-aposis-blue-60/25 dark:ring-blue-500/30 shadow-xs'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/70 dark:hover:bg-slate-800/40',
          isDisabled && 'opacity-50 cursor-not-allowed bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 pointer-events-none',
          className
        )}
      >
        {/* Selector Visual Indicator (Radio vs Checkbox) */}
        <div className="flex items-center justify-center shrink-0">
          {isMulti ? (
            <div
              className={cn(
                'w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-150',
                isSelected
                  ? 'bg-aposis-blue-60 border-aposis-blue-60 dark:bg-blue-600 dark:border-blue-500 text-white'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
              )}
            >
              {isSelected && (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          ) : (
            <div
              className={cn(
                'w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-150',
                isSelected
                  ? 'border-aposis-blue-60 bg-aposis-blue-60 dark:border-blue-500 dark:bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
              )}
            >
              {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex items-center justify-between flex-1 min-w-0 gap-3">
          {singleCustomAnswer ? (
            <div className="flex flex-col flex-1 min-w-0 gap-2 sm:flex-row sm:items-center">
              <span
                className={cn(
                  'text-sm font-medium shrink-0',
                  isSelected ? 'text-aposis-blue-90 dark:text-white font-semibold' : 'text-slate-800 dark:text-white'
                )}
              >
                {label}
              </span>
              <input
                type="text"
                value={customValue}
                placeholder={placeholder}
                disabled={isDisabled}
                onClick={(e) => e.stopPropagation()}
                onFocus={() => {
                  if (!isSelected && !isDisabled && onSelect) {
                    onSelect();
                  }
                }}
                onChange={(e) => onTextChange?.(e.target.value)}
                className={cn(
                  'flex-1 min-w-0 px-3.5 py-1.5 rounded-lg border text-sm font-sans transition-colors duration-150',
                  'bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
                  'focus:outline-none focus:ring-2 focus:ring-aposis-blue-60/30 dark:focus:ring-blue-400/20',
                  isSelected
                    ? 'border-aposis-blue-60/60 dark:border-blue-500/50 focus:border-aposis-blue-60 dark:focus:border-blue-400'
                    : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
                )}
              />
            </div>
          ) : (
            <span
              className={cn(
                'text-sm font-medium truncate',
                isSelected ? 'text-aposis-blue-90 dark:text-white font-semibold' : 'text-slate-800 dark:text-white'
              )}
            >
              {label}
            </span>
          )}

          {singleHelperText && (
            <span
              className={cn(
                'text-xs shrink-0',
                isSelected ? 'text-aposis-blue-60 dark:text-aposis-blue-40 font-medium' : 'text-slate-500 dark:text-slate-400'
              )}
            >
              {singleHelperText}
            </span>
          )}
        </div>
      </div>
    );
  }

  // 2. Array List Mode (options diberikan sebagai array)
  const selectedList = Array.isArray(value) ? value : value !== undefined && value !== '' ? [value] : [];

  const handleOptionClick = (opt: AnswerOptionItem) => {
    if (groupDisabled || opt.disabled) return;

    const currentCustomVal = customTextMap[opt.value] || '';
    const optionActiveValue = opt.customAnswer && currentCustomVal ? currentCustomVal : opt.value;

    if (isMulti) {
      // Multi-select toggle
      const isCurrentlySelected =
        selectedList.includes(opt.value) ||
        (opt.customAnswer && Boolean(currentCustomVal) && selectedList.includes(currentCustomVal));

      if (isCurrentlySelected) {
        const nextList = selectedList.filter((v) => v !== opt.value && v !== currentCustomVal);
        onChange?.(nextList);
      } else {
        onChange?.([...selectedList, optionActiveValue]);
      }
    } else {
      // Single-select
      onChange?.(optionActiveValue);
    }
  };

  const handleCustomInputChange = (opt: AnswerOptionItem, typedVal: string) => {
    if (groupDisabled || opt.disabled) return;

    const prevTypedVal = customTextMap[opt.value] || '';
    setCustomTextMap((prev) => ({ ...prev, [opt.value]: typedVal }));

    // Kirim value langsung
    const valueToSend = typedVal.trim() !== '' ? typedVal : opt.value;

    if (isMulti) {
      const filtered = selectedList.filter((v) => v !== prevTypedVal && v !== opt.value);
      onChange?.([...filtered, valueToSend]);
    } else {
      onChange?.(valueToSend);
    }
  };

  return (
    <div
      role={isMulti ? 'group' : 'radiogroup'}
      aria-disabled={groupDisabled}
      data-name={name}
      className={cn('flex flex-col gap-2.5 w-full', className)}
    >
      {options.map((opt) => {
        const currentCustomVal = customTextMap[opt.value] || '';
        const isSelected = isMulti
          ? selectedList.includes(opt.value) ||
            (Boolean(opt.customAnswer && currentCustomVal) && selectedList.includes(currentCustomVal))
          : value === opt.value ||
            (Boolean(opt.customAnswer && currentCustomVal) && value === currentCustomVal);

        const isDisabled = groupDisabled || Boolean(opt.disabled);

        return (
          <div
            key={opt.value}
            role={isMulti ? 'checkbox' : 'radio'}
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
            onClick={() => handleOptionClick(opt)}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
                e.preventDefault();
                handleOptionClick(opt);
              }
            }}
            className={cn(
              'w-full min-h-[52px] px-4 py-3 rounded-xl border transition-all duration-150 ease-out cursor-pointer flex items-center gap-3.5 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aposis-blue-60 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-950',
              isSelected
                ? 'bg-blue-50/80 dark:bg-blue-950/50 border-aposis-blue-60 dark:border-blue-500 ring-1 ring-aposis-blue-60/25 dark:ring-blue-500/30 shadow-xs'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/70 dark:hover:bg-slate-800/40',
              isDisabled &&
                'opacity-50 cursor-not-allowed bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 pointer-events-none'
            )}
          >
            {/* Visual Selector Indicator */}
            <div className="flex items-center justify-center shrink-0">
              {isMulti ? (
                <div
                  className={cn(
                    'w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-150',
                    isSelected
                      ? 'bg-aposis-blue-60 border-aposis-blue-60 dark:bg-blue-600 dark:border-blue-500 text-white'
                      : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                  )}
                >
                  {isSelected && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              ) : (
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-150',
                    isSelected
                      ? 'border-aposis-blue-60 bg-aposis-blue-60 dark:border-blue-500 dark:bg-blue-600 text-white'
                      : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                  )}
                >
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex items-center justify-between flex-1 min-w-0 gap-3">
              {opt.customAnswer ? (
                <div className="flex flex-col flex-1 min-w-0 gap-2 sm:flex-row sm:items-center">
                  <span
                    className={cn(
                      'text-sm font-medium shrink-0',
                      isSelected
                        ? 'text-aposis-blue-90 dark:text-white font-semibold'
                        : 'text-slate-800 dark:text-white'
                    )}
                  >
                    {opt.label}
                  </span>
                  <input
                    type="text"
                    value={currentCustomVal}
                    placeholder={opt.placeholder || 'Tuliskan jawaban Anda di sini...'}
                    disabled={isDisabled}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={() => {
                      if (!isSelected && !isDisabled) {
                        handleOptionClick(opt);
                      }
                    }}
                    onChange={(e) => handleCustomInputChange(opt, e.target.value)}
                    className={cn(
                      'flex-1 min-w-0 px-3.5 py-1.5 rounded-lg border text-sm font-sans transition-colors duration-150',
                      'bg-white dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
                      'focus:outline-none focus:ring-2 focus:ring-aposis-blue-60/30 dark:focus:ring-blue-400/20',
                      isSelected
                        ? 'border-aposis-blue-60/60 dark:border-blue-500/50 focus:border-aposis-blue-60 dark:focus:border-blue-400'
                        : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
                    )}
                  />
                </div>
              ) : (
                <span
                  className={cn(
                    'text-sm font-medium truncate',
                    isSelected
                      ? 'text-aposis-blue-90 dark:text-white font-semibold'
                      : 'text-slate-800 dark:text-white'
                  )}
                >
                  {opt.label}
                </span>
              )}

              {opt.helperText && (
                <span
                  className={cn(
                    'text-xs shrink-0',
                    isSelected
                      ? 'text-aposis-blue-60 dark:text-aposis-blue-40 font-medium'
                      : 'text-slate-500 dark:text-slate-400'
                  )}
                >
                  {opt.helperText}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};