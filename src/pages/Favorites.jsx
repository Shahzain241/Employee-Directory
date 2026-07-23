import { useState } from 'react'
import { Link } from 'react-router-dom'
import EmployeeList from '../components/EmployeeList'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import ConfirmationModal from '../components/ConfirmationModal'
import { useEmployees } from '../hooks/useEmployees'
import { useFavorites } from '../hooks/useFavorites'

function Favorites() {
  const { employees, loading, error, retry, deleteEmployee } = useEmployees()
  const { favoriteIds, toggleFavorite } = useFavorites()
  const [employeeToDelete, setEmployeeToDelete] = useState(null)

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} onRetry={retry} />

  const favoriteEmployees = employees.filter((employee) => favoriteIds.includes(employee.id))

  function handleConfirmDelete() {
    deleteEmployee(employeeToDelete.id)
    setEmployeeToDelete(null)
  }

  return (
    <div className="favorites-page">
      <h1>Favorite Employees</h1>

      {favoriteEmployees.length === 0 ? (
        <p className="empty-state">
          You have not added any favorites yet. Go to the <Link to="/">directory</Link> and
          tap the star icon on an employee.
        </p>
      ) : (
        <EmployeeList
          employees={favoriteEmployees}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onDelete={setEmployeeToDelete}
          view="grid"
        />
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

export default Favorites
