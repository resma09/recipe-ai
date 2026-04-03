CREATE TABLE IF NOT EXISTS recipes (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(200) NOT NULL,
  description   TEXT,
  cuisine       VARCHAR(100),
  cooking_time  VARCHAR(50),
  servings      INTEGER DEFAULT 2,
  ingredients   JSONB NOT NULL DEFAULT '[]'::jsonb,
  steps         JSONB NOT NULL DEFAULT '[]'::jsonb,
  image_url     TEXT,
  image_credit  VARCHAR(200),
  like_count    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO recipes (name, description, cuisine, cooking_time, servings, ingredients, steps, image_url) VALUES
(
  'Garlic Butter Chicken',
  'A simple yet flavorful pan-seared chicken with garlic butter sauce. Perfect for weeknight dinners.',
  'American',
  '25 minutes',
  2,
  '["chicken breast", "garlic", "butter", "olive oil", "salt", "pepper", "parsley"]'::jsonb,
  '["Season chicken breasts with salt and pepper", "Heat olive oil in a skillet over medium-high heat", "Sear chicken 5-6 minutes per side until golden", "Reduce heat, add butter and minced garlic", "Baste chicken with garlic butter for 2 minutes", "Garnish with fresh parsley and serve"]'::jsonb,
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80'
),
(
  'Dal Tadka',
  'A comforting Indian lentil dish tempered with spices. Creamy, nutritious, and pairs perfectly with rice.',
  'Indian',
  '35 minutes',
  4,
  '["red lentils", "onion", "tomato", "garlic", "ginger", "turmeric", "cumin seeds", "ghee", "cilantro"]'::jsonb,
  '["Wash and boil red lentils with turmeric until soft", "In a separate pan, heat ghee and add cumin seeds", "Add chopped onion and cook until golden", "Add garlic, ginger, and tomato — cook until soft", "Pour the tempering over the cooked lentils", "Stir well, garnish with cilantro, and serve with rice"]'::jsonb,
  'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80'
),
(
  'Momo',
  'Nepali steamed dumplings filled with spiced chicken. Served with tomato-based achar (dipping sauce).',
  'Nepali',
  '45 minutes',
  4,
  '["flour", "chicken mince", "onion", "garlic", "ginger", "cilantro", "soy sauce", "salt", "pepper", "tomato", "chili"]'::jsonb,
  '["Mix flour with water to make a smooth dough, rest 20 minutes", "Combine chicken mince with finely chopped onion, garlic, ginger, cilantro, soy sauce, salt, and pepper", "Roll dough into small circles and fill with chicken mixture", "Fold and pleat the momos closed", "Steam for 10-12 minutes until cooked through", "Blend tomato and chili for achar dipping sauce", "Serve hot with the achar"]'::jsonb,
  'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80'
);