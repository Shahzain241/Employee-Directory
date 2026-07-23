import { getCity, getDepartment, getCompanyName, getFullName } from './employeeHelpers'

// Wraps a value in quotes and escapes inner quotes if it contains
// a comma, quote, or newline, so it stays valid inside a CSV file.
function escapeCsvValue(value) {
  const stringValue = String(value ?? '')

  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }

  return stringValue
}

export function exportEmployeesToCsv(employees, filename = 'employees.csv') {
  const headers = ['Full Name', 'Email', 'Phone', 'Company', 'Department', 'City', 'Age']

  const rows = employees.map((employee) => [
    getFullName(employee),
    employee.email,
    employee.phone,
    getCompanyName(employee),
    getDepartment(employee),
    getCity(employee),
    employee.age ?? '',
  ])

  const csvContent = [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
