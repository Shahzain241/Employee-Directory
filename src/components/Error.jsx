function Error({ message, onRetry }) {
  return (
    <div className="error-box">
      <p>{message || 'Something went wrong. Please try again.'}</p>
      <button onClick={onRetry}>Retry</button>
    </div>
  )
}

export default Error
