'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Leaf, Dumbbell, Flame, ChevronRight } from 'lucide-react';

interface DayPlan {
  day: string;
  meals: { type: string; name: string; cals: number; protein: number }[];
  exercise: { name: string; sets: string }[];
  co2Saved: string;
}

interface PlanDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    title: string;
    subtitle: string;
    duration: string;
    difficulty: string;
    emoji: string;
    gradient: string;
  } | null;
}

const weekPlan: DayPlan[] = [
  {
    day: 'Day 1',
    meals: [
      { type: 'Breakfast', name: 'Overnight oats + chia seeds + berries', cals: 310, protein: 14 },
      { type: 'Lunch', name: 'Lentil dal + brown rice + raita', cals: 420, protein: 18 },
      { type: 'Dinner', name: 'Grilled paneer tikka + roti + salad', cals: 380, protein: 22 },
    ],
    exercise: [
      { name: 'Wall pushups', sets: '3 × 12' },
      { name: 'Bodyweight squats', sets: '3 × 15' },
      { name: 'Plank hold', sets: '3 × 30s' },
    ],
    co2Saved: '0.8 kg',
  },
  {
    day: 'Day 2',
    meals: [
      { type: 'Breakfast', name: 'Moong dal chilla + mint chutney', cals: 280, protein: 16 },
      { type: 'Lunch', name: 'Quinoa bowl + chickpeas + veggies', cals: 450, protein: 20 },
      { type: 'Dinner', name: 'Mixed veg stir-fry + tofu + millet roti', cals: 350, protein: 18 },
    ],
    exercise: [
      { name: 'Knee pushups', sets: '3 × 10' },
      { name: 'Lunges', sets: '3 × 12 each' },
      { name: 'Dead hang', sets: '3 × 20s' },
    ],
    co2Saved: '1.1 kg',
  },
  {
    day: 'Day 3',
    meals: [
      { type: 'Breakfast', name: 'Protein smoothie + banana + peanut butter', cals: 340, protein: 22 },
      { type: 'Lunch', name: 'Rajma curry + jeera rice + cucumber', cals: 400, protein: 16 },
      { type: 'Dinner', name: 'Egg bhurji + whole wheat toast + salad', cals: 360, protein: 24 },
    ],
    exercise: [
      { name: 'Full pushups', sets: '3 × 8' },
      { name: 'Glute bridges', sets: '3 × 15' },
      { name: 'Superman hold', sets: '3 × 20s' },
    ],
    co2Saved: '0.6 kg',
  },
  {
    day: 'Day 4',
    meals: [
      { type: 'Breakfast', name: 'Ragi porridge + almonds + dates', cals: 300, protein: 10 },
      { type: 'Lunch', name: 'Buddha bowl + tahini dressing', cals: 440, protein: 18 },
      { type: 'Dinner', name: 'Palak paneer + 2 roti + raita', cals: 420, protein: 20 },
    ],
    exercise: [
      { name: 'Incline pushups', sets: '3 × 12' },
      { name: 'Step-ups', sets: '3 × 10 each' },
      { name: 'Hollow body hold', sets: '3 × 20s' },
    ],
    co2Saved: '0.9 kg',
  },
  {
    day: 'Day 5',
    meals: [
      { type: 'Breakfast', name: 'Idli + sambar + coconut chutney', cals: 280, protein: 12 },
      { type: 'Lunch', name: 'Chole + rice + salad + buttermilk', cals: 460, protein: 16 },
      { type: 'Dinner', name: 'Mushroom stir-fry + egg + brown rice', cals: 370, protein: 20 },
    ],
    exercise: [
      { name: 'Pike pushups', sets: '3 × 8' },
      { name: 'Bulgarian split squats', sets: '3 × 8 each' },
      { name: 'Plank shoulder taps', sets: '3 × 20' },
    ],
    co2Saved: '0.7 kg',
  },
  {
    day: 'Day 6',
    meals: [
      { type: 'Breakfast', name: 'Besan chilla + sprout salad', cals: 290, protein: 18 },
      { type: 'Lunch', name: 'Vegetable biryani + raita + salad', cals: 430, protein: 14 },
      { type: 'Dinner', name: 'Grilled fish + sautéed veggies + quinoa', cals: 390, protein: 28 },
    ],
    exercise: [
      { name: 'Diamond pushups', sets: '3 × 8' },
      { name: 'Pistol squat negatives', sets: '3 × 5 each' },
      { name: 'L-sit hold', sets: '3 × 15s' },
    ],
    co2Saved: '0.5 kg',
  },
  {
    day: 'Day 7',
    meals: [
      { type: 'Breakfast', name: 'Fruit bowl + yogurt + granola', cals: 320, protein: 12 },
      { type: 'Lunch', name: 'Thali: dal, sabzi, roti, rice, salad', cals: 480, protein: 18 },
      { type: 'Dinner', name: 'Soup + grilled sandwich + fruit', cals: 340, protein: 14 },
    ],
    exercise: [
      { name: 'Active rest — yoga or walking', sets: '30 min' },
    ],
    co2Saved: '1.0 kg',
  },
];

export default function PlanDetailModal({ isOpen, onClose, plan }: PlanDetailModalProps) {
  const [selectedDay, setSelectedDay] = useState(0);

  if (!plan) return null;

  const dayData = weekPlan[selectedDay];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bottom-sheet-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-0 bottom-0 z-[70] modal-sheet max-h-[92vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            <div className="modal-drag-handle" />

            {/* Gradient Header */}
            <div className={`${plan.gradient} px-5 py-5 relative overflow-hidden`}>
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-white/10" />
              <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/4" />

              <div className="flex items-start justify-between relative z-10">
                <div>
                  <span className="text-4xl">{plan.emoji}</span>
                  <h2 className="text-[22px] font-bold text-white mt-2 leading-tight">{plan.title}</h2>
                  <p className="text-white/70 text-[13px] mt-1">{plan.subtitle}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20">
                      <Clock size={11} className="text-white" />
                      <span className="text-[11px] text-white font-medium">{plan.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20">
                      <span className="text-[11px] text-white font-medium">{plan.difficulty}</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                  whileTap={{ scale: 0.85 }}
                  onClick={onClose}
                >
                  <X size={16} className="text-white" />
                </motion.button>
              </div>
            </div>

            {/* Day Selector */}
            <div className="flex gap-2 px-5 py-3 overflow-x-auto no-scrollbar">
              {weekPlan.map((_, i) => (
                <motion.button
                  key={i}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all ${
                    selectedDay === i
                      ? 'bg-ios-blue text-white'
                      : 'bg-surface-secondary text-text-secondary border border-separator'
                  }`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(i)}
                >
                  Day {i + 1}
                </motion.button>
              ))}
            </div>

            <div className="px-5 pb-10 space-y-4">
              {/* Meals */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Flame size={16} className="text-ios-red" />
                  <h3 className="ios-title">Meals</h3>
                </div>
                <div className="space-y-2">
                  {dayData.meals.map((meal, i) => (
                    <div key={i} className="glass-card p-3.5 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-ios-blue uppercase tracking-wide">{meal.type}</p>
                        <p className="text-[14px] font-medium text-text-primary mt-0.5 leading-snug">{meal.name}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[13px] font-bold text-text-primary">{meal.cals} cal</p>
                        <p className="text-[11px] text-ios-green font-medium">{meal.protein}g protein</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exercises */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Dumbbell size={16} className="text-ios-purple" />
                  <h3 className="ios-title">Bodyweight Exercises</h3>
                </div>
                <div className="glass-card overflow-hidden">
                  {dayData.exercise.map((ex, i) => (
                    <React.Fragment key={i}>
                      <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-2">
                          <ChevronRight size={14} className="text-ios-purple" />
                          <span className="text-[14px] font-medium text-text-primary">{ex.name}</span>
                        </div>
                        <span className="text-[13px] font-semibold text-ios-purple">{ex.sets}</span>
                      </div>
                      {i < dayData.exercise.length - 1 && <div className="ios-separator" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Carbon Impact */}
              <div className="glass-card p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-ios-green/10 flex items-center justify-center">
                    <Leaf size={18} className="text-ios-green" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-text-primary">Carbon Footprint Impact</p>
                    <p className="text-[12px] text-text-tertiary">
                      This day&apos;s meals save <strong className="text-ios-green">{dayData.co2Saved}</strong> CO₂ vs. average diet
                    </p>
                  </div>
                </div>
              </div>

              {/* Start Plan Button */}
              <motion.button
                className="w-full py-4 rounded-2xl bg-ios-blue text-white text-[17px] font-semibold"
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
              >
                Start This Plan
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
