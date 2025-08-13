'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

// Animated Card Component
interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'hover-lift' | 'hover-glow' | 'hover-scale' | 'hover-tilt';
  onClick?: () => void;
}

export function AnimatedCard({
  children,
  className,
  animation = 'hover-lift',
  onClick
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const animationClasses = {
    'hover-lift': 'hover:-translate-y-2 hover:shadow-2xl',
    'hover-glow': 'hover:shadow-emerald-500/25 hover:shadow-2xl',
    'hover-scale': 'hover:scale-105',
    'hover-tilt': 'hover:rotate-1'
  };

  return (
    <div
      className={cn(
        'transition-all duration-300 cursor-pointer relative',
        animationClasses[animation],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
      
      {/* Glow effect for hover-glow animation */}
      {animation === 'hover-glow' && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-lg transition-opacity duration-300 pointer-events-none',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}
    </div>
  );
}

// Animated Icon Component
interface AnimatedIconProps {
  children: React.ReactNode;
  animation?: 'spin' | 'bounce' | 'pulse' | 'wiggle' | 'float';
  trigger?: 'hover' | 'always' | 'click';
  className?: string;
}

export function AnimatedIcon({
  children,
  animation = 'pulse',
  trigger = 'hover',
  className
}: AnimatedIconProps) {
  const [isTriggered, setIsTriggered] = useState(false);

  const animationClasses = {
    spin: 'animate-spin',
    bounce: 'animate-bounce',
    pulse: 'animate-pulse',
    wiggle: 'animate-wiggle',
    float: 'animate-float'
  };

  const shouldAnimate = trigger === 'always' || (trigger === 'hover' && isTriggered) || (trigger === 'click' && isTriggered);

  return (
    <div
      className={cn(
        'inline-block transition-transform duration-300',
        shouldAnimate && animationClasses[animation],
        className
      )}
      onMouseEnter={() => trigger === 'hover' && setIsTriggered(true)}
      onMouseLeave={() => trigger === 'hover' && setIsTriggered(false)}
      onClick={() => {
        if (trigger === 'click') {
          setIsTriggered(true);
          setTimeout(() => setIsTriggered(false), 1000);
        }
      }}
    >
      {children}
    </div>
  );
}

// Animated Counter Component
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({
  value,
  duration = 2000,
  className,
  prefix = '',
  suffix = ''
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setDisplayValue(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

// Floating Action Button
interface FloatingActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
}

export function FloatingActionButton({
  children,
  onClick,
  className,
  position = 'bottom-right',
  size = 'md'
}: FloatingActionButtonProps) {
  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110 active:scale-95',
        positionClasses[position],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
}

// Pulse Dot Animation
interface PulseDotProps {
  className?: string;
  color?: 'emerald' | 'red' | 'yellow' | 'blue';
  size?: 'sm' | 'md' | 'lg';
}

export function PulseDot({
  className,
  color = 'emerald',
  size = 'md'
}: PulseDotProps) {
  const colorClasses = {
    emerald: 'bg-emerald-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500'
  };

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className={cn('relative inline-flex', className)}>
      <div
        className={cn(
          'rounded-full animate-ping absolute inline-flex opacity-75',
          colorClasses[color],
          sizeClasses[size]
        )}
      />
      <div
        className={cn(
          'relative inline-flex rounded-full',
          colorClasses[color],
          sizeClasses[size]
        )}
      />
    </div>
  );
}

// Shake Animation Hook
export function useShakeAnimation() {
  const [isShaking, setIsShaking] = useState(false);

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  return {
    isShaking,
    triggerShake,
    shakeClass: isShaking ? 'animate-shake' : ''
  };
}

// Bounce Animation Hook
export function useBounceAnimation() {
  const [isBouncing, setIsBouncing] = useState(false);

  const triggerBounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 1000);
  };

  return {
    isBouncing,
    triggerBounce,
    bounceClass: isBouncing ? 'animate-bounce' : ''
  };
}

// Typewriter Effect
interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function Typewriter({
  text,
  speed = 50,
  className,
  onComplete
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
