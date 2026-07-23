import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

const THEME_KEY = 'employee-directory-theme'

// Manages dark/light theme and applies it to the document root
// so CSS variables in App.css can react to it.
export function useTheme() {
  const [theme, setTheme] = useLocalStorage(THEME_KEY, 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return { theme, toggleTheme }
}
