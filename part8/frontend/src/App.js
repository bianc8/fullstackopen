import { useState } from 'react'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Reccomend from './components/Reccomend'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const resultBooks = useQuery(ALL_BOOKS)
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultMe = useQuery(ME)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? 
          (<>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('reccomend')}>reccomend</button>
            <button onClick={logout}>logout</button>
          </>)
          : (
            <LoginForm setToken={setToken} />
          )}
      </div>

      <Authors show={page === 'authors'} authors={resultAuthors.data?.allAuthors} />
      <Books show={page === 'books'} books={resultBooks.data?.allBooks} />
      <NewBook show={page === 'add'} books={resultBooks.data?.allBooks} />
      <Reccomend show={page === 'reccomend'} user={resultMe.data?.me} books={resultBooks.data?.allBooks} />
    </div>
  )
}

export default App
