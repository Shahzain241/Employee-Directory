function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <p>{message || 'Something went wrong. Please try again.'}</p>
      <button type="button" onClick={onRetry}>Retry</button>
    </div>
  )
}

export default ErrorMessage
