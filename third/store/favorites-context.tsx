import { createContext, useState, useContext, useCallback, useMemo } from 'react';

interface FavoritesContextType {
  ids: string[];
  isLoading: boolean;
  error: string | null;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  ids: [],
  isLoading: false,
  error: null,
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFavorite = useCallback((id: string) => {
    try {
      setIsLoading(true);
      setFavoriteIds(currentIds => {
        if (currentIds.includes(id)) {
          return currentIds;
        }
        return [...currentIds, id];
      });
    } catch (err: unknown) {
      setError(`Failed to add favorite: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFavorite = useCallback((id: string) => {
    try {
      setIsLoading(true);
      setFavoriteIds(currentIds => currentIds.filter(mealId => mealId !== id));
    } catch (err: unknown) {
      setError(`Failed to add favorite: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isFavorite = useCallback(
    (id: string) => {
      return favoriteIds.includes(id);
    },
    [favoriteIds]
  );

  const value = useMemo(
    () => ({
      ids: favoriteIds,
      isLoading,
      error,
      addFavorite,
      removeFavorite,
      isFavorite,
    }),
    [favoriteIds, isLoading, error, addFavorite, removeFavorite, isFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
