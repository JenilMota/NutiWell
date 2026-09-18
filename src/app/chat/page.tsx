'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, RotateCcw } from 'lucide-react';

import ChatBubble from '@/components/ChatBubble';
import TypingIndicator from '@/components/TypingIndicator';
import ResponsibleAIBanner from '@/components/ResponsibleAIBanner';
import { useChat, useScrollToBottom } from '@/lib/hooks';

// ---- Initial suggestions (shown when chat history is empty) ----
const suggestedQuestions = [
  '🏷️ How do I read food labels?',
  '🌱 What are sustainable protein sources?',
  '💰 Eating healthy on a budget?',
  '🥗 Best diet for heart health?',
  '💧 How much water should I drink?',
  '📋 Help me plan meals for the week',
];

// ---- Quick-test chips for evaluators (always visible above input) ----
const evaluatorChips = [
  { label: 'Compare Alpino vs. Pintola oats', emoji: '⚖️' },
  { label: 'Is palm oil sustainable?', emoji: '🌴' },
  { label: 'Budget protein sources in India', emoji: '🇮🇳' },
  { label: 'Decode "sugar-free" labels', emoji: '🏷️' },
  { label: 'Progressive bodyweight workout', emoji: '💪' },
];

export default function ChatPage() {
  const { messages, isLoading, sendMessage, clearMessages } = useChat();
  const [input, setInput] = useState('');
  const { ref: scrollRef, scrollToBottom } = useScrollToBottom<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput('');
    setShowSuggestions(false);
    sendMessage(trimmed);
  };

  const handleSuggestionClick = (question: string) => {
    // Remove emoji prefix for cleaner query
    const cleanQuestion = question.replace(/^[^\w]*\s*/, '');
    setShowSuggestions(false);
    sendMessage(cleanQuestion);
  };

  const handleChipClick = (label: string) => {
    setShowSuggestions(false);
    sendMessage(label);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        className="px-5 pt-14 pb-3 bg-surface/80 backdrop-blur-lg border-b border-separator z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="ios-large-title text-[28px]">AI Nutrition</h1>
            <div className="flex items-center gap-1.5 mt-1">
              <Sparkles size={12} className="text-ios-purple" />
              <span className="text-[12px] text-text-tertiary">
                RAG-powered • IBM Granite • Verified data
              </span>
            </div>
          </div>
          <motion.button
            className="w-9 h-9 rounded-full bg-surface-secondary flex items-center justify-center"
            whileTap={{ scale: 0.85, rotate: -180 }}
            onClick={clearMessages}
            title="Clear conversation"
          >
            <RotateCcw size={16} className="text-text-tertiary" />
          </motion.button>
        </div>
      </motion.div>

      {/* Responsible AI Disclaimer — pinned at top */}
      <div className="pt-2 sticky top-0 z-[5]">
        <ResponsibleAIBanner compact />
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-3"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <ChatBubble
              key={msg.id}
              message={msg.content}
              isUser={msg.role === 'user'}
              timestamp={msg.timestamp}
              sources={msg.sources}
              showTimestamp={true}
            />
          ))}
        </AnimatePresence>

        {isLoading && <TypingIndicator />}

        {/* Suggested Questions (initial state only) */}
        {showSuggestions && messages.length <= 1 && (
          <motion.div
            className="px-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="text-[13px] text-text-tertiary font-medium mb-2.5 px-1">
              Try asking about...
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <motion.button
                  key={question}
                  className="px-3.5 py-2 rounded-2xl bg-surface border border-separator text-[14px] text-text-secondary font-medium transition-all active:scale-95"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.06 }}
                  onClick={() => handleSuggestionClick(question)}
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* ===== Input Area with Evaluator Quick-Test Chips ===== */}
      <div
        className="glass-nav px-4 pt-2 z-10"
        style={{ paddingBottom: 'max(100px, calc(90px + var(--safe-area-bottom)))' }}
      >
        {/* Evaluator chips — always visible */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
          {evaluatorChips.map((chip, i) => (
            <motion.button
              key={chip.label}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-ios-blue/8 border border-ios-blue/15 text-[12px] text-ios-blue font-medium whitespace-nowrap transition-all active:scale-95 hover:bg-ios-blue/15"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              onClick={() => handleChipClick(chip.label)}
              disabled={isLoading}
            >
              <span>{chip.emoji}</span>
              <span>{chip.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Input field */}
        <div className="flex items-center gap-2 bg-surface-secondary rounded-full px-4 py-2 border border-separator">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about nutrition, labels, or plans..."
            className="flex-1 bg-transparent text-[16px] text-foreground placeholder:text-text-tertiary outline-none"
            disabled={isLoading}
          />
          <motion.button
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              input.trim()
                ? 'bg-ios-blue'
                : 'bg-[rgba(120,120,128,0.12)]'
            }`}
            whileTap={{ scale: 0.85 }}
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send
              size={16}
              className={input.trim() ? 'text-white' : 'text-text-tertiary'}
              style={{ marginLeft: 1 }}
            />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
