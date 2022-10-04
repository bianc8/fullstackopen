import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeUsers } from '../reducers/usersReducer'

import { Container, Title, Table, Text } from '@mantine/core'

const UsersList = () => {
  const dispatch = useDispatch()

  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])



  return (
    <div>
      <Title order={2}>
        Users
      </Title>
      <Container size="xs">
        <Table fontSize="lg">
          <thead>
            <tr>
              <th>User</th>
              <th>Blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user =>
              <tr key={user.id}>
                <td>
                  <Text component={Link} to={`/users/${user.id}`} variant="link">
                    {user.name}
                  </Text>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default UsersList
