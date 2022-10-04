import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { logout } from '../reducers/loginReducer'

import { Navbar, Group, Text, Button } from '@mantine/core'

const Navigation = () => {
  const dispatch = useDispatch()
  
  const user = useSelector(state => (state.login))
  const handleLogout = () => dispatch(logout())
  
  return (
    <Navbar width={{ base: 300}} p="sm">
      {user &&
        <Navbar.Section>
          <Group>
            <Text weight={500} mr={-10}>
              {user.name}
            </Text>
            <Text>logged in</Text>
            <Button color="red" onClick={handleLogout}>logout</Button>
          </Group>
        </Navbar.Section>}
      <Navbar.Section mt="sm">
        <Text variant="link" component={Link} to="/">Blogs</Text>
      </Navbar.Section>
      <Navbar.Section mt="sm">
        <Text variant="link" component={Link} to="/users">Users</Text>
      </Navbar.Section>
    </Navbar>
  )
}

export default Navigation