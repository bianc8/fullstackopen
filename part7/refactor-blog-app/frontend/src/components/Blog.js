import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useNavigate } from 'react-router-dom'

import { setNotification } from '../reducers/notificationReducer'
import { addLike, removeBlog, addComment } from '../reducers/blogReducer'

import { Title, Text, Button, Container, TextInput, Group, List } from '@mantine/core';


const Blog = () => {
  const [comment, setComment] = useState('')
  const matchBlog = useMatch('/blogs/:id')
  let id = null
  if (matchBlog) {
    id = matchBlog.params.id
  }

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const user = useSelector(state => (state.login))
  const blogs = useSelector(state => (state.blogs))
  const blog = blogs.find(b => b.id===id)
  
  useEffect(() => {
    if (!blog) {
      navigate("/")
    }
  }, [dispatch, blog, navigate])

  let own = null, addedBy = null
  if (blog) {
    own = blog.user && user.username===blog.user.username
    addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
  }
  const handleLikeBlog = async (id) => {
    dispatch(addLike(blog)) 
    dispatch(setNotification(`You liked blog post titled '${blog.title}' by ${blog.author}`, 'success', 5))
  }

  const handleRemoveBlog = async (id) => {
    const ok = window.confirm(`remove '${blog.title}' by ${blog.author}?`)
    if (!ok)
      return
    dispatch(removeBlog(id))
    dispatch(setNotification(`Removed blog post titled '${blog.title}'`, 'error', 5))
    navigate("/")
  }

  const handleChange = (event) => setComment(event.target.value)
  const handleAddComment = (id) => {
    dispatch(addComment(id, comment))
    dispatch(setNotification(`Commented '${comment}' on the post '${blog.title}'`, 'success', 5))
    setComment('')
  }
  
  if (!blog)
    return null
  
  return (
    <div>
      <Title order={1}>{blog.title}</Title>
      <Text size="lg">by {blog.author}</Text>
      <div>
        <div>
          <Text size="lg" variant="link" component="a" href={blog.url}>
            {blog.url}
          </Text>
        </div>
        <Group mt="lg">
          <Text size="md">{blog.likes} likes</Text>
          <Button size="xs" onClick={() => handleLikeBlog(blog.id)}>like</Button>
        </Group>
        <Text size="md"  mt="lg">
          added by {addedBy}
        </Text>
        {own &&
          <Button color="red" size="xs" mt="lg" onClick={() => handleRemoveBlog(blog.id)}>
            Delete blog post
          </Button>}
        <Container mt="lg">
          <Title order={2}>Comments</Title>
          <Group>
            <TextInput
              onChange={handleChange}
              value={comment} 
              placeholder="New comment"
              label="Comment"
              withAsterisk
              />
            <Button mt="xl" onClick={() => handleAddComment(blog.id)}>Add comment</Button>
          </Group>
          <List>
            {blog.comments && 
              blog.comments.length > 0 &&
              blog.comments.map((c,i) => (
                <List.Item key={i}>
                  <Text size="md" >
                    {c}
                  </Text>
                </List.Item>
            ))}
          </List>
        </Container>
      </div>
    </div>
  )
}

export default Blog