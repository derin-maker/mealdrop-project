import { create } from "zustand";

const useFavoritesStore = create((set, get) => ({
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],

  toggleFavorite: (restaurant) => {
    const favorites = get().favorites;
    const exists = favorites.find((f) => f.id === restaurant.id);
    const updated = exists
      ? favorites.filter((f) => f.id !== restaurant.id)
      : [...favorites, restaurant];

    localStorage.setItem("favorites", JSON.stringify(updated));
    set({ favorites: updated });
  },

  isFavorite: (id) => {
    return get().favorites.some((f) => f.id === id);
  },

  mealFavorites: JSON.parse(localStorage.getItem("mealFavorites")) || [],

  toggleMealFavorite: (meal) => {
    const mealFavorites = get().mealFavorites;
    const exists = mealFavorites.find((m) => m.id === meal.id);
    const updated = exists
      ? mealFavorites.filter((m) => m.id !== meal.id)
      : [...mealFavorites, meal];
    localStorage.setItem("mealFavorites", JSON.stringify(updated));
    set({ mealFavorites: updated });
  },

  isMealFavorite: (id) => {
    return get().mealFavorites.some((m) => m.id === id);
  },
}));

export default useFavoritesStore;
