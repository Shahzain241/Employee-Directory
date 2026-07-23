import { useNavigate } from 'react-router-dom'
import EmployeeForm from '../components/EmployeeForm'
import { useEmployees } from '../hooks/useEmployees'

function AddEmployee() {
  const navigate = useNavigate()
  const { addEmployee } = useEmployees()

  function handleSubmit(values) {
    addEmployee(values)
    navigate('/')
  }

  return (
    <div className="form-page">
      <h1>Add Employee</h1>
      <EmployeeForm onSubmit={handleSubmit} submitLabel="Add Employee" />
    </div>
  )
}

export default AddEmployee
