'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  label: string;
  unit?: string;
  className?: string;
}

export default function ProgressRing({
  value,
  max,
  size = 120,
  strokeWidth = 10,
  color,
  label,
  unit = '',
  className = '',
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(value / max, 1);
  const offset = circumference - percentage * circumference;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1],
              delay: 0.3,
            }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-bold"
            style={{ fontSize: size * 0.22, color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {value}
            {unit && <span className="text-xs font-normal">{unit}</span>}
          </motion.span>
          <span
            className="ios-caption mt-0.5"
            style={{ fontSize: size * 0.1 }}
          >
            / {max}
          </span>
        </div>
      </div>
      <span className="ios-caption mt-2 font-medium" style={{ color }}>
        {label}
      </span>
    </div>
  );
}
