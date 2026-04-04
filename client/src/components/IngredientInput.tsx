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
    if (ingredients.length > 0) onGenerate(ingredients);
  };

  const clearAll = () => {
    setIngredients([]);
    setInputValue("");
  };

  const suggestions = ["chicken", "garlic", "onion", "tomato", "rice", "ginger", "potato", "egg", "butter", "lemon"];
  const availableSuggestions = suggestions.filter((s) => !ingredients.includes(s));

  return (
    <div className="bg-white dark:bg-[#181917] border border-gray-200 dark:border-white/[0.07] rounded-2xl p-6 flex flex-col gap-5 transition-colors">

      {/* Heading */}
      <div>
        <h2 className="font-['Instrument_Serif'] text-[22px] text-gray-900 dark:text-[#f0efe8] font-normal leading-snug">
          What's in your <span className="text-[#4a5c2f] dark:text-[#8aab5c] italic">kitchen?</span>
        </h2>
        <p className="text-[13px] text-gray-500 dark:text-[#555] mt-1">
          Add ingredients and Gemini AI will craft a recipe for you.
        </p>
      </div>

      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type an ingredient..."
          className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-[#f0efe8] text-[13.5px] placeholder:text-gray-400 dark:placeholder:text-[#3a3a35] px-4 py-2.5 rounded-[10px] outline-none focus:border-[#4a5c2f] dark:focus:border-[#8aab5c]/50 transition-colors"
        />
        <button
          onClick={addIngredient}
          disabled={!inputValue.trim()}
          className="bg-[#4a5c2f] dark:bg-[#8aab5c] text-white dark:text-[#111210] text-[13px] font-medium px-4 py-2.5 rounded-[10px] hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Add
        </button>
      </div>

      {/* Quick add */}
      {availableSuggestions.length > 0 && (
        <div>
          <p className="text-[11.5px] text-gray-400 dark:text-[#444] mb-2">Quick add</p>
          <div className="flex flex-wrap gap-1.5">
            {availableSuggestions.slice(0, 7).map((s) => (
              <button
                key={s}
                onClick={() => setIngredients([...ingredients, s])}
                className="border border-gray-200 dark:border-white/10 text-gray-500 dark:text-[#555] text-[12px] px-3 py-1 rounded-full hover:border-[#4a5c2f] dark:hover:border-[#8aab5c]/40 hover:text-[#4a5c2f] dark:hover:text-[#8aab5c] transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ingredient box */}
      <div>
        <p className="text-[10.5px] uppercase tracking-widest text-gray-400 dark:text-[#3a3a35] font-medium mb-2">
          Your ingredients
        </p>
        <div className="bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.07] rounded-[10px] p-3.5 min-h-[110px] flex flex-wrap gap-2 content-start transition-colors">
          {ingredients.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center py-5">
              <p className="text-gray-400 dark:text-[#3a3a35] text-[13px] text-center">Nothing added yet</p>
            </div>
          ) : (
            ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className="inline-flex items-center gap-1.5 bg-[#4a5c2f]/10 dark:bg-[#8aab5c]/[0.12] border border-[#4a5c2f]/20 dark:border-[#8aab5c]/[0.22] text-[#4a5c2f] dark:text-[#a8c87a] text-[12.5px] px-3 py-1 rounded-full"
              >
                {ingredient}
                <button
                  onClick={() => removeIngredient(ingredient)}
                  className="text-[#4a5c2f]/60 dark:text-[#6a8a42] hover:text-[#4a5c2f] dark:hover:text-[#f0efe8] text-[15px] leading-none transition-colors cursor-pointer"
                >
                  ×
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button
          onClick={clearAll}
          className="flex-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-[#555] text-[13px] py-2.5 rounded-[10px] hover:text-gray-700 dark:hover:text-[#888] transition-all"
        >
          Clear all
        </button>
        <button
          disabled={disabled || ingredients.length === 0}
          onClick={handleGenerate}
          className="flex-[2] bg-[#4a5c2f] dark:bg-[#8aab5c] text-white dark:text-[#111210] text-[13px] font-medium py-2.5 px-4 rounded-[10px] hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {disabled ? "Generating..." : `Generate recipe (${ingredients.length})`}
        </button>
      </div>

    </div>
  );
}