function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-wrapper">
      <label htmlFor="employee-search" className="visually-hidden">
        Search employees
      </label>
      <input
        id="employee-search"
        type="text"
        className="search-bar"
        placeholder="Search by first name, last name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search employees by first name, last name or email"
      />
    </div>
  )
}

export default SearchBar
