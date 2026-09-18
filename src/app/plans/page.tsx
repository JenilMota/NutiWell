'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, TrendingUp } from 'lucide-react';

import PlanCard from '@/components/PlanCard';
import GlassCard from '@/components/GlassCard';

const categories = ['All', 'Meal Plans', 'Fitness', 'Budget-Friendly'];

const plans = [
  {
    title: 'Mediterranean Vitality',
    subtitle: 'Heart-healthy meals inspired by the proven Mediterranean diet — rich in olive oil, fish, and seasonal vegetables.',
    duration: '4 weeks',
    difficulty: 'Easy' as const,
    sustainabilityRating: 5,
    gradient: 'bg-gradient-to-br from-[#007AFF] to-[#5856D6]',
    emoji: '🫒',
    category: 'Meal Plans',
  },
  {
    title: 'Budget Power Bowls',
    subtitle: 'Nutritious grain bowls that cost under $3 per serving. Perfect for students and families on a budget.',
    duration: '2 weeks',
    difficulty: 'Easy' as const,
    sustainabilityRating: 4,
    gradient: 'bg-gradient-to-br from-[#34C759] to-[#30D158]',
    emoji: '🥗',
    category: 'Budget-Friendly',
  },
  {
    title: 'Plant-Based Starter',
    subtitle: 'Transition to more plant-based meals with this guided plan. Includes protein tracking and B12 reminders.',
    duration: '3 weeks',
    difficulty: 'Medium' as const,
    sustainabilityRating: 5,
    gradient: 'bg-gradient-to-br from-[#FF9500] to-[#FF6B00]',
    emoji: '🌱',
    category: 'Meal Plans',
  },
  {
    title: 'HIIT + Nutrition Sync',
    subtitle: 'Paired workout and meal plan for maximizing results. Pre/post workout nutrition optimized.',
    duration: '6 weeks',
    difficulty: 'Advanced' as const,
    sustainabilityRating: 3,
    gradient: 'bg-gradient-to-br from-[#FF2D55] to-[#FF375F]',
    emoji: '💪',
    category: 'Fitness',
  },
  {
    title: 'Family Meal Prep Master',
    subtitle: 'Cook once on Sunday, eat healthy all week. Kid-friendly recipes that the whole family will love.',
    duration: '4 weeks',
    difficulty: 'Easy' as const,
    sustainabilityRating: 4,
    gradient: 'bg-gradient-to-br from-[#AF52DE] to-[#BF5AF2]',
    emoji: '👨‍👩‍👧‍👦',
    category: 'Budget-Friendly',
  },
  {
    title: 'Sustainable Seafood Guide',
    subtitle: 'Learn to choose MSC-certified seafood. Omega-3 rich recipes with minimal ocean impact.',
    duration: '2 weeks',
    difficulty: 'Medium' as const,
    sustainabilityRating: 4,
    gradient: 'bg-gradient-to-br from-[#5AC8FA] to-[#64D2FF]',
    emoji: '🐟',
    category: 'Meal Plans',
  },
];

export default function PlansPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPlans =
    activeCategory === 'All'
      ? plans
      : plans.filter((p) => p.category === activeCategory);

  return (
    <div className="page-content">
      {/* Header */}
      <motion.div
        className="px-5 pt-14 pb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="ios-large-title">Wellness Plans</h1>
        <p className="ios-subhead mt-1">Sustainable nutrition & fitness guides</p>
      </motion.div>

      {/* Featured Plan */}
      <GlassCard className="mx-4 mt-4 overflow-hidden" large delay={0.1}>
        <div className="relative h-44 bg-gradient-to-br from-[#007AFF] via-[#5856D6] to-[#AF52DE] flex items-end p-5 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-2">
              <Crown size={14} className="text-ios-yellow" />
              <span className="text-[12px] font-semibold text-white/80">Featured Plan</span>
            </div>
            <h2 className="text-[24px] font-bold text-white leading-tight">
              7-Day Sustainable
              <br />
              Reset Challenge
            </h2>
            <p className="text-[13px] text-white/70 mt-1">
              Transform your eating habits in one week
            </p>
          </div>

          {/* Large emoji */}
          <span className="absolute top-4 right-5 text-5xl opacity-80 select-none">🌿</span>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <TrendingUp size={14} className="text-ios-green" />
              <span className="text-[13px] font-medium text-ios-green">12.4k joined</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles size={14} className="text-ios-purple" />
              <span className="text-[13px] font-medium text-ios-purple">AI-guided</span>
            </div>
          </div>
          <motion.button
            className="px-5 py-2 rounded-full bg-ios-blue text-white text-[14px] font-semibold"
            whileTap={{ scale: 0.95 }}
          >
            Join Free
          </motion.button>
        </div>
      </GlassCard>

      {/* Category Filter */}
      <div className="flex gap-2 px-4 mt-5 mb-4 overflow-x-auto pb-1">
        {categories.map((cat, index) => (
          <motion.button
            key={cat}
            className={`chip ${activeCategory === cat ? 'chip-active' : 'chip-inactive'}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Plans Grid */}
      <div className="px-4 grid grid-cols-1 gap-4 pb-6">
        {filteredPlans.map((plan, index) => (
          <PlanCard
            key={plan.title}
            title={plan.title}
            subtitle={plan.subtitle}
            duration={plan.duration}
            difficulty={plan.difficulty}
            sustainabilityRating={plan.sustainabilityRating}
            gradient={plan.gradient}
            emoji={plan.emoji}
            delay={0.1 + index * 0.08}
          />
        ))}
      </div>
    </div>
  );
}
