import { useState, useEffect } from 'react'

// Safely reads a value from localStorage.
// Falls back to defaultValue if the key is missing or the JSON is invalid.
function readValue(key, defaultValue) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Could not read "${key}" from storage:`, error)
    return defaultValue
  }
}

// A useState-like hook that persists its value in localStorage.
export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => readValue(key, defaultValue))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Could not save "${key}" to storage:`, error)
    }
  }, [key, value])

  return [value, setValue]
}
