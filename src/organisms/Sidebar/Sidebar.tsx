import React from 'react';
import { cn } from '../../utils/cn';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface SidebarGroup {
  title?: string;
  items: SidebarItem[];
}

export const mockSidebarGroups: SidebarGroup[] = [
  {
    title: 'Menu Utama',
    items: [
      { id: 'dashboard', label: 'Dashboard', active: true },
      { id: 'master-data', label: 'Master Data' },
      { id: 'users', label: 'Manajemen Pengguna' },
    ],
  },
  {
    title: 'Lainnya',
    items: [
      { id: 'settings', label: 'Pengaturan Akun' },
      { id: 'help', label: 'Bantuan' },
    ],
  },
];

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  groups?: SidebarGroup[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  children?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  groups = mockSidebarGroups,
  header,
  footer,
  collapsed = false,
  className,
  id,
  children,
  ...props
}) => {
  return (
    <aside
      id={id}
      className={cn(
        'h-screen bg-slate-900 text-slate-300 flex flex-col justify-between transition-all duration-300 ease-in-out border-r border-slate-800 shrink-0 select-none',
        collapsed ? 'w-20' : 'w-64',
        className
      )}
      {...props}
    >
      <div className="flex flex-col flex-1 overflow-y-auto">
        {header && (
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            {header}
          </div>
        )}

        <div className="p-3 space-y-6">
          {children ? (
            children
          ) : (
            groups.map((group, idx) => (
              <div key={idx} className="space-y-1">
                {group.title && !collapsed && (
                  <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    {group.title}
                  </div>
                )}
                {group.items.map((item) => (
                  <button
                    id={id ? `${id}-item-${item.id}` : undefined}
                    key={item.id}
                    type="button"
                    disabled={item.disabled}
                    onClick={item.onClick}
                    title={collapsed && typeof item.label === 'string' ? item.label : undefined}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150',
                      item.active
                        ? 'bg-aposis-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60',
                      collapsed && 'justify-center px-2',
                      item.disabled && 'opacity-40 cursor-not-allowed'
                    )}
                  >
                    {item.icon && <span className="w-5 h-5 shrink-0 flex items-center justify-center">{item.icon}</span>}
                    {!collapsed && <span className="flex-1 text-left truncate">{item.label}</span>}
                    {!collapsed && item.badge && <span className="shrink-0">{item.badge}</span>}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      {footer && (
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          {footer}
        </div>
      )}
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';
