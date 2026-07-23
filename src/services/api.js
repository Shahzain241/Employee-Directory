// Fetch all employees from the API
// Accepts an optional AbortSignal so the request can be cancelled
// (e.g. when the component unmounts before the response arrives).
export async function getEmployees(signal) {
  const response = await fetch('https://dummyjson.com/users', { signal })

  if (!response.ok) {
    throw new Error('Failed to fetch employees')
  }

  const data = await response.json()

  // Validate the shape of the response before trusting it.
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

  const data = await response.json()

  if (!data || typeof data !== 'object') {
    throw new Error('Invalid employee data received')
  }

  return data
}
