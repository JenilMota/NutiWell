'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: string;
  showTimestamp?: boolean;
  sources?: string[];
}

// Parse simple markdown-like formatting into styled segments
function formatAIResponse(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];
  let inTable = false;

  const processInlineFormatting = (line: string, lineIndex: number): React.ReactNode => {
    // Process **bold** and *italic* inline
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let partIndex = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      if (boldMatch && boldMatch.index !== undefined) {
        if (boldMatch.index > 0) {
          parts.push(<span key={`${lineIndex}-${partIndex++}`}>{remaining.slice(0, boldMatch.index)}</span>);
        }
        parts.push(
          <strong key={`${lineIndex}-${partIndex++}`} className="font-semibold text-text-primary">
            {boldMatch[1]}
          </strong>
        );
        remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
        continue;
      }

      // No more patterns
      parts.push(<span key={`${lineIndex}-${partIndex++}`}>{remaining}</span>);
      break;
    }
    return <>{parts}</>;
  };

  const flushTable = () => {
    if (tableHeaders.length > 0 || tableRows.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="my-2 rounded-xl overflow-hidden border border-separator">
          {tableHeaders.length > 0 && (
            <div className="flex bg-ios-blue/5 border-b border-separator">
              {tableHeaders.map((h, i) => (
                <div key={i} className="flex-1 px-3 py-2 text-[11px] font-bold text-ios-blue text-center">
                  {h.trim()}
                </div>
              ))}
            </div>
          )}
          {tableRows.map((row, ri) => (
            <div key={ri} className={`flex ${ri < tableRows.length - 1 ? 'border-b border-separator' : ''}`}>
              {row.map((cell, ci) => (
                <div key={ci} className="flex-1 px-3 py-1.5 text-[12px] text-text-secondary text-center">
                  {cell.trim()}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
      tableHeaders = [];
      tableRows = [];
      inTable = false;
    }
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      if (inTable) flushTable();
      return;
    }

    // Table row
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const cells = trimmed.split('|').filter(c => c.trim().length > 0);
      // Skip separator rows like |---|---|
      if (cells.every(c => /^[-:]+$/.test(c.trim()))) {
        return;
      }
      if (!inTable) {
        tableHeaders = cells;
        inTable = true;
      } else {
        tableRows.push(cells);
      }
      return;
    }

    if (inTable) flushTable();

    // Section headers (lines ending with :)
    if (/^\*\*.+:\*\*$/.test(trimmed) || /^\*\*.+\*\*$/.test(trimmed)) {
      const headerText = trimmed.replace(/\*\*/g, '');
      elements.push(
        <p key={`h-${i}`} className="text-[14px] font-bold text-text-primary mt-3 mb-1">
          {headerText}
        </p>
      );
      return;
    }

    // Numbered items (1️⃣, 1., etc.)
    if (/^[0-9]️⃣?\s|^[0-9]+[\.\)]\s/.test(trimmed)) {
      elements.push(
        <div key={`num-${i}`} className="flex gap-2 items-start ml-1 my-0.5">
          <span className="text-[13px] flex-shrink-0">{trimmed.match(/^[0-9]️⃣?|^[0-9]+[\.\)]/)?.[0]}</span>
          <span className="text-[14px] text-text-secondary leading-snug">
            {processInlineFormatting(trimmed.replace(/^[0-9]️⃣?\s|^[0-9]+[\.\)]\s/, ''), i)}
          </span>
        </div>
      );
      return;
    }

    // Bullet points (•, -, 🔹, ✅, ⚠️ prefixed)
    if (/^[•\-🔹✅⚠️🔸▸]\s/.test(trimmed)) {
      const bulletColor = trimmed.startsWith('✅') ? 'text-ios-green' :
                         trimmed.startsWith('⚠️') ? 'text-ios-orange' :
                         'text-ios-blue';
      const bulletChar = trimmed.match(/^[•\-🔹✅⚠️🔸▸]/)?.[0] || '•';
      const content = trimmed.replace(/^[•\-🔹✅⚠️🔸▸]\s/, '');
      elements.push(
        <div key={`bullet-${i}`} className="flex gap-2 items-start ml-2 my-0.5">
          <span className={`text-[12px] flex-shrink-0 mt-0.5 ${bulletColor}`}>{bulletChar}</span>
          <span className="text-[14px] text-text-secondary leading-snug">
            {processInlineFormatting(content, i)}
          </span>
        </div>
      );
      return;
    }

    // Disclaimer / italics line (starts with ⚠️ or *)
    if (/^⚠️\s?\*/.test(trimmed) || /^\*[^*]+\*$/.test(trimmed)) {
      const disclaimerText = trimmed.replace(/^\*|\*$/g, '').replace(/^⚠️\s?\*?/, '');
      elements.push(
        <div key={`disc-${i}`} className="mt-3 px-3 py-2 rounded-lg bg-ios-orange/8 border border-ios-orange/15">
          <p className="text-[11px] text-ios-orange leading-snug">
            ⚠️ {disclaimerText}
          </p>
        </div>
      );
      return;
    }

    // Verdict / takeaway badges
    if (/^\*\*Verdict:\*\*/.test(trimmed)) {
      elements.push(
        <div key={`verdict-${i}`} className="mt-2 px-3 py-2 rounded-xl bg-ios-green/8 border border-ios-green/15">
          <p className="text-[13px] text-ios-green font-medium leading-snug">
            {processInlineFormatting(trimmed, i)}
          </p>
        </div>
      );
      return;
    }

    // Regular text
    elements.push(
      <p key={`p-${i}`} className="text-[14px] text-text-secondary leading-relaxed my-0.5">
        {processInlineFormatting(trimmed, i)}
      </p>
    );
  });

  // Flush any remaining table
  if (inTable) flushTable();

  return elements;
}

export default function ChatBubble({
  message,
  isUser,
  timestamp,
  showTimestamp = true,
  sources,
}: ChatBubbleProps) {
  const isFormatted = !isUser && (
    message.includes('**') ||
    message.includes('•') ||
    message.includes('|') ||
    message.includes('\n')
  );

  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} px-4 mb-1.5`}
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        {isUser ? (
          /* User bubble - iMessage blue */
          <div className="px-4 py-2.5 bubble-sent">
            <p className="text-[16px] leading-[1.35] text-white">
              {message}
            </p>
          </div>
        ) : isFormatted ? (
          /* AI response - structured card */
          <div className="ai-response-card px-4 py-3 w-full">
            {formatAIResponse(message)}
          </div>
        ) : (
          /* AI response - simple bubble */
          <div className="px-4 py-2.5 bubble-received">
            <p className="text-[16px] leading-[1.35]" style={{ color: 'var(--bubble-received-text)' }}>
              {message}
            </p>
          </div>
        )}

        {/* Source citations for AI responses */}
        {!isUser && sources && sources.length > 0 && (
          <div className="mt-1 px-2 flex items-center gap-1 flex-wrap">
            <span className="text-[10px] text-text-tertiary">Sources:</span>
            {sources.map((source, i) => (
              <span
                key={i}
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-[rgba(0,122,255,0.08)] text-ios-blue font-medium"
              >
                {source}
              </span>
            ))}
          </div>
        )}

        {showTimestamp && (
          <span className={`text-[11px] text-text-tertiary mt-1 ${isUser ? 'mr-2' : 'ml-2'}`}>
            {timestamp}
          </span>
        )}
      </div>
    </motion.div>
  );
}
