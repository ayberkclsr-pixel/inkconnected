'use client';

interface StyleBadgeProps {
  name: string;
  slug?: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export default function StyleBadge({ name, slug, onClick, selected = false, className = '' }: StyleBadgeProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full text-xs font-medium tracking-tight transition-all duration-200 border';
  
  const selectedClasses = selected 
    ? 'bg-white text-black border-white shadow-sm font-semibold'
    : 'bg-[#151518] border-white/[0.08] text-[#8e8e93] hover:text-white hover:border-white/20';

  const cursorClass = onClick ? 'cursor-pointer' : 'cursor-default';

  return (
    <span 
      onClick={onClick}
      className={`${baseClasses} ${selectedClasses} ${cursorClass} ${className || 'px-3.5 py-1.5'}`}
    >
      {name}
    </span>
  );
}
