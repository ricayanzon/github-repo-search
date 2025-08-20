export const STORAGE_KEY = 'repo-search-favorites';

/**
 * Retrieves the list of favorite repository IDs from localStorage.
 * @return {string[]} Array of favorite repository IDs.
 */
export function getFavoriteIds(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Adds a repository ID to the favorites in localStorage.
 * @param {string} id - Repository ID to add.
 */
export function addFavoriteId(id: string): void {
  const favorites = getFavoriteIds();
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new Event('favorites-updated'));
  }
}

/**
 * Removes a repository ID from the favorites in localStorage.
 * @param {string} id - Repository ID to remove.
 */
export function removeFavoriteId(id: string): void {
  const favorites = getFavoriteIds();
  const updatedFavorites = favorites.filter((favoriteId) => favoriteId !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
  window.dispatchEvent(new Event('favorites-updated'));
}

/**
 * Checks if a repository ID is in the favorites.
 * @param {string} id - Repository ID to check.
 * @return {boolean} True if the ID is a favorite, false otherwise.
 */
export function isFavoriteById(id: string): boolean {
  return getFavoriteIds().includes(id);
}
