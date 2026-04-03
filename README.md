# Recipe AI 🍳

A React 19 learning project built by transforming the [PokAImon Generator](https://github.com/AhsanAyaz/react-in-90ish) tutorial by Ahsan Ayaz into a full-stack Recipe Suggestion App.

## What It Does

Enter ingredients you have at home and Claude AI suggests recipes you can make — browse saved recipes, filter by cuisine, and save your favourites.

## What I Learned Building This

- ✅ React fundamentals (Components, JSX, Props)
- ✅ Routing (React Router)
- ✅ State Management (useState)
- ✅ Side Effects (useEffect)
- ✅ Custom Hooks
- ✅ Context API (dark/light mode)
- ✅ Performance (useMemo, useCallback)
- ✅ React 19 Features (Suspense, Lazy Loading)
- ✅ Error Handling (ErrorBoundary)
- ✅ Claude AI API integration
- ✅ Full stack setup with Node.js + PostgreSQL + Docker

---

## Tech Stack

**Frontend**
- React 19 + Vite
- React Router
- Tailwind CSS

**Backend**
- Node.js + Express
- PostgreSQL
- Memcached
- Docker

**AI**
- Google Gemini API

### Set up environment variables
```bash
cd server
cp .env.example .env
```

---

## Reference Project

This project is based on the **React in 90-ish minutes** workshop by [Ahsan Ayaz](https://github.com/AhsanAyaz).

- Original repo: [AhsanAyaz/react-in-90ish](https://github.com/AhsanAyaz/react-in-90ish)
- YouTube tutorial: [Watch here](https://www.youtube.com/watch?v=tqjJrXd27m4)

The original app generates AI Pokemon from doodles using Gemini API. I used it as a learning base and transformed it into a Recipe AI app — swapping the canvas input for ingredient search, Gemini for Claude API, and the Pokemon data model for a Recipe model.

---

## How It Works

1. Enter ingredients you have
2. Claude AI suggests a recipe based on those ingredients
3. Recipe is saved to PostgreSQL
4. Browse all saved recipes in the Gallery
5. Filter by cuisine, sort by newest or most liked
