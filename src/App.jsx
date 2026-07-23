import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import EmployeeDetails from './pages/EmployeeDetails'
import { toggleFavoriteId } from './utils/employeeUtils'

function getSavedFavorites() {
  try {
    const saved = window.localStorage.getItem('employee-favorites')
    const parsed = saved ? JSON.parse(saved) : []

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'

    const savedTheme = window.localStorage.getItem('employee-theme')
    if (savedTheme) return savedTheme

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [favorites, setFavorites] = useState(() => {
    if (typeof window === 'undefined') return []

    return getSavedFavorites()
  })

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    window.localStorage.setItem('employee-theme', theme)
  }, [theme])

  useEffect(() => {
    window.localStorage.setItem('employee-favorites', JSON.stringify(favorites))
  }, [favorites])

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  function toggleFavorite(id) {
    const numericId = Number(id)

    setFavorites((currentFavorites) => toggleFavoriteId(currentFavorites, numericId))
  }

  return (
    <div className={`app-shell ${theme}`}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              theme={theme}
              toggleTheme={toggleTheme}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
        <Route
          path="/employee/:id"
          element={
            <EmployeeDetails
              theme={theme}
              toggleTheme={toggleTheme}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
