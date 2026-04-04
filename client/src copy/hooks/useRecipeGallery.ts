import { useEffect, useState, useCallback } from "react";
import type { Recipe } from "../types";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export function useRecipeGallery() {
  const [data, setData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API}/api/recipes`);
      if (!res.ok) throw new Error("Failed to load recipes");
      const json: Recipe[] = await res.json();
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  const likeRecipe = useCallback(
    async (id: number) => {
      try {
        const res = await fetch(`${API}/api/recipes/${id}/like`, {
          method: "PATCH",
        });
        if (!res.ok) throw new Error("Failed to like");
        fetchGallery();
      } catch (e) {
        console.error(e);
      }
    },
    [fetchGallery]
  );

  return { data, loading, error, refetch: fetchGallery, likeRecipe };
}
