'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TypingIndicator() {
  return (
    <motion.div
      className="flex justify-start px-4 mb-1.5"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bubble-received px-4 py-3 flex items-center gap-1.5">
        <span className="typing-dot w-2 h-2 rounded-full bg-[#8E8E93] inline-block" />
        <span className="typing-dot w-2 h-2 rounded-full bg-[#8E8E93] inline-block" />
        <span className="typing-dot w-2 h-2 rounded-full bg-[#8E8E93] inline-block" />
      </div>
    </motion.div>
  );
}
