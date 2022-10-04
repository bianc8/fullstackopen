import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { initializeBlogs } from '../reducers/blogReducer'

import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'

import { Container, Grid, Card, Button, Text, Title } from '@mantine/core'

const BlogsList = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogFormRef = useRef()
  const hide = () => blogFormRef.current.toggleVisibility()

  return (
    <>
      <Title order={2} mb="lg">
        Blog Posts
      </Title>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <NewBlogForm hide={hide} />
      </Togglable>
      <Container size="lg" m="lg">
        <Grid grow>
          {blogs.map(blog =>
            <Grid.Col key={blog.id} span={4}>  
              <Card shadow="md" p="lg" radius="md" withBorder>
                <Text weight={500}>{blog.title}</Text>
                <Text>{blog.author}</Text>
                <Button
                  variant="outline"
                  mt="md"
                  radius="md"
                  component={Link}
                  to={`/blogs/${blog.id}`}>
                  View blog post
                </Button>
              </Card>
            </Grid.Col>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default BlogsList
