function SearchBar({ value, onChange }) {
  return (
    <label className="search-label">
      <span>Search employees</span>
      <input
        type="search"
        className="search-bar"
        placeholder="Search by first name, last name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

export default SearchBar
