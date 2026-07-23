export function getFilteredEmployees(employees, search) {
  const searchTerm = search.trim().toLowerCase()

  return employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase()
    const email = employee.email.toLowerCase()

    return fullName.includes(searchTerm) || email.includes(searchTerm)
  })
}

export function getSortedEmployees(employees, sortOrder) {
  return [...employees].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase()
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase()

    return sortOrder === 'asc'
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA)
  })
}

export function getPaginatedEmployees(employees, currentPage, employeesPerPage) {
  const start = (currentPage - 1) * employeesPerPage

  return employees.slice(start, start + employeesPerPage)
}

export function toggleFavoriteId(favorites, id) {
  return favorites.includes(id)
    ? favorites.filter((favoriteId) => favoriteId !== id)
    : [...favorites, id]
}