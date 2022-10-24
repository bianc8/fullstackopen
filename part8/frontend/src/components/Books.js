import { useState, useEffect } from 'react'

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState('all')
  const [genres, setGenres] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])

  const updateFilter = (newFilter) => {
    setFilter(newFilter)
    setFilteredBooks(newFilter === 'all' ? books : books.filter(b => b.genres.includes(newFilter)))
  }
  
  const filterGenres = () => {
    if (!books)
      return
    let allGenres = new Set(["all"])
    books.forEach(b => (b.genres.forEach(g => (allGenres.add(g)))))
    setGenres(Array.from(allGenres))
    updateFilter("all")
  }

  useEffect(() => {
    filterGenres()
  }, [books])   // eslint-disable-line

  if (!show) {
    return null
  }
  if (!books) {
    return <div>loading books...</div>
  }

  return (
    <div>
      <h2>books</h2>
      <div style={{'display': 'flex', 'flexDirection': 'row'}}>
        <p>Genres</p>
        {genres.map(g => <button key={g} onClick={() => updateFilter(g)}>{g}</button>)}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>Genres</th>
          </tr>
          {filteredBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
              <td>{b.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
