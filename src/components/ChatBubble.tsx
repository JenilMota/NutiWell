'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  showTimestamp?: boolean;
  sources?: string[];
}

export default function ChatBubble({
  message,
  isUser,
  timestamp,
  showTimestamp = true,
  sources,
}: ChatBubbleProps) {
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-4 mb-1.5`}
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={`max-w-[78%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`px-4 py-2.5 ${
            isUser ? 'bubble-sent' : 'bubble-received'
          }`}
        >
          <p className={`text-[16px] leading-[1.35] ${isUser ? 'text-white' : 'text-[#000]'}`}>
            {message}
          </p>
        </div>

        {/* Source citations for AI responses */}
        {!isUser && sources && sources.length > 0 && (
          <div className="mt-1 px-2 flex items-center gap-1 flex-wrap">
            <span className="text-[10px] text-text-tertiary">Sources:</span>
            {sources.map((source, i) => (
              <span
                key={i}
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-[rgba(0,122,255,0.08)] text-ios-blue font-medium"
              >
                {source}
              </span>
            ))}
          </div>
        )}

        {showTimestamp && (
          <span className={`text-[11px] text-text-tertiary mt-1 ${isUser ? 'mr-2' : 'ml-2'}`}>
            {timestamp}
          </span>
        )}
      </div>
    </motion.div>
  );
}
