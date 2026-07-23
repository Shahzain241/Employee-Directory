import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useFavorites } from '../hooks/useFavorites'

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts with no favorites', () => {
    const { result } = renderHook(() => useFavorites())
    expect(result.current.favoriteIds).toEqual([])
    expect(result.current.isFavorite(1)).toBe(false)
  })

  it('adds an employee id when toggled on', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.toggleFavorite(1)
    })

    expect(result.current.favoriteIds).toEqual([1])
    expect(result.current.isFavorite(1)).toBe(true)
  })

  it('removes an employee id when toggled off', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.toggleFavorite(1)
    })
    act(() => {
      result.current.toggleFavorite(1)
    })

    expect(result.current.favoriteIds).toEqual([])
  })
})
