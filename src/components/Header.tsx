'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sun, Moon, User, Shield, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useUserProfile } from '@/lib/user-store';
import { useTimeOfDay } from '@/lib/hooks';

interface HeaderProps {
  onAvatarClick?: () => void;
}

export default function Header({ onAvatarClick }: HeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const { profile } = useUserProfile();
  const { greeting, emoji } = useTimeOfDay();

  const isDark = resolvedTheme === 'dark';
  const displayName = profile.name || 'there';
  const initials = profile.name
    ? profile.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : '';

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="hero-gradient">
      <motion.header
        className="px-5 pt-14 pb-4 relative z-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {/* Top Brand Bar — Glass */}
        <motion.div
          className="glass-card px-4 py-3 mb-4"
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            {/* Left: Logo + Brand */}
            <div className="flex items-center gap-3">
              <motion.div
                className="w-10 h-10 rounded-[14px] gradient-green flex items-center justify-center"
                whileHover={{ rotate: 12 }}
                whileTap={{ scale: 0.9 }}
              >
                <Leaf size={20} className="text-white" />
              </motion.div>
              <div>
                <h1 className="text-[18px] font-bold tracking-tight text-text-primary leading-none">
                  NutriWell
                </h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="status-badge bg-ios-green/12 text-ios-green">
                    <Shield size={8} />
                    SDG 3
                  </div>
                  <div className="status-badge bg-ios-purple/12 text-ios-purple">
                    <div className="w-[5px] h-[5px] rounded-full bg-current live-dot" />
                    AI Verified
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Theme Toggle + Avatar */}
            <div className="flex items-center gap-2.5">
              <motion.button
                className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center !p-0 !shadow-none border border-glass-border"
                whileTap={{ scale: 0.82, rotate: isDark ? -30 : 30 }}
                onClick={toggleTheme}
                aria-label="Toggle theme"
                style={{ backdropFilter: 'blur(16px)' }}
              >
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  className="theme-toggle-icon"
                >
                  {isDark ? (
                    <Moon size={17} className="text-ios-yellow" />
                  ) : (
                    <Sun size={17} className="text-ios-orange" />
                  )}
                </motion.div>
              </motion.button>

              <motion.button
                className="w-10 h-10 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,122,255,0.15), rgba(88,86,214,0.12))',
                  border: '0.5px solid rgba(0,122,255,0.2)',
                  boxShadow: '0 4px 12px rgba(0,122,255,0.15)',
                }}
                whileTap={{ scale: 0.82 }}
                onClick={onAvatarClick}
                aria-label="User profile"
              >
                {initials ? (
                  <span className="text-[13px] font-bold text-ios-blue">{initials}</span>
                ) : (
                  <User size={17} className="text-ios-blue" />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Greeting Row */}
        <motion.div
          className="flex items-end justify-between"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <div>
            <h2 className="text-[26px] font-bold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
              <span className="mr-1">{emoji}</span>
              {greeting},
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, var(--ios-green), var(--ios-teal))' }}
              >
                {displayName}
              </span>
            </h2>
            <p className="ios-caption mt-1.5 flex items-center gap-1.5">
              <Sparkles size={10} className="text-ios-purple" />
              {dateStr} · Your wellness companion
            </p>
          </div>
          {profile.streak > 0 && (
            <motion.div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,149,0,0.12), rgba(255,45,85,0.08))',
                border: '0.5px solid rgba(255,149,0,0.2)',
                boxShadow: '0 4px 12px rgba(255,149,0,0.15)',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', delay: 0.6 }}
            >
              <span className="text-[14px]">🔥</span>
              <span className="text-[12px] font-bold text-ios-orange">{profile.streak}d streak</span>
            </motion.div>
          )}
        </motion.div>
      </motion.header>
    </div>
  );
}
