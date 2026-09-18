'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, type LucideIcon } from 'lucide-react';

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  gradient: string;
  delay?: number;
  onClick?: () => void;
}

export default function InsightCard({
  icon: Icon,
  title,
  description,
  color,
  gradient,
  delay = 0,
  onClick,
}: InsightCardProps) {
  return (
    <motion.div
      className="glass-card p-4 flex items-center gap-3.5 cursor-pointer"
      style={{ minWidth: 280 }}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <div
        className={`w-11 h-11 rounded-[13px] ${gradient} flex items-center justify-center flex-shrink-0`}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-text-secondary truncate">
          {title}
        </p>
        <p className="text-[12px] text-text-tertiary leading-snug mt-0.5 line-clamp-2">
          {description}
        </p>
      </div>
      <ChevronRight size={16} className="text-text-quaternary flex-shrink-0" style={{ color: 'var(--text-quaternary)' }} />
    </motion.div>
  );
}
