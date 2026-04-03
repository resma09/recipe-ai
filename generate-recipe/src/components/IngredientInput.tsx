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
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col transition-colors">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
        What's in your kitchen?
      </h2>

      {/* INPUT */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type an ingredient and press Enter..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
        />
        <button
          onClick={addIngredient}
          disabled={!inputValue.trim()}
          className="px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </div>

      {/* QUICK SUGGESTIONS */}
      {availableSuggestions.length > 0 && ingredients.length < 3 && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick add:</p>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 6).map((s) => (
              <button
                key={s}
                onClick={() => setIngredients([...ingredients, s])}
                className="px-3 py-1 text-xs rounded-full border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                + {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* INGREDIENT TAGS */}
      <div className="flex-1 min-h-[200px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-700 flex flex-wrap gap-2 content-start">
        {ingredients.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm text-center">
              Add ingredients above to get recipe suggestions
            </p>
          </div>
        ) : (
          ingredients.map((ingredient) => (
            <span
              key={ingredient}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 rounded-full text-sm group"
            >
              {ingredient}
              <button
                onClick={() => removeIngredient(ingredient)}
                className="text-indigo-400 hover:text-indigo-700 dark:hover:text-white text-xs ml-0.5 cursor-pointer"
              >
                ✕
              </button>
            </span>
          ))
        )}
      </div>

      {/* INGREDIENT COUNT */}
      {ingredients.length > 0 && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          {ingredients.length} ingredient{ingredients.length > 1 ? "s" : ""} added
        </p>
      )}

      {/* BUTTONS */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={clearAll}
          className="w-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
        >
          Clear All
        </button>
        <button
          disabled={disabled || ingredients.length === 0}
          onClick={handleGenerate}
          className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {disabled ? "Generating..." : `Get Recipe (${ingredients.length} ingredients)`}
        </button>
      </div>
    </div>
  );
}
