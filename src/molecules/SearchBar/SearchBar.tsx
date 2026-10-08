import React, { useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { Search, X } from 'lucide-react';

// Utility helper debounce
const debounce = <T extends (...args: any[]) => void>(func: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export interface SearchBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  autoSearch?: boolean;
  debounceDelay?: number;
  shortcut?: string;
  size?: 'sm' | 'md' | 'lg';
  inputId?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Cari data, menu, atau informasi...',
  value: controlledValue,
  onChange,
  onSearch,
  autoSearch = false,
  debounceDelay = 500,
  shortcut = '⌘K',
  className,
  size = 'md',
  inputId,
  id,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState('');
  const isControlled = controlledValue !== undefined;
  const query = isControlled ? controlledValue : internalValue;

  // Callback debounced search
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      onSearch?.(searchTerm);
    }, debounceDelay),
    [onSearch, debounceDelay]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) setInternalValue(val);
    onChange?.(val);

    if (autoSearch) {
      debouncedSearch(val);
    }
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onChange?.('');
    onSearch?.('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.(query);
    }
  };

  const sizeClasses = {
    sm: 'text-xs py-1.5 pl-8 pr-14',
    md: 'text-sm py-2 pl-9 pr-16',
    lg: 'text-base py-3 pl-11 pr-20',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-2.5',
    md: 'w-4 h-4 left-3',
    lg: 'w-5 h-5 left-3.5',
  };

  return (
    <div id={id} className={cn('relative flex items-center w-full max-w-md', className)} {...props}>
      <Search
        className={cn(
          'absolute text-slate-400 dark:text-slate-500 pointer-events-none stroke-[2]',
          iconSizes[size]
        )}
      />
      <input
        id={inputId}
        type="text"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          'w-full text-slate-900 dark:text-slate-100 rounded-xl transition-all duration-200 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500',
          'bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
          'dark:bg-slate-800 dark:hover:bg-slate-800/80 dark:focus:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-blue-500 dark:focus:ring-blue-500/20',
          sizeClasses[size]
        )}
      />
      <div className="absolute right-2.5 flex items-center gap-1">
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 transition-colors rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        {shortcut && !query && (
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
            {shortcut}
          </kbd>
        )}
      </div>
    </div>
  );
};

SearchBar.displayName = 'SearchBar';