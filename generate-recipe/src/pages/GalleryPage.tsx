import Spinner from "../components/Spinner";
import { useRecipeGallery } from "../hooks/useRecipeGallery";
import { useMemo, useState } from "react";

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
            <div
              key={recipe.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md transition-shadow p-5 flex flex-col"
            >
              {recipe.image_url && (
                <img
                  src={recipe.image_url}
                  alt={recipe.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
              )}
              {/* Recipe Name */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {recipe.name}
              </h3>

              {/* Tags: Cuisine + Time */}
              <div className="flex flex-wrap gap-2 mt-2">
                {recipe.cuisine && (
                  <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200">
                    {recipe.cuisine}
                  </span>
                )}
                {recipe.cooking_time && (
                  <span className="text-xs px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200">
                    ⏱ {recipe.cooking_time}
                  </span>
                )}
                {recipe.servings && (
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200">
                    🍽 {recipe.servings} servings
                  </span>
                )}
              </div>

              {/* Description */}
              {recipe.description && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">
                  {recipe.description}
                </p>
              )}

              {/* Ingredients Preview */}
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    Ingredients:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {recipe.ingredients.slice(0, 5).map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {ing}
                      </span>
                    ))}
                    {recipe.ingredients.length > 5 && (
                      <span className="text-xs text-gray-400">
                        +{recipe.ingredients.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Steps Preview */}
              {recipe.steps && recipe.steps.length > 0 && (
                <div className="mt-3 flex-1">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                    Steps ({recipe.steps.length}):
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {recipe.steps[0]}
                  </p>
                </div>
              )}

              {/* Like Button */}
              <button
                onClick={() => likeRecipe(recipe.id)}
                className="mt-4 w-full px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
              >
                ❤️ Like ({recipe.like_count || 0})
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
