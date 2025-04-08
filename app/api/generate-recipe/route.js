// app/api/generate-recipe/route.js
import { NextResponse } from 'next/server';
import { analyzeImage, generateRecipe } from '../../utils/ai';

export async function POST(request) {
  try {
    const body = await request.json();
    const { ingredients, imageData, preferences } = body;

    let ingredientsList = ingredients;
    
    // If image was provided, analyze it first
    if (imageData) {
      ingredientsList = await analyzeImage(imageData);
    }
    
    // Generate recipe based on ingredients
    const recipe = await generateRecipe(ingredientsList, preferences);
    
    return NextResponse.json({ recipe });
  } catch (error) {
    console.error('Error processing recipe request:', error);
    return NextResponse.json(
      { error: 'Failed to generate recipe' },
      { status: 500 }
    );
  }
}