'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, ScanLine, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/chat', label: 'AI Chat', icon: MessageSquare },
  { href: '/scanner', label: 'Scanner', icon: ScanLine },
  { href: '/plans', label: 'Plans', icon: BookOpen },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 glass-nav md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-auto md:rounded-2xl md:border md:border-[var(--glass-border)] md:shadow-lg md:max-w-md"
    >
      <div
        className="flex items-center justify-around md:justify-center md:gap-2 max-w-lg mx-auto px-2 md:px-4"
        style={{ paddingBottom: 'max(8px, var(--safe-area-bottom))' }}
      >
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          const isScanner = tab.href === '/scanner';

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center pt-2 pb-1 px-3 md:px-4 relative"
            >
              {isScanner ? (
                /* Prominent center scanner button */
                <div className="relative -mt-4 md:-mt-2">
                  <motion.div
                    className="w-14 h-14 md:w-12 md:h-12 rounded-2xl gradient-blue flex items-center justify-center shadow-lg"
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={26} className="text-white md:hidden" strokeWidth={2} />
                    <Icon size={22} className="text-white hidden md:block" strokeWidth={2} />
                  </motion.div>
                </div>
              ) : (
                <>
                  <motion.div
                    className="relative"
                    whileTap={{ scale: 0.85 }}
                  >
                    <Icon
                      size={24}
                      className={`transition-colors duration-200 ${
                        isActive ? 'text-ios-blue' : 'text-text-tertiary'
                      }`}
                      strokeWidth={isActive ? 2.2 : 1.5}
                      fill={isActive ? 'currentColor' : 'none'}
                    />
                  </motion.div>
                  <span
                    className={`text-[10px] mt-0.5 font-medium transition-colors duration-200 ${
                      isActive ? 'text-ios-blue' : 'text-text-tertiary'
                    }`}
                  >
                    {tab.label}
                  </span>
                </>
              )}

              {/* Active indicator dot for non-scanner tabs */}
              {isActive && !isScanner && (
                <motion.div
                  className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-ios-blue"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
