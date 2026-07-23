import { describe, it, expect } from 'vitest'
import { validateEmployeeForm } from '../utils/validation'

const validValues = {
  firstName: 'Ali',
  lastName: 'Raza',
  email: 'ali@test.com',
  phone: '0300-1234567',
  department: 'Engineering',
  company: 'Acme',
  city: 'Lahore',
  image: 'https://example.com/avatar.png',
}

describe('validateEmployeeForm', () => {
  it('returns no errors for a fully valid form', () => {
    expect(validateEmployeeForm(validValues)).toEqual({})
  })

  it('flags required fields that are empty', () => {
    const errors = validateEmployeeForm({ ...validValues, firstName: '', city: '' })
    expect(errors.firstName).toBeDefined()
    expect(errors.city).toBeDefined()
  })

  it('flags an invalid email format', () => {
    const errors = validateEmployeeForm({ ...validValues, email: 'not-an-email' })
    expect(errors.email).toBeDefined()
  })

  it('requires an email to be present', () => {
    const errors = validateEmployeeForm({ ...validValues, email: '' })
    expect(errors.email).toBe('Email is required')
  })
})
