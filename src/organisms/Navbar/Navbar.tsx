import React from 'react';
import { cn } from '../../utils/cn';
import { Avatar } from '../../atoms/Avatar/Avatar';
import { Bell } from 'lucide-react';

export interface NavLinkItem {
  id: string;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  brandName?: string;
  brandLogo?: React.ReactNode;
  navLinks?: NavLinkItem[];
  actions?: React.ReactNode;
  user?: {
    name: string;
    email?: string;
    avatarUrl?: string;
  };
  notificationCount?: number;
  onNotificationClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  brandName = 'Aposis',
  brandLogo,
  navLinks = [],
  actions,
  user,
  notificationCount,
  onNotificationClick,
  className,
  id,
  ...props
}) => {
  return (
    <header
      id={id}
      className={cn(
        'w-full h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40',
        className
      )}
      {...props}
    >
      {/* Brand & Left Navigation */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2.5 cursor-pointer select-none">
          {brandLogo || (
            <div className="flex items-center justify-center w-8 h-8 text-lg font-black text-white shadow-xs rounded-xl bg-gradient-to-br from-aposis-500 to-aposis-700">
              A
            </div>
          )}
          <span className="text-lg font-extrabold tracking-tight text-transparent bg-gradient-to-r from-aposis-700 to-aposis-500 dark:from-blue-400 dark:to-blue-200 bg-clip-text">
            {brandName}
          </span>
        </div>

        {navLinks.length > 0 && (
          <nav className="items-center hidden gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href || '#'}
                onClick={(e) => {
                  if (link.onClick) {
                    e.preventDefault();
                    link.onClick();
                  }
                }}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors',
                  link.active
                    ? 'bg-aposis-50 text-aposis-700 dark:bg-blue-950/60 dark:text-blue-300'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Right Side: Actions, Notifications, User */}
      <div className="flex items-center gap-3">
        {actions}

        {onNotificationClick && (
          <button
            type="button"
            onClick={onNotificationClick}
            className="relative p-2 transition-colors text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 rounded-xl"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5 stroke-[1.75]" />
            {notificationCount && notificationCount > 0 ? (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
            ) : null}
          </button>
        )}

        {user && (
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-slate-800">
            <Avatar name={user.name} src={user.avatarUrl} size="sm" status="online" />
            <div className="flex-col hidden text-left sm:flex">
              <span className="text-xs font-semibold leading-tight text-slate-800 dark:text-slate-100">
                {user.name}
              </span>
              {user.email && (
                <span className="text-[11px] text-slate-400 leading-tight">
                  {user.email}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

Navbar.displayName = 'Navbar';
