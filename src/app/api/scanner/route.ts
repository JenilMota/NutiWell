import { NextRequest, NextResponse } from 'next/server';

// ===== Smart Scanner API Route =====
// Simulates AI-powered food label scanning and analysis
// In production, this would use OCR (Tesseract/Google Vision) + LLM analysis

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

// Simulated scan results for demo
const sampleResults: ScanResult[] = [
  {
    productName: 'Organic Whole Grain Granola',
    servingSize: '1/2 cup (55g)',
    macros: {
      calories: 230,
      protein: 6,
      carbs: 38,
      fat: 8,
      fiber: 4,
      sugar: 12,
      sodium: 95,
    },
    ingredients: [
      { name: 'Whole Rolled Oats', quality: 'good', note: 'Excellent source of fiber & complex carbs' },
      { name: 'Honey', quality: 'moderate', note: 'Natural sweetener, but still added sugar' },
      { name: 'Almonds', quality: 'good', note: 'Healthy fats, protein, vitamin E' },
      { name: 'Coconut Oil', quality: 'moderate', note: 'High in saturated fat, use in moderation' },
      { name: 'Flax Seeds', quality: 'good', note: 'Rich in omega-3 fatty acids' },
      { name: 'Brown Rice Syrup', quality: 'moderate', note: 'Concentrated sugar source' },
    ],
    sustainabilityScore: 4,
    verdict: 'A solid whole grain choice with good fiber content. Watch portion sizes due to calorie density. The organic certification ensures sustainable farming practices.',
    tips: [
      'Pair with Greek yogurt for a complete protein breakfast',
      'Measure portions - granola is calorie-dense',
      'Look for versions with less added sugar (<8g)',
    ],
  },
  {
    productName: 'Classic Protein Bar',
    servingSize: '1 bar (60g)',
    macros: {
      calories: 210,
      protein: 20,
      carbs: 24,
      fat: 7,
      fiber: 3,
      sugar: 6,
      sodium: 200,
    },
    ingredients: [
      { name: 'Whey Protein Isolate', quality: 'good', note: 'High quality complete protein' },
      { name: 'Chicory Root Fiber', quality: 'good', note: 'Prebiotic fiber for gut health' },
      { name: 'Dark Chocolate Chips', quality: 'good', note: 'Contains antioxidants' },
      { name: 'Palm Oil', quality: 'avoid', note: 'High in saturated fat, major deforestation concern' },
      { name: 'Soy Lecithin', quality: 'moderate', note: 'Common emulsifier, generally safe' },
      { name: 'Sucralose', quality: 'moderate', note: 'Artificial sweetener, limit intake' },
    ],
    sustainabilityScore: 2,
    verdict: 'Good protein content but contains palm oil which raises sustainability concerns. The artificial sweetener and processed nature lower the overall health score.',
    tips: [
      'Consider making homemade protein balls as a sustainable alternative',
      'Check for palm oil-free alternatives',
      'Whole food protein sources like eggs or Greek yogurt are more sustainable',
    ],
  },
  {
    productName: 'Mixed Vegetable Soup',
    servingSize: '1 cup (245g)',
    macros: {
      calories: 90,
      protein: 4,
      carbs: 16,
      fat: 1,
      fiber: 5,
      sugar: 6,
      sodium: 480,
    },
    ingredients: [
      { name: 'Tomatoes', quality: 'good', note: 'Rich in lycopene and vitamin C' },
      { name: 'Carrots', quality: 'good', note: 'Excellent source of vitamin A' },
      { name: 'Green Beans', quality: 'good', note: 'Good fiber and folate source' },
      { name: 'Potatoes', quality: 'good', note: 'Good source of potassium' },
      { name: 'Sea Salt', quality: 'moderate', note: 'Sodium content is moderately high' },
      { name: 'Vegetable Broth', quality: 'good', note: 'Low calorie, flavorful base' },
    ],
    sustainabilityScore: 5,
    verdict: 'Excellent plant-based choice with high fiber and low calories! Watch sodium content. All-vegetable ingredients make this one of the most sustainable packaged food options.',
    tips: [
      'Look for low-sodium versions (<300mg per serving)',
      'Add your own beans or lentils for extra protein',
      'Making soup at home is even more sustainable and budget-friendly',
    ],
  },
];

export async function POST(request: NextRequest) {
  try {
    // In production, this would:
    // 1. Receive the uploaded image
    // 2. Run OCR to extract text from the food label
    // 3. Parse the nutrition facts and ingredients
    // 4. Use the RAG pipeline to analyze ingredients
    // 5. Calculate sustainability score

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Return a random sample result for demo
    const result = sampleResults[Math.floor(Math.random() * sampleResults.length)];

    return NextResponse.json({
      success: true,
      result,
      disclaimer:
        'This analysis is AI-generated for educational purposes. Always verify nutritional information from the actual product label.',
    });
  } catch (error) {
    console.error('Scanner API Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 }
    );
  }
}
