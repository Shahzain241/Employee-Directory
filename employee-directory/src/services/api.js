// Fetch all employees from the API
export async function getEmployees() {
  const response = await fetch('https://dummyjson.com/users')

  if (!response.ok) {
    throw new Error('Failed to fetch employees')
  }

  const data = await response.json()
  return data.users
}

// Fetch a single employee by id
export async function getEmployeeById(id) {
  const response = await fetch(`https://dummyjson.com/users/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch employee details')
  }

  return response.json()
}
