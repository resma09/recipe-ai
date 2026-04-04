import type { Recipe } from "../types";

export default function RecipeCard({ recipe, onLike }: { recipe: Recipe; onLike: (id: number) => void }) {
    const shown = recipe.ingredients?.slice(0, 3) ?? [];
    const more = (recipe.ingredients?.length ?? 0) - shown.length;
    const displayName = recipe.name
        ? recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)
        : "";

    return (
        <div className="bg-white dark:bg-[#181917] border border-gray-200 dark:border-white/[0.07] rounded-2xl overflow-hidden group hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] transition-all duration-200">

            {/* Image */}
            <div className="relative h-48 bg-gray-100 dark:bg-[#1e1f1c] overflow-hidden">
                {recipe.image_url ? (
                    <img
                        src={recipe.image_url}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl">🍽</div>
                )}

                {/* Cuisine badge */}
                {recipe.cuisine && (
                    <span className="absolute bottom-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full capitalize">
                        {recipe.cuisine}
                    </span>
                )}

                {/* Heart */}
                <button
                    onClick={() => onLike(recipe.id)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 hover:bg-white transition-all"
                    aria-label="Like recipe"
                >
                    <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill={(recipe.like_count ?? 0) > 0 ? "#e03030" : "none"}
                        stroke={(recipe.like_count ?? 0) > 0 ? "#e03030" : "#aaa"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>
            </div>

            {/* Body */}
            <div className="p-4">
                <h3 className="font-['Instrument_Serif'] text-[18px] text-gray-900 dark:text-[#f0efe8] leading-snug mb-1.5">
                    {displayName}
                </h3>

                {recipe.description && (
                    <p className="text-[12.5px] text-gray-500 dark:text-[#555] leading-relaxed line-clamp-2 mb-3">
                        {recipe.description}
                    </p>
                )}

                {/* Meta row */}
                <div className="flex items-center gap-3 mb-3 border-t border-gray-100 dark:border-white/[0.06] pt-3">
                    {recipe.cooking_time && (
                        <span className="flex items-center gap-1.5 text-[12px] text-gray-400 dark:text-[#555]">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                            </svg>
                            {recipe.cooking_time}
                        </span>
                    )}
                    {recipe.servings && (
                        <>
                            <span className="w-px h-3 bg-gray-200 dark:bg-white/10" />
                            <span className="flex items-center gap-1.5 text-[12px] text-gray-400 dark:text-[#555]">
                                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                                </svg>
                                {recipe.servings} servings
                            </span>
                        </>
                    )}
                    <span className="w-px h-3 bg-gray-200 dark:bg-white/10" />
                    <span className="flex items-center gap-1.5 text-[12px] text-gray-400 dark:text-[#555]">
                        <svg
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                            fill={(recipe.like_count ?? 0) > 0 ? "#e03030" : "none"}
                            stroke={(recipe.like_count ?? 0) > 0 ? "#e03030" : "currentColor"}
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {recipe.like_count ?? 0}
                    </span>
                </div>

                {/* Ingredient tags */}
                {shown.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {shown.map((ing, idx) => (
                            <span
                                key={idx}
                                className="text-[11.5px] text-[#4a5c2f] dark:text-[#8aab5c] bg-[#4a5c2f]/8 dark:bg-[#8aab5c]/10 border border-[#4a5c2f]/15 dark:border-[#8aab5c]/18 px-2.5 py-0.5 rounded-full"
                            >
                                {ing}
                            </span>
                        ))}
                        {more > 0 && (
                            <span className="text-[11.5px] text-gray-400 dark:text-[#3a3a35] px-1">+{more} more</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}