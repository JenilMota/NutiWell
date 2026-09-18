'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Leaf } from 'lucide-react';
import type { MealEntry } from '@/lib/hooks';

interface LogMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (meal: MealEntry, isPlantBased: boolean) => void;
}

function getEmojiForFood(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes('oat') || lower.includes('cereal') || lower.includes('porridge')) return '🥣';
  if (lower.includes('salad') || lower.includes('greens') || lower.includes('bowl')) return '🥗';
  if (lower.includes('apple') || lower.includes('fruit')) return '🍎';
  if (lower.includes('rice') || lower.includes('biryani')) return '🍚';
  if (lower.includes('chicken') || lower.includes('meat') || lower.includes('steak')) return '🍗';
  if (lower.includes('fish') || lower.includes('salmon') || lower.includes('tuna')) return '🐟';
  if (lower.includes('egg') || lower.includes('omelet')) return '🥚';
  if (lower.includes('bread') || lower.includes('toast') || lower.includes('roti')) return '🍞';
  if (lower.includes('soup')) return '🥣';
  if (lower.includes('pasta') || lower.includes('noodle')) return '🍝';
  if (lower.includes('sandwich') || lower.includes('burger') || lower.includes('wrap')) return '🥪';
  if (lower.includes('smoothie') || lower.includes('shake') || lower.includes('juice')) return '🥤';
  if (lower.includes('yogurt') || lower.includes('curd') || lower.includes('dahi')) return '🍦';
  if (lower.includes('paneer') || lower.includes('tofu') || lower.includes('dal')) return '🫘';
  if (lower.includes('banana')) return '🍌';
  if (lower.includes('nut') || lower.includes('almond') || lower.includes('peanut')) return '🥜';
  if (lower.includes('protein')) return '💪';
  if (lower.includes('coffee') || lower.includes('tea')) return '☕';
  return '🍽️';
}

function formatCurrentTime(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function LogMealModal({ isOpen, onClose, onSubmit }: LogMealModalProps) {
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [isPlantBased, setIsPlantBased] = useState(false);

  const handleSubmit = () => {
    const name = foodName.trim();
    if (!name || !calories) return;

    const meal: MealEntry = {
      name,
      time: formatCurrentTime(),
      calories: parseInt(calories) || 0,
      protein: parseInt(protein) || 0,
      carbs: parseInt(carbs) || 0,
      emoji: getEmojiForFood(name),
    };

    onSubmit(meal, isPlantBased);
    setFoodName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setIsPlantBased(false);
    onClose();
  };

  const previewEmoji = foodName.trim() ? getEmojiForFood(foodName) : '🍽️';
  const isValid = foodName.trim() && calories;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bottom-sheet-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 modal-sheet max-h-[85vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="modal-drag-handle" />

            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-2 pb-4">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-2xl gradient-pink flex items-center justify-center"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Plus size={20} className="text-white" />
                </motion.div>
                <div>
                  <h2 className="text-[19px] font-bold text-text-primary">Log Meal</h2>
                  <p className="ios-caption">Track what you eat</p>
                </div>
              </div>
              <motion.button
                className="w-8 h-8 rounded-full glass-card flex items-center justify-center !p-0"
                whileTap={{ scale: 0.85 }}
                onClick={onClose}
              >
                <X size={14} className="text-text-tertiary" />
              </motion.button>
            </div>

            <div className="px-5 space-y-4 pb-10">
              {/* Food Name with Emoji Preview */}
              <div>
                <label className="text-[12px] font-semibold text-text-tertiary mb-2 block uppercase tracking-wider">
                  Food Name
                </label>
                <div
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all"
                  style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', border: '0.5px solid var(--glass-border)' }}
                >
                  <motion.span
                    className="text-[28px]"
                    key={previewEmoji}
                    initial={{ scale: 0.5, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring' }}
                  >
                    {previewEmoji}
                  </motion.span>
                  <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="e.g., Overnight Oats with Berries"
                    className="flex-1 bg-transparent text-[16px] text-text-primary placeholder:text-text-tertiary outline-none"
                    autoFocus
                  />
                </div>
              </div>

              {/* Macros Grid — Glass */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'Calories', value: calories, set: setCalories, color: 'text-ios-red', unit: 'kcal', placeholder: '320' },
                  { label: 'Protein', value: protein, set: setProtein, color: 'text-ios-green', unit: 'grams', placeholder: '12' },
                  { label: 'Carbs', value: carbs, set: setCarbs, color: 'text-ios-blue', unit: 'grams', placeholder: '48' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className={`text-[12px] font-bold ${field.color} mb-2 block text-center`}>
                      {field.label}
                    </label>
                    <input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-3.5 rounded-2xl text-[20px] text-text-primary outline-none text-center font-bold transition-all"
                      style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(16px)', border: '0.5px solid var(--glass-border)' }}
                    />
                    <p className="text-[9px] text-text-tertiary text-center mt-1">{field.unit}</p>
                  </div>
                ))}
              </div>

              {/* Plant-Based Toggle — Glass */}
              <motion.button
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all"
                style={{
                  background: isPlantBased
                    ? 'linear-gradient(135deg, rgba(52,199,89,0.1), rgba(0,199,190,0.06))'
                    : 'var(--glass-bg)',
                  backdropFilter: 'blur(16px)',
                  border: isPlantBased ? '1px solid rgba(52,199,89,0.25)' : '0.5px solid var(--glass-border)',
                  boxShadow: isPlantBased ? '0 4px 16px rgba(52,199,89,0.12)' : 'none',
                }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsPlantBased(!isPlantBased)}
              >
                <Leaf size={18} className={isPlantBased ? 'text-ios-green' : 'text-text-tertiary'} />
                <span className={`text-[15px] font-semibold ${isPlantBased ? 'text-ios-green' : 'text-text-secondary'}`}>
                  Plant-based meal
                </span>
                <div className="ml-auto">
                  <div className={`w-12 h-7 rounded-full transition-colors relative ${isPlantBased ? 'bg-ios-green' : 'bg-[rgba(120,120,128,0.16)]'}`}>
                    <motion.div
                      className="w-[23px] h-[23px] rounded-full bg-white shadow-md absolute top-[2px]"
                      animate={{ left: isPlantBased ? 25 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </div>
                </div>
              </motion.button>

              {/* Submit Button */}
              <motion.button
                className={`w-full py-4 rounded-2xl text-white text-[17px] font-bold transition-all ${isValid ? 'gradient-blue' : 'opacity-40'}`}
                style={!isValid ? { background: 'var(--ios-blue)' } : undefined}
                whileTap={isValid ? { scale: 0.97 } : undefined}
                onClick={handleSubmit}
                disabled={!isValid}
              >
                Log Meal
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
