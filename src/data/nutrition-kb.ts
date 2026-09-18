// Curated sustainable nutrition knowledge base for RAG pipeline
// This data serves as the retrieval context for the AI assistant

export interface KnowledgeDocument {
  id: string;
  content: string;
  metadata: {
    category: string;
    source: string;
    tags: string[];
  };
}

export const nutritionKnowledgeBase: KnowledgeDocument[] = [
  // === Macronutrients ===
  {
    id: 'macro-proteins',
    content: `Proteins are essential macronutrients that build and repair tissues. The recommended daily intake is 0.8g per kg of body weight for adults, or 1.2-2.0g/kg for active individuals. Complete proteins containing all 9 essential amino acids are found in animal sources (chicken, fish, eggs, dairy) and some plant sources (quinoa, soy, buckwheat). Combining legumes with grains creates complete proteins affordably. Sustainable protein choices include lentils, chickpeas, beans, and locally sourced eggs which have lower carbon footprints than red meat.`,
    metadata: {
      category: 'Macronutrients',
      source: 'WHO Nutrition Guidelines 2024',
      tags: ['protein', 'amino acids', 'sustainable protein'],
    },
  },
  {
    id: 'macro-carbs',
    content: `Carbohydrates are the body's primary energy source. Complex carbohydrates (whole grains, vegetables, legumes) provide sustained energy and fiber, while simple carbohydrates (sugar, white bread) cause rapid blood sugar spikes. The recommended intake is 45-65% of total daily calories. Whole grains like brown rice, oats, and millet are both nutritious and sustainable. Locally grown seasonal vegetables are the most eco-friendly carb sources. Reading food labels for "added sugars" vs "total sugars" helps make informed choices.`,
    metadata: {
      category: 'Macronutrients',
      source: 'Dietary Guidelines for Americans 2025',
      tags: ['carbohydrates', 'whole grains', 'fiber', 'sugar'],
    },
  },
  {
    id: 'macro-fats',
    content: `Dietary fats are essential for hormone production, nutrient absorption, and cell function. Healthy fats include monounsaturated (olive oil, avocados, nuts) and polyunsaturated (fatty fish, flaxseeds, walnuts). Limit saturated fats to <10% of daily calories and avoid trans fats. Omega-3 fatty acids (EPA, DHA) from fish or algae-based supplements support heart and brain health. Budget-friendly healthy fat sources include peanut butter, sunflower seeds, and locally pressed oils.`,
    metadata: {
      category: 'Macronutrients',
      source: 'American Heart Association',
      tags: ['fats', 'omega-3', 'healthy fats', 'heart health'],
    },
  },

  // === Micronutrients ===
  {
    id: 'micro-vitamins',
    content: `Key vitamins for daily wellness: Vitamin D (sunlight, fortified foods) supports bone health and immunity - many people are deficient. Vitamin C (citrus, bell peppers, tomatoes) aids iron absorption and immune function. B12 (animal products, fortified foods) is crucial for vegetarians/vegans. Folate (leafy greens, legumes) is essential for cell division. Iron from plant sources (spinach, lentils) is better absorbed with Vitamin C. Affordable vitamin-rich foods include seasonal fruits, leafy greens, and eggs.`,
    metadata: {
      category: 'Micronutrients',
      source: 'National Institutes of Health',
      tags: ['vitamins', 'minerals', 'deficiency', 'affordable nutrition'],
    },
  },

  // === Sustainable Food Choices ===
  {
    id: 'sustainable-eating',
    content: `Sustainable eating means choosing foods that are healthy for both people and the planet. Key principles: 1) Eat more plants - plant-based meals have 50-70% lower carbon footprint than meat-heavy meals. 2) Choose local and seasonal produce to reduce transportation emissions. 3) Reduce food waste - plan meals, use leftovers creatively. 4) Choose sustainably sourced seafood (look for MSC certification). 5) Opt for whole foods over ultra-processed options. A sustainable plate model: 50% vegetables/fruits, 25% whole grains, 25% protein (preferring plant sources). Budget tip: buying dry beans, lentils, and seasonal produce is both affordable and sustainable.`,
    metadata: {
      category: 'Sustainability',
      source: 'EAT-Lancet Commission',
      tags: ['sustainable diet', 'planet health', 'carbon footprint', 'SDG'],
    },
  },
  {
    id: 'food-miles',
    content: `Food miles measure the distance food travels from farm to plate. Locally sourced food typically has lower carbon emissions. Farmers markets, community-supported agriculture (CSA), and seasonal eating significantly reduce food miles. However, how food is produced matters more than distance - for example, locally grown greenhouse tomatoes may have higher emissions than field-grown imported ones. The most impactful choice is reducing red meat consumption, which accounts for the highest per-calorie emissions regardless of distance.`,
    metadata: {
      category: 'Sustainability',
      source: 'Our World in Data - Environmental Impacts of Food',
      tags: ['food miles', 'local food', 'carbon emissions'],
    },
  },

  // === Food Labels ===
  {
    id: 'label-reading',
    content: `How to read food labels effectively: 1) Check serving size first - nutritional values are per serving, not per package. 2) Look at calories - 2000 cal/day is the general reference. 3) Limit: saturated fat (<10% daily), sodium (<2300mg/day), added sugars (<50g/day). 4) Get enough: fiber (25-30g/day), protein, vitamins D, calcium, iron, potassium. 5) Ingredients are listed by weight - first ingredients make up most of the product. 6) Beware of hidden sugars listed as: high fructose corn syrup, dextrose, maltose, sucrose, agave nectar. 7) "Natural" is not regulated; "Organic" is certified by USDA.`,
    metadata: {
      category: 'Food Labels',
      source: 'FDA Nutrition Facts Label Guide',
      tags: ['food labels', 'nutrition facts', 'ingredients', 'serving size'],
    },
  },
  {
    id: 'label-claims',
    content: `Common food label claims decoded: "Low fat" = ≤3g fat per serving. "Reduced sodium" = 25% less sodium than original. "Sugar-free" = <0.5g sugar per serving (may contain sugar alcohols). "Whole grain" = look for "100% whole grain" - just "made with whole grains" can be mostly refined. "Non-GMO" = not genetically modified but doesn't mean organic or healthier. "Gluten-free" = safe for celiac disease. "Heart healthy" = meets FDA criteria for saturated fat, cholesterol, and sodium. Always compare the actual nutrition facts panel, not just front-of-package claims.`,
    metadata: {
      category: 'Food Labels',
      source: 'FDA Food Labeling Guide',
      tags: ['food claims', 'marketing', 'label claims'],
    },
  },

  // === Budget-Friendly Nutrition ===
  {
    id: 'budget-nutrition',
    content: `Eating healthy on a budget: 1) Buy in bulk - dry beans, rice, oats, and lentils are cheap protein and carb sources. 2) Frozen vegetables are just as nutritious as fresh and last longer. 3) Seasonal produce is cheaper and fresher. 4) Eggs are one of the most affordable complete protein sources. 5) Cook from scratch - processed foods cost more per nutrient. 6) Meal prep on weekends saves money and time. 7) Store brands are nutritionally identical to name brands at lower cost. 8) A nutritious daily diet can cost as little as $5-8 per person with planning. Focus on nutrient density (nutrients per dollar) rather than calorie density.`,
    metadata: {
      category: 'Budget Nutrition',
      source: 'USDA MyPlate on a Budget',
      tags: ['budget', 'affordable', 'meal planning', 'cost-effective'],
    },
  },

  // === Meal Planning ===
  {
    id: 'meal-planning',
    content: `Effective meal planning for sustainable wellness: 1) Plan 5-7 dinners per week, using leftovers for lunches. 2) Build meals around seasonal vegetables. 3) Include 2-3 meatless meals per week for health and sustainability. 4) Batch cook grains and proteins on weekends. 5) Keep a well-stocked pantry with staples: olive oil, garlic, onions, canned tomatoes, beans, whole grain pasta, spices. 6) Follow the "cook once, eat twice" principle. 7) Prep vegetables when you buy them to reduce waste. 8) Use a shopping list based on your meal plan to avoid impulse purchases and reduce food waste.`,
    metadata: {
      category: 'Meal Planning',
      source: 'Academy of Nutrition and Dietetics',
      tags: ['meal planning', 'meal prep', 'weekly plan', 'food waste'],
    },
  },

  // === Hydration ===
  {
    id: 'hydration',
    content: `Proper hydration is essential for health: The general recommendation is 8 cups (2 liters) of water daily, but needs vary by activity level, climate, and body size. Signs of dehydration include dark urine, fatigue, headaches, and difficulty concentrating. Water is the best hydration choice - it's free and has zero calories. Herbal teas count toward daily intake. Limit sugary drinks and excessive caffeine. Fruits and vegetables with high water content (watermelon, cucumber, oranges) contribute to hydration. Tap water is typically safe in developed countries and is the most sustainable choice over bottled water.`,
    metadata: {
      category: 'Hydration',
      source: 'Mayo Clinic',
      tags: ['water', 'hydration', 'beverages'],
    },
  },

  // === Common Dietary Patterns ===
  {
    id: 'dietary-patterns',
    content: `Evidence-based dietary patterns for health and sustainability: 1) Mediterranean Diet - rich in olive oil, fish, vegetables, legumes, and whole grains. Proven to reduce heart disease risk by 30%. 2) DASH Diet - designed to lower blood pressure through reduced sodium and increased potassium. 3) Flexitarian - primarily plant-based with occasional meat. Good balance of health and sustainability. 4) Plant-Based/Vegan - lowest environmental impact but requires attention to B12, iron, and protein. 5) The Planetary Health Diet (EAT-Lancet) - science-based framework for feeding 10 billion people sustainably. All patterns emphasize whole foods over processed foods.`,
    metadata: {
      category: 'Dietary Patterns',
      source: 'EAT-Lancet Commission & WHO',
      tags: ['mediterranean', 'DASH', 'plant-based', 'dietary patterns'],
    },
  },

  // === Indian Product Comparisons (Evaluator Demo) ===
  {
    id: 'compare-oats',
    content: `High-protein oats comparison for Indian market: Alpino High Protein Oats contain 22g protein per serving using whey protein concentrate + rolled oats, with 0g added sugar and 5.4g fiber. Priced around ₹399/kg. Pintola High Protein Oats provide 20g protein per serving using soy protein isolate + rolled oats, with 0g added sugar and 4.8g fiber. Priced around ₹375/kg. Both are whole-grain, zero added-sugar products suitable for fitness-conscious consumers. From a sustainability perspective, soy-based protein (Pintola) has a marginally lower carbon footprint than whey-based protein (Alpino) because dairy production requires more water and land. Both are manufactured in India with low food miles. For budget-conscious buyers, Pintola offers slightly better value per gram of protein. Always check the latest nutrition label as formulations may change.`,
    metadata: {
      category: 'Product Comparison',
      source: 'Indian Nutrition Product Database 2025',
      tags: ['alpino', 'pintola', 'oats', 'protein oats', 'compare', 'india', 'budget'],
    },
  },
  {
    id: 'palm-oil-sustainability',
    content: `Palm oil is the world's most consumed vegetable oil, found in roughly 50% of packaged products. While it is an efficient crop (producing more oil per hectare than alternatives), industrial palm oil farming is a leading driver of tropical deforestation, habitat destruction (orangutans, tigers), and carbon emissions from peatland clearing. Look for RSPO-certified (Roundtable on Sustainable Palm Oil) products if avoiding palm oil isn't possible. In India, many biscuit, instant noodle, and packaged snack brands use palm oil — check the ingredients list. Healthier and more sustainable alternatives include mustard oil, groundnut oil, and cold-pressed coconut oil for Indian cooking. When reading labels, "vegetable oil" in Indian products often means palm oil or palmolein. Choosing products with sunflower, rice bran, or mustard oil supports both personal health (less saturated fat) and sustainability.`,
    metadata: {
      category: 'Sustainability',
      source: 'WWF Palm Oil Report & FSSAI India',
      tags: ['palm oil', 'sustainable', 'deforestation', 'RSPO', 'india', 'vegetable oil', 'labels'],
    },
  },
  {
    id: 'bodyweight-fitness',
    content: `Bodyweight fitness and calisthenics offer an accessible, equipment-free path to physical wellness. A progressive routine should start with basics: wall pushups progress to knee pushups, then full pushups. For back strength, Australian pull-ups (bodyweight rows) progress to assisted pull-ups, then full pull-ups. Pair this with a slight caloric surplus and adequate protein intake (1.6-2.0g per kg of body weight) for healthy weight gain and muscle building. Squats and lunges build lower body strength. Consistency and progressive overload (gradually increasing difficulty or reps) are key.`,
    metadata: {
      category: 'Accessible Fitness',
      source: 'American Council on Exercise & WHO Physical Activity Guidelines',
      tags: ['fitness', 'workout', 'bodyweight', 'pushups', 'pull-ups', 'muscle gain', 'calisthenics'],
    },
  },
];

// Helper to get all documents as plain text for RAG retrieval
export function getKnowledgeBaseTexts(): { text: string; metadata: KnowledgeDocument['metadata'] }[] {
  return nutritionKnowledgeBase.map((doc) => ({
    text: doc.content,
    metadata: doc.metadata,
  }));
}

// Simple keyword-based retrieval for demo (replaces vector similarity search)
export function retrieveRelevantDocuments(query: string, topK: number = 3): KnowledgeDocument[] {
  const queryWords = query.toLowerCase().split(/\s+/);

  const scored = nutritionKnowledgeBase.map((doc) => {
    const docText = `${doc.content} ${doc.metadata.tags.join(' ')} ${doc.metadata.category}`.toLowerCase();
    let score = 0;
    for (const word of queryWords) {
      if (word.length > 2) {
        const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(safeWord, 'gi');
        const matches = docText.match(regex);
        score += matches ? matches.length : 0;
      }
    }
    return { doc, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter((s) => s.score > 0)
    .map((s) => s.doc);
}
