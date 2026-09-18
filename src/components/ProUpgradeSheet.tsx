'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Sparkles, Shield, CheckCircle2, GraduationCap } from 'lucide-react';

interface ProUpgradeSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const proFeatures = [
  { icon: Sparkles, text: 'Advanced AI-personalized meal plans', color: 'text-ios-purple' },
  { icon: Shield, text: 'HIIT + Mass Hypertrophy programs', color: 'text-ios-red' },
  { icon: CheckCircle2, text: 'PCOS & Precision Plant Diet protocols', color: 'text-ios-green' },
  { icon: Crown, text: 'Priority AI assistant with deeper analysis', color: 'text-ios-orange' },
];

export default function ProUpgradeSheet({ isOpen, onClose }: ProUpgradeSheetProps) {
  const handleSubscribe = () => {
    // Simulated subscription — in production this would trigger actual payment
    alert('🎉 Subscription simulation successful! In production, this connects to Apple Pay / Razorpay.');
    onClose();
  };

  const handleStudentUnlock = () => {
    alert('🎓 Student verification simulation! In production, this connects to Student ID verification API.');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bottom-sheet-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 modal-sheet max-h-[88vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          >
            <div className="modal-drag-handle" />

            {/* Pro Header */}
            <div className="text-center px-5 pt-4 pb-6">
              <motion.div
                className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center mb-4"
                style={{
                  background: 'linear-gradient(135deg, #FFD700, #FFA500, #FF8C00)',
                  boxShadow: '0 8px 24px rgba(255, 165, 0, 0.3)',
                }}
                initial={{ scale: 0.5, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <Crown size={28} className="text-white" />
              </motion.div>

              <h2 className="text-[24px] font-bold text-text-primary">
                Upgrade to <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #FFD700, #FF8C00)' }}>NutriWell Pro</span>
              </h2>
              <p className="ios-caption mt-2 text-[13px]">
                Unlock advanced plans, AI personalization, and precision nutrition
              </p>
            </div>

            {/* Features List */}
            <div className="px-5 space-y-3 mb-6">
              {proFeatures.map((feature, i) => (
                <motion.div
                  key={feature.text}
                  className="flex items-center gap-3 modal-card p-3.5"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <div className="w-9 h-9 rounded-xl bg-ios-blue/8 flex items-center justify-center flex-shrink-0">
                    <feature.icon size={18} className={feature.color} />
                  </div>
                  <span className="text-[14px] font-medium text-text-primary">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Pricing */}
            <div className="px-5 space-y-3 pb-8">
              {/* Main CTA — Apple Pay Style */}
              <motion.button
                className="w-full py-4 rounded-2xl text-white text-[17px] font-semibold relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1a1a2e, #000000)',
                }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubscribe}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[13px] text-white/60">Subscribe</span>
                  <span className="font-bold">₹199/month</span>
                </div>
                <p className="text-[11px] text-white/50 mt-0.5">Cancel anytime · 7-day free trial</p>
              </motion.button>

              {/* Student Unlock */}
              <motion.button
                className="w-full py-3.5 rounded-2xl bg-ios-blue/10 border border-ios-blue/20 text-ios-blue text-[15px] font-semibold flex items-center justify-center gap-2"
                whileTap={{ scale: 0.97 }}
                onClick={handleStudentUnlock}
              >
                <GraduationCap size={18} />
                Unlock with Student ID
              </motion.button>

              {/* Dismiss */}
              <button
                className="w-full text-center py-2 text-text-tertiary text-[14px] font-medium"
                onClick={onClose}
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
