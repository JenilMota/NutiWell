'use client';

import React from 'react';
import BottomTabBar from '@/components/BottomTabBar';
import { UserProfileProvider } from '@/lib/user-store';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <UserProfileProvider>
      <div className="ambient-bg flex flex-col h-full w-full relative overflow-hidden">
        {/* Max-width container — prevents stretching on wide desktops */}
        <div className="flex flex-col h-full w-full max-w-5xl mx-auto md:px-8">
          <main className="flex-1 flex flex-col overflow-hidden">
            {children}
          </main>
        </div>
        <BottomTabBar />
      </div>
    </UserProfileProvider>
  );
}
