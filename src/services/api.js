// Fetch all employees from the API
export async function getEmployees(signal) {
  const response = await fetch('https://dummyjson.com/users', { signal })

  if (!response.ok) {
    throw new Error('Failed to fetch employees')
  }

  const data = await response.json()

  if (!Array.isArray(data.users)) {
    throw new Error('Invalid employee data received')
  }

  return data.users
}

// Fetch a single employee by id
export async function getEmployeeById(id, signal) {
  const response = await fetch(`https://dummyjson.com/users/${id}`, { signal })

  if (!response.ok) {
    throw new Error('Failed to fetch employee details')
  }

  return response.json()
}
