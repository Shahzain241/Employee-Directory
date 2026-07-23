import { describe, it, expect } from 'vitest'
import {
  filterEmployees,
  sortEmployees,
  getUniqueDepartments,
  getUniqueCities,
  calculateStatistics,
} from '../utils/employeeHelpers'

const employees = [
  {
    id: 1,
    firstName: 'Zara',
    lastName: 'Khan',
    email: 'zara@test.com',
    age: 30,
    company: { name: 'Acme', department: 'Engineering' },
    address: { city: 'Lahore' },
  },
  {
    id: 2,
    firstName: 'Ali',
    lastName: 'Raza',
    email: 'ali@test.com',
    age: 24,
    company: { name: 'Beta', department: 'Sales' },
    address: { city: 'Karachi' },
  },
]

describe('filterEmployees', () => {
  it('filters by search term across name and email', () => {
    const result = filterEmployees(employees, { search: 'ali', department: 'All', city: 'All' })
    expect(result).toHaveLength(1)
    expect(result[0].firstName).toBe('Ali')
  })

  it('trims whitespace from the search term', () => {
    const result = filterEmployees(employees, { search: '  ali  ', department: 'All', city: 'All' })
    expect(result).toHaveLength(1)
  })

  it('filters by department', () => {
    const result = filterEmployees(employees, { search: '', department: 'Sales', city: 'All' })
    expect(result).toHaveLength(1)
    expect(result[0].firstName).toBe('Ali')
  })

  it('filters by city', () => {
    const result = filterEmployees(employees, { search: '', department: 'All', city: 'Lahore' })
    expect(result).toHaveLength(1)
    expect(result[0].firstName).toBe('Zara')
  })

  it('combines search, department, and city filters', () => {
    const result = filterEmployees(employees, { search: 'zara', department: 'Engineering', city: 'Lahore' })
    expect(result).toHaveLength(1)
  })
})

describe('sortEmployees', () => {
  it('sorts A-Z by full name', () => {
    const result = sortEmployees(employees, 'A-Z')
    expect(result[0].firstName).toBe('Ali')
    expect(result[1].firstName).toBe('Zara')
  })

  it('sorts Z-A by full name', () => {
    const result = sortEmployees(employees, 'Z-A')
    expect(result[0].firstName).toBe('Zara')
    expect(result[1].firstName).toBe('Ali')
  })
})

describe('getUniqueDepartments / getUniqueCities', () => {
  it('returns unique, sorted department names', () => {
    expect(getUniqueDepartments(employees)).toEqual(['Engineering', 'Sales'])
  })

  it('returns unique, sorted city names', () => {
    expect(getUniqueCities(employees)).toEqual(['Karachi', 'Lahore'])
  })
})

describe('calculateStatistics', () => {
  it('computes totals, departments, cities, and average age', () => {
    const stats = calculateStatistics(employees, [1])
    expect(stats.total).toBe(2)
    expect(stats.totalFavorites).toBe(1)
    expect(stats.departments).toBe(2)
    expect(stats.cities).toBe(2)
    expect(stats.averageAge).toBe(27)
  })
})
