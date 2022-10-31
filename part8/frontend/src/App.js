import { useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Reccomend from './components/Reccomend'

import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from './queries'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks, allAuthors }) => {
    if (allBooks) {
      return {
        allBooks: uniqByTitle(allBooks.concat(addedBook)),
      }
    }
    else if (allAuthors) {
      return {
        allAuthors: uniqByName(allAuthors.concat(addedBook.author)),
      }
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('books')
  const [refetchBooks, setRefetchBooks] = useState(false)
  const resultBooks = useQuery(ALL_BOOKS)
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultMe = useQuery(ME)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData, client }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      updateCache(client.cache, { query: ALL_AUTHORS }, addedBook)
      setRefetchBooks(true)
    },
  })

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
      <Books show={page === 'books'} refetch={refetchBooks} />
      <NewBook show={page === 'add'} books={resultBooks.data?.allBooks} />
      <Reccomend show={page === 'reccomend'} user={resultMe.data?.me} books={resultBooks.data?.allBooks} />
    </div>
  )
}

export default App
