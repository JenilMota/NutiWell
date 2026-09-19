<div align="center">

# 🥗 NutriWell

### Accessible Nutrition & Well-being Optimizer

*Democratizing nutritional intelligence — one sustainable, budget-friendly choice at a time.*

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![LangChain.js](https://img.shields.io/badge/LangChain.js-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)](https://js.langchain.com/)
[![IBM watsonx.ai](https://img.shields.io/badge/IBM_watsonx.ai-052FAD?style=for-the-badge&logo=ibm&logoColor=white)](https://www.ibm.com/watsonx)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#-license)
[![SDG 3](https://img.shields.io/badge/SDG_3-Good_Health_%26_Well--Being-4C9F38?style=for-the-badge)](https://sdgs.un.org/goals/goal3)

[🔗 Live Demo](https://nutri-well-seven.vercel.app/) · [📖 Features](#-features) · [🛡️ Responsible AI](#️-responsible-ai) · [🚀 Getting Started](#-local-installation)

</div>

---

## 📌 Table of Contents

- [🌱 Introduction & SDG Alignment](#-introduction--sdg-alignment)
- [✨ Features](#-features)
- [🛡️ Responsible AI](#️-responsible-ai)
- [🧰 Tech Stack](#-tech-stack)
- [🚀 Local Installation](#-local-installation)
- [🙏 Acknowledgments](#-acknowledgments)
- [📄 License](#-license)

---

## 🌱 Introduction & SDG Alignment

**NutriWell** is a responsive Next.js Progressive Web App built to close the gap between *good nutrition advice* and *what a student can actually afford*. Most nutrition tools assume access to premium ingredients, supplements, or a gym membership — NutriWell doesn't.

At its core is a **Retrieval-Augmented Generation (RAG) pipeline**, orchestrated with **LangChain.js** and powered by **IBM Granite models on watsonx.ai**. Instead of generating generic advice, the assistant retrieves context from a curated, localized knowledge base — everyday staples (like Pintola oats, dals, and seasonal produce) and **equipment-free calisthenics routines** — before generating a response. The result is guidance that is grounded, affordable, and realistic.

This directly supports **[SDG 3: Good Health and Well-Being](https://sdgs.un.org/goals/goal3)** by making evidence-aligned wellness support accessible to college students and young adults, regardless of income — built as part of the **1M1B AI for Sustainability Virtual Internship**, in collaboration with **IBM SkillsBuild** and **AICTE**.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Macro Dashboard** | An Apple Health–style dashboard with animated progress rings for calories, protein, carbs, and a real-time sustainability score. |
| 🤖 **IBM Granite RAG Assistant** | A conversational AI chat, grounded via LangChain.js retrieval over a localized nutrition & fitness knowledge base, with evaluator-friendly quick-prompts. |
| 📷 **Smart Label Scanner** | Point your camera at any food label — OCR extracts ingredients and nutrition facts, then estimates the item's carbon impact. |
| 💳 **Free / Pro Wellness Plans** | Tiered plans so core budget-nutrition guidance stays free, with deeper personalization available on Pro. |

---

## 🛡️ Responsible AI

NutriWell is built around four Responsible AI pillars, enforced directly in the product experience:

- ⚖️ **Fairness** — The retrieval knowledge base is weighted toward affordable, locally available foods first, so recommendations never default to premium products only higher-income users can access.
- 🔍 **Transparency** — Every AI response carries an explicit in-app disclaimer that NutriWell provides **wellness decision-support, not medical advice**.
- 🚫 **Ethics** — The assistant is explicitly guarded against providing medical diagnoses, and will redirect users to a qualified professional for any medical concern.
- 🔒 **Privacy** — Personal nutrition and health data is persisted locally via the browser's `localStorage`, not on a remote database — your data stays on your device.

---

## 🧰 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Orchestration:** [LangChain.js](https://js.langchain.com/) (RAG pipeline)
- **LLM Provider:** [IBM Granite](https://www.ibm.com/granite) via [watsonx.ai](https://www.ibm.com/watsonx)

---

## 🚀 Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/JenilMota/NutriWell.git
cd NutriWell
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# IBM watsonx.ai credentials
WATSONX_API_KEY=your_ibm_cloud_api_key
WATSONX_PROJECT_ID=your_watsonx_project_id
WATSONX_URL=https://us-south.ml.cloud.ibm.com
```

> 💡 **No API key? No problem.** If watsonx credentials are missing, NutriWell automatically falls back to a local, rule-based responder — so the app remains fully functional for demos, evaluation, and offline development.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🙏 Acknowledgments

NutriWell was built as the final project for the **1M1B AI for Sustainability Virtual Internship**. Sincere thanks to:

- 🌍 **[1M1B Foundation](https://1m1b.org/)** — for the internship program and mentorship
- 🎓 **[AICTE](https://www.aicte-india.org/)** — for program support and certification
- 💠 **[IBM SkillsBuild](https://skillsbuild.org/)** — for the technical curriculum and access to watsonx.ai / IBM Granite models

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<div align="center">

Built with 💚 by **[Jenil Mota](https://github.com/JenilMota)** · Diploma in Computer Engineering, Veerayatan Polytechnic

</div>
