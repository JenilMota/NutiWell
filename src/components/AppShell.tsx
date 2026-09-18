'use client';

import React from 'react';
import BottomTabBar from '@/components/BottomTabBar';
import { UserProfileProvider } from '@/lib/user-store';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UserProfileProvider>
      <div className="ambient-bg flex flex-col h-full w-full max-w-lg mx-auto relative overflow-hidden">
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
        <BottomTabBar />
      </div>
    </UserProfileProvider>
  );
}
