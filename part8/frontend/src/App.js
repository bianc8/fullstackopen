import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const resultBooks = useQuery(ALL_BOOKS)
  const resultAuthors = useQuery(ALL_AUTHORS)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={resultAuthors.data?.allAuthors} />
      <Books show={page === 'books'} books={resultBooks.data?.allBooks} />
      <NewBook show={page === 'add'} books={resultBooks.data?.allBooks} />
    </div>
  )
}

export default App
