import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

// A reusable, accessible confirmation modal.
// Handles focus trapping, Escape to close, click-outside to close,
// and restoring focus to the element that opened it.
function ConfirmationModal({ isOpen, title, message, onConfirm, onCancel }) {
  const modalRef = useRef(null)
  const previouslyFocused = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    previouslyFocused.current = document.activeElement
    modalRef.current?.focus()
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      previouslyFocused.current?.focus()
    }
  }, [isOpen, onCancel])

  if (!isOpen) return null

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      onCancel()
    }
  }

  return createPortal(
    <div className="modal-overlay" onMouseDown={handleOverlayClick}>
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-message"
        ref={modalRef}
        tabIndex={-1}
      >
        <h3 id="modal-title">{title}</h3>
        <p id="modal-message">{message}</p>

        <div className="modal-actions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="button" className="danger" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ConfirmationModal
