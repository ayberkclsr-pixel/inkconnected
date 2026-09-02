'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function GlowButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
}: GlowButtonProps) {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200 rounded-full active:scale-[0.98]';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  const variantClasses = {
    primary: 'bg-white text-black hover:bg-[#e5e5ea] shadow-sm',
    secondary: 'bg-[#1c1c1e] text-white hover:bg-[#2c2c2e] border border-white/10',
    accent: 'bg-white/10 text-white hover:bg-white/20 border border-white/15',
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
