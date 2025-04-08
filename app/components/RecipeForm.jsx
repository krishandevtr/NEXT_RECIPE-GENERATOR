// app/components/RecipeForm.jsx
import { useState } from 'react';
import ImageUploader from './ImageUploader';

export default function RecipeForm({ setRecipe, setLoading }) {
  const [ingredients, setIngredients] = useState('');
  const [preferences, setPreferences] = useState('');
  const [inputMethod, setInputMethod] = useState('text');
  const [imageData, setImageData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let payload = { preferences };
      
      if (inputMethod === 'text') {
        payload.ingredients = ingredients;
      } else {
        payload.imageData = imageData;
      }
      
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate recipe');
      }
      
      const data = await response.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.error('Error generating recipe:', error);
      alert('Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-3xl mx-auto'>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">What's in your pantry?</h2>
      
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          className={`flex-1 py-2 px-4 rounded-lg ${
            inputMethod === 'text' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setInputMethod('text')}
        >
          Enter Text
        </button>
        <button
          type="button"
          className={`flex-1 py-2 px-4 rounded-lg ${
            inputMethod === 'image' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setInputMethod('image')}
        >
          Upload Photo
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {inputMethod === 'text' ? (
          <div>
            <label htmlFor="ingredients" className="block text-gray-700 mb-2">
              Enter your ingredients (comma separated)
            </label>
            <textarea
              id="ingredients"
              className="w-full p-3 border-none  border-gray-300 rounded-lg "
              placeholder="e.g., chicken breast, rice, bell peppers, onion, olive oil"
              rows="4"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required={inputMethod === 'text'}
            />
          </div>
        ) : (
          <ImageUploader setImageData={setImageData} />
        )}
        
        <div>
          <label htmlFor="preferences" className="block text-gray-700 mb-2">
            Any dietary preferences or restrictions? (optional)
          </label>
          <input
            type="text"
            id="preferences"
            className=" w-full p-3 border border-gray-300 rounded-lg border-none  focus:border-black"
            placeholder="e.g., vegetarian, gluten-free, low-carb"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-amber-700 transition-colors shadow-md"
          disabled={inputMethod === 'text' && !ingredients.trim() || inputMethod === 'image' && !imageData}
        >
          Generate Recipe
        </button>
      </form>
    </div>
  );
}
