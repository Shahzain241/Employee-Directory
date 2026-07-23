import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import EmployeeCard from '../components/EmployeeCard'

const employee = {
  id: 1,
  firstName: 'Zara',
  lastName: 'Khan',
  email: 'zara@test.com',
  image: 'https://example.com/zara.png',
  company: { name: 'Acme', department: 'Engineering' },
}

function renderCard(props = {}) {
  return render(
    <MemoryRouter>
      <EmployeeCard
        employee={employee}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
        onDelete={vi.fn()}
        view="grid"
        {...props}
      />
    </MemoryRouter>
  )
}

describe('EmployeeCard', () => {
  it('renders employee name, email, and company/department', () => {
    renderCard()
    expect(screen.getByText('Zara Khan')).toBeInTheDocument()
    expect(screen.getByText('zara@test.com')).toBeInTheDocument()
    expect(screen.getByText('Acme - Engineering')).toBeInTheDocument()
  })

  it('calls onToggleFavorite with the employee id when the star is clicked', () => {
    const onToggleFavorite = vi.fn()
    renderCard({ onToggleFavorite })

    fireEvent.click(screen.getByRole('button', { name: /add zara khan from favorites/i }))
    expect(onToggleFavorite).toHaveBeenCalledWith(1)
  })

  it('calls onDelete with the employee when Delete is clicked', () => {
    const onDelete = vi.fn()
    renderCard({ onDelete })

    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(onDelete).toHaveBeenCalledWith(employee)
  })
})
