import { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"

import Navigation from './components/Navigation'
import BlogsList from './components/BlogsList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersList from './components/UsersList'
import User from './components/User'

import { useDispatch, useSelector } from 'react-redux'
import { initializeLogin } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'

import { AppShell, Container } from '@mantine/core'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => (state.login))
  
  // initialize blogs, users and login data 
  useEffect(() => {
    dispatch(initializeLogin())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <AppShell
      padding="md"
      navbar={<Navigation />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Container size="xl">
        <Notification />
        {user === null
          ? <LoginForm />
          : <Routes>
              <Route path='/users/:id' element={<User />} />
              <Route path='/users' element={<UsersList />} />
              <Route path='/blogs/:id' element={<Blog />} />
              <Route path='/' element={<BlogsList />} />
            </Routes>}
      </Container>
    </AppShell>
  )
}

export default App