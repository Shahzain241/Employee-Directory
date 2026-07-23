// Small, pure helper functions shared across the app.
// Kept separate from components so they are easy to test and reuse.

export function getFullName(employee) {
  return `${employee.firstName} ${employee.lastName}`
}

// API employees store city under address.city.
// Locally added employees store it directly as employee.city.
export function getCity(employee) {
  return employee.address?.city || employee.city || 'Unknown'
}

export function getDepartment(employee) {
  return employee.company?.department || 'Unknown'
}

export function getCompanyName(employee) {
  return employee.company?.name || 'Unknown'
}

export function getUniqueDepartments(employees) {
  const departments = employees.map(getDepartment)
  return [...new Set(departments)].sort()
}

export function getUniqueCities(employees) {
  const cities = employees.map(getCity)
  return [...new Set(cities)].sort()
}

// Filters employees by search term (first name, last name, email),
// department, and city. "All" skips that filter.
export function filterEmployees(employees, { search = '', department = 'All', city = 'All' }) {
  const term = search.trim().toLowerCase()

  return employees.filter((employee) => {
    const matchesSearch =
      !term ||
      employee.firstName.toLowerCase().includes(term) ||
      employee.lastName.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term)

    const matchesDepartment = department === 'All' || getDepartment(employee) === department
    const matchesCity = city === 'All' || getCity(employee) === city

    return matchesSearch && matchesDepartment && matchesCity
  })
}

export function sortEmployees(employees, order = 'A-Z') {
  const sorted = [...employees].sort((a, b) =>
    getFullName(a).localeCompare(getFullName(b))
  )

  return order === 'Z-A' ? sorted.reverse() : sorted
}

export function calculateStatistics(employees, favoriteIds = []) {
  const total = employees.length
  const totalFavorites = employees.filter((employee) => favoriteIds.includes(employee.id)).length
  const departments = new Set(employees.map(getDepartment)).size
  const cities = new Set(employees.map(getCity)).size

  const employeesWithAge = employees.filter((employee) => typeof employee.age === 'number')
  const averageAge = employeesWithAge.length
    ? Math.round(
        employeesWithAge.reduce((sum, employee) => sum + employee.age, 0) / employeesWithAge.length
      )
    : 0

  return { total, totalFavorites, departments, cities, averageAge }
}
