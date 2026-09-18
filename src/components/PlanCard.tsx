'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Leaf, Star, Crown } from 'lucide-react';

interface PlanCardProps {
  title: string;
  subtitle: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  sustainabilityRating: number;
  gradient: string;
  emoji: string;
  tier: 'free' | 'pro';
  delay?: number;
  onClick?: () => void;
}

const difficultyColors = {
  Easy: 'bg-ios-green/15 text-ios-green',
  Medium: 'bg-ios-orange/15 text-ios-orange',
  Advanced: 'bg-ios-red/15 text-ios-red',
};

export default function PlanCard({
  title,
  subtitle,
  duration,
  difficulty,
  sustainabilityRating,
  gradient,
  emoji,
  tier,
  delay = 0,
  onClick,
}: PlanCardProps) {
  return (
    <motion.div
      className="glass-card-lg overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {/* Cover area with gradient */}
      <div
        className={`${gradient} h-36 relative flex items-center justify-center overflow-hidden`}
      >
        {/* Large emoji as visual */}
        <span className="text-6xl opacity-90 select-none">{emoji}</span>

        {/* Difficulty badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${difficultyColors[difficulty]} backdrop-blur-sm`}
          >
            {difficulty}
          </span>
        </div>

        {/* Tier badge */}
        <div className="absolute top-3 left-3">
          {tier === 'pro' ? (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, rgba(255,215,0,0.9), rgba(255,165,0,0.9))' }}>
              <Crown size={10} className="text-white" />
              <span className="text-[10px] font-bold text-white tracking-wide">PRO</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <span className="text-[10px] font-bold text-white tracking-wide">FREE</span>
            </div>
          )}
        </div>

        {/* Decorative shapes */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
        <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-white/10" />
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="text-[17px] font-bold text-text-primary leading-tight">
          {title}
        </h3>
        <p className="text-[13px] text-text-tertiary mt-1 leading-snug line-clamp-2">
          {subtitle}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1">
            <Clock size={13} className="text-text-tertiary" />
            <span className="text-[12px] text-text-tertiary">{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Leaf size={13} className="text-ios-green" />
            <span className="text-[12px] text-ios-green font-medium">
              {sustainabilityRating}/5
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < sustainabilityRating
                    ? 'text-ios-yellow fill-ios-yellow'
                    : 'text-[#E0E0E0]'
                }
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          className={`w-full mt-4 py-2.5 rounded-xl text-[15px] font-semibold transition-all active:scale-[0.97] active:opacity-80 ${
            tier === 'pro'
              ? 'text-white'
              : 'bg-ios-blue text-white'
          }`}
          style={tier === 'pro' ? { background: 'linear-gradient(135deg, #FFD700, #FF8C00)' } : undefined}
        >
          {tier === 'pro' ? '👑 Unlock PRO' : 'Start Free'}
        </button>
      </div>
    </motion.div>
  );
}
