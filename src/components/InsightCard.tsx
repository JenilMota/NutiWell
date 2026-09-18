'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, type LucideIcon } from 'lucide-react';

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
  onClick?: () => void;
}

export default function InsightCard({
  icon: Icon,
  title,
  description,
  gradient,
  delay = 0,
  onClick,
}: InsightCardProps) {
  return (
    <motion.div
      className="glass-card p-4 flex items-center gap-3.5 cursor-pointer w-full"
      initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.5,
        ease: [0.22, 0.61, 0.36, 1],
        delay,
      }}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <div
        className={`w-11 h-11 rounded-[14px] ${gradient} flex items-center justify-center flex-shrink-0`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-text-primary truncate">
          {title}
        </p>
        <p className="text-[12px] text-text-tertiary leading-snug mt-0.5 line-clamp-2">
          {description}
        </p>
      </div>
      <ChevronRight size={16} className="text-text-tertiary flex-shrink-0 opacity-50" />
    </motion.div>
  );
}
