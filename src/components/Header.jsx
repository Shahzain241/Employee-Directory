import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="app-header">
      <Link to="/" className="logo">Employee Directory</Link>

      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/employees/add">Add Employee</Link>
      </nav>

      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  )
}

export default Header
