import { useState, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import EmployeeFilters from '../components/EmployeeFilters'
import EmployeeList from '../components/EmployeeList'
import Statistics from '../components/Statistics'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import ConfirmationModal from '../components/ConfirmationModal'
import { useEmployees } from '../hooks/useEmployees'
import { useFavorites } from '../hooks/useFavorites'
import { useDebounce } from '../hooks/useDebounce'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  filterEmployees,
  sortEmployees,
  getUniqueDepartments,
  getUniqueCities,
  calculateStatistics,
} from '../utils/employeeHelpers'
import { exportEmployeesToCsv } from '../utils/csvExport'

function Home() {
  const { employees, loading, error, retry, deleteEmployee } = useEmployees()
  const { favoriteIds, toggleFavorite } = useFavorites()

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 400)

  const [department, setDepartment] = useState('All')
  const [city, setCity] = useState('All')
  const [sortOrder, setSortOrder] = useState('A-Z')
  const [view, setView] = useLocalStorage('employee-directory-view', 'grid')

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [employeeToDelete, setEmployeeToDelete] = useState(null)

  const departments = useMemo(() => getUniqueDepartments(employees), [employees])
  const cities = useMemo(() => getUniqueCities(employees), [employees])

  const filteredEmployees = useMemo(
    () => filterEmployees(employees, { search: debouncedSearch, department, city }),
    [employees, debouncedSearch, department, city]
  )

  const sortedEmployees = useMemo(
    () => sortEmployees(filteredEmployees, sortOrder),
    [filteredEmployees, sortOrder]
  )

  const stats = useMemo(
    () => calculateStatistics(filteredEmployees, favoriteIds),
    [filteredEmployees, favoriteIds]
  )

  const totalPages = Math.max(1, Math.ceil(sortedEmployees.length / pageSize))
  const currentPage = Math.min(page, totalPages)

  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedEmployees.slice(start, start + pageSize)
  }, [sortedEmployees, currentPage, pageSize])

  function handleDepartmentChange(value) {
    setDepartment(value)
    setPage(1)
  }

  function handleCityChange(value) {
    setCity(value)
    setPage(1)
  }

  function handlePageSizeChange(value) {
    setPageSize(value)
    setPage(1)
  }

  function handleConfirmDelete() {
    deleteEmployee(employeeToDelete.id)
    setEmployeeToDelete(null)
  }

  return (
    <div className="home">
      <div className="home-header">
        <h1>Employee Directory</h1>
        <button type="button" onClick={() => exportEmployeesToCsv(sortedEmployees)}>
          Export CSV
        </button>
      </div>

      <SearchBar value={search} onChange={setSearch} />

      {!loading && !error && (
        <EmployeeFilters
          departments={departments}
          cities={cities}
          department={department}
          city={city}
          sortOrder={sortOrder}
          view={view}
          onDepartmentChange={handleDepartmentChange}
          onCityChange={handleCityChange}
          onSortChange={setSortOrder}
          onViewChange={setView}
        />
      )}

      {loading && <Loader />}
      {!loading && error && <ErrorMessage message={error} onRetry={retry} />}

      {!loading && !error && (
        <>
          <Statistics stats={stats} />

          <EmployeeList
            employees={paginatedEmployees}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
            onDelete={setEmployeeToDelete}
            view={view}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}

      <ConfirmationModal
        isOpen={Boolean(employeeToDelete)}
        title="Delete Employee"
        message={
          employeeToDelete
            ? `Are you sure you want to delete ${employeeToDelete.firstName} ${employeeToDelete.lastName}?`
            : ''
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => setEmployeeToDelete(null)}
      />
    </div>
  )
}

export default Home
