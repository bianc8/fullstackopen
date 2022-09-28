import { useNavigate } from 'react-router-dom'

import { Input, Button } from './styled'

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username:
          <Input />
        </div>
        <div>
          Password:
          <Input type='password' />
        </div>
        <div>
          <Button type="submit" primary=''>login</Button>
        </div>
      </form>
    </div>
  )
}

export default Login