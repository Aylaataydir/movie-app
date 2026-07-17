# Movie App

A simple movie discovery site I built as a personal project, using the TMDB API. My main goal with this project was to learn Next.js's routing structure (App Router, route groups, dynamic routes) and get comfortable with the client-side vs. server-side rendering model.

## What it has

- Browse popular, upcoming, top rated and now playing movies
- Movie search (live search, shows results as you type)
- Filter by genre and/or year (both can be selected at the same time)
- Movie detail page (overview, genre, year, rating, trailer)
- Sign up/login with Firebase (email-password + Google login)
- Watchlist / Watched / Favorites lists (for logged-in users, stored in localStorage)
- Light/dark theme
- Mobile friendly

## Tech stack

- **Next.js 16** (App Router)
- **React 19**
- **React Context API** (auth state, watchlist/watched/favorites, theme)
- **Tailwind CSS v4** + **daisyUI**
- **Firebase Authentication**
- **TMDB API** (movie data)
- **Swiper** (carousel-style movie lists)
- **react-toastify** (notifications)


## Project structure

```
src/
  app/
    (public)/        -> public pages (home, login, register)
    (private)/        -> pages that require login (watchlist, watched, favorites, movie detail)
    api/              -> routes that call TMDB server-side (so the API key doesn't leak)
  components/         -> Navbar, MovieCard, Search, filter dropdowns, etc.
  context/            -> AuthContext (Firebase) and MovieContext (watchlist/watched/favorites, theme)
  services/           -> movieApi.js -> all the fetch functions that talk to TMDB
  auth/               -> firebase config/init
```


