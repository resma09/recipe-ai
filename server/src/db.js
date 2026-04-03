import pg from "pg";

export class Database {
  constructor({ url }) {
    this.pool = new pg.Pool({ connectionString: url });
  }

  async connect() {
    const client = await this.pool.connect();
    console.log("[DB] Connected to PostgreSQL");
    client.release();
  }

  async initialize() {
    const result = await this.pool.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'recipes')"
    );
    if (result.rows[0].exists) {
      console.log("[DB] recipes table ready");
    } else {
      console.warn("[DB] recipes table not found — run docker compose up");
    }
  }

  // Get all recipes (for gallery)
  async list() {
    const { rows } = await this.pool.query(
      "SELECT * FROM recipes ORDER BY created_at DESC"
    );
    return rows;
  }

  // Get a single recipe by ID
  async getById(id) {
    const { rows } = await this.pool.query(
      "SELECT * FROM recipes WHERE id = $1",
      [id]
    );
    return rows[0] || null;
  }

  // Insert a new recipe
  async insert(recipe) {
    const { rows } = await this.pool.query(
      `INSERT INTO recipes (name, description, cuisine, cooking_time, servings, ingredients, steps, image_url, image_credit)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
      [
        recipe.name,
        recipe.description,
        recipe.cuisine,
        recipe.cooking_time,
        recipe.servings,
        JSON.stringify(recipe.ingredients),
        JSON.stringify(recipe.steps),
        recipe.image_url || null,
        recipe.image_credit || null,
      ]
    );
    return rows[0];
  }
  // Like a recipe
  async like(id) {
    const { rows } = await this.pool.query(
      "UPDATE recipes SET like_count = like_count + 1 WHERE id = $1 RETURNING *",
      [id]
    );
    return rows[0] || null;
  }
}
