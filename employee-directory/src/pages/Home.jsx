import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import EmployeeList from '../components/EmployeeList'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { getEmployees } from '../services/api'

function Home() {
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function fetchEmployees() {
    setLoading(true)
    setError(null)

    getEmployees()
      .then((data) => setEmployees(data))
      .catch(() => setError('Could not load employees. Please try again.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const filteredEmployees = employees.filter((employee) => {
    const search_term = search.toLowerCase()
    return (
      employee.firstName.toLowerCase().includes(search_term) ||
      employee.lastName.toLowerCase().includes(search_term) ||
      employee.email.toLowerCase().includes(search_term)
    )
  })

  return (
    <div className="home">
      <h1>Employee Directory</h1>
      <SearchBar value={search} onChange={setSearch} />

      {loading && <Loader />}
      {!loading && error && <Error message={error} onRetry={fetchEmployees} />}
      {!loading && !error && <EmployeeList employees={filteredEmployees} />}
    </div>
  )
}

export default Home
