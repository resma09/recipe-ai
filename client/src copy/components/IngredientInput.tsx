import { useState } from "react";

type IngredientInputProps = {
  onGenerate: (ingredients: string[]) => void;
  disabled: boolean;
};

export default function IngredientInput({ onGenerate, disabled }: IngredientInputProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addIngredient = () => {
    const trimmed = inputValue.trim().toLowerCase();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients([...ingredients, trimmed]);
      setInputValue("");
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  const handleGenerate = () => {
    if (ingredients.length > 0) {
      onGenerate(ingredients);
    }
  };

  const clearAll = () => {
    setIngredients([]);
    setInputValue("");
  };

  // Quick-add suggestions
  const suggestions = ["chicken", "garlic", "onion", "tomato", "rice", "ginger", "potato", "egg", "butter", "lemon"];
  const availableSuggestions = suggestions.filter((s) => !ingredients.includes(s));

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        What's in your <span className="underline decoration-purple-500">kitchen</span>?
      </h2>
      <p className="text-gray-400 mt-1 text-sm">Add ingredients and Gemini AI will craft a recipe for you.</p>

      {/* input + add button */}
      <div className="flex gap-2 mt-4">
        <input className="flex-1 bg-black/30 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400" />
        <button className="px-4 py-2 bg-indigo-600 rounded-xl hover:bg-indigo-500">Add</button>
      </div>

      {/* quick suggestions */}
      {
        availableSuggestions.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-gray-400">✨ Quick add</p>
            <div className="flex flex-wrap gap-2 mt-1">
              {availableSuggestions.slice(0, 6).map(s => (
                <button key={s} onClick={() => setIngredients([...ingredients, s])}
                  className="px-3 py-1 text-xs rounded-full bg-white/10 hover:bg-white/20 text-gray-200">
                  + {s}
                </button>
              ))}
            </div>
          </div>
        )
      }

      {/* ingredient tags */}
      <div className="mt-6 min-h-[120px] border border-dashed border-white/20 rounded-xl p-4">
        {ingredients.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No ingredients added yet. Add some above.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {ingredients.map(ing => (
              <span key={ing} className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-500/20 text-indigo-200 rounded-full text-sm">
                {ing}
                <button onClick={() => removeIngredient(ing)} className="ml-1 text-indigo-300 hover:text-white">✕</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* generate button */}
      <button
        disabled={disabled || ingredients.length === 0}
        onClick={handleGenerate}
        className="w-full mt-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all disabled:opacity-50"
      >
        {disabled ? "Cooking with AI..." : `Generate Recipe (${ingredients.length})`}
      </button>
    </div >
  );
}
