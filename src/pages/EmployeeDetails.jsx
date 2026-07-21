import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { getEmployeeById } from '../services/api'

function EmployeeDetails({ theme, toggleTheme, favorites, onToggleFavorite }) {
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function fetchEmployee() {
    setLoading(true)
    setError(null)

    getEmployeeById(id)
      .then((data) => setEmployee(data))
      .catch(() => setError('Could not load employee details. Please try again.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchEmployee()
  }, [id])

  if (loading) return <Loader />
  if (error) return <Error message={error} onRetry={fetchEmployee} />
  if (!employee) return null

  const isFavorite = favorites.includes(Number(employee.id))

  return (
    <div className="employee-details">
      <div className="details-header">
        <Link to="/">&larr; Back to Directory</Link>
        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <div className="details-card">
        <img src={employee.image} alt={employee.firstName} className="avatar-large" />
        <h2>{employee.firstName} {employee.lastName}</h2>

        <button
          type="button"
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(employee.id)}
        >
          {isFavorite ? '★ Favorite' : '☆ Favorite'}
        </button>

        <ul>
          <li><strong>Age:</strong> {employee.age}</li>
          <li><strong>Gender:</strong> {employee.gender}</li>
          <li><strong>Phone:</strong> {employee.phone}</li>
          <li><strong>Email:</strong> {employee.email}</li>
          <li>
            <strong>Address:</strong> {employee.address?.address}, {employee.address?.city}, {employee.address?.state}
          </li>
          <li><strong>Company:</strong> {employee.company?.name}</li>
          <li><strong>Department:</strong> {employee.company?.department}</li>
          <li><strong>University:</strong> {employee.university}</li>
        </ul>
      </div>
    </div>
  )
}

export default EmployeeDetails
