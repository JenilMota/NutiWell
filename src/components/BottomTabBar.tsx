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
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-nav">
      <div className="flex items-center justify-around max-w-lg mx-auto px-2"
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
              className="flex flex-col items-center pt-2 pb-1 px-3 relative"
            >
              {isScanner ? (
                /* Prominent center scanner button */
                <div className="relative -mt-4">
                  <motion.div
                    className="w-14 h-14 rounded-2xl gradient-blue flex items-center justify-center shadow-lg"
                    style={{
                      boxShadow: '0 4px 16px rgba(0, 122, 255, 0.35)',
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={26} className="text-white" strokeWidth={2} />
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
