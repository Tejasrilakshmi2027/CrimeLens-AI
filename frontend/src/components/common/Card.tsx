import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  glass = true,
  onClick,
}) => {
  const baseStyles = 'rounded-xl p-6 transition-all duration-300';
  const glassStyles = glass
    ? 'glass backdrop-blur-xl bg-[rgba(15,23,42,0.7)] border border-white/10'
    : 'bg-[#1E3A8A]/50 border border-[#06B6D4]/20';
  const hoverStyles = hover
    ? 'hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:border-[#06B6D4]/40'
    : '';

  const MotionComponent = onClick ? motion.button : motion.div;

  return (
    <MotionComponent
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      className={`${baseStyles} ${glassStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </MotionComponent>
  );
};

export default Card;