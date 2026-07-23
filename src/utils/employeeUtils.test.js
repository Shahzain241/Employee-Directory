import { describe, expect, it } from 'vitest'
import {
  getFilteredEmployees,
  getPaginatedEmployees,
  getSortedEmployees,
  toggleFavoriteId
} from './employeeUtils'

const employees = [
  { id: 1, firstName: 'Zoe', lastName: 'Adams', email: 'zoe@example.com' },
  { id: 2, firstName: 'Amy', lastName: 'Brown', email: 'amy@example.com' },
  { id: 3, firstName: 'Sam', lastName: 'Cole', email: 'sam@example.com' }
]

describe('employee utilities', () => {
  it('trims search terms and matches names or email addresses', () => {
    expect(getFilteredEmployees(employees, '  AMY  ')).toEqual([employees[1]])
    expect(getFilteredEmployees(employees, 'example.com')).toHaveLength(3)
  })

  it('sorts employees in both directions without mutating the source', () => {
    expect(getSortedEmployees(employees, 'asc').map((employee) => employee.firstName)).toEqual(['Amy', 'Sam', 'Zoe'])
    expect(getSortedEmployees(employees, 'desc').map((employee) => employee.firstName)).toEqual(['Zoe', 'Sam', 'Amy'])
    expect(employees[0].firstName).toBe('Zoe')
  })

  it('returns the requested page', () => {
    expect(getPaginatedEmployees(employees, 2, 2)).toEqual([employees[2]])
  })

  it('adds and removes favorite ids', () => {
    expect(toggleFavoriteId([], 2)).toEqual([2])
    expect(toggleFavoriteId([2], 2)).toEqual([])
  })
})