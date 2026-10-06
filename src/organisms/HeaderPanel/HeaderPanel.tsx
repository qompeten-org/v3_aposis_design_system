import React from 'react';
import { 
  IconLayoutSidebarLeftCollapse, 
  IconLayoutSidebarRightCollapse, 
  IconPlus, 
  IconMoon, 
  IconSun 
} from '@tabler/icons-react';

export interface HeaderPanelBreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface HeaderPanelProps {
  breadcrumbs?: HeaderPanelBreadcrumbItem[];
  onToggleLeftSidebar?: () => void;
  onToggleRightSidebar?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  language?: string;
  onLanguageChange?: () => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  className?: string;
}

export const HeaderPanel: React.FC<HeaderPanelProps> = ({
  breadcrumbs = [
    { label: 'Link', href: '#' },
    { label: 'Link', href: '#' },
    { label: 'Link', href: '#' },
    { label: 'Link', href: '#' },
    { label: 'Link' },
  ],
  onToggleLeftSidebar,
  onToggleRightSidebar,
  onPrimaryAction,
  onSecondaryAction,
  language = 'EN',
  onLanguageChange,
  theme = 'light',
  onThemeToggle,
  className = '',
}) => {
  return (
    <header
      className={`flex h-12 w-full items-center justify-start gap-2 border-b border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-2 font-['Lexend'] text-xs leading-[18px] tracking-[0.12px] transition-colors ${className}`}
    >
      {/* 1. Left Controls (Toggle Sidebar Kiri & Quick Actions) */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onToggleLeftSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent p-2 text-[#0F172A] dark:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/20"
          aria-label="Toggle Left Sidebar"
        >
          <IconLayoutSidebarLeftCollapse size={16} stroke={1.5} />
        </button>

        <button
          type="button"
          onClick={onPrimaryAction}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent p-2 text-[#0F172A] dark:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/20"
          aria-label="Action 1"
        >
          <IconPlus size={16} stroke={1.5} />
        </button>

        <button
          type="button"
          onClick={onSecondaryAction}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent p-2 text-[#0F172A] dark:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/20"
          aria-label="Action 2"
        >
          <IconPlus size={16} stroke={1.5} />
        </button>
      </div>

      {/* 2. Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center">
        <ol className="flex items-center gap-1">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={index} className="flex items-center gap-1">
                {index > 0 && (
                  <span className="select-none text-[#64748B] dark:text-slate-500">
                    /
                  </span>
                )}

                {isLast ? (
                  <span
                    className="rounded px-0.5 font-normal text-[#0F172A] dark:text-slate-100"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href || '#'}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className="font-normal text-[#0F62FE] dark:text-blue-400 transition-colors hover:underline"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Spacer fleksibel pengisi ruang tengah */}
      <div className="flex-1" />

      {/* 3. Right Utility Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleRightSidebar}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent p-2 text-[#0F172A] dark:text-slate-200 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/20"
          aria-label="Toggle Right Sidebar"
        >
          <IconLayoutSidebarRightCollapse size={16} stroke={1.5} />
        </button>

        <button
          type="button"
          onClick={onLanguageChange}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#CBD5E1] dark:border-slate-700 bg-transparent text-xs font-normal text-[#475569] dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/20"
          aria-label="Change Language"
        >
          {language}
        </button>

        <button
          type="button"
          onClick={onThemeToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#CBD5E1] dark:border-slate-700 bg-transparent text-[#475569] dark:text-slate-300 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0F62FE]/20"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            <IconMoon size={16} stroke={1.5} />
          ) : (
            <IconSun size={16} stroke={1.5} className="text-amber-400" />
          )}
        </button>
      </div>
    </header>
  );
};

export default HeaderPanel;