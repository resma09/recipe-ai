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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 h-full">

      <IngredientInput onGenerate={handleGenerate} disabled={isGenerating} />

      <div className="bg-white dark:bg-[#181917] border border-gray-200 dark:border-white/[0.07] rounded-2xl p-6 flex flex-col transition-colors">

        {/* Empty state */}
        {!lastResult && !isGenerating && !error && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-[#4a5c2f]/10 dark:bg-[#8aab5c]/10 border border-[#4a5c2f]/20 dark:border-[#8aab5c]/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#4a5c2f] dark:text-[#8aab5c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l19-9-9 19-2-8-8-2z" />
              </svg>
            </div>
            <div>
              <p className="font-['Instrument_Serif'] text-[18px] text-gray-400 dark:text-[#555] font-normal">Ready to generate</p>
              <p className="text-[12.5px] text-gray-400 dark:text-[#3a3a35] mt-1 max-w-[200px] leading-relaxed">
                Add ingredients on the left and hit Generate.
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {isGenerating && (
          <div className="flex-1 flex items-center justify-center">
            <Spinner label="Gemini is thinking..." />
          </div>
        )}

        {/* Error */}
        {error && !isGenerating && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-[13px] text-red-500 dark:text-red-400 text-center">{error}</p>
          </div>
        )}

        {/* Result */}
        {lastResult && !isGenerating && (
          <div className="flex-1 overflow-y-auto flex flex-col gap-5">

            <div>
              <p className="text-[10.5px] uppercase tracking-widest text-gray-400 dark:text-[#3a3a35] font-medium mb-2">
                Generated recipe
              </p>
              <h3 className="font-['Instrument_Serif'] text-[26px] text-gray-900 dark:text-[#f0efe8] leading-tight capitalize">
                {lastResult.name}
              </h3>
              <div className="flex flex-wrap items-center gap-3 mt-2.5">
                {lastResult.cooking_time && (
                  <span className="flex items-center gap-1.5 text-[12px] text-gray-500 dark:text-[#555]">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                    </svg>
                    {lastResult.cooking_time}
                  </span>
                )}
                {lastResult.servings && (
                  <span className="flex items-center gap-1.5 text-[12px] text-gray-500 dark:text-[#555]">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                    </svg>
                    {lastResult.servings} servings
                  </span>
                )}
                {lastResult.cuisine && (
                  <span className="flex items-center gap-1.5 text-[12px] text-gray-500 dark:text-[#555]">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {lastResult.cuisine}
                  </span>
                )}
              </div>
            </div>

            {lastResult.image_url && (
              <img
                src={lastResult.image_url}
                alt={lastResult.name}
                className="w-full h-44 object-cover rounded-xl"
              />
            )}

            {lastResult.description && (
              <p className="text-[13.5px] text-gray-500 dark:text-[#888] leading-relaxed border-l-2 border-[#4a5c2f]/30 dark:border-[#8aab5c]/30 pl-3.5">
                {lastResult.description}
              </p>
            )}

            {lastResult.ingredients?.length > 0 && (
              <div>
                <p className="text-[10.5px] uppercase tracking-widest text-gray-400 dark:text-[#3a3a35] font-medium mb-2.5">
                  Ingredients
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {lastResult.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-[12px] text-[#4a5c2f] dark:text-[#8aab5c] bg-[#4a5c2f]/8 dark:bg-[#8aab5c]/10 border border-[#4a5c2f]/15 dark:border-[#8aab5c]/18 px-2.5 py-1 rounded-full"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {lastResult.steps?.length > 0 && (
              <div>
                <p className="text-[10.5px] uppercase tracking-widest text-gray-400 dark:text-[#3a3a35] font-medium mb-3">
                  Steps
                </p>
                <div className="flex flex-col gap-2.5">
                  {lastResult.steps.map((step, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <span className="w-5 h-5 rounded-full bg-[#4a5c2f]/10 dark:bg-[#8aab5c]/12 border border-[#4a5c2f]/20 dark:border-[#8aab5c]/20 text-[#4a5c2f] dark:text-[#8aab5c] text-[10.5px] font-medium flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-[13px] text-gray-500 dark:text-[#888] leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className="mt-2 bg-[#4a5c2f]/10 dark:bg-[#8aab5c]/12 border border-[#4a5c2f]/20 dark:border-[#8aab5c]/25 text-[#4a5c2f] dark:text-[#8aab5c] text-[13px] py-2.5 rounded-[10px] flex items-center justify-center gap-2 hover:opacity-80 transition-all">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save to gallery
            </button>

          </div>
        )}
      </div>
    </div>
  );
}