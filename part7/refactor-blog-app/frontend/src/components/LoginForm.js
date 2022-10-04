import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

import { Container, Title, Button, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

const LoginForm = () => {
  const dispatch = useDispatch()

  const form = useForm({ 
    initialValues: { username: '', password: '' },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    if (form.values.username && form.values.password) {
      dispatch(login(form.values.username, form.values.password))
        .then(() => {
          form.reset()
        })
    }
  }

  return (
    <Container size="xs">
      <Title order={2}>Log into application</Title>
      <form onSubmit={handleSubmit}>
        <TextInput label="username" placeholder="username" {...form.getInputProps('username')} />
        <TextInput label="password" placeholder="password" {...form.getInputProps('password')} />
        <Button id="login-button" type="submit" variant="outline">
          login
        </Button>
      </form>
    </Container>
  )
}

export default LoginForm