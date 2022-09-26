import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'

import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const sortLikes = (a, b) => a.likes > b.likes ? -1 : 1

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort(sortLikes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog).sort(sortLikes))
        setErrorMessage(`a new blog '${blogObject.title}' added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const incrementLikes = (newBlog) => {
    blogService.update(newBlog.id, newBlog)
    setBlogs(blogs.map(b => b.id === newBlog.id ? newBlog : b).sort(sortLikes))
  }

  const handleBlogDelete = (blog) => {
    let c = window.confirm(`Remove blog '${blog.title}' by '${blog.author}'`)
    if (c) {
      blogService
        .deleteOne(blog.id)
        .then(() => {
          setErrorMessage(`blog '${blog.title}' removed`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setBlogs(blogs.filter(b => b.id !== blog.id).sort(sortLikes))
        })
    }
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout.bind(this)}>logout</button></p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              incrementLikes={incrementLikes.bind(this)}
              handleDelete={handleBlogDelete.bind(this)}
              loggedUser={user.name}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App
