import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Database } from "./db.js";
import { generateRecipe, simulateRecipe } from "./ai.js";
import { fetchFoodImage } from "./ai.js";
import cache from "./cache.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });


const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static("public"));

// --- DATABASE CONNECTION ---
let db;
try {
  db = new Database({ url: process.env.DATABASE_URL });
  await db.connect();
  await db.initialize();
} catch (err) {
  console.error("[DB] Startup failed:", err.message);
  process.exit(1);
}

// ============================================
// API ENDPOINTS
// ============================================

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/recipes", async (_req, res) => {
  try {
    const rows = await cache.getOrSet("recipes:all", () => db.list(), 300);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

// ── GET SINGLE RECIPE ──
app.get("/api/recipes/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }
    const recipe = await db.getById(id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.json(recipe);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
});
app.post("/api/generate-recipe", async (req, res) => {
  try {
    const { ingredients } = req.body || {};
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: "ingredients array required" });
    }

    const cleanIngredients = ingredients.map(i => i.trim()).filter(i => i.length > 0);
    if (cleanIngredients.length === 0) {
      return res.status(400).json({ error: "At least one valid ingredient" });
    }

    // 1. Generate recipe (text)
    let recipe;
    try {
      console.log(`[AI] Generating recipe for: ${cleanIngredients.join(", ")}`);
      recipe = await generateRecipe(cleanIngredients);
    } catch (aiErr) {
      console.warn("[AI] Falling back to simulated recipe:", aiErr.message);
      recipe = simulateRecipe(cleanIngredients);
    }

    // 2. Always use Unsplash (skip AI image generation)
    console.log(`[Image] Using Unsplash for: ${recipe.name}`);
    let imageResult = { url: null, credit: null };
    try {
      imageResult = await fetchFoodImage(recipe.name);
    } catch (err) {
      console.warn("[Image] Unsplash fetch failed:", err.message);
    }

    // 3. Save to database with image URL
    const saved = await db.insert({
      ...recipe,
      image_url: imageResult.url,
      image_credit: imageResult.credit,
    });

    // 4. Update cache
    const cached = await cache.get("recipes:all");
    if (cached && Array.isArray(cached)) {
      cached.unshift(saved);
      await cache.set("recipes:all", cached, 300);
    }

    res.json(saved);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to generate recipe" });
  }
});

// ── LIKE A RECIPE ──
app.patch("/api/recipes/:id/like", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const updated = await db.like(id);
    if (!updated) return res.status(404).json({ error: "Recipe not found" });

    // Update recipe in cache
    const cached = await cache.get("recipes:all");
    if (cached && Array.isArray(cached)) {
      const index = cached.findIndex((r) => r.id === id);
      if (index !== -1) {
        cached[index] = updated;
        await cache.set("recipes:all", cached, 300);
        console.log(`[Cache] Updated recipe #${id} like count`);
      }
    }

    res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to like recipe" });
  }
});

app.get("*", (req, res) => {
  if (req.path.startsWith("/api/") || req.path.includes(".")) {
    return res.status(404).send("Not found");
  }
  res.sendFile("public/index.html", { root: "." });
});

// ── START SERVER ──
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
