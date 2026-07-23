import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getEmployeeById, getEmployees } from './api'

describe('employee API service', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('returns users from a valid response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ users: [{ id: 1 }] })
    }))

    await expect(getEmployees()).resolves.toEqual([{ id: 1 }])
  })

  it('rejects invalid employee data', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ users: 'invalid' })
    }))

    await expect(getEmployees()).rejects.toThrow('Invalid employee data received')
  })

  it('rejects failed employee detail requests', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

    await expect(getEmployeeById(1)).rejects.toThrow('Failed to fetch employee details')
  })
})