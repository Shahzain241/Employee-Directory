import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import ConfirmationModal from '../components/ConfirmationModal'
import { getEmployeeById } from '../services/api'
import { useEmployees } from '../hooks/useEmployees'

function EmployeeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { employees, deleteEmployee } = useEmployees()

  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    // Locally added or already-loaded employees don't need a fresh API call.
    const localMatch = employees.find((emp) => String(emp.id) === id)

    if (localMatch) {
      setEmployee(localMatch)
      setLoading(false)
      setError(null)
      return
    }

    const controller = new AbortController()

    async function fetchEmployee() {
      setLoading(true)
      setError(null)

      try {
        const data = await getEmployeeById(id, controller.signal)
        setEmployee(data)
      } catch (err) {
        if (err.name === 'AbortError') return
        console.error('Employee details request failed:', err)
        setError('Could not load employee details. Please try again.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchEmployee()

    return () => controller.abort()
  }, [id, employees])

  function handleDelete() {
    deleteEmployee(employee.id)
    navigate('/')
  }

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} onRetry={() => setError(null)} />
  if (!employee) return null

  return (
    <div className="employee-details">
      <Link to="/">&larr; Back to Directory</Link>

      <div className="details-card">
        <img
          src={employee.image}
          alt={employee.firstName}
          className="avatar-large"
          loading="lazy"
          width="120"
          height="120"
        />
        <h2>{employee.firstName} {employee.lastName}</h2>

        <ul>
          {employee.age && <li><strong>Age:</strong> {employee.age}</li>}
          {employee.gender && <li><strong>Gender:</strong> {employee.gender}</li>}
          <li><strong>Phone:</strong> {employee.phone}</li>
          <li><strong>Email:</strong> {employee.email}</li>
          {employee.address && (
            <li>
              <strong>Address:</strong> {employee.address.address}, {employee.address.city}, {employee.address.state}
            </li>
          )}
          {!employee.address && employee.city && (
            <li><strong>City:</strong> {employee.city}</li>
          )}
          <li><strong>Company:</strong> {employee.company?.name}</li>
          <li><strong>Department:</strong> {employee.company?.department}</li>
          {employee.university && <li><strong>University:</strong> {employee.university}</li>}
        </ul>

        <div className="details-actions">
          <Link to={`/employees/${employee.id}/edit`}>
            <button type="button">Edit</button>
          </Link>
          <button type="button" className="danger" onClick={() => setShowConfirm(true)}>
            Delete
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirm}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  )
}

export default EmployeeDetails
