'use client';

import { ReactNode, useState } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  tilt?: boolean;
  onClick?: () => void;
  gradient?: boolean;
}

export function AnimatedCard({
  children,
  className = '',
  hover = true,
  glow = false,
  tilt = false,
  onClick,
  gradient = false
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const getTiltStyle = () => {
    if (!tilt || !isHovered) return {};
    
    const { x, y } = mousePosition;
    const rotateX = (y - 150) / 10;
    const rotateY = (x - 150) / 10;
    
    return {
      transform: `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
    };
  };

  const baseClasses = `
    relative bg-white rounded-xl shadow-lg border border-gray-100 
    transition-all duration-300 ease-out overflow-hidden
    ${hover ? 'hover:shadow-2xl hover:-translate-y-1' : ''}
    ${glow ? 'hover:shadow-orange-500/25' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${gradient ? 'bg-gradient-to-br from-white to-gray-50' : ''}
    ${className}
  `;

  return (
    <div
      className={baseClasses}
      style={getTiltStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      {/* Gradient overlay on hover */}
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      )}
      
      {/* Glow effect */}
      {glow && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl opacity-0 hover:opacity-20 blur transition-opacity duration-300" />
      )}
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-10 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

// Feature Card with icon animation
export function FeatureCard({
  icon,
  title,
  description,
  className = ''
}: {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <AnimatedCard hover glow className={`p-6 text-center group ${className}`}>
      <div className="mb-4 flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </AnimatedCard>
  );
}

// Pricing Card with special effects
export function PricingCard({
  title,
  price,
  features,
  popular = false,
  onSelect,
  className = ''
}: {
  title: string;
  price: string;
  features: string[];
  popular?: boolean;
  onSelect?: () => void;
  className?: string;
}) {
  return (
    <AnimatedCard
      hover
      glow={popular}
      className={`p-8 ${popular ? 'ring-2 ring-orange-500 scale-105' : ''} ${className}`}
      onClick={onSelect}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
        <div className="text-4xl font-bold text-orange-600 mb-1">{price}</div>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      
      <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200">
        Choose Plan
      </button>
    </AnimatedCard>
  );
}
