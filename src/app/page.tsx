'use client';

import React, { useState } from 'react';
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
  Sparkles,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import ProgressRing from '@/components/ProgressRing';
import GlassCard from '@/components/GlassCard';
import InsightCard from '@/components/InsightCard';
import ResponsibleAIBanner from '@/components/ResponsibleAIBanner';
import Header from '@/components/Header';
import OnboardingModal from '@/components/OnboardingModal';
import LogMealModal from '@/components/LogMealModal';
import { useDailyLog, useSustainabilityImpact } from '@/lib/hooks';
import { useUserProfile } from '@/lib/user-store';

const quickActions = [
  { icon: Apple, label: 'Log Meal', color: '#FF3B30', gradient: 'gradient-pink', action: 'log-meal' },
  { icon: ScanLine, label: 'Scan Label', color: '#007AFF', gradient: 'gradient-blue', href: '/scanner' },
  { icon: MessageSquare, label: 'Ask AI', color: '#5856D6', gradient: 'gradient-purple', href: '/chat' },
  { icon: BookOpen, label: 'View Plans', color: '#34C759', gradient: 'gradient-green', href: '/plans' },
];

const insights = [
  {
    icon: Leaf,
    title: 'Sustainable Swap',
    description: 'Try lentils instead of beef tonight — 50% less carbon footprint with similar protein!',
    gradient: 'gradient-green',
  },
  {
    icon: Droplets,
    title: 'Hydration Reminder',
    description: "You're at 4/8 glasses today. Herbal tea counts toward your goal!",
    gradient: 'gradient-teal',
  },
  {
    icon: Brain,
    title: 'Nutrition Tip',
    description: 'Pair iron-rich spinach with vitamin C (lemon juice) to boost absorption by 3x.',
    gradient: 'gradient-purple',
  },
  {
    icon: TrendingUp,
    title: 'Weekly Progress',
    description: 'You hit your protein goal 5/7 days this week. Great consistency!',
    gradient: 'gradient-orange',
  },
];

// Stagger children animation
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as const } },
};

export default function DashboardPage() {
  const router = useRouter();
  const { profile } = useUserProfile();
  const { log, addMeal } = useDailyLog(profile.calorieTarget, profile.proteinTarget, profile.carbsTarget);
  const impact = useSustainabilityImpact(log);

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogMeal, setShowLogMeal] = useState(false);

  const shouldShowOnboardingHint = !profile.isOnboarded;

  const handleQuickAction = (action: typeof quickActions[number]) => {
    if (action.action === 'log-meal') {
      setShowLogMeal(true);
    } else if (action.href) {
      router.push(action.href);
    }
  };

  return (
    <div className="page-content">
      {/* Header */}
      <Header onAvatarClick={() => setShowOnboarding(true)} />

      <motion.div variants={staggerContainer} initial="initial" animate="animate">
        {/* Onboarding Prompt */}
        {shouldShowOnboardingHint && (
          <motion.div className="mx-5 mb-4" variants={fadeInUp}>
            <motion.button
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl glass-card overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,122,255,0.08), rgba(88,86,214,0.06))',
                border: '0.5px solid rgba(0,122,255,0.15)',
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowOnboarding(true)}
            >
              <motion.span
                className="text-[18px]"
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                ✨
              </motion.span>
              <span className="text-[14px] font-semibold text-ios-blue">
                Personalize your nutrition goals to get started
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* ===== Desktop Grid: Macros + Sustainability ===== */}
        <div className="md:grid md:grid-cols-2 md:gap-4 md:px-5">
        {/* ===== Macro Progress Rings — Floating Glass ===== */}
        <motion.div className="liquid-glow mx-5 md:mx-0 mb-4" variants={fadeInUp}>
          <div className="floating-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="ios-title text-[18px]">Today&apos;s Macros</h2>
                <p className="ios-caption mt-0.5">Tracking your daily nutrition</p>
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                style={{
                  background: log.macros.calories.current >= log.macros.calories.target * 0.8
                    ? 'linear-gradient(135deg, rgba(52,199,89,0.12), rgba(0,199,190,0.08))'
                    : 'linear-gradient(135deg, rgba(255,149,0,0.12), rgba(255,107,0,0.08))',
                  border: `0.5px solid ${log.macros.calories.current >= log.macros.calories.target * 0.8 ? 'rgba(52,199,89,0.2)' : 'rgba(255,149,0,0.2)'}`,
                }}
              >
                <Flame size={13} className={log.macros.calories.current >= log.macros.calories.target * 0.8 ? 'text-ios-green' : 'text-ios-orange'} />
                <span className={`text-[11px] font-bold ${log.macros.calories.current >= log.macros.calories.target * 0.8 ? 'text-ios-green' : 'text-ios-orange'}`}>
                  {log.macros.calories.current >= log.macros.calories.target * 0.8 ? 'On Track' : 'Keep Going'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-around py-4">
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
          </div>
        </motion.div>

        {/* ===== Sustainability Score — Glass ===== */}
        <motion.div className="liquid-glow-green md:mx-0 mx-5 liquid-glow mb-4" variants={fadeInUp}>
          <GlassCard className="p-4" delay={0.15}>
            <div className="flex items-center gap-4">
              <div className="relative">
                <ProgressRing
                  value={log.sustainabilityScore}
                  max={100}
                  size={68}
                  strokeWidth={7}
                  color="#34C759"
                  label=""
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf size={15} className="text-ios-green" />
                  <h3 className="ios-title text-[16px]">Sustainability Score</h3>
                </div>
                <p className="text-[12px] text-text-tertiary leading-snug">
                  Your food choices saved ~{impact.co2SavedToday.toFixed(1)} kg CO₂ today
                </p>
                <div className="flex gap-1.5 mt-2">
                  {['🌱', '🥬', '🫘', '🥚'].map((e, i) => (
                    <motion.span
                      key={i}
                      className="text-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
        </div>{/* end desktop grid */}

        {/* ===== Impact Widget (SDG 3 deliverable) ===== */}
        <motion.div className="px-5 mt-2 mb-2" variants={fadeInUp}>
          <div className="flex items-center gap-2 mb-3">
            <Globe size={15} className="text-ios-green" />
            <h2 className="ios-title text-[16px]">Sustainability Impact</h2>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-ios-green/10 text-ios-green font-semibold ml-auto">SDG 3</span>
          </div>
        </motion.div>

        <motion.div className="mx-5 mb-4" variants={fadeInUp}>
          <GlassCard className="p-0 overflow-hidden" delay={0.2} large>
            {/* Gradient header */}
            <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #34C759, #00C7BE)' }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/3" />
              <div className="px-5 py-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center" style={{width:52,height:52}}>
                    <TreePine size={26} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[11px] font-semibold uppercase tracking-wider">Cumulative CO₂ Saved</p>
                    <motion.p
                      className="text-white text-[32px] font-bold tracking-tight leading-none mt-1"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    >
                      {impact.co2SavedMonth.toFixed(1)}
                      <span className="text-[15px] font-normal ml-1 opacity-80">kg</span>
                    </motion.p>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact metrics grid */}
            <div className="grid grid-cols-3 divide-x divide-separator">
              {[
                { icon: CloudRain, value: `${impact.waterSavedLiters.toLocaleString()}L`, label: 'Water Saved', color: 'text-ios-teal', bg: 'bg-ios-teal/10' },
                { icon: TreePine, value: `${impact.treesEquivalent}`, label: 'Tree Equiv.', color: 'text-ios-green', bg: 'bg-ios-green/10' },
                { icon: Sprout, value: `${impact.plantMealPercent}%`, label: 'Plant Meals', color: 'text-ios-orange', bg: 'bg-ios-orange/10' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center py-4 px-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center mb-2`}>
                    <stat.icon size={17} className={stat.color} />
                  </div>
                  <p className={`text-[18px] font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="ios-caption text-center mt-0.5 text-[10px]">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Impact statement */}
            <div className="px-4 py-3 border-t border-separator" style={{ background: 'rgba(52,199,89,0.03)' }}>
              <p className="text-[11px] text-text-secondary leading-relaxed text-center">
                🌍 Your sustainable choices contribute to <strong>SDG 3</strong>, reducing dietary CO₂ by ~
                <strong className="text-ios-green">{Math.round(impact.co2SavedMonth * 12)} kg/year</strong> ≈ planting{' '}
                <strong className="text-ios-green">{Math.max(1, Math.round(impact.treesEquivalent * 12))} trees</strong>
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* ===== Quick Actions — Glass Row ===== */}
        <motion.div className="px-5 mt-2 mb-2" variants={fadeInUp}>
          <h2 className="ios-title text-[16px] mb-3">Quick Actions</h2>
        </motion.div>
        <motion.div className="flex md:grid md:grid-cols-4 gap-3 px-5 overflow-x-auto pb-1 no-scrollbar" variants={fadeInUp}>
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              className="quick-action-btn"
              initial={{ opacity: 0, y: 24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleQuickAction(action)}
            >
              <div className={`w-11 h-11 rounded-[14px] ${action.gradient} flex items-center justify-center`}>
                <action.icon size={21} className="text-white" />
              </div>
              <span className="text-[11px] font-semibold text-text-secondary whitespace-nowrap">
                {action.label}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* ===== Daily Insights — Horizontal Scroll ===== */}
        <motion.div className="px-5 mt-6 mb-2" variants={fadeInUp}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-ios-purple" />
              <h2 className="ios-title text-[16px]">Daily Insights</h2>
            </div>
            <button className="text-ios-blue text-[14px] font-semibold">See All</button>
          </div>
        </motion.div>
        <motion.div
          className="px-5 overflow-x-auto md:overflow-visible no-scrollbar scroll-smooth flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 snap-x snap-mandatory py-1"
          variants={fadeInUp}
        >
          {insights.map((insight, index) => (
            <div key={insight.title} className="snap-center shrink-0 w-[275px] md:w-full">
              <InsightCard
                icon={insight.icon}
                title={insight.title}
                description={insight.description}
                gradient={insight.gradient}
                delay={0.3 + index * 0.08}
              />
            </div>
          ))}
          <div className="shrink-0 w-5" />
        </motion.div>

        {/* ===== Recent Meals ===== */}
        <motion.div className="px-5 mt-6 mb-2" variants={fadeInUp}>
          <div className="flex items-center justify-between">
            <h2 className="ios-title text-[16px]">Recent Meals</h2>
            <button className="text-ios-blue text-[14px] font-semibold">View All</button>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp}>
          {log.meals.length > 0 ? (
            <GlassCard className="mx-5 mb-4 overflow-hidden" delay={0.35}>
              {log.meals.map((meal, index) => (
                <React.Fragment key={meal.name + index}>
                  <motion.div
                    className="flex items-center gap-3 p-3.5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                  >
                    <span className="text-2xl">{meal.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-semibold text-text-primary truncate">{meal.name}</p>
                      <p className="text-[11px] text-text-tertiary">{meal.time}</p>
                    </div>
                    <div className="flex gap-2.5 flex-shrink-0">
                      <div className="flex items-center gap-0.5">
                        <Zap size={11} className="text-ios-red" />
                        <span className="text-[11px] font-bold text-text-secondary">{meal.calories}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <Heart size={11} className="text-ios-green" />
                        <span className="text-[11px] font-bold text-text-secondary">{meal.protein}g</span>
                      </div>
                    </div>
                  </motion.div>
                  {index < log.meals.length - 1 && <div className="ios-separator" />}
                </React.Fragment>
              ))}
            </GlassCard>
          ) : (
            <GlassCard className="mx-5 mb-4 p-6" delay={0.35}>
              <div className="text-center">
                <motion.span
                  className="text-4xl block mb-2"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  🍽️
                </motion.span>
                <p className="text-[13px] text-text-tertiary font-medium">No meals logged yet today</p>
                <motion.button
                  className="mt-3 px-6 py-2.5 rounded-2xl text-white text-[14px] font-semibold gradient-blue"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowLogMeal(true)}
                >
                  Log Your First Meal
                </motion.button>
              </div>
            </GlassCard>
          )}
        </motion.div>

        {/* Responsible AI Banner */}
        <div className="mb-6 mx-5">
          <ResponsibleAIBanner />
        </div>
      </motion.div>

      {/* Modals */}
      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
      <LogMealModal isOpen={showLogMeal} onClose={() => setShowLogMeal(false)} onSubmit={addMeal} />
    </div>
  );
}
