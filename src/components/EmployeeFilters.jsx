function EmployeeFilters({
  departments,
  cities,
  department,
  city,
  sortOrder,
  view,
  onDepartmentChange,
  onCityChange,
  onSortChange,
  onViewChange,
}) {
  return (
    <div className="employee-filters">
      <label>
        Department
        <select value={department} onChange={(e) => onDepartmentChange(e.target.value)}>
          <option value="All">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </label>

      <label>
        City
        <select value={city} onChange={(e) => onCityChange(e.target.value)}>
          <option value="All">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>

      <label>
        Sort
        <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
          <option value="A-Z">Name: A-Z</option>
          <option value="Z-A">Name: Z-A</option>
        </select>
      </label>

      <div className="view-toggle" role="group" aria-label="Choose view">
        <button
          type="button"
          className={view === 'grid' ? 'active' : ''}
          onClick={() => onViewChange('grid')}
          aria-pressed={view === 'grid'}
        >
          Grid
        </button>
        <button
          type="button"
          className={view === 'list' ? 'active' : ''}
          onClick={() => onViewChange('list')}
          aria-pressed={view === 'list'}
        >
          List
        </button>
      </div>
    </div>
  )
}

export default EmployeeFilters
