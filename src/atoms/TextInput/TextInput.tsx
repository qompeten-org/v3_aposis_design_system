import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { Input, InputProps } from '../Input/Input';
import { cn } from '../../utils/cn';

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: boolean | string;
  warning?: boolean | string;
  state?: 'default' | 'warning' | 'error';
  inputSize?: 'xs' | 'sm' | 'md' | 'lg';
  multiline?: boolean;
  rows?: number;
  highlighted?: boolean;
  badgeText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showToolbar?: boolean;
}

const ErrorIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" fill="#E6212A" />
    <path d="M8 4.5v4.5M8 11.5h.01" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const WarningIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1.333L1.333 13.333h13.334L8 1.333z" fill="#F59E0B" />
    <path d="M8 6v3.333M8 11.333h.007" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

interface TextAreaToolbarProps {
  onCommand: (command: string, value?: string) => void;
  activeFormats: Record<string, boolean>;
}

const TextAreaToolbar: React.FC<TextAreaToolbarProps> = ({ onCommand, activeFormats }) => {
  const handlePromptCommand = (command: string, promptText: string, defaultVal: string) => {
    const url = window.prompt(promptText, defaultVal);
    if (url) {
      onCommand(command, url);
    }
  };

  const getBtnClass = (commandName: string) =>
    cn(
      'p-1 rounded transition-colors text-xs flex items-center justify-center',
      activeFormats[commandName]
        ? 'bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white font-bold shadow-inner'
        : 'hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
    );

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-t-xl text-xs select-none">
      <button
        type="button"
        onClick={() => onCommand('undo')}
        className="p-1 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
        title="Undo"
      >
        ↺
      </button>
      <button
        type="button"
        onClick={() => onCommand('redo')}
        className="p-1 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
        title="Redo"
      >
        ↻
      </button>
      <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-700 my-auto mx-0.5" />
      <button
        type="button"
        onClick={() => onCommand('bold')}
        className={cn(getBtnClass('bold'), 'font-bold')}
        title="Bold"
      >
        B
      </button>
      <button
        type="button"
        onClick={() => onCommand('italic')}
        className={cn(getBtnClass('italic'), 'italic')}
        title="Italic"
      >
        I
      </button>
      <button
        type="button"
        onClick={() => onCommand('underline')}
        className={cn(getBtnClass('underline'), 'underline')}
        title="Underline"
      >
        U
      </button>
      <button
        type="button"
        onClick={() => onCommand('strikeThrough')}
        className={cn(getBtnClass('strikeThrough'), 'line-through')}
        title="Strikethrough"
      >
        S
      </button>
      <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-700 my-auto mx-0.5" />
      <button
        type="button"
        onClick={() => onCommand('insertUnorderedList')}
        className={getBtnClass('insertUnorderedList')}
        title="Bullet List"
      >
        • List
      </button>
      <button
        type="button"
        onClick={() => handlePromptCommand('createLink', 'Masukkan URL Link:', 'https://')}
        className="p-1 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
        title="Link"
      >
        🔗
      </button>
      <button
        type="button"
        onClick={() => handlePromptCommand('insertImage', 'Masukkan URL Gambar:', 'https://')}
        className="p-1 transition-colors rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
        title="Image"
      >
        🖼️
      </button>
    </div>
  );
};

export const TextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextInputProps>(
  (
    {
      label,
      helperText,
      error,
      warning,
      state = 'default',
      inputSize = 'md',
      multiline = false,
      rows = 4,
      highlighted = false,
      badgeText,
      leftIcon,
      rightIcon,
      showToolbar = true,
      className,
      disabled,
      placeholder,
      defaultValue,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});

    useImperativeHandle(ref, () => editorRef.current as any);

    const activeError = Boolean(error) ? error : state === 'error' ? helperText || true : undefined;
    const activeWarning = Boolean(warning) ? warning : state === 'warning' ? helperText || true : undefined;

    const iconSizes: Record<string, number> = {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
    };
    const currentIconSize = iconSizes[inputSize] || 16;

    const updateActiveFormats = () => {
      try {
        setActiveFormats({
          bold: document.queryCommandState('bold'),
          italic: document.queryCommandState('italic'),
          underline: document.queryCommandState('underline'),
          strikeThrough: document.queryCommandState('strikeThrough'),
          insertUnorderedList: document.queryCommandState('insertUnorderedList'),
        });
      } catch (e) {}
    };

    const handleExecCommand = (command: string, val: string = '') => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
      document.execCommand(command, false, val);
      updateActiveFormats();
    };

    const renderStatusIcon = () => {
      if (activeError) return <ErrorIcon size={currentIconSize} />;
      if (activeWarning) return <WarningIcon size={currentIconSize} />;
      return rightIcon;
    };

    const inputContent = (
      <div className="flex flex-col w-full gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {label}
          </label>
        )}

        {multiline ? (
          <div
            className={cn(
              'relative w-full rounded-xl border bg-white dark:bg-slate-900 transition-colors overflow-hidden',
              activeError
                ? 'border-rose-400 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-200 dark:border-rose-500 dark:focus-within:ring-rose-950/50'
                : activeWarning
                ? 'border-amber-500 focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-200 dark:border-amber-500 dark:focus-within:ring-amber-950/50'
                : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20',
              disabled && 'bg-slate-50 dark:bg-slate-800/50 opacity-60 cursor-not-allowed'
            )}
          >
            {showToolbar && (
              <TextAreaToolbar
                onCommand={handleExecCommand}
                activeFormats={activeFormats}
              />
            )}
            <div className="relative p-2.5 min-h-[100px]">
              <div
                ref={editorRef}
                contentEditable={!disabled}
                suppressContentEditableWarning
                data-placeholder={placeholder}
                className={cn(
                  'w-full bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none text-sm min-h-[80px]',
                  'before:text-slate-400 dark:before:text-slate-500 before:content-[attr(data-placeholder)] before:block empty:before:inline-block focus:empty:before:inline-block [&:not(:empty)]:before:hidden',
                  '[&_ul]:list-disc [&_ul]:list-inside [&_ul]:pl-2 [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:pl-2 [&_a]:text-blue-500 [&_a]:underline',
                  className
                )}
                onKeyUp={updateActiveFormats}
                onMouseUp={updateActiveFormats}
                onInput={(e) => {
                  updateActiveFormats();
                  if (onChange) {
                    onChange(e as any);
                  }
                }}
              />
              {(activeError || activeWarning) && (
                <div className="absolute right-3 bottom-3">
                  {renderStatusIcon()}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Menggunakan Base Input Component dari Atom */
          <Input
            ref={ref as React.Ref<HTMLInputElement>}
            inputSize={inputSize}
            error={activeError ? String(activeError) : undefined}
            warning={activeWarning ? String(activeWarning) : undefined}
            leftIcon={leftIcon}
            rightIcon={
              (rightIcon || activeError || activeWarning) ? (
                <div className="flex items-center gap-1.5">
                  {rightIcon}
                  {renderStatusIcon()}
                </div>
              ) : undefined
            }
            disabled={disabled}
            className={className}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            {...(props as InputProps)}
          />
        )}

        {/* Helper / Error / Warning Message */}
        {(helperText || typeof activeError === 'string' || typeof activeWarning === 'string') && (
          <span
            className={cn(
              'text-xs mt-0.5',
              activeError
                ? 'text-rose-500'
                : activeWarning
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-slate-500 dark:text-slate-400'
            )}
          >
            {typeof activeError === 'string'
              ? activeError
              : typeof activeWarning === 'string'
              ? activeWarning
              : helperText}
          </span>
        )}
      </div>
    );

    if (highlighted) {
      return (
        <div className="flex items-start w-full gap-4 p-4 border rounded-xl bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700">
          {badgeText && (
            <div className="flex items-center justify-center text-xs font-semibold border rounded-full w-9 h-9 shrink-0 bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200">
              {badgeText}
            </div>
          )}
          <div className="flex-1">{inputContent}</div>
        </div>
      );
    }

    return inputContent;
  }
);

TextInput.displayName = 'TextInput';