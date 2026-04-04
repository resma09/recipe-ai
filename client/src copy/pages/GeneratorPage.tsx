/// <reference types="vite/client" />
import IngredientInput from "../components/IngredientInput";
import Spinner from "../components/Spinner";
import { useState } from "react";
import type { Recipe } from "../types";
import RecipeCard from "../components/RecipeCard";
import { useRecipeGallery } from "../hooks/useRecipeGallery"; // we'll need this for like function

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export default function GeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<Recipe | null>(null);
  const { likeRecipe } = useRecipeGallery(); // after useState

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
          <div className="flex-1 overflow-y-auto">
            <RecipeCard
              recipe={lastResult}
              isNew={true}
              onLike={() => likeRecipe(lastResult.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
