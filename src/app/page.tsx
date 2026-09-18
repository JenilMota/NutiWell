'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Leaf,
  Apple,
  Droplets,
  Brain,
  ScanLine,
  MessageSquare,
  BookOpen,
  TrendingUp,
  Flame,
  Zap,
  Heart,
  TreePine,
  CloudRain,
  Sprout,
  Globe,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import ProgressRing from '@/components/ProgressRing';
import GlassCard from '@/components/GlassCard';
import InsightCard from '@/components/InsightCard';
import ResponsibleAIBanner from '@/components/ResponsibleAIBanner';
import { useTimeOfDay, useDailyLog, useSustainabilityImpact } from '@/lib/hooks';

const quickActions = [
  { icon: Apple, label: 'Log Meal', color: '#FF3B30', gradient: 'gradient-pink', href: '/chat' },
  { icon: ScanLine, label: 'Scan Label', color: '#007AFF', gradient: 'gradient-blue', href: '/scanner' },
  { icon: MessageSquare, label: 'Ask AI', color: '#5856D6', gradient: 'gradient-purple', href: '/chat' },
  { icon: BookOpen, label: 'View Plans', color: '#34C759', gradient: 'gradient-green', href: '/plans' },
];

const insights = [
  {
    icon: Leaf,
    title: 'Sustainable Swap',
    description: 'Try lentils instead of beef tonight — 50% less carbon footprint with similar protein!',
    color: '#34C759',
    gradient: 'gradient-green',
  },
  {
    icon: Droplets,
    title: 'Hydration Reminder',
    description: "You're at 4/8 glasses today. Herbal tea counts toward your goal!",
    color: '#5AC8FA',
    gradient: 'gradient-teal',
  },
  {
    icon: Brain,
    title: 'Nutrition Tip',
    description: 'Pair iron-rich spinach with vitamin C (lemon juice) to boost absorption by 3x.',
    color: '#AF52DE',
    gradient: 'gradient-purple',
  },
  {
    icon: TrendingUp,
    title: 'Weekly Progress',
    description: 'You hit your protein goal 5/7 days this week. Great consistency!',
    color: '#FF9500',
    gradient: 'gradient-orange',
  },
];

export default function DashboardPage() {
  const { greeting, emoji } = useTimeOfDay();
  const router = useRouter();
  const { log } = useDailyLog();
  const impact = useSustainabilityImpact(log);

  return (
    <div className="page-content">
      {/* Header */}
      <motion.div
        className="px-5 pt-14 pb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="ios-subhead">
          {emoji} {greeting}
        </p>
        <h1 className="ios-large-title mt-1">Dashboard</h1>
      </motion.div>

      {/* Macro Progress Rings */}
      <GlassCard className="mx-4 mt-4 p-5" delay={0.1}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="ios-title">Today&apos;s Macros</h2>
            <p className="ios-caption mt-0.5">Tracking your daily nutrition</p>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-ios-green/10">
            <Flame size={14} className="text-ios-green" />
            <span className="text-[12px] font-semibold text-ios-green">On Track</span>
          </div>
        </div>

        <div className="flex items-center justify-around py-3">
          <ProgressRing
            value={log.macros.calories.current}
            max={log.macros.calories.target}
            size={110}
            strokeWidth={10}
            color="#FF3B30"
            label="Calories"
            unit="cal"
          />
          <ProgressRing
            value={log.macros.protein.current}
            max={log.macros.protein.target}
            size={90}
            strokeWidth={8}
            color="#34C759"
            label="Protein"
            unit="g"
          />
          <ProgressRing
            value={log.macros.carbs.current}
            max={log.macros.carbs.target}
            size={90}
            strokeWidth={8}
            color="#007AFF"
            label="Carbs"
            unit="g"
          />
        </div>
      </GlassCard>

      {/* Sustainability Score */}
      <GlassCard className="mx-4 mt-3 p-4" delay={0.2}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <ProgressRing
              value={log.sustainabilityScore}
              max={100}
              size={70}
              strokeWidth={7}
              color="#34C759"
              label=""
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Leaf size={16} className="text-ios-green" />
              <h3 className="ios-title">Sustainability Score</h3>
            </div>
            <p className="ios-caption mt-1">
              Your food choices today saved ~{impact.co2SavedToday.toFixed(1)} kg CO₂ vs. average diet
            </p>
            <div className="flex gap-1 mt-2">
              {['🌱', '🥬', '🫘', '🥚'].map((e, i) => (
                <span key={i} className="text-sm">{e}</span>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ===== Sustainability Impact Statement Widget (1M1B deliverable) ===== */}
      <div className="px-4 mt-5 mb-1">
        <div className="flex items-center gap-2">
          <Globe size={16} className="text-ios-green" />
          <h2 className="ios-title">Sustainability Impact</h2>
        </div>
        <p className="ios-caption mt-0.5 ml-6">SDG 3 — Good Health and Well-being</p>
      </div>

      <GlassCard className="mx-4 mt-2 p-0 overflow-hidden" delay={0.25} large>
        {/* Gradient header */}
        <div className="bg-gradient-to-r from-[#34C759] to-[#30D158] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <TreePine size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white/80 text-[12px] font-medium">Cumulative CO₂ Saved</p>
              <motion.p
                className="text-white text-[28px] font-bold tracking-tight"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
              >
                {impact.co2SavedMonth.toFixed(1)}
                <span className="text-[16px] font-normal ml-1">kg</span>
              </motion.p>
            </div>
          </div>
        </div>

        {/* Impact metrics grid */}
        <div className="grid grid-cols-3 divide-x divide-separator">
          {[
            {
              icon: CloudRain,
              value: `${impact.waterSavedLiters.toLocaleString()}L`,
              label: 'Water Saved',
              color: 'text-ios-teal',
              bg: 'bg-ios-teal/10',
            },
            {
              icon: TreePine,
              value: `${impact.treesEquivalent}`,
              label: 'Tree Equiv.',
              color: 'text-ios-green',
              bg: 'bg-ios-green/10',
            },
            {
              icon: Sprout,
              value: `${impact.plantMealPercent}%`,
              label: 'Plant Meals',
              color: 'text-ios-orange',
              bg: 'bg-ios-orange/10',
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center py-4 px-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
            >
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-2`}>
                <stat.icon size={18} className={stat.color} />
              </div>
              <p className={`text-[18px] font-bold ${stat.color}`}>{stat.value}</p>
              <p className="ios-caption text-center mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Impact statement footer */}
        <div className="px-4 py-3 bg-[rgba(52,199,89,0.04)] border-t border-separator">
          <p className="text-[12px] text-text-secondary leading-relaxed text-center">
            🌍 By choosing sustainable meals, you&apos;re contributing to <strong>SDG 3</strong> and reducing your dietary carbon footprint by an estimated{' '}
            <strong className="text-ios-green">{Math.round(impact.co2SavedMonth * 12)} kg CO₂/year</strong>.
            That&apos;s equivalent to planting <strong className="text-ios-green">{Math.max(1, Math.round(impact.treesEquivalent * 12))} trees</strong>!
          </p>
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div className="px-4 mt-5 mb-1">
        <h2 className="ios-title mb-3">Quick Actions</h2>
      </div>
      <div className="flex gap-2.5 px-4 overflow-x-auto pb-1">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.label}
            className="quick-action-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
            onClick={() => router.push(action.href)}
          >
            <div className={`w-10 h-10 rounded-[12px] ${action.gradient} flex items-center justify-center`}>
              <action.icon size={20} className="text-white" />
            </div>
            <span className="text-[11px] font-medium text-text-secondary whitespace-nowrap">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Daily Insights - Horizontal Scroll */}
      <div className="px-4 mt-5 mb-2">
        <div className="flex items-center justify-between">
          <h2 className="ios-title">Daily Insights</h2>
          <button className="text-ios-blue text-[15px] font-medium">See All</button>
        </div>
      </div>
      <div className="scroll-container pb-1">
        {insights.map((insight, index) => (
          <InsightCard
            key={insight.title}
            icon={insight.icon}
            title={insight.title}
            description={insight.description}
            color={insight.color}
            gradient={insight.gradient}
            delay={0.4 + index * 0.1}
          />
        ))}
      </div>

      {/* Recent Meals */}
      <div className="px-4 mt-5 mb-2">
        <div className="flex items-center justify-between">
          <h2 className="ios-title">Recent Meals</h2>
          <button className="text-ios-blue text-[15px] font-medium">View All</button>
        </div>
      </div>
      <GlassCard className="mx-4 mb-3 overflow-hidden" delay={0.5}>
        {log.meals.map((meal, index) => (
          <React.Fragment key={meal.name + index}>
            <motion.div
              className="flex items-center gap-3 p-3.5"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.55 + index * 0.1 }}
            >
              <span className="text-2xl">{meal.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium text-text-primary truncate">
                  {meal.name}
                </p>
                <p className="text-[12px] text-text-tertiary">{meal.time}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <div className="flex items-center gap-0.5">
                  <Zap size={11} className="text-ios-red" />
                  <span className="text-[11px] font-medium text-text-secondary">{meal.calories}</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <Heart size={11} className="text-ios-green" />
                  <span className="text-[11px] font-medium text-text-secondary">{meal.protein}g</span>
                </div>
              </div>
            </motion.div>
            {index < log.meals.length - 1 && <div className="ios-separator" />}
          </React.Fragment>
        ))}
      </GlassCard>

      {/* Responsible AI Banner */}
      <div className="mb-6">
        <ResponsibleAIBanner />
      </div>
    </div>
  );
}
