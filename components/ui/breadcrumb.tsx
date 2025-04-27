"use client"

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home, HomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MdHome, MdHomeFilled, MdHomeMax, MdOutlineAddHome } from 'react-icons/md';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
  active?: boolean; // Add an explicit active property
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export default function Breadcrumb({ items = [], showHome = true, className }: BreadcrumbProps) {
  const allItems = showHome 
    ? [{ label: 'Home', href: '/' }, ...items] 
    : items;
  
  return (
    <nav className={cn("text-xs text-muted-foreground ml-3 lg:ml-1 hidden md:block h-5 pt-6 pb-4", className)}>
      <ol className="flex items-center">
        {allItems.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronLeft className="mx-2 h-4 w-4 rotate-180" />
            )}
            <li>
              {item.href && !item.current ? (
                <Link 
                  href={item.href} 
                  className="hover:underline hover:text-foreground transition-colors flex items-center"
                >
                  {index === 0 && item.label === 'Home' ? (
                    <MdHome size={14} aria-label="Home" />
                  ) : (
                    item.label
                  )}
                </Link>
              ) : (
                <span className={cn(
                  "text-foreground flex items-center",
                  (item.current || item.active) && "font-medium" // Apply font-medium for both current and active items
                )}>
                  {index === 0 && item.label === 'Home' ? (
                    <MdHome size={16} aria-label="Home" />
                  ) : (
                    item.label
                  )}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

