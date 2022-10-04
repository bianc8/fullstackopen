import { Link, useMatch, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Container, Group, Grid, Card, Button, Text } from '@mantine/core'
import { useEffect } from 'react'

const User = () => {
  const navigate = useNavigate()
  const matchUser = useMatch('/users/:id')
  let id = null
  if (matchUser) {
    id = matchUser.params.id
  }
  const users = useSelector(state => (state.users))
  const user = users.find(u => u.id===id)

  useEffect(()=> {
    if (!user)
      navigate("/users")
  }, [user, navigate])
  
  if (!user)
    return null
  
  return (
    <div>
      <h2>Users</h2>
      <Group>
        <Text weight={500} mr={-10}>{user.name}</Text>
        <Text>added these blog posts</Text>
      </Group>
      <Container size="lg" m="lg">
        <Grid grow mt="lg">
          {user.blogs.map(blog => (
            <Grid.Col key={blog.id} span={4}>  
              <Card shadow="md" p="lg" radius="md" withBorder>
                <Text weight={500}>{blog.title}</Text>
                <Text>{blog.author}</Text>
                <Button variant="outline" mt="md" radius="md" component={Link} to={`/blogs/${blog.id}`}>
                  View blog post
                </Button>
              </Card>
            </Grid.Col>))}
        </Grid>
      </Container>
    </div>
  )
}

export default User