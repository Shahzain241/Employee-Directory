import { Link } from 'react-router-dom'

function EmployeeCard({ employee, favorite, onToggleFavorite }) {
  return (
    <div className="employee-card">
      <img
        src={employee.image}
        alt={employee.firstName}
        className="avatar"
        loading="lazy"
        width="96"
        height="96"
      />
      <h3>{employee.firstName} {employee.lastName}</h3>
      <p className="job-title">
        {employee.company?.name} - {employee.company?.department}
      </p>
      <p className="email">{employee.email}</p>

      <div className="card-actions">
        <button
          type="button"
          className={`favorite-btn ${favorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(employee.id)}
          aria-label={`${favorite ? 'Remove' : 'Add'} ${employee.firstName} from favorites`}
        >
          {favorite ? '★ Favorite' : '☆ Favorite'}
        </button>

        <Link to={`/employee/${employee.id}`}>
          <button type="button" className="view-details-btn">View Details</button>
        </Link>
      </div>
    </div>
  )
}

export default EmployeeCard
