import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '../components/Pagination'

describe('Pagination', () => {
  it('disables Previous on the first page and Next on the last page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        pageSize={10}
        onPageChange={vi.fn()}
        onPageSizeChange={vi.fn()}
      />
    )

    expect(screen.getByText('Previous')).toBeDisabled()
    expect(screen.getByText('Next')).not.toBeDisabled()
  })

  it('calls onPageChange with the next page when Next is clicked', () => {
    const onPageChange = vi.fn()
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        pageSize={10}
        onPageChange={onPageChange}
        onPageSizeChange={vi.fn()}
      />
    )

    fireEvent.click(screen.getByText('Next'))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageSizeChange when the page size dropdown changes', () => {
    const onPageSizeChange = vi.fn()
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        pageSize={10}
        onPageChange={vi.fn()}
        onPageSizeChange={onPageSizeChange}
      />
    )

    fireEvent.change(screen.getByLabelText(/per page/i), { target: { value: '20' } })
    expect(onPageSizeChange).toHaveBeenCalledWith(20)
  })
})
