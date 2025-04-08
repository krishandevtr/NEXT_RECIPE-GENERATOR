const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function analyzeImage(imageData) {
  try {
    // The image comes as a base64 data URL, extract the base64 encoded part
    const base64Image = imageData.split(',')[1];
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Identify all food ingredients visible in this image. Return ONLY a comma-separated list of ingredients without any additional text or explanation."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to analyze image');
    }
    
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image ingredients');
  }
}

export async function generateRecipe(ingredients, preferences = '') {
  try {
    // First generate the recipe text
    const recipeResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional chef that creates delicious recipes based on available ingredients. Generate creative, detailed recipes that are easy to follow."
          },
          {
            role: "user",
            content: `Create a recipe using some or all of these ingredients: ${ingredients}${
              preferences ? `. Dietary preferences/restrictions: ${preferences}` : ''
            }. Return the recipe in JSON format with the following structure:
            {
              "title": "Recipe Title",
              "description": "Brief description of the dish",
              "prepTime": "Preparation time",
              "cookTime": "Cooking time",
              "servings": "Number of servings",
              "ingredients": ["ingredient 1", "ingredient 2", ...],
              "instructions": ["step 1", "step 2", ...],
              "tips": "Optional cooking tips"
            }`
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1500
      })
    });

    const recipeData = await recipeResponse.json();

    if (!recipeResponse.ok) {
      throw new Error(recipeData.error?.message || 'Failed to generate recipe');
    }

    const recipeContent = JSON.parse(recipeData.choices[0].message.content);

    // Now generate an image of the recipe
    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: `A high-quality, appetizing, professional food photography image of the dish: ${recipeContent.title}. The dish should be well-lit and beautifully presented.`,
        n: 1,
        size: "1024x1024",
        quality: "standard"
      })
    });

    const imageData = await imageResponse.json();

    if (!imageResponse.ok) {
      throw new Error(imageData.error?.message || 'Failed to generate recipe image');
    }

    // Add the image URL to the recipe object
    recipeContent.imageUrl = imageData.data[0].url;
    console.log('Generated recipe**********************************************************************:', recipeContent);
    return recipeContent;
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw new Error('Failed to generate recipe');
  }
}