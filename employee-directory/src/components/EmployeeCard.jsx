import { Link } from 'react-router-dom'

function EmployeeCard({ employee }) {
  return (
    <div className="employee-card">
      <img src={employee.image} alt={employee.firstName} className="avatar" />
      <h3>{employee.firstName} {employee.lastName}</h3>
      <p className="job-title">
        {employee.company?.name} - {employee.company?.department}
      </p>
      <p className="email">{employee.email}</p>
      <Link to={`/employee/${employee.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  )
}

export default EmployeeCard
