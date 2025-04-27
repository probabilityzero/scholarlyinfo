import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

type MenuItemVariant = 'side' | 'dropdown';

interface MenuItemProps {
  href?: string;
  icon?: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: MenuItemVariant;
  className?: string;
  danger?: boolean;
  iconSize?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  href,
  icon: Icon,
  label,
  onClick,
  variant = 'dropdown',
  className = '',
  danger = false,
  iconSize = 16
}) => {
  const baseStyles = "flex items-center text-sm rounded-md";
  
  const variantStyles = {
    dropdown: "px-3 py-2 hover:bg-muted w-full",
    side: "px-3 py-2 hover:bg-muted w-full",
  };
  
  const iconSpacing = variant === 'side' ? 'mr-3' : 'mr-2';
  const textColor = danger ? 'text-red-500' : '';
  
  const styles = `${baseStyles} ${variantStyles[variant]} ${textColor} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={styles}
        onClick={onClick}
      >
        {Icon && <Icon size={iconSize} className={iconSpacing} />}
        {label}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${styles} text-left`}
    >
      {Icon && <Icon size={iconSize} className={iconSpacing} />}
      {label}
    </button>
  );
};

interface MenuSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <div className={`px-3 py-1 ${className}`}>
      {title && (
        <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
          {title}
        </p>
      )}
      <div className="">
        {children}
      </div>
    </div>
  );
};

const MenuDivider: React.FC = () => <div className="border-t my-1"></div>;

export { MenuItem, MenuSection, MenuDivider };