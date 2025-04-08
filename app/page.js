"use client";

import { useState } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeDisplay from './components/RecipeDisplay';

export default function Home() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);


  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-3">
            Pantry <span className="text-orange-500">Magic</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl max-w-2xl mx-auto">
            Transform your available ingredients into delicious recipes using AI
          </p>
        </header>
        
        <div className="flex flex-col space-y-3 md:space-y-0   gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <RecipeForm setRecipe={setRecipe} setLoading={setLoading} />
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <RecipeDisplay recipe={recipe} loading={loading} />
          </div>
        </div>
      </div>
    </main>
  );
}