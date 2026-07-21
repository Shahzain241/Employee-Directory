import { useState, useEffect, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import EmployeeList from '../components/EmployeeList'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { getEmployees } from '../services/api'

const EMPLOYEES_PER_PAGE = 10

function Home({ theme, toggleTheme, favorites, onToggleFavorite }) {
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)

  function fetchEmployees() {
    setLoading(true)
    setError(null)

    getEmployees()
      .then((data) => setEmployees(data))
      .catch(() => setError('Could not load employees. Please try again.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [search, sortOrder])

  const filteredEmployees = useMemo(() => {
    const searchTerm = search.toLowerCase()

    return employees.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase()
      return (
        fullName.includes(searchTerm) ||
        employee.email.toLowerCase().includes(searchTerm)
      )
    })
  }, [employees, search])

  const sortedEmployees = useMemo(() => {
    const sorted = [...filteredEmployees]

    sorted.sort((a, b) => {
      const nameA = `${a.firstName} ${a.lastName}`.toLowerCase()
      const nameB = `${b.firstName} ${b.lastName}`.toLowerCase()

      return sortOrder === 'asc'
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA)
    })

    return sorted
  }, [filteredEmployees, sortOrder])

  const totalPages = Math.max(1, Math.ceil(sortedEmployees.length / EMPLOYEES_PER_PAGE))
  const visibleEmployees = sortedEmployees.slice(
    (currentPage - 1) * EMPLOYEES_PER_PAGE,
    currentPage * EMPLOYEES_PER_PAGE
  )

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  return (
    <div className="home">
      <div className="home-header">
        <div>
          <h1>Employee Directory</h1>
          <p className="subtitle">Browse your team smoothly from desktop, tablet, or mobile.</p>
        </div>

        <div className="home-actions">
          <div className="results-summary">
            {search
              ? `${filteredEmployees.length} result${filteredEmployees.length === 1 ? '' : 's'}`
              : `${employees.length} employees`}
          </div>
          <button type="button" className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      <div className="controls-bar">
        <label className="sort-control">
          <span>Sort</span>
          <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </label>

        <div className="favorites-count">
          ★ {favorites.length} favorite{favorites.length === 1 ? '' : 's'}
        </div>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {loading && <Loader />}
      {!loading && error && <Error message={error} onRetry={fetchEmployees} />}
      {!loading && !error && (
        <>
          <EmployeeList
            employees={visibleEmployees}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />

          {totalPages > 1 && (
            <div className="pagination">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`page-number ${currentPage === page ? 'active' : ''}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home
