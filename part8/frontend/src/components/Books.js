import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show, refetch }) => {
  const [filter, setFilter] = useState('all')
  const [genres, setGenres] = useState([])
  const [doneGenres, setDoneGenres] = useState(false)
  const resultBooks = useQuery(ALL_BOOKS, {
    variables: { genre: filter === 'all' ? '' : filter },
  })
  let books = resultBooks?.data?.allBooks

  // add genres to state
  useEffect(() => {
    if (books && !doneGenres) {
      let allGenres = new Set(["all"])
      books.forEach(b => (b.genres.forEach(g => (allGenres.add(g)))))
      setGenres(Array.from(allGenres))
      setDoneGenres(true)
    }
  }, [books])  // eslint-disable-line

  useEffect(() => {
    resultBooks.refetch()
  }, [refetch]) // eslint-disable-line

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <div style={{'display': 'flex', 'flexDirection': 'row'}}>
        <p>Genres</p>
        {genres?.map(g => <button key={g} onClick={() => setFilter(g)}>{g}</button>)}
      </div>
      {!books ? <h2>Loading books...</h2> : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
              <th>Genres</th>
            </tr>
            {books?.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
                <td>{b.genres.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>)}
    </div>
  )
}

export default Books
