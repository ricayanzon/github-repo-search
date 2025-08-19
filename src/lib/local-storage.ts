export const STORAGE_KEY = 'repo-search-favorites';

export function getFavoriteIds(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addFavoriteId(id: string): void {
  const favorites = getFavoriteIds();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new Event('favorites-updated'));
  }
}

export function removeFavoriteId(id: string): void {
  const favorites = getFavoriteIds();
  const updatedFavorites = favorites.filter((favoriteId) => favoriteId !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
  window.dispatchEvent(new Event('favorites-updated'));
}

export function isFavoriteById(id: string): boolean {
  return getFavoriteIds().includes(id);
}
