import { useParams, useNavigate, Link } from 'react-router-dom'
import EmployeeForm from '../components/EmployeeForm'
import { useEmployees } from '../hooks/useEmployees'
import { getDepartment, getCompanyName, getCity } from '../utils/employeeHelpers'

function EditEmployee() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { employees, updateEmployee } = useEmployees()

  const employee = employees.find((emp) => String(emp.id) === id)

  if (!employee) {
    return (
      <div className="form-page">
        <p>Employee not found.</p>
        <Link to="/">Back to Directory</Link>
      </div>
    )
  }

  const initialValues = {
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    phone: employee.phone,
    department: getDepartment(employee),
    company: getCompanyName(employee),
    city: getCity(employee),
    image: employee.image,
  }

  function handleSubmit(values) {
    updateEmployee(employee.id, values)
    navigate(`/employees/${employee.id}`)
  }

  return (
    <div className="form-page">
      <h1>Edit Employee</h1>
      <EmployeeForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Save Changes" />
    </div>
  )
}

export default EditEmployee
