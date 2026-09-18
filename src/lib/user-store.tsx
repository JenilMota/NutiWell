'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

// ===== Types =====
export type PrimaryGoal = 'weight-gain' | 'fat-loss' | 'sustainable-living';

export interface UserProfile {
  name: string;
  calorieTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  primaryGoal: PrimaryGoal;
  streak: number;
  isOnboarded: boolean;
  lastActiveDate: string; // YYYY-MM-DD
}

interface UserProfileContextValue {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;
}

// ===== Defaults =====
const DEFAULT_PROFILE: UserProfile = {
  name: '',
  calorieTarget: 2000,
  proteinTarget: 120,
  carbsTarget: 250,
  primaryGoal: 'sustainable-living',
  streak: 0,
  isOnboarded: false,
  lastActiveDate: new Date().toISOString().split('T')[0],
};

const STORAGE_KEY = 'nutriwell-user-profile';

// ===== LocalStorage helpers =====
function loadProfile(): UserProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const stored = JSON.parse(raw) as UserProfile;
    // Update streak based on activity
    const today = new Date().toISOString().split('T')[0];
    if (stored.lastActiveDate !== today) {
      const lastDate = new Date(stored.lastActiveDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        stored.streak = (stored.streak || 0) + 1;
      } else if (diffDays > 1) {
        stored.streak = 1; // Reset streak if missed a day
      }
      stored.lastActiveDate = today;
    }
    return stored;
  } catch {
    return DEFAULT_PROFILE;
  }
}

function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Silently ignore
  }
}

// ===== Context =====
const UserProfileContext = createContext<UserProfileContextValue>({
  profile: DEFAULT_PROFILE,
  updateProfile: () => {},
  resetProfile: () => {},
});

// ===== Provider =====
export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const hydratedRef = useRef(false);

  // Hydrate from localStorage
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const stored = loadProfile();
    setProfile(stored);
    saveProfile(stored); // Save back with updated streak
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydratedRef.current) return;
    saveProfile(profile);
  }, [profile]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(DEFAULT_PROFILE);
    saveProfile(DEFAULT_PROFILE);
  }, []);

  return (
    <UserProfileContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
}

// ===== Hook =====
export function useUserProfile() {
  return useContext(UserProfileContext);
}
