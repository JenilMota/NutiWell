'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Target, Flame, Leaf, TrendingUp, Dumbbell, Sparkles } from 'lucide-react';
import { useUserProfile, type PrimaryGoal } from '@/lib/user-store';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const goals: { value: PrimaryGoal; label: string; emoji: string; desc: string }[] = [
  { value: 'weight-gain', label: 'Weight Gain', emoji: '💪', desc: 'Build muscle mass' },
  { value: 'fat-loss', label: 'Fat Loss', emoji: '🔥', desc: 'Burn & tone' },
  { value: 'sustainable-living', label: 'Sustainable', emoji: '🌱', desc: 'Eco-friendly diet' },
];

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const { profile, updateProfile } = useUserProfile();
  const [name, setName] = useState(profile.name || '');
  const [calorieTarget, setCalorieTarget] = useState(profile.calorieTarget || 2000);
  const [proteinTarget, setProteinTarget] = useState(profile.proteinTarget || 120);
  const [carbsTarget, setCarbsTarget] = useState(profile.carbsTarget || 250);
  const [primaryGoal, setPrimaryGoal] = useState<PrimaryGoal>(profile.primaryGoal || 'sustainable-living');

  // Sync form with latest profile when modal opens
  useEffect(() => {
    if (isOpen) {
      setName(profile.name || '');
      setCalorieTarget(profile.calorieTarget || 2000);
      setProteinTarget(profile.proteinTarget || 120);
      setCarbsTarget(profile.carbsTarget || 250);
      setPrimaryGoal(profile.primaryGoal || 'sustainable-living');
    }
  }, [isOpen, profile]);

  const handleSave = () => {
    updateProfile({
      name: name.trim() || 'Friend',
      calorieTarget,
      proteinTarget,
      carbsTarget,
      primaryGoal,
      isOnboarded: true,
    });
    onClose();
  };

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
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="modal-drag-handle" />

            {/* Header with gradient accent */}
            <div className="px-5 pt-2 pb-5">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2.5">
                  <motion.div
                    className="w-10 h-10 rounded-2xl gradient-green flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles size={20} className="text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-[20px] font-bold text-text-primary">Personalize Goals</h2>
                    <p className="ios-caption">Set your nutrition targets</p>
                  </div>
                </div>
                <motion.button
                  className="w-8 h-8 rounded-full glass-card flex items-center justify-center !p-0"
                  whileTap={{ scale: 0.85 }}
                  onClick={onClose}
                >
                  <X size={14} className="text-text-tertiary" />
                </motion.button>
              </div>
            </div>

            <div className="px-5 space-y-5 pb-10">
              {/* Name Field */}
              <div>
                <label className="text-[12px] font-semibold text-text-tertiary mb-2 flex items-center gap-2 uppercase tracking-wider">
                  <User size={12} className="text-ios-blue" />
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3.5 rounded-2xl text-[16px] text-text-primary placeholder:text-text-tertiary outline-none transition-all focus:ring-2 focus:ring-ios-blue/30"
                  style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', border: '0.5px solid var(--glass-border)' }}
                />
              </div>

              {/* Calorie Target — Glass Stepper */}
              <div>
                <label className="text-[12px] font-semibold text-text-tertiary mb-2 flex items-center gap-2 uppercase tracking-wider">
                  <Flame size={12} className="text-ios-red" />
                  Daily Calorie Target
                </label>
                <div className="flex items-center gap-3 glass-card p-3">
                  <motion.button
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] font-medium text-text-secondary"
                    style={{ background: 'var(--bg-tertiary)' }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setCalorieTarget(Math.max(1200, calorieTarget - 100))}
                  >
                    −
                  </motion.button>
                  <div className="flex-1 text-center">
                    <motion.span
                      className="text-[32px] font-bold text-text-primary"
                      key={calorieTarget}
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      {calorieTarget.toLocaleString()}
                    </motion.span>
                    <span className="text-[13px] text-text-tertiary ml-1.5">kcal</span>
                  </div>
                  <motion.button
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] font-medium text-text-secondary"
                    style={{ background: 'var(--bg-tertiary)' }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setCalorieTarget(Math.min(5000, calorieTarget + 100))}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              {/* Protein & Carbs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[12px] font-semibold text-ios-green mb-2 flex items-center gap-1.5 justify-center">
                    <TrendingUp size={11} />
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={proteinTarget}
                    onChange={(e) => setProteinTarget(Math.max(30, Math.min(400, parseInt(e.target.value) || 120)))}
                    className="w-full px-3 py-3.5 rounded-2xl text-[20px] text-text-primary outline-none text-center font-bold transition-all focus:ring-2 focus:ring-ios-green/30"
                    style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', border: '0.5px solid var(--glass-border)' }}
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-ios-blue mb-2 flex items-center gap-1.5 justify-center">
                    <Target size={11} />
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={carbsTarget}
                    onChange={(e) => setCarbsTarget(Math.max(50, Math.min(600, parseInt(e.target.value) || 250)))}
                    className="w-full px-3 py-3.5 rounded-2xl text-[20px] text-text-primary outline-none text-center font-bold transition-all focus:ring-2 focus:ring-ios-blue/30"
                    style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', border: '0.5px solid var(--glass-border)' }}
                  />
                </div>
              </div>

              {/* Primary Goal */}
              <div>
                <label className="text-[12px] font-semibold text-text-tertiary mb-3 block uppercase tracking-wider">
                  Primary Goal
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {goals.map((goal) => {
                    const isActive = primaryGoal === goal.value;
                    return (
                      <motion.button
                        key={goal.value}
                        className="flex flex-col items-center gap-1.5 py-4 px-2 rounded-2xl transition-all"
                        style={{
                          background: isActive
                            ? 'linear-gradient(135deg, rgba(0,122,255,0.12), rgba(88,86,214,0.08))'
                            : 'var(--glass-bg)',
                          backdropFilter: 'blur(16px)',
                          border: isActive ? '1px solid rgba(0,122,255,0.25)' : '0.5px solid var(--glass-border)',
                          boxShadow: isActive ? '0 4px 16px rgba(0,122,255,0.15)' : 'none',
                        }}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => setPrimaryGoal(goal.value)}
                      >
                        <motion.span
                          className="text-[28px]"
                          animate={isActive ? { scale: [1, 1.15, 1] } : undefined}
                          transition={{ duration: 0.3 }}
                        >
                          {goal.emoji}
                        </motion.span>
                        <span className={`text-[11px] font-bold text-center leading-tight ${isActive ? 'text-ios-blue' : 'text-text-secondary'}`}>
                          {goal.label}
                        </span>
                        <span className="text-[9px] text-text-tertiary">{goal.desc}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Save Button */}
              <motion.button
                className="w-full py-4 rounded-2xl text-white text-[17px] font-bold gradient-blue"
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
              >
                Save & Start Tracking
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
