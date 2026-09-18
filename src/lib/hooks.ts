import { useState, useCallback, useRef, useEffect } from 'react';

// ===== localStorage helpers (safe for SSR) =====
function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or private mode — silently ignore
  }
}

// ===== useTimeOfDay Hook =====
export function useTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return { greeting: 'Good Morning', emoji: '☀️', period: 'morning' as const };
  if (hour < 17) return { greeting: 'Good Afternoon', emoji: '🌤️', period: 'afternoon' as const };
  if (hour < 21) return { greeting: 'Good Evening', emoji: '🌅', period: 'evening' as const };
  return { greeting: 'Good Night', emoji: '🌙', period: 'night' as const };
}

// ===== Chat Message Type =====
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: string[];
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm your AI Nutrition Assistant 🥗 I can help you understand food labels, find sustainable meal options, and answer questions about nutrition. What would you like to know?",
  timestamp: formatTime(new Date()),
  sources: ['Nutrition Knowledge Base'],
};

const CHAT_STORAGE_KEY = 'nutriwell-chat-history';

// ===== useChat Hook (with localStorage persistence) =====
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const hydratedRef = useRef(false);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const stored = loadFromStorage<ChatMessage[]>(CHAT_STORAGE_KEY, []);
    if (stored.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessages(stored);
    }
  }, []);

  // Persist to localStorage whenever messages change (skip initial hydration)
  useEffect(() => {
    if (!hydratedRef.current) return;
    saveToStorage(CHAT_STORAGE_KEY, messages);
  }, [messages]);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      abortRef.current = new AbortController();
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.answer,
        timestamp: formatTime(new Date()),
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;

      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          "I'm sorry, I encountered an issue processing your request. Please try again.",
        timestamp: formatTime(new Date()),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    const welcome: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm your AI Nutrition Assistant 🥗 How can I help you today?",
      timestamp: formatTime(new Date()),
      sources: ['Nutrition Knowledge Base'],
    };
    setMessages([welcome]);
    saveToStorage(CHAT_STORAGE_KEY, [welcome]);
  }, []);

  return { messages, isLoading, sendMessage, clearMessages };
}

// ===== Helper =====
function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// ===== useScrollToBottom =====
export function useScrollToBottom<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const scrollToBottom = useCallback(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, []);

  return { ref, scrollToBottom };
}

// ===== Macro Data Types & Persistence =====
export interface MacroData {
  calories: { current: number; target: number };
  protein: { current: number; target: number };
  carbs: { current: number; target: number };
}

export interface MealEntry {
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  emoji: string;
}

interface DailyLog {
  date: string; // YYYY-MM-DD
  macros: MacroData;
  meals: MealEntry[];
  sustainabilityScore: number;
  co2Saved: number; // kg
  plantMeals: number;
  totalMeals: number;
}

const DAILY_LOG_KEY = 'nutriwell-daily-log';

function todayKey(): string {
  return new Date().toISOString().split('T')[0];
}

const DEFAULT_LOG: DailyLog = {
  date: todayKey(),
  macros: {
    calories: { current: 1450, target: 2000 },
    protein: { current: 68, target: 120 },
    carbs: { current: 185, target: 250 },
  },
  meals: [
    { name: 'Overnight Oats with Berries', time: '8:30 AM', calories: 320, protein: 12, carbs: 48, emoji: '🥣' },
    { name: 'Grilled Chicken Salad', time: '12:45 PM', calories: 450, protein: 38, carbs: 22, emoji: '🥗' },
    { name: 'Apple + Almond Butter', time: '3:15 PM', calories: 210, protein: 6, carbs: 28, emoji: '🍎' },
  ],
  sustainabilityScore: 78,
  co2Saved: 2.1,
  plantMeals: 2,
  totalMeals: 3,
};

// ===== useDailyLog Hook (localStorage-persisted) =====
export function useDailyLog() {
  const [log, setLog] = useState<DailyLog>(DEFAULT_LOG);
  const hydratedRef = useRef(false);

  // Hydrate on mount
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;
    const stored = loadFromStorage<DailyLog | null>(DAILY_LOG_KEY, null);
    if (stored && stored.date === todayKey()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLog(stored);
    } else {
      // New day — start fresh with defaults
      saveToStorage(DAILY_LOG_KEY, DEFAULT_LOG);
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydratedRef.current) return;
    saveToStorage(DAILY_LOG_KEY, log);
  }, [log]);

  const addMeal = useCallback((meal: MealEntry, isPlantBased: boolean) => {
    setLog((prev) => ({
      ...prev,
      macros: {
        calories: { ...prev.macros.calories, current: prev.macros.calories.current + meal.calories },
        protein: { ...prev.macros.protein, current: prev.macros.protein.current + meal.protein },
        carbs: { ...prev.macros.carbs, current: prev.macros.carbs.current + meal.carbs },
      },
      meals: [...prev.meals, meal],
      totalMeals: prev.totalMeals + 1,
      plantMeals: prev.plantMeals + (isPlantBased ? 1 : 0),
      co2Saved: prev.co2Saved + (isPlantBased ? 0.8 : 0.2),
      sustainabilityScore: Math.min(
        100,
        prev.sustainabilityScore + (isPlantBased ? 4 : 1)
      ),
    }));
  }, []);

  return { log, addMeal };
}

// ===== Sustainability Impact Stats =====
export interface SustainabilityImpact {
  co2SavedToday: number;  // kg
  co2SavedWeek: number;   // kg
  co2SavedMonth: number;  // kg
  treesEquivalent: number;
  waterSavedLiters: number;
  plantMealPercent: number;
}

const IMPACT_HISTORY_KEY = 'nutriwell-impact-history';

export function useSustainabilityImpact(dailyLog: DailyLog): SustainabilityImpact {
  // Load cumulative history
  const history = loadFromStorage<{ totalCo2: number; totalPlant: number; totalMeals: number; days: number }>(
    IMPACT_HISTORY_KEY,
    { totalCo2: 0, totalPlant: 0, totalMeals: 0, days: 0 }
  );

  const co2Today = dailyLog.co2Saved;
  const avgDailyCo2 = history.days > 0 ? history.totalCo2 / history.days : co2Today;

  return {
    co2SavedToday: co2Today,
    co2SavedWeek: co2Today + avgDailyCo2 * Math.min(history.days, 6),
    co2SavedMonth: co2Today + avgDailyCo2 * Math.min(history.days, 29),
    treesEquivalent: parseFloat(((co2Today + history.totalCo2) / 21).toFixed(1)), // ~21 kg CO₂ per tree/year
    waterSavedLiters: Math.round((dailyLog.plantMeals / Math.max(dailyLog.totalMeals, 1)) * 1500), // plant meals save ~1500L water vs. meat avg
    plantMealPercent: dailyLog.totalMeals > 0
      ? Math.round((dailyLog.plantMeals / dailyLog.totalMeals) * 100)
      : 0,
  };
}
