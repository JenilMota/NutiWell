'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

interface ResponsibleAIBannerProps {
  compact?: boolean;
}

export default function ResponsibleAIBanner({ compact = false }: ResponsibleAIBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[rgba(0,122,255,0.08)] mx-4"
      >
        <Info size={14} className="text-ios-blue flex-shrink-0" />
        <p className="text-[11px] text-text-tertiary leading-tight">
          AI-powered wellness decision-support. Not a substitute for professional medical advice.
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mx-4 mb-4 p-4 rounded-2xl bg-gradient-to-r from-[rgba(0,122,255,0.06)] to-[rgba(88,86,214,0.06)] border border-[rgba(0,122,255,0.12)]"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ios-blue to-ios-indigo flex items-center justify-center flex-shrink-0">
            <Info size={16} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-text-secondary mb-1">
              Responsible AI Notice
            </p>
            <p className="text-[12px] text-text-tertiary leading-relaxed">
              This tool provides general wellness decision-support and is not a substitute for 
              professional medical advice. Always consult healthcare providers for medical decisions.
            </p>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-full hover:bg-[rgba(0,0,0,0.05)] transition-colors flex-shrink-0"
          >
            <X size={14} className="text-text-tertiary" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
