import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'

const FAVORITES_KEY = 'employee-directory-favorites'

// Manages the list of favorite employee ids, persisted in localStorage.
export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useLocalStorage(FAVORITES_KEY, [])

  const isFavorite = useCallback(
    (id) => favoriteIds.includes(id),
    [favoriteIds]
  )

  const toggleFavorite = useCallback(
    (id) => {
      setFavoriteIds((prev) =>
        prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
      )
    },
    [setFavoriteIds]
  )

  return { favoriteIds, isFavorite, toggleFavorite }
}
