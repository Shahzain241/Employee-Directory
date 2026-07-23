import { memo } from 'react'
import { Link } from 'react-router-dom'
import { getDepartment, getCompanyName } from '../utils/employeeHelpers'

function EmployeeCard({ employee, isFavorite, onToggleFavorite, onDelete, view }) {
  return (
    <div className={`employee-card ${view === 'list' ? 'list-view' : ''}`}>
      <img
        src={employee.image}
        alt={employee.firstName}
        className="avatar"
        loading="lazy"
        width="80"
        height="80"
      />

      <div className="employee-info">
        <h3>{employee.firstName} {employee.lastName}</h3>
        <p className="job-title">
          {getCompanyName(employee)} - {getDepartment(employee)}
        </p>
        <p className="email">{employee.email}</p>
      </div>

      <div className="employee-actions">
        <button
          type="button"
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(employee.id)}
          aria-label={`${isFavorite ? 'Remove' : 'Add'} ${employee.firstName} ${employee.lastName} from favorites`}
        >
          {isFavorite ? '★' : '☆'}
        </button>

        <Link to={`/employees/${employee.id}`}>
          <button type="button">View Details</button>
        </Link>
        <Link to={`/employees/${employee.id}/edit`}>
          <button type="button">Edit</button>
        </Link>
        <button type="button" className="danger" onClick={() => onDelete(employee)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default memo(EmployeeCard)
