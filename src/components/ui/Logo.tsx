
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = "", size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6', 
    lg: 'h-8 w-8'
  };

  return (
    <img 
      src="/lovable-uploads/7f5ebd07-8e86-435d-bcfd-566bbff5b3bf.png" 
      alt="The Aisle" 
      className={`${sizeClasses[size]} ${className}`}
      onError={(e) => {
        // Fallback to text if image fails to load
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent && !parent.querySelector('.logo-fallback')) {
          const fallback = document.createElement('div');
          fallback.className = 'logo-fallback text-white font-bold';
          fallback.textContent = 'TA';
          parent.appendChild(fallback);
        }
      }}
    />
  );
};

export default Logo;
