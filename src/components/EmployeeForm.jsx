import { useState } from 'react'
import { validateEmployeeForm } from '../utils/validation'

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  department: '',
  company: '',
  city: '',
  image: '',
}

const fields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone Number' },
  { name: 'department', label: 'Department' },
  { name: 'company', label: 'Company' },
  { name: 'city', label: 'City' },
  { name: 'image', label: 'Profile Image URL' },
]

// Reusable, controlled form used for both adding and editing employees.
function EmployeeForm({ initialValues, onSubmit, submitLabel }) {
  const [values, setValues] = useState({ ...emptyForm, ...initialValues })
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const validationErrors = validateEmployeeForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        city: values.city.trim(),
        image: values.image.trim(),
        company: {
          name: values.company.trim(),
          department: values.department.trim(),
        },
      })
    }
  }

  return (
    <form className="employee-form" onSubmit={handleSubmit} noValidate>
      {fields.map((field) => (
        <div className="form-field" key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            type={field.type || 'text'}
            value={values[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
            aria-invalid={Boolean(errors[field.name])}
            aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
          />
          {errors[field.name] && (
            <span className="field-error" id={`${field.name}-error`} role="alert">
              {errors[field.name]}
            </span>
          )}
        </div>
      ))}

      <button type="submit">{submitLabel}</button>
    </form>
  )
}

export default EmployeeForm
