'use client';

import React from 'react';
import BottomTabBar from '@/components/BottomTabBar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full w-full max-w-lg mx-auto relative overflow-hidden">
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
      <BottomTabBar />
    </div>
  );
}
