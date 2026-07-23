import { useState, useEffect, useCallback, useMemo } from 'react'
import { getEmployees } from '../services/api'
import { useLocalStorage } from './useLocalStorage'

const ADDED_KEY = 'employee-directory-added'
const EDITS_KEY = 'employee-directory-edits'
const DELETED_KEY = 'employee-directory-deleted'

// Manages fetching employees from the API, plus locally added,
// edited, and deleted employees, all persisted in localStorage.
export function useEmployees() {
  const [apiEmployees, setApiEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [addedEmployees, setAddedEmployees] = useLocalStorage(ADDED_KEY, [])
  const [edits, setEdits] = useLocalStorage(EDITS_KEY, {})
  const [deletedIds, setDeletedIds] = useLocalStorage(DELETED_KEY, [])

  const fetchEmployees = useCallback(async (signal) => {
    setLoading(true)
    setError(null)

    try {
      const data = await getEmployees(signal)
      setApiEmployees(data)
    } catch (err) {
      // A cancelled request is not a real error, so it is ignored.
      if (err.name === 'AbortError') return

      console.error('Employee request failed:', err)
      setError('Could not load employees. Please try again.')
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchEmployees(controller.signal)

    // Cancel the request if the component unmounts before it finishes.
    return () => controller.abort()
  }, [fetchEmployees])

  const retry = useCallback(() => {
    const controller = new AbortController()
    fetchEmployees(controller.signal)
  }, [fetchEmployees])

  // Combines API employees with local additions, applies any local
  // edits, and removes anything the user has deleted.
  const employees = useMemo(() => {
    return [...apiEmployees, ...addedEmployees]
      .filter((employee) => !deletedIds.includes(employee.id))
      .map((employee) =>
        edits[employee.id] ? { ...employee, ...edits[employee.id] } : employee
      )
  }, [apiEmployees, addedEmployees, edits, deletedIds])

  function addEmployee(newEmployee) {
    const employeeWithId = { ...newEmployee, id: Date.now() }
    setAddedEmployees((prev) => [...prev, employeeWithId])
    return employeeWithId
  }

  function updateEmployee(id, updatedFields) {
    const isLocallyAdded = addedEmployees.some((employee) => employee.id === id)

    if (isLocallyAdded) {
      setAddedEmployees((prev) =>
        prev.map((employee) =>
          employee.id === id ? { ...employee, ...updatedFields } : employee
        )
      )
    } else {
      setEdits((prev) => ({ ...prev, [id]: { ...prev[id], ...updatedFields } }))
    }
  }

  function deleteEmployee(id) {
    setDeletedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  return { employees, loading, error, retry, addEmployee, updateEmployee, deleteEmployee }
}
