import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorMessage from '../components/ErrorMessage'

describe('ErrorMessage', () => {
  it('renders the given message', () => {
    render(<ErrorMessage message="Could not load employees." onRetry={vi.fn()} />)
    expect(screen.getByText('Could not load employees.')).toBeInTheDocument()
  })

  it('calls onRetry when the Retry button is clicked', () => {
    const onRetry = vi.fn()
    render(<ErrorMessage message="Failed" onRetry={onRetry} />)

    fireEvent.click(screen.getByText('Retry'))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
