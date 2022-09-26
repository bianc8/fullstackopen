import { useState } from 'react'

const Blog = ({ blog, incrementLikes, handleDelete, loggedUser }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showDelete = loggedUser === blog.user.name

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    const newBlog = { ...blog, likes: blog.likes+1 }
    incrementLikes(newBlog)
    blog.likes += 1
  }

  return (
    <div style={blogStyle} className='blog-content'>
      {blog.title} {blog.author}<button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className='blog-action'>
        <div className='blog-url'>
          {blog.url}
        </div>
        <div className='blog-likes'>
          likes {blog.likes} <button onClick={addLike}>like</button>
        </div>
        <div>
          {blog.author}
        </div>
        {showDelete ?
          <div>
            <button className='blog-remove' onClick={() => handleDelete(blog)}>remove</button>
          </div> :
          null}
      </div>
    </div>
  )
}

export default Blog