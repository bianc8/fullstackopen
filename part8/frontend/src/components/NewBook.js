import { useState } from 'react'
import { useMutation } from '@apollo/client'

import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = ({ show, books }) => {
  const [title, setTitle] = useState('New Book')
  const [author, setAuthor] = useState('Robert Martin')
  const [published, setPublished] = useState('2020')
  const [genre, setGenre] = useState('fiction')
  const [genres, setGenres] = useState(['fiction'])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    //refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error)
      //setError(error.graphQLErrors[0].message)
    },
    update: (cache, response) => {
      console.log(response.data)
      cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return { allBooks: allBooks.concat(response.data.addBook) }
      })
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.map((a) => a.name === response.data.addBook.author.name ? response.data.addBook.author : a) 
        }
      })
    }
  })  

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    let foundBook = books.filter(b => b.title === title)
    if (!foundBook.length) {
      createBook({  variables: { title, author, published: parseInt(published), genres } })

      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    } else {
      console.log('Book already exists')
    }
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          published
          <input type="number" value={published} onChange={({ target }) => setPublished(target.value)} />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
