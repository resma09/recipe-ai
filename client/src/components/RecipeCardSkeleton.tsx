export default function RecipeCardSkeleton() {
    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-700/50"></div>
            <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-700/50 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
                <div className="h-20 bg-gray-700/50 rounded"></div>
            </div>
        </div>
    );
}