import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../utils/cn";

export type DropdownSize = "small" | "medium" | "large" | "extra-small";
export type DropdownState = "default" | "error" | "success" | "warning";

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
  placeholder = "Pilih Opsi",
  options = [],
  value,
  onChange,
  size = "medium",
  state = "default",
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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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


  const sizeStyles = {
    small: "h-9 px-3 py-2 text-xs rounded-lg",
    medium: "h-11 px-4 py-3 text-sm rounded-xl",
    large: "h-12 px-4 py-3.5 text-base rounded-xl",
    "extra-small": "h-8 px-2 py-1 text-xs rounded-md",
  };

  const getFieldStateStyles = () => {
    if (disabled)
      return "bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed";
    if (readOnly)
      return "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 cursor-default";
    if (state === "error")
      return "bg-slate-100 dark:bg-slate-900 border-red-500 ring-2 ring-red-100 dark:ring-red-950/40 text-slate-900 dark:text-slate-100";
    if (state === "warning")
      return "bg-slate-100 dark:bg-slate-900 border-amber-500 ring-2 ring-amber-100 dark:ring-amber-950/40 text-slate-900 dark:text-slate-100";
    if (isOpen) return "bg-slate-100 dark:bg-slate-800 border-aposis-blue-60 dark:border-blue-500 ring-2 ring-aposis-blue-60/20 dark:ring-blue-500/20 text-slate-900 dark:text-slate-100";
    return "bg-[#F1F5F9] dark:bg-slate-800/80 border-b border-[#94A3B8] dark:border-slate-600 hover:border-slate-500 dark:hover:border-slate-400 focus:ring-2 focus:ring-aposis-blue-60 dark:focus:ring-blue-500 text-slate-900 dark:text-slate-100";
  };

  const handleRemoveOption = (e: React.MouseEvent, optionValue: string) => {
    e.stopPropagation(); // Mencegah menu dropdown terbuka/tertutup saat tombol 'X' diklik
    if (disabled || readOnly) return;
    if (Array.isArray(value)) {
      const updated = value.filter((val) => val !== optionValue);
      onChange?.(updated);
    }
  };

  const renderValueContent = () => {
    if (isMulti && Array.isArray(value) && value.length > 0) {
      return (
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 max-w-full">
          {value.map((val) => {
            const selectedObj = options.find((opt) => opt.value === val);
            const labelText = selectedObj?.label || val;

            return (
              <div
                key={val}
                className="inline-flex items-center gap-1 bg-[#1E293B] dark:bg-slate-800 text-white dark:text-slate-100 border border-transparent dark:border-slate-700 text-xs font-medium rounded-full px-2.5 py-1 shrink-0"
              >
                <span className="truncate max-w-[100px]">{labelText}</span>
                {!disabled && !readOnly && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveOption(e, val)}
                    className="hover:text-red-300 focus:outline-none transition-colors p-0.5 rounded-full"
                    title={`Hapus ${labelText}`}
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    // Mode Single Select
    if (!isMulti && value && typeof value === "string") {
      const selectedObj = options.find((opt) => opt.value === value);
      return (
        <span className="truncate text-slate-900 dark:text-slate-100 font-normal">
          {selectedObj?.label || value}
        </span>
      );
    }

    // Placeholder
    return (
      <span className="font-normal truncate text-slate-400 dark:text-slate-500">
        {readOnly ? "No option selected" : placeholder}
      </span>
    );
  };

  const displayMessage =
    state === "error"
      ? errorMessage
      : state === "warning"
        ? warningMessage
        : helperText;
  const messageColor =
    state === "error"
      ? "text-red-500"
      : state === "warning"
        ? "text-amber-600 dark:text-amber-400"
        : "text-slate-500 dark:text-slate-400";

  return (
    <div
      className={cn("w-full flex flex-col gap-1.5 font-sans", className)}
      ref={dropdownRef}
    >
      {/* Label */}
      {label && (
        <label className="flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-300">
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
            "w-full flex items-center justify-between gap-2 transition-all outline-none",
            sizeStyles[size],
            getFieldStateStyles(),
          )}
        >
          <div className="flex-1 flex items-center overflow-hidden text-left font-normal text-sm leading-[18.2px]">
            {renderValueContent()}
          </div>

          {/* Icon Status & Chevron */}
          <div className="flex items-center gap-2 shrink-0">
            {state === "error" && (
              <div className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">
                !
              </div>
            )}
            {state === "warning" && (
              <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                !
              </div>
            )}
            {!readOnly && (
              <svg
                className={cn(
                  "w-4 h-4 text-slate-700 dark:text-slate-300 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>
        </button>

        {/* Dropdown Menu Listbox */}
        {isOpen && !disabled && !readOnly && (
          <div className="absolute z-50 w-full py-1 mt-1 overflow-y-auto bg-white dark:bg-slate-900 border shadow-lg border-slate-200 dark:border-slate-800 rounded-xl max-h-60">
            {options.length === 0 ? (
              <div className="px-4 py-2.5 text-sm text-slate-400 dark:text-slate-500">
                Tidak ada opsi
              </div>
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
                      "w-full text-left px-3.5 py-2.5 text-sm flex items-center gap-3 rounded-lg border transition-all duration-150",
                      option.disabled &&
                        "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800/40 border-transparent text-slate-400 dark:text-slate-500",
                      !option.disabled &&
                        "hover:border-[#0F62FE] dark:hover:border-blue-500 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 cursor-pointer text-slate-800 dark:text-slate-200 border-transparent",
                      selected && "bg-blue-50 dark:bg-blue-950/50 text-aposis-blue-70 dark:text-blue-300 font-medium",
                    )}
                  >
                    {/* Checkbox (Hanya muncul jika mode Multiselect) */}
                    {isMulti && (
                      <div
                        className={cn(
                          "w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0",
                          selected
                            ? "bg-aposis-blue-60 dark:bg-blue-600 border-aposis-blue-60 dark:border-blue-500 text-white"
                            : "border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800",
                        )}
                      >
                        {selected && (
                          <svg
                            className="w-3 h-3 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                    <span>{option.label}</span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Helper Text / Error Message */}
      {displayMessage && (
        <p className={cn("text-xs mt-0.5", messageColor)}>{displayMessage}</p>
      )}
    </div>
  );
};
