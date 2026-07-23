// Builds a small window of page numbers around the current page,
// so we don't render 40+ buttons when there are many pages.
function getPageWindow(current, total, delta = 2) {
  const start = Math.max(1, current - delta)
  const end = Math.min(total, current + delta)
  const pages = []

  for (let page = start; page <= end; page++) {
    pages.push(page)
  }

  return pages
}

function Pagination({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange }) {
  const pageWindow = getPageWindow(currentPage, totalPages)
  const showLeftEllipsis = pageWindow[0] > 2
  const showRightEllipsis = pageWindow[pageWindow.length - 1] < totalPages - 1

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageWindow[0] > 1 && (
        <>
          <button type="button" onClick={() => onPageChange(1)}>1</button>
          {showLeftEllipsis && <span className="ellipsis">...</span>}
        </>
      )}

      {pageWindow.map((page) => (
        <button
          type="button"
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {pageWindow[pageWindow.length - 1] < totalPages && (
        <>
          {showRightEllipsis && <span className="ellipsis">...</span>}
          <button type="button" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        Next
      </button>

      <label className="page-size">
        Per page
        <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </label>

      <span className="page-info">
        Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
      </span>
    </div>
  )
}

export default Pagination
