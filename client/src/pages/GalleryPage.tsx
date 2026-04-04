import Spinner from "../components/Spinner";
import { useRecipeGallery } from "../hooks/useRecipeGallery";
import { useMemo, useState } from "react";
import RecipeCard from "../components/RecipeCard";

export default function GalleryPage() {
  const { data, loading, error, likeRecipe } = useRecipeGallery();
  const [sortBy, setSortBy] = useState("newest");
  const [filterCuisine, setFilterCuisine] = useState("all");

  const processedData = useMemo(() => {
    let result = [...data];
    if (filterCuisine !== "all") {
      result = result.filter(
        (r) => r.cuisine?.toLowerCase() === filterCuisine.toLowerCase()
      );
    }
    switch (sortBy) {
      case "likes":
        result.sort((a, b) => (b.like_count || 0) - (a.like_count || 0));
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
      default:
        break;
    }
    return result;
  }, [data, sortBy, filterCuisine]);

  const availableCuisines = useMemo(() => {
    const cuisines = new Set(data.map((r) => r.cuisine).filter(Boolean));
    return Array.from(cuisines).sort();
  }, [data]);

  const selectClass =
    "bg-white dark:bg-[#181917] border border-gray-200 dark:border-white/10 text-gray-600 dark:text-[#888] text-[12.5px] px-3 py-1.5 rounded-[8px] outline-none cursor-pointer hover:border-gray-300 dark:hover:border-white/20 transition-colors";

  if (loading) return <Spinner label="Loading recipes..." />;
  if (error)
    return <p className="text-red-500 dark:text-red-400 text-[13px]">Failed to load: {String(error)}</p>;

  return (
    <div>
      {/* Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2.5">
          <h2 className="font-['Instrument_Serif'] text-[22px] text-gray-900 dark:text-[#f0efe8] font-normal">
            Your <span className="text-[#4a5c2f] dark:text-[#8aab5c] italic">collection</span>
          </h2>
          <span className="text-[12px] text-gray-400 dark:text-[#3a3a35] bg-gray-100 dark:bg-white/[0.04] px-2.5 py-0.5 rounded-full">
            {data.length} recipes
          </span>
        </div>

        <div className="flex gap-2">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={selectClass}>
            <option value="newest">Newest</option>
            <option value="likes">Most liked</option>
            <option value="name">Name</option>
          </select>

          {availableCuisines.length > 0 && (
            <select value={filterCuisine} onChange={(e) => setFilterCuisine(e.target.value)} className={selectClass}>
              <option value="all">All cuisines</option>
              {availableCuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Empty state */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-[#4a5c2f]/10 dark:bg-[#8aab5c]/10 border border-[#4a5c2f]/20 dark:border-[#8aab5c]/20 flex items-center justify-center text-xl">
            🍳
          </div>
          <p className="font-['Instrument_Serif'] text-[18px] text-gray-400 dark:text-[#555]">No recipes yet</p>
          <p className="text-[13px] text-gray-400 dark:text-[#3a3a35]">Head to Generate to create your first one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {processedData.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onLike={likeRecipe} />
          ))}
        </div>
      )}
    </div>
  );
}