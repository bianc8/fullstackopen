import { useState, useEffect } from 'react'

const Reccomend = ({ show, books, user }) => {
  const [favouriteBooks, setFavouriteBooks] = useState([]);

  useEffect(() => {
    if (!user || !books) {
      return
    }
    setFavouriteBooks(books.filter(b => b.genres.includes(user.favouriteGenre)))
  }, [books, user])

  if (!show) {
    return null;
  }
  if (!user) {
    return <div>loading me...</div>
  }

  return (
    <>
      <h2>Reccomendations</h2>
      <p>Books in your favorite genre <span style={{"fontWeight": 900}}>{user.favouriteGenre}</span></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>Genres</th>
          </tr>
          {favouriteBooks.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
              <td>{b.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Reccomend