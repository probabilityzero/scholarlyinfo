"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  MdHome, 
  MdExplore, 
  MdApps, 
  MdMenuBook, 
  MdLocalLibrary,
  MdMenu,
  MdClose
} from "react-icons/md";
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function MobileNavBar() {
  const pathname = usePathname();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  
  useEffect(() => {
    let originalHeight = window.visualViewport?.height || window.innerHeight;
    
    const handleResize = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      setIsKeyboardOpen(currentHeight < originalHeight * 0.75);
    };
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      window.visualViewport.addEventListener('scroll', handleResize);
    } else {
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
        window.visualViewport.removeEventListener('scroll', handleResize);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);
  
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { name: 'Home', href: '/', icon: MdHome },
    { name: 'Explore', href: '/explore', icon: MdExplore },
    { name: 'Browse', href: '/browse', icon: MdApps },
    { name: 'Journals', href: '/journals', icon: MdMenuBook },
    { name: 'Library', href: '/library', icon: MdLocalLibrary },
  ];

  return (
    <div 
      className={cn(
        "md:hidden fixed z-40 bottom-0 left-0 right-0 border-t border-border bg-background" 
      )}
      style={{
        paddingBottom: isKeyboardOpen ? 'env(safe-area-inset-bottom, 0px)' : '0',
      }}
    >
      <div 
        className={cn(
          "backdrop-blur-lg overflow-hidden bg-background/80 border-t border-border shadow-lg"
        )}
      >
        <div className="grid grid-cols-5 w-full gap-2 p-2 py-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-colors active:text-foreground",
                  active 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon 
                  size={isKeyboardOpen ? 18 : 22} 
                  className={cn(
                    "mb-1 transition-transform",
                    active ? "scale-110" : ""
                  )} 
                />
                <span className={cn(
                  "font-medium",
                  isKeyboardOpen ? "text-[9px]" : "text-[10px]"
                )}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MobileMenuButton({ 
  isMenuOpen, 
  toggleMenu,
  isButton = true 
}: { 
  isMenuOpen: boolean; 
  toggleMenu: () => void;
  isButton?: boolean;
}) {
  const MenuIcon = isMenuOpen ? MdClose : MdMenu;
  
  if (!isButton) {
    return <MenuIcon size={22} />;
  }
  
  return (
    <button
      onClick={toggleMenu}
      className="p-2 rounded-md transition-all duration-200 hover:bg-muted"
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    >
      <MenuIcon size={22} />
    </button>
  );
}