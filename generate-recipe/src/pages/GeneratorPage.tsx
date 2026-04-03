/// <reference types="vite/client" />
import IngredientInput from "../components/IngredientInput";
import Spinner from "../components/Spinner";
import { useState } from "react";
import type { Recipe } from "../types";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function GeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<Recipe | null>(null);

  const handleGenerate = async (ingredients: string[]) => {
    try {
      setIsGenerating(true);
      setError(null);
      const res = await fetch(`${API}/api/generate-recipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
      });
      if (!res.ok) throw new Error("Failed to generate recipe");
      const json: Recipe = await res.json();
      setLastResult(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
      <IngredientInput onGenerate={handleGenerate} disabled={isGenerating} />

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col transition-colors">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
          Recipe Suggestion
        </h2>

        {/* EMPTY STATE */}
        {!lastResult && !isGenerating && !error && (
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8">
            <p className="text-center text-gray-500 dark:text-gray-400">
              Add your ingredients and click Generate to get a recipe suggestion
            </p>
          </div>
        )}

        {/* LOADING STATE */}
        {isGenerating && <Spinner label="Cooking up a recipe..." />}

        {/* ERROR STATE */}
        {error && (
          <div className="mt-4 text-red-500 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* RECIPE RESULT */}
        {lastResult && !isGenerating && (
          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Recipe Header */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {lastResult.name}
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {lastResult.cuisine && (
                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200">
                    {lastResult.cuisine}
                  </span>
                )}
                {lastResult.cooking_time && (
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200">
                    ⏱ {lastResult.cooking_time}
                  </span>
                )}
                {lastResult.servings && (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200">
                    🍽 Serves {lastResult.servings}
                  </span>
                )}
              </div>
            </div>

            {lastResult.image_url && (
              <img
                src={lastResult.image_url}
                alt={lastResult.name}
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
            )}

            {/* Description */}
            {lastResult.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {lastResult.description}
              </p>
            )}

            {/* Ingredients */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Ingredients
              </h4>
              <ul className="space-y-1">
                {lastResult.ingredients.map((ing, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"
                  >
                    <span className="text-indigo-500 mt-0.5">•</span>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Steps
              </h4>
              <ol className="space-y-2">
                {lastResult.steps.map((step, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-3"
                  >
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
