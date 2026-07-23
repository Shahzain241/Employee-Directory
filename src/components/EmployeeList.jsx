import EmployeeCard from './EmployeeCard'

function EmployeeList({ employees, favoriteIds, onToggleFavorite, onDelete, view }) {
  if (employees.length === 0) {
    return <p className="no-results">No employees found.</p>
  }

  return (
    <div className={`employee-list ${view === 'list' ? 'list-view' : 'grid-view'}`}>
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          isFavorite={favoriteIds.includes(employee.id)}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          view={view}
        />
      ))}
    </div>
  )
}

export default EmployeeList
