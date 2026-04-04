import Spinner from "../components/Spinner";
import { useRecipeGallery } from "../hooks/useRecipeGallery";
import { useMemo, useState } from "react";
import RecipeCard from "../components/RecipeCard";

export default function GalleryPage() {
  const { data, loading, error, likeRecipe } = useRecipeGallery();

  const [sortBy, setSortBy] = useState("newest");
  const [filterCuisine, setFilterCuisine] = useState("all");

  // Filter and sort — same useMemo pattern as PokAImon
  const processedData = useMemo(() => {
    let result = [...data];

    // Filter by cuisine (was: filter by type)
    if (filterCuisine !== "all") {
      result = result.filter(
        (r) => r.cuisine?.toLowerCase() === filterCuisine.toLowerCase()
      );
    }

    // Sort
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

  // Get available cuisines for filter dropdown
  const availableCuisines = useMemo(() => {
    const cuisines = new Set(data.map((r) => r.cuisine).filter(Boolean));
    return Array.from(cuisines).sort();
  }, [data]);

  if (loading) return <Spinner label="Loading recipes..." />;
  if (error)
    return (
      <div className="text-red-500 dark:text-red-400">
        Failed to load: {String(error)}
      </div>
    );

  return (
    <div>
      {/* HEADER + FILTERS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Recipe Collection
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
            >
              <option value="newest">Newest</option>
              <option value="likes">Most Liked</option>
              <option value="name">Name</option>
            </select>
          </div>

          {/* Filter by cuisine (was: filter by type) */}
          {availableCuisines.length > 0 && (
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Cuisine:
              </label>
              <select
                value={filterCuisine}
                onChange={(e) => setFilterCuisine(e.target.value)}
                className="px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm"
              >
                <option value="all">All Cuisines</option>
                {availableCuisines.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          No recipes yet. Head to the Generator to create one!
        </p>
      ) : (
        /* RECIPE CARDS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedData.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onLike={() => likeRecipe(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
