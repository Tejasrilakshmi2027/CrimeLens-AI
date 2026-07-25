import React from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'md', color = '#06B6D4' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`border-4 border-t-transparent rounded-full ${sizes[size]}`}
        style={{ borderColor: color, borderTopColor: 'transparent' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export default Loader;