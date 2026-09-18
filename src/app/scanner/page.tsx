'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Upload,
  X,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Leaf,
  Sparkles,
  ScanLine,
} from 'lucide-react';

import GlassCard from '@/components/GlassCard';
import ProgressRing from '@/components/ProgressRing';
import ResponsibleAIBanner from '@/components/ResponsibleAIBanner';

interface IngredientAnalysis {
  name: string;
  quality: 'good' | 'moderate' | 'avoid';
  note: string;
}

interface ScanResult {
  productName: string;
  servingSize: string;
  macros: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
  ingredients: IngredientAnalysis[];
  sustainabilityScore: number;
  verdict: string;
  tips: string[];
}

const qualityConfig = {
  good: { icon: CheckCircle2, color: 'text-ios-green', bg: 'bg-ios-green/10', label: 'Good' },
  moderate: { icon: AlertTriangle, color: 'text-ios-orange', bg: 'bg-ios-orange/10', label: 'Moderate' },
  avoid: { icon: XCircle, color: 'text-ios-red', bg: 'bg-ios-red/10', label: 'Avoid' },
};

export default function ScannerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    setResult(null);

    try {
      const response = await fetch('/api/scanner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: 'demo-scan' }),
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.result);
      }
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const resetScan = () => {
    setResult(null);
    setIsScanning(false);
  };

  return (
    <div className="page-content">
      {/* Header */}
      <motion.div
        className="px-5 pt-14 pb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="ios-large-title">Smart Scanner</h1>
        <div className="flex items-center gap-1.5 mt-1">
          <Sparkles size={12} className="text-ios-blue" />
          <span className="text-[12px] text-text-tertiary">
            AI-powered label analysis
          </span>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!result ? (
          /* Scanner Interface */
          <motion.div
            key="scanner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Viewfinder Area */}
            <GlassCard className="mx-4 mt-4 overflow-hidden" delay={0.1}>
              <div
                className={`relative h-64 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-t-2xl flex items-center justify-center overflow-hidden ${
                  dragOver ? 'ring-2 ring-ios-blue ring-inset' : ''
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleScan(); }}
              >
                {/* Corner brackets */}
                <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-ios-blue rounded-tl-lg" />
                <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-ios-blue rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-ios-blue rounded-bl-lg" />
                <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-ios-blue rounded-br-lg" />

                {/* Scan line */}
                {isScanning && (
                  <div className="absolute left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-ios-blue to-transparent scan-line-animate" />
                )}

                {/* Center content */}
                <div className="flex flex-col items-center gap-3 z-10">
                  {isScanning ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      >
                        <ScanLine size={40} className="text-ios-blue" />
                      </motion.div>
                      <p className="text-white/80 text-[15px] font-medium">Analyzing label...</p>
                    </>
                  ) : (
                    <>
                      <ScanLine size={40} className="text-white/40" />
                      <p className="text-white/60 text-[15px]">
                        Position food label in frame
                      </p>
                      <p className="text-white/30 text-[12px]">
                        or drag & drop an image
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 p-4">
                <motion.button
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-ios-blue text-white text-[16px] font-semibold"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleScan}
                  disabled={isScanning}
                >
                  <Camera size={20} />
                  {isScanning ? 'Scanning...' : 'Take Photo'}
                </motion.button>
                <motion.button
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-surface-secondary border border-separator text-[16px] font-semibold text-text-secondary"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleScan}
                  disabled={isScanning}
                >
                  <Upload size={20} />
                  Upload
                </motion.button>
              </div>
            </GlassCard>

            {/* How it works */}
            <GlassCard className="mx-4 mt-3 p-4" delay={0.2}>
              <h3 className="ios-title mb-3">How It Works</h3>
              <div className="space-y-3">
                {[
                  { step: '1', text: 'Point camera at any food label or upload a photo', emoji: '📷' },
                  { step: '2', text: 'AI extracts ingredients and nutritional data', emoji: '🤖' },
                  { step: '3', text: 'Get instant quality ratings and sustainability score', emoji: '✅' },
                ].map((item, i) => (
                  <motion.div
                    key={item.step}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-ios-blue/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">{item.emoji}</span>
                    </div>
                    <p className="text-[14px] text-text-secondary">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            <div className="mt-3 mb-6">
              <ResponsibleAIBanner compact />
            </div>
          </motion.div>
        ) : (
          /* Results Interface */
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {/* Product Header */}
            <GlassCard className="mx-4 mt-4 p-4" delay={0}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="ios-title text-[19px]">{result.productName}</h2>
                  <p className="ios-caption mt-0.5">Serving: {result.servingSize}</p>
                </div>
                <motion.button
                  className="w-8 h-8 rounded-full bg-surface-secondary flex items-center justify-center"
                  whileTap={{ scale: 0.85 }}
                  onClick={resetScan}
                >
                  <X size={16} className="text-text-tertiary" />
                </motion.button>
              </div>
            </GlassCard>

            {/* Macro Breakdown */}
            <GlassCard className="mx-4 mt-3 p-4" delay={0.1}>
              <h3 className="ios-title mb-3">Nutritional Breakdown</h3>
              <div className="flex items-center justify-around">
                <ProgressRing
                  value={result.macros.calories}
                  max={2000}
                  size={80}
                  strokeWidth={7}
                  color="#FF3B30"
                  label="Calories"
                />
                <ProgressRing
                  value={result.macros.protein}
                  max={50}
                  size={65}
                  strokeWidth={6}
                  color="#34C759"
                  label="Protein"
                  unit="g"
                />
                <ProgressRing
                  value={result.macros.carbs}
                  max={65}
                  size={65}
                  strokeWidth={6}
                  color="#007AFF"
                  label="Carbs"
                  unit="g"
                />
                <ProgressRing
                  value={result.macros.fat}
                  max={22}
                  size={65}
                  strokeWidth={6}
                  color="#FF9500"
                  label="Fat"
                  unit="g"
                />
              </div>

              {/* Additional macros */}
              <div className="flex gap-3 mt-4 pt-3 border-t border-separator">
                {[
                  { label: 'Fiber', value: `${result.macros.fiber}g`, color: 'text-ios-green' },
                  { label: 'Sugar', value: `${result.macros.sugar}g`, color: 'text-ios-orange' },
                  { label: 'Sodium', value: `${result.macros.sodium}mg`, color: 'text-ios-red' },
                ].map((item) => (
                  <div key={item.label} className="flex-1 text-center">
                    <p className={`text-[15px] font-bold ${item.color}`}>{item.value}</p>
                    <p className="ios-caption">{item.label}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Ingredients Analysis */}
            <GlassCard className="mx-4 mt-3 overflow-hidden" delay={0.2}>
              <div className="p-4 pb-2">
                <h3 className="ios-title">Ingredient Analysis</h3>
              </div>
              {result.ingredients.map((ingredient, index) => {
                const config = qualityConfig[ingredient.quality];
                const QualityIcon = config.icon;
                return (
                  <React.Fragment key={ingredient.name}>
                    <motion.div
                      className="flex items-center gap-3 px-4 py-3"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <div className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                        <QualityIcon size={16} className={config.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[15px] font-medium text-text-primary">{ingredient.name}</p>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${config.bg} ${config.color}`}>
                            {config.label}
                          </span>
                        </div>
                        <p className="text-[12px] text-text-tertiary mt-0.5">{ingredient.note}</p>
                      </div>
                    </motion.div>
                    {index < result.ingredients.length - 1 && <div className="ios-separator" />}
                  </React.Fragment>
                );
              })}
            </GlassCard>

            {/* Sustainability Score */}
            <GlassCard className="mx-4 mt-3 p-4" delay={0.3}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl gradient-green flex items-center justify-center">
                  <Leaf size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="ios-title">Sustainability Score</h3>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${
                          i < result.sustainabilityScore
                            ? 'bg-ios-green'
                            : 'bg-[rgba(0,0,0,0.06)]'
                        }`}
                      />
                    ))}
                    <span className="text-[13px] font-bold text-ios-green ml-2">
                      {result.sustainabilityScore}/5
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* AI Verdict */}
            <GlassCard className="mx-4 mt-3 p-4" delay={0.4}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-ios-purple" />
                <h3 className="ios-title">AI Verdict</h3>
              </div>
              <p className="text-[14px] text-text-secondary leading-relaxed">
                {result.verdict}
              </p>
              {result.tips.length > 0 && (
                <div className="mt-3 pt-3 border-t border-separator">
                  <p className="text-[12px] font-semibold text-text-tertiary mb-2">💡 Tips</p>
                  {result.tips.map((tip, i) => (
                    <p key={i} className="text-[13px] text-text-secondary mb-1.5 pl-4 relative">
                      <span className="absolute left-0">•</span>
                      {tip}
                    </p>
                  ))}
                </div>
              )}
            </GlassCard>

            {/* Scan Again */}
            <div className="px-4 mt-4 mb-6">
              <motion.button
                className="w-full py-3.5 rounded-2xl bg-ios-blue text-white text-[16px] font-semibold flex items-center justify-center gap-2"
                whileTap={{ scale: 0.97 }}
                onClick={resetScan}
              >
                <ScanLine size={20} />
                Scan Another Label
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
