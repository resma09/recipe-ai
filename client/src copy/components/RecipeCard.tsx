import { Recipe } from '../types';
import AIBadge from './AIBadge';

interface RecipeCardProps {
    recipe: Recipe;
    isNew?: boolean;
    onLike?: () => void;
}

export default function RecipeCard({ recipe, isNew, onLike }: RecipeCardProps) {
    // Helper to format date (if needed)
    const formattedDate = recipe.created_at
        ? new Date(recipe.created_at).toLocaleDateString()
        : null;

    return (
        <div className="group bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm dark:shadow-none hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            {/* Image section */}
            <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
                {recipe.image_url ? (
                    <img
                        src={recipe.image_url}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                        🍳
                    </div>
                )}
                {/* Like button overlay */}
                {onLike && (
                    <button
                        onClick={onLike}
                        className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full p-2 shadow-md hover:scale-110 transition-transform"
                        aria-label="Like recipe"
                    >
                        <span className="text-red-500 text-lg">❤️</span>
                        <span className="ml-1 text-sm font-semibold text-gray-800 dark:text-white">
                            {recipe.like_count || 0}
                        </span>
                    </button>
                )}
                {/* AI badge for new recipes */}
                {isNew && (
                    <div className="absolute bottom-3 left-3">
                        <AIBadge />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Cuisine badge + cooking time (single line) */}
                <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300">
                        {recipe.cuisine || 'Fusion'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <span>⏱️</span> {recipe.cooking_time}
                    </span>
                </div>

                {/* Recipe name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-3 line-clamp-1">
                    {recipe.name}
                </h3>

                {/* Description */}
                {recipe.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                        {recipe.description}
                    </p>
                )}

                {/* Ingredients preview as chips */}
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {recipe.ingredients.slice(0, 4).map((ing, idx) => (
                            <span
                                key={idx}
                                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300"
                            >
                                {ing.length > 20 ? ing.slice(0, 18) + '…' : ing}
                            </span>
                        ))}
                        {recipe.ingredients.length > 4 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{recipe.ingredients.length - 4}
                            </span>
                        )}
                    </div>
                )}

                {/* Servings + date */}
                <div className="mt-4 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-white/10 pt-3">
                    <span className="flex items-center gap-1">
                        <span>🍽️</span> Serves {recipe.servings}
                    </span>
                    {formattedDate && (
                        <span className="flex items-center gap-1">
                            <span>📅</span> {formattedDate}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}