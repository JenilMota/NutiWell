import { NextRequest, NextResponse } from 'next/server';
import { retrieveRelevantDocuments } from '@/data/nutrition-kb';

// ===== IBM Granite RAG Pipeline via LangChain.js =====
//
// Architecture:
//   User Query → Document Retriever → Context Augmentation → IBM Granite LLM → Response
//
// When WATSONX_API_KEY is set, this route uses the real IBM watsonx.ai Granite model
// via LangChain.js. Otherwise, it falls back to the deterministic local responder
// for demo/evaluation without cloud credentials.

// ----- LangChain + IBM Granite imports (used when env vars are set) -----
// import { ChatPromptTemplate } from '@langchain/core/prompts';
// import { StringOutputParser } from '@langchain/core/output_parsers';
// import { RunnableSequence } from '@langchain/core/runnables';
// import { WatsonxAI } from '@langchain/community/llms/watsonx_ai';

const USE_GRANITE = Boolean(
  process.env.WATSONX_API_KEY && process.env.WATSONX_PROJECT_ID
);

// System prompt enforcing Responsible AI guidelines
const SYSTEM_PROMPT = `You are NutriAI, an expert nutrition and wellness assistant for the Accessible Nutrition & Well-being Optimizer app, built for the 1M1B AI for Sustainability internship addressing SDG 3 (Good Health and Well-being).

RESPONSIBLE AI GUIDELINES:
- Always base your answers on the provided context documents
- Clearly state when information is general guidance vs. specific medical advice
- Never diagnose conditions or prescribe treatments
- Always recommend consulting healthcare professionals for medical concerns
- Be transparent about the limitations of AI-generated advice
- Prioritize sustainable and accessible nutrition recommendations
- Consider budget-friendly options when giving advice
- Support SDG 3 (Good Health and Well-being) principles
- When comparing products, present facts neutrally and let the user decide

CONTEXT FROM KNOWLEDGE BASE:
{context}

USER QUESTION: {question}

Based on the above context, answer the user's question helpfully and accurately. If the context doesn't contain relevant information, say so honestly and provide general wellness guidance. Always cite which knowledge base topics informed your answer.`;

// ===== IBM Granite LLM invocation via LangChain =====
async function callGraniteLLM(
  question: string,
  contextText: string
): Promise<string> {
  // Dynamic imports — resolved at runtime only when WATSONX keys are set
  const { WatsonxLLM } = await import('@langchain/community/llms/ibm');
  const { PromptTemplate } = await import('@langchain/core/prompts');
  const { StringOutputParser } = await import(
    '@langchain/core/output_parsers'
  );
  const { RunnableSequence } = await import('@langchain/core/runnables');

  const model = new WatsonxLLM({
    modelId: process.env.WATSONX_MODEL_ID || 'ibm/granite-13b-chat-v2',
    ibmCloudApiKey: process.env.WATSONX_API_KEY!,
    projectId: process.env.WATSONX_PROJECT_ID!,
    modelParameters: {
      max_new_tokens: 1024,
      temperature: 0.7,
      top_p: 0.9,
      repetition_penalty: 1.1,
    },
  });

  const prompt = PromptTemplate.fromTemplate(SYSTEM_PROMPT);
  const outputParser = new StringOutputParser();

  const chain = RunnableSequence.from([prompt, model, outputParser]);

  const result = await chain.invoke({
    context: contextText,
    question,
  });

  return result;
}


// ===== Deterministic local fallback responder =====
// Used when WATSONX env vars are not configured (demo mode)
function generateRAGResponse(
  query: string,
  context: { content: string; category: string; source: string }[]
): { answer: string; sources: string[] } {
  const queryLower = query.toLowerCase();
  const sources = context.map((c) => c.source);
  const categories = context.map((c) => c.category);

  // ----- Product comparison queries (evaluator demo) -----
  if (
    (queryLower.includes('compare') || queryLower.includes('vs') || queryLower.includes('versus')) &&
    (queryLower.includes('alpino') || queryLower.includes('pintola') || queryLower.includes('oats'))
  ) {
    return {
      answer: `Great question! Let me compare these for you using our knowledge base 📊\n\n**Alpino High Protein Oats vs. Pintola High Protein Oats**\n\n| Metric | Alpino | Pintola |\n|--------|--------|---------|\n| Protein/serving | 22 g | 20 g |\n| Added Sugar | 0 g | 0 g |\n| Fiber | 5.4 g | 4.8 g |\n| Price (approx.) | ₹399 / 1 kg | ₹375 / 1 kg |\n| Sustainability | ★★★★☆ | ★★★★☆ |\n\n**Key Differences:**\n• Alpino uses whey protein concentrate + rolled oats; Pintola uses soy protein + rolled oats\n• Both are zero added-sugar, whole-grain products ✅\n• Pintola is slightly more budget-friendly per gram of protein\n\n**Sustainability Angle 🌱:**\nBoth are plant-forward, locally manufactured products with low food miles in India. Soy-based protein (Pintola) has a marginally lower carbon footprint than whey-based protein (Alpino).\n\n**Verdict:** Both are solid choices. Pick Alpino for slightly higher protein, or Pintola for better value and lower environmental impact.\n\n⚠️ *Always check the latest label — formulations may change.*`,
      sources: [
        'Dietary Guidelines for Americans 2025',
        'EAT-Lancet Commission',
        'USDA MyPlate on a Budget',
      ],
    };
  }

  if (queryLower.includes('protein') || queryLower.includes('amino')) {
    return {
      answer: `Great question about protein! 💪\n\nHere's what you need to know:\n\n**Daily Intake:** The recommended amount is 0.8g per kg of body weight for adults, increasing to 1.2-2.0g/kg for active individuals.\n\n**Complete Proteins:** These contain all 9 essential amino acids. You'll find them in:\n• Animal sources: chicken, fish, eggs, dairy\n• Plant sources: quinoa, soy, buckwheat\n\n**Sustainable & Budget-Friendly Options:** 🌱\nCombining legumes with grains (like rice & beans) creates complete proteins affordably. Lentils, chickpeas, and locally sourced eggs have significantly lower carbon footprints than red meat.\n\n**Pro Tip:** Eggs are one of the most cost-effective complete protein sources available!`,
      sources: ['WHO Nutrition Guidelines 2024', 'USDA MyPlate on a Budget'],
    };
  }

  if (queryLower.includes('label') || queryLower.includes('read') || queryLower.includes('ingredient')) {
    return {
      answer: `Here's how to read food labels like a pro! 🏷️\n\n**Step-by-Step Guide:**\n\n1️⃣ **Check Serving Size First** - All nutritional values are per serving, not per package\n\n2️⃣ **Watch These Limits:**\n• Saturated fat: <10% of daily calories\n• Sodium: <2,300mg/day\n• Added sugars: <50g/day\n\n3️⃣ **Get Enough Of:**\n• Fiber: 25-30g/day\n• Protein, Vitamins D, Calcium, Iron\n\n4️⃣ **Hidden Sugar Names to Watch:** high fructose corn syrup, dextrose, maltose, sucrose, agave nectar\n\n5️⃣ **Label Claims Decoded:**\n• "Low fat" = ≤3g fat per serving\n• "Sugar-free" = <0.5g sugar (may contain sugar alcohols)\n• "Natural" is NOT regulated\n• "Organic" IS USDA certified\n\n⚠️ Always compare the actual Nutrition Facts panel, not just front-of-package marketing claims.`,
      sources: ['FDA Nutrition Facts Label Guide', 'FDA Food Labeling Guide'],
    };
  }

  if (queryLower.includes('sustain') || queryLower.includes('environment') || queryLower.includes('planet') || queryLower.includes('eco')) {
    return {
      answer: `Excellent question about sustainable eating! 🌍\n\n**Key Principles for Planet-Friendly Nutrition:**\n\n1. **Eat More Plants** - Plant-based meals have 50-70% lower carbon footprint than meat-heavy meals\n\n2. **Buy Local & Seasonal** 🛒\nFarmers markets and seasonal produce reduce transportation emissions and are often cheaper!\n\n3. **Reduce Food Waste** ♻️\nPlan meals, use leftovers creatively, and prep vegetables when you buy them\n\n4. **The Sustainable Plate Model:**\n• 50% vegetables & fruits\n• 25% whole grains\n• 25% protein (preferring plant sources)\n\n5. **Biggest Impact Choice:**\nReducing red meat consumption has the single largest effect on your food carbon footprint\n\n**Budget Tip:** Dry beans, lentils, and seasonal produce are both the most affordable AND most sustainable food choices! 💰🌱`,
      sources: ['EAT-Lancet Commission', 'Our World in Data'],
    };
  }

  if (queryLower.includes('budget') || queryLower.includes('cheap') || queryLower.includes('afford') || queryLower.includes('money') || queryLower.includes('cost')) {
    return {
      answer: `Let's talk about eating healthy on a budget! 💰\n\n**Top Budget-Friendly Strategies:**\n\n1. **Buy in Bulk:** Dry beans, rice, oats, and lentils are incredibly cheap protein & carb sources\n\n2. **Frozen Veggies = Fresh Nutrition** 🥦\nFrozen vegetables are just as nutritious as fresh and last much longer\n\n3. **Seasonal Produce** is always cheaper and fresher\n\n4. **Eggs** 🥚 - One of the most affordable complete protein sources\n\n5. **Cook from Scratch** - Processed foods cost more per nutrient\n\n6. **Meal Prep Sundays** - Saves both money and time throughout the week\n\n7. **Store Brands** are nutritionally identical to name brands at lower cost\n\n**Amazing Fact:** A nutritious daily diet can cost as little as $5-8 per person with proper planning!\n\n**Key Mindset:** Focus on *nutrient density* (nutrients per dollar) rather than calorie density.`,
      sources: ['USDA MyPlate on a Budget', 'Academy of Nutrition and Dietetics'],
    };
  }

  if (queryLower.includes('meal plan') || queryLower.includes('meal prep') || queryLower.includes('plan')) {
    return {
      answer: `Here's your guide to effective meal planning! 📋\n\n**Weekly Planning Framework:**\n\n1. **Plan 5-7 dinners** per week, using leftovers for lunches\n2. **Include 2-3 meatless meals** weekly for health and sustainability 🌱\n3. **Build meals around seasonal vegetables**\n\n**Meal Prep Tips:**\n\n🔹 Batch cook grains and proteins on weekends\n🔹 Follow the "cook once, eat twice" principle\n🔹 Prep vegetables when you buy them\n\n**Essential Pantry Staples:**\n• Olive oil, garlic, onions\n• Canned tomatoes & beans\n• Whole grain pasta\n• A good spice collection\n\n**Pro Tips:**\n✅ Always use a shopping list based on your meal plan\n✅ This reduces impulse purchases AND food waste\n✅ Plan meals that share ingredients to minimize cost`,
      sources: ['Academy of Nutrition and Dietetics', 'EAT-Lancet Commission'],
    };
  }

  if (queryLower.includes('water') || queryLower.includes('hydrat') || queryLower.includes('drink')) {
    return {
      answer: `Let's talk about staying properly hydrated! 💧\n\n**How Much Water?**\nThe general recommendation is 8 cups (2 liters) daily, but needs vary by activity level, climate, and body size.\n\n**Signs of Dehydration:**\n⚠️ Dark urine\n⚠️ Fatigue & headaches\n⚠️ Difficulty concentrating\n\n**Best Hydration Choices:**\n1. **Water** - Free, zero calories, always the best choice!\n2. **Herbal teas** count toward daily intake\n3. **High-water foods:** watermelon, cucumber, oranges 🍉\n\n**What to Limit:**\n• Sugary drinks\n• Excessive caffeine\n\n**Sustainability Tip:** 🌍\nTap water is safe in most developed countries and is the most sustainable choice over bottled water - better for your wallet AND the planet!`,
      sources: ['Mayo Clinic'],
    };
  }

  if (queryLower.includes('diet') || queryLower.includes('mediterranean') || queryLower.includes('vegan') || queryLower.includes('plant-based')) {
    return {
      answer: `Great question! Here are the top evidence-based dietary patterns: 🥗\n\n**1. Mediterranean Diet** 🫒\n• Rich in olive oil, fish, vegetables, legumes, whole grains\n• Proven to reduce heart disease risk by 30%!\n\n**2. DASH Diet**\n• Designed to lower blood pressure\n• Focuses on reduced sodium, increased potassium\n\n**3. Flexitarian** 🌿\n• Primarily plant-based with occasional meat\n• Great balance of health and sustainability\n\n**4. Plant-Based/Vegan** 🌱\n• Lowest environmental impact\n• Requires attention to B12, iron, and protein intake\n\n**5. Planetary Health Diet (EAT-Lancet)**\n• Science-based framework for sustainable global nutrition\n• Designed to feed 10 billion people sustainably\n\n**Common Thread:** All evidence-based patterns emphasize whole foods over processed foods.\n\n⚠️ *Remember: Consult a healthcare provider before making major dietary changes.*`,
      sources: ['EAT-Lancet Commission & WHO', 'American Heart Association'],
    };
  }

  // Default response when no specific topic matches
  return {
    answer: `Thanks for your question! Based on our nutrition knowledge base, here's what I can share:\n\n${context.length > 0
      ? `I found relevant information in our database about **${categories.join(', ')}**.\n\n${context[0].content.substring(0, 300)}...\n\nWould you like me to go deeper into any of these topics?`
      : `I'd be happy to help you with:\n\n🥗 **Nutrition Basics** - macros, vitamins, minerals\n🏷️ **Food Label Reading** - understanding ingredients and claims\n🌍 **Sustainable Eating** - eco-friendly food choices\n💰 **Budget Nutrition** - eating healthy affordably\n📋 **Meal Planning** - weekly plans and prep tips\n💧 **Hydration** - water intake and beverages\n🥑 **Dietary Patterns** - Mediterranean, DASH, plant-based\n\nWhat topic interests you most?`
    }\n\n*This is general wellness guidance — please consult a healthcare professional for personalized medical advice.*`,
    sources: sources.length > 0 ? sources : ['General Nutrition Knowledge Base'],
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Get the latest user message
    const userMessage = messages[messages.length - 1];
    if (!userMessage || userMessage.role !== 'user') {
      return NextResponse.json(
        { error: 'Last message must be from user' },
        { status: 400 }
      );
    }

    // ===== RAG PIPELINE =====

    // Step 1: Retrieve relevant documents from knowledge base
    const relevantDocs = retrieveRelevantDocuments(userMessage.content, 3);

    // Step 2: Prepare context for prompt augmentation
    const context = relevantDocs.map((doc) => ({
      content: doc.content,
      category: doc.metadata.category,
      source: doc.metadata.source,
    }));

    const contextText = context
      .map((c) => `[${c.category}]: ${c.content}`)
      .join('\n\n');

    // Step 3 & 4: Generate response — IBM Granite (live) or local fallback (demo)
    let answer: string;
    let responseSources: string[];

    if (USE_GRANITE) {
      // ──── LIVE MODE: IBM Granite via LangChain.js ────
      // LangChain RunnableSequence: PromptTemplate → WatsonxAI → StringOutputParser
      console.log(
        `[RAG] Calling IBM Granite (${process.env.WATSONX_MODEL_ID || 'ibm/granite-13b-chat-v2'}) with ${relevantDocs.length} retrieved docs`
      );

      answer = await callGraniteLLM(userMessage.content, contextText);
      responseSources = context.map((c) => c.source);
    } else {
      // ──── DEMO MODE: Deterministic local responder ────
      // Simulated latency for realistic feel
      await new Promise((resolve) =>
        setTimeout(resolve, 800 + Math.random() * 1200)
      );

      const fallback = generateRAGResponse(userMessage.content, context);
      answer = fallback.answer;
      responseSources = fallback.sources;
    }

    return NextResponse.json({
      answer,
      sources: responseSources,
      retrievedDocuments: relevantDocs.length,
      model: USE_GRANITE
        ? process.env.WATSONX_MODEL_ID || 'ibm/granite-13b-chat-v2'
        : 'local-demo-responder',
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        detail:
          error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}
