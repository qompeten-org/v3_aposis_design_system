import React from "react";
import { cn } from "../../utils/cn";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  onItemClick?: (item: BreadcrumbItem, index: number) => void;
}

const SlashSeparator: React.FC = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#64748B] shrink-0 select-none"
        >
        <path
            d="M10 3.33334L6 12.6667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        </svg>
);

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className, onItemClick }) => {
    return (
        <nav
      aria-label="Breadcrumb"
      className={cn(`inline-flex items-center gap-1 font-['Lexend'] text-xs`, className)}
    >
      <ol className="inline-flex items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isActive = item.active || isLast;

          return (
            <li key={index} className="inline-flex items-center gap-1">
              {isActive ? (
                <span
                  className="px-1 py-0.5 rounded text-[#0F172A] font-normal leading-[18px] tracking-[0.12px] select-none"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (onItemClick) {
                        e.preventDefault();
                      onItemClick(item, index);
                    }
                  }}
                  className="px-1 py-0.5 text-[#0F62FE] hover:underline font-normal leading-[18px] tracking-[0.12px] transition-colors"
                >
                  {item.label}
                </a>
              )}
              {!isLast && <SlashSeparator />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};