import { useState } from 'react'

const NoteForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <label>title:<input id="title" value={newTitle} onChange={handleTitleChange} name='title' placeholder='insert title here' required /></label>
        </div>
        <div>
          <label>author:<input id="author" value={newAuthor} onChange={handleAuthorChange} name='author'  placeholder='insert author here' required /></label>
        </div>
        <div>
          <label>url:<input id="url" value={newUrl} onChange={handleUrlChange} name='url'  placeholder='insert url here' required /></label>
        </div>
        <button id="blog-create" type='submit'>create</button>
      </form>
    </div>
  )
}

export default NoteForm