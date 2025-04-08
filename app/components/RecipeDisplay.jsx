export default function RecipeDisplay({ recipe, loading }) {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600 text-lg">Cooking up a delicious recipe...</p>
        </div>
      );
    }
  
    if (!recipe) {
      return (
        <div className="flex flex-col items-center justify-center text-center h-[80vh] px-4">
          <div className="bg-orange-100 p-6 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Recipe Yet</h3>
          <p className="text-gray-600 max-w-md">
            Enter your ingredients or upload a photo to generate a personalized recipe.
          </p>
        </div>
      );
    }
  
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Recipe Image */}
        {recipe.imageUrl && (
          <div className="mb-8">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-96 object-cover rounded-xl shadow-md"
            />
          </div>
        )}
  
        {/* Recipe Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{recipe.title}</h1>
          <p className="text-gray-600 italic">{recipe.description}</p>
        </div>
  
        {/* Recipe Meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500 mb-1">Prep Time</p>
            <p className="text-lg font-semibold text-gray-800">{recipe.prepTime}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500 mb-1">Cook Time</p>
            <p className="text-lg font-semibold text-gray-800">{recipe.cookTime}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-gray-500 mb-1">Servings</p>
            <p className="text-lg font-semibold text-gray-800">{recipe.servings}</p>
          </div>
        </div>
  
        {/* Ingredients */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block bg-orange-500 rounded-full h-2 w-2 mt-2 mr-3"></span>
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
  
        {/* Instructions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-4 shrink-0 mt-1">
                  {index + 1}
                </span>
                <p className="text-gray-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
  
        {/* Chef's Tips */}
        {recipe.tips && (
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Chef's Tips</h3>
            <p className="text-gray-700">{recipe.tips}</p>
          </div>
        )}
      </div>
    );
  }