'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  large?: boolean;
}

export default function GlassCard({
  children,
  className = '',
  onClick,
  delay = 0,
  large = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={`${large ? 'glass-card-lg' : 'glass-card'} ${className}`}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      onClick={onClick}
      whileTap={onClick ? { scale: 0.97 } : undefined}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
}
