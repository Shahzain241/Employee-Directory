const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Validates the Add/Edit employee form.
// Returns an object where each key is a field name with an error message.
// An empty object means the form is valid.
export function validateEmployeeForm(values) {
  const errors = {}

  if (!values.firstName.trim()) errors.firstName = 'First name is required'
  if (!values.lastName.trim()) errors.lastName = 'Last name is required'

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address'
  }

  if (!values.phone.trim()) errors.phone = 'Phone number is required'
  if (!values.department.trim()) errors.department = 'Department is required'
  if (!values.company.trim()) errors.company = 'Company is required'
  if (!values.city.trim()) errors.city = 'City is required'
  if (!values.image.trim()) errors.image = 'Profile image URL is required'

  return errors
}
