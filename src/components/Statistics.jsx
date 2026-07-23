function Statistics({ stats }) {
  const cards = [
    { label: 'Total Employees', value: stats.total },
    { label: 'Favorites', value: stats.totalFavorites },
    { label: 'Departments', value: stats.departments },
    { label: 'Cities', value: stats.cities },
    { label: 'Average Age', value: stats.averageAge },
  ]

  return (
    <div className="statistics">
      {cards.map((card) => (
        <div className="stat-card" key={card.label}>
          <p className="stat-value">{card.value}</p>
          <p className="stat-label">{card.label}</p>
        </div>
      ))}
    </div>
  )
}

export default Statistics
