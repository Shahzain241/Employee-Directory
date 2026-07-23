/** @vitest-environment jsdom */

import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import EmployeeDetails from './EmployeeDetails'
import { getEmployeeById } from '../services/api'

vi.mock('../services/api', () => ({
  getEmployeeById: vi.fn()
}))

describe('EmployeeDetails route', () => {
  beforeEach(() => {
    getEmployeeById.mockResolvedValue({
      id: 7,
      firstName: 'Alex',
      lastName: 'Morgan',
      image: '/alex.png',
      age: 29,
      gender: 'female',
      phone: '555-0100',
      email: 'alex@example.com',
      university: 'Example University'
    })
  })

  it('loads the employee selected by the route parameter', async () => {
    render(
      <MemoryRouter initialEntries={['/employee/7']}>
        <Routes>
          <Route
            path="/employee/:id"
            element={
              <EmployeeDetails
                theme="light"
                toggleTheme={vi.fn()}
                favorites={[]}
                onToggleFavorite={vi.fn()}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByRole('heading', { name: 'Alex Morgan' })).toBeTruthy()
    expect(getEmployeeById).toHaveBeenCalledWith('7', expect.any(AbortSignal))
  })
})