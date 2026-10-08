import React, { forwardRef, useId, useState } from 'react';
import { cn } from '../../utils/cn';
import { IconChevronDown } from '@tabler/icons-react';

export type AccordionSize = 'sm' | 'md' | 'lg';
export type AccordionWidth = 'full' | 'sm' | 'md' | 'lg' | 'xl' | string;

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'onToggle'> {
  /** Primary title text or element in header */
  title: string;
  /** Optional secondary subtitle in header */
  subtitle?: string;
  /** Size variant controlling padding and typography */
  size?: AccordionSize;
  /** Width constraint ('full', 'sm', 'md', 'lg', 'xl', or custom CSS width/className) */
  width?: AccordionWidth;
  /** Uncontrolled initial open state */
  defaultOpen?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Callback fired when accordion open state changes */
  onToggle?: (open: boolean) => void;
  /** Whether the accordion is disabled from interaction */
  disabled?: boolean;
  /** Custom toggle icon or false to hide */
  icon?: React.ReactNode | boolean;
  /** Content rendered inside expandable body */
  children?: React.ReactNode;
  /** Custom header container class */
  headerClassName?: string;
  /** Custom body container class */
  bodyClassName?: string;
}

const sizeConfigMap: Record<
  AccordionSize,
  {
    header: string;
    title: string;
    subtitle: string;
    body: string;
    iconSize: number;
  }
> = {
  sm: {
    header: 'px-4 py-3 gap-2.5',
    title: 'text-sm font-semibold',
    subtitle: 'text-xs text-slate-500 dark:text-slate-400',
    body: 'px-4 pb-4 pt-1',
    iconSize: 18,
  },
  md: {
    header: 'px-6 py-4 gap-3',
    title: 'text-base font-bold',
    subtitle: 'text-xs sm:text-sm text-slate-500 dark:text-slate-400',
    body: 'px-6 pb-6 pt-2',
    iconSize: 20,
  },
  lg: {
    header: 'px-7 py-5 gap-3.5',
    title: 'text-lg font-bold',
    subtitle: 'text-sm text-slate-500 dark:text-slate-400',
    body: 'px-7 pb-7 pt-2',
    iconSize: 22,
  },
};

const widthPresetMap: Record<string, string> = {
  full: 'w-full',
  sm: 'w-full max-w-sm',
  md: 'w-full max-w-md',
  lg: 'w-full max-w-lg',
  xl: 'w-full max-w-xl',
};

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      title,
      subtitle,
      size = 'md',
      width = 'full',
      defaultOpen = false,
      isOpen,
      onToggle,
      disabled = false,
      icon,
      children,
      className,
      headerClassName,
      bodyClassName,
      style,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const accordionId = props.id || generatedId;
    const headerId = `${accordionId}-header`;
    const bodyId = `${accordionId}-body`;

    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
    const isControlled = isOpen !== undefined;
    const open = isControlled ? isOpen : uncontrolledOpen;

    const handleToggle = () => {
      if (disabled) return;
      const nextOpen = !open;
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onToggle?.(nextOpen);
    };

    const sizeConfig = sizeConfigMap[size] || sizeConfigMap.md;

    // Resolve width styling
    let resolvedWidthClass = '';
    let resolvedInlineStyle: React.CSSProperties = { ...style };

    if (typeof width === 'string') {
      if (widthPresetMap[width]) {
        resolvedWidthClass = widthPresetMap[width];
      } else if (width.startsWith('w-') || width.startsWith('max-w-')) {
        resolvedWidthClass = width;
      } else {
        resolvedInlineStyle.width = width;
      }
    }

    // Resolve toggle icon
    let chevronNode: React.ReactNode = null;
    if (icon !== false) {
      if (React.isValidElement(icon)) {
        chevronNode = icon;
      } else {
        chevronNode = <IconChevronDown size={sizeConfig.iconSize} className="shrink-0" />;
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-all duration-200 overflow-hidden',
          !disabled && 'hover:border-slate-300 dark:hover:border-slate-700',
          resolvedWidthClass,
          className
        )}
        style={resolvedInlineStyle}
        {...props}
      >
        {/* Accordion Header Trigger */}
        <button
          id={headerId}
          type="button"
          role="button"
          aria-expanded={open}
          aria-controls={bodyId}
          disabled={disabled}
          onClick={handleToggle}
          className={cn(
            'w-full flex items-center justify-between text-left transition-colors duration-150 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-aposis-blue-60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900',
            sizeConfig.header,
            !disabled && 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40 cursor-pointer',
            disabled && 'opacity-60 cursor-not-allowed',
            headerClassName
          )}
        >
          <div className="flex flex-col min-w-0 pr-3">
            <div className={cn('text-slate-900 dark:text-slate-100 leading-snug', sizeConfig.title)}>
              {title}
            </div>
            {subtitle && (
              <div className={cn('mt-0.5 text-slate-500 dark:text-slate-400 leading-normal', sizeConfig.subtitle)}>
                {subtitle}
              </div>
            )}
          </div>

          {chevronNode && (
            <div
              className={cn(
                'shrink-0 text-slate-500 dark:text-slate-400 transition-transform duration-200 ease-out',
                open && 'rotate-180 text-aposis-blue-60 dark:text-aposis-blue-40'
              )}
            >
              {chevronNode}
            </div>
          )}
        </button>

        {/* Animated Expandable Body using CSS Grid Rows */}
        <div
          id={bodyId}
          role="region"
          aria-labelledby={headerId}
          className={cn(
            'grid transition-[grid-template-rows] duration-200 ease-out',
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          )}
        >
          <div className="overflow-hidden">
            <div className={cn(sizeConfig.body, bodyClassName)}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

export const mockAccordionItems = [
  {
    id: 'item-1',
    title: 'Bagaimana cara mendaftar akun baru?',
    subtitle: 'Panduan pendaftaran untuk pengguna baru',
    content: 'Anda dapat mendaftar dengan mengklik tombol Masuk di pojok kanan atas lalu pilih opsi Daftar Akun Baru.',
  },
  {
    id: 'item-2',
    title: 'Metode pembayaran apa saja yang didukung?',
    subtitle: 'Informasi gateway pembayaran dan biaya admin',
    content: 'Kami mendukung transfer bank, QRIS, e-wallet (GoPay, OVO, Dana), dan kartu kredit berlogo Visa/Mastercard.',
  },
  {
    id: 'item-3',
    title: 'Apakah data saya aman dan terenkripsi?',
    subtitle: 'Kebijakan privasi dan standar keamanan data',
    content: 'Semua data komunikasi dienkripsi menggunakan standar TLS 1.3 dan disimpan dengan enkripsi AES-256 pada database.',
  },
];
