import { create } from 'zustand';

interface FavoritesState {
  ids: string[];
  isLoading: boolean;
  error: string | null;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearError: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  ids: [],
  isLoading: false,
  error: null,
  addFavorite: (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const { ids } = get();
      if (!ids.includes(id)) {
        set({ ids: [...ids, id] });
      }
    } catch (err: unknown) {
      set({
        error: `Failed to add favorite: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  removeFavorite: (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const { ids } = get();
      set({ ids: ids.filter(mealId => mealId !== id) });
    } catch (err: unknown) {
      set({
        error: `Failed to remove favorite: ${err instanceof Error ? err.message : 'Unknown error'}`,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  isFavorite: (id: string) => {
    const { ids } = get();
    return ids.includes(id);
  },
  clearError: () => set({ error: null }),
}));
