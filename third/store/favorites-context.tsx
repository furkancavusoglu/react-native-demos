import { createContext, useState, useContext } from 'react';

interface FavoritesContextType {
  ids: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  ids: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  function addFavorite(id: string) {
    setFavoriteIds(currentIds => [...currentIds, id]);
  }

  function removeFavorite(id: string) {
    setFavoriteIds(currentIds => currentIds.filter(mealId => mealId !== id));
  }

  function isFavorite(id: string) {
    return favoriteIds.includes(id);
  }

  const value = {
    ids: favoriteIds,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
