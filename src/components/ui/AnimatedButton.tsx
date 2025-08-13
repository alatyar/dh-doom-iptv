'use client';

import { useState, ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  ripple?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  icon,
  iconPosition = 'left',
  ripple = true,
  href,
  target,
  rel
}: AnimatedButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [rippleEffect, setRippleEffect] = useState<{ x: number; y: number; id: number } | null>(null);

  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 focus:ring-orange-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
    outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-500 transform hover:-translate-y-0.5',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed transform-none hover:transform-none';

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading || loading) return;

    // Ripple effect
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRippleEffect({ x, y, id: Date.now() });
      setTimeout(() => setRippleEffect(null), 600);
    }

    if (onClick) {
      try {
        setIsLoading(true);
        await onClick();
      } catch (error) {
        console.error('Button click error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const buttonContent = (
    <>
      {/* Ripple effect */}
      {rippleEffect && (
        <span
          className="absolute bg-white bg-opacity-30 rounded-full animate-ping"
          style={{
            left: rippleEffect.x - 10,
            top: rippleEffect.y - 10,
            width: 20,
            height: 20,
          }}
        />
      )}

      {/* Background gradient animation */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      {/* Content */}
      <span className="relative flex items-center space-x-2">
        {(isLoading || loading) ? (
          <LoadingSpinner size="sm" color={variant === 'primary' ? 'white' : 'primary'} />
        ) : (
          <>
            {icon && iconPosition === 'left' && <span>{icon}</span>}
            <span>{children}</span>
            {icon && iconPosition === 'right' && <span>{icon}</span>}
          </>
        )}
      </span>
    </>
  );

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled || isLoading || loading ? disabledClasses : ''}
    ${className}
  `.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={buttonClasses}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading || loading}
      className={buttonClasses}
    >
      {buttonContent}
    </button>
  );
}

// Floating Action Button
export function FloatingActionButton({
  children,
  onClick,
  className = '',
  position = 'bottom-right'
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}) {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  return (
    <button
      onClick={onClick}
      className={`
        fixed ${positionClasses[position]} z-50
        w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 
        text-white rounded-full shadow-lg hover:shadow-xl
        flex items-center justify-center
        transform hover:scale-110 transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
        ${className}
      `}
    >
      {children}
    </button>
  );
}
