# Presentation Mapping — 1M1B IBM SkillsBuild Internship

> Maps each mandatory presentation slide directly to the codebase component that satisfies it.

---

## Slide 1: Problem Statement

**"How might we use AI to analyze complex nutritional data so that everyday users can achieve wellness goals sustainably?"**

| Deliverable | Code / Component | File |
|---|---|---|
| Problem framing | App title + metadata | [`layout.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/layout.tsx) — metadata.description |
| SDG 3 alignment | Dashboard Impact widget header | [`page.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/page.tsx) — "SDG 3 — Good Health and Well-being" |

---

## Slide 2: AI Tool Selection — IBM Granite via watsonx.ai

| Deliverable | Code / Component | File |
|---|---|---|
| IBM Granite integration | `callGraniteLLM()` using LangChain `WatsonxAI` | [`api/chat/route.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/api/chat/route.ts#L54-L80) |
| Environment config | `.env.example` with `WATSONX_PROJECT_ID` | [`.env.example`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/.env.example) |
| Fallback demo mode | `USE_GRANITE` flag + `generateRAGResponse()` | [`api/chat/route.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/api/chat/route.ts#L19-L21) |
| Model metadata in response | `model` field in API JSON | [`api/chat/route.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/api/chat/route.ts) — return statement |

---

## Slide 3: RAG Architecture & Data Pipeline

| Deliverable | Code / Component | File |
|---|---|---|
| RAG pipeline flow | 5-step pipeline: Retrieve → Augment → Prompt → LLM → Cite | [`api/chat/route.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/api/chat/route.ts) |
| Knowledge base (12 docs) | `nutritionKnowledgeBase[]` | [`nutrition-kb.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/data/nutrition-kb.ts) |
| Document retriever | `retrieveRelevantDocuments()` | [`nutrition-kb.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/data/nutrition-kb.ts) — keyword retriever |
| Source citations in UI | `sources` badges on AI bubbles | [`ChatBubble.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/components/ChatBubble.tsx) |
| RAG indicator in header | "RAG-powered • IBM Granite • Verified data" | [`chat/page.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/chat/page.tsx) |

---

## Slide 4: Responsible AI

| Deliverable | Code / Component | File |
|---|---|---|
| Disclaimer banner (full) | `<ResponsibleAIBanner />` on Dashboard | [`ResponsibleAIBanner.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/components/ResponsibleAIBanner.tsx) |
| Disclaimer banner (compact) | `<ResponsibleAIBanner compact />` on Chat + Scanner | [`ResponsibleAIBanner.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/components/ResponsibleAIBanner.tsx) |
| System prompt guardrails | `SYSTEM_PROMPT` with 8 Responsible AI rules | [`api/chat/route.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/api/chat/route.ts#L26-L46) |
| Transparency text | _"This tool provides general wellness decision-support…"_ | Appears on 3 pages: `/`, `/chat`, `/scanner` |
| No medical diagnoses | System prompt: "Never diagnose conditions or prescribe treatments" | [`api/chat/route.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/api/chat/route.ts) |

---

## Slide 5: Sustainability Impact Statement

| Deliverable | Code / Component | File |
|---|---|---|
| Impact widget | "Sustainability Impact" card with metrics grid | [`page.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/page.tsx) — search "Sustainability Impact Statement" |
| CO₂ saved (cumulative) | `co2SavedMonth` from `useSustainabilityImpact()` | [`hooks.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/lib/hooks.ts) |
| Water saved | `waterSavedLiters` calculation | [`hooks.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/lib/hooks.ts) |
| Tree equivalents | `treesEquivalent` (~21 kg CO₂/tree/year) | [`hooks.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/lib/hooks.ts) |
| Plant meal percentage | `plantMealPercent` tracker | [`hooks.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/lib/hooks.ts) |
| SDG 3 label | Explicitly shown in widget header | [`page.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/page.tsx) |

---

## Slide 6: Live Demo Flow

| Demo Action | What Evaluator Sees | Component |
|---|---|---|
| Open Dashboard | Macro rings + Impact widget with live CO₂ stats | [`page.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/page.tsx) |
| Tap "Compare Alpino vs. Pintola oats" chip | RAG retrieves docs → structured comparison table | [`chat/page.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/chat/page.tsx) evaluator chips → [`api/chat/route.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/api/chat/route.ts) |
| Tap "Scan Label" | Scanner viewfinder → ingredient analysis with badges | [`scanner/page.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/scanner/page.tsx) |
| Navigate to Plans | Filterable plan cards with sustainability ratings | [`plans/page.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/app/plans/page.tsx) |
| Refresh page | Chat history + macros persist (localStorage) | [`hooks.ts`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/lib/hooks.ts) |

---

## Slide 7: Technical Architecture

| Layer | Technology | Component |
|---|---|---|
| Frontend | Next.js 16 App Router + React + TypeScript | `src/app/` |
| Styling | Tailwind CSS v4 + iOS design system | `globals.css` |
| Animations | Framer Motion | All pages + components |
| AI Backend | LangChain.js → IBM Granite (watsonx.ai) | `api/chat/route.ts` |
| RAG Data | In-app knowledge base (12 documents) | `nutrition-kb.ts` |
| Persistence | localStorage (chat, macros, impact) | `hooks.ts` |
| PWA | `manifest.json` + standalone display | `public/manifest.json` |

---

## Slide 8: Key Components Quick Reference

| Component | Purpose | Lines |
|---|---|---|
| [`BottomTabBar.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/components/BottomTabBar.tsx) | iOS frosted-glass navigation | ~85 |
| [`ProgressRing.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/components/ProgressRing.tsx) | Apple Health SVG rings | ~85 |
| [`ChatBubble.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/components/ChatBubble.tsx) | iMessage bubbles + source citations | ~60 |
| [`ResponsibleAIBanner.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/components/ResponsibleAIBanner.tsx) | Mandatory AI disclaimer | ~65 |
| [`PlanCard.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/components/PlanCard.tsx) | App Store-style plan cards | ~100 |
| [`GlassCard.tsx`](file:///c:/Users/devan/OneDrive/Documents/jenil%20doccs/internship/1M1B/Project/nutrition-optimizer/src/components/GlassCard.tsx) | Glassmorphic card wrapper | ~35 |
