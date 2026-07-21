import EmployeeCard from './EmployeeCard'

function EmployeeList({ employees, favorites, onToggleFavorite }) {
  if (employees.length === 0) {
    return <p className="no-results">No employees found.</p>
  }

  return (
    <div className="employee-list">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          favorite={favorites.includes(Number(employee.id))}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default EmployeeList
