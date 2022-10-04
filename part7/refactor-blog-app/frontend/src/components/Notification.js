import { useSelector } from 'react-redux'

import { Text } from '@mantine/core'
import { IconCheck, IconMoodSad } from '@tabler/icons'

const Notification = () => {
  const notification = useSelector(state => (state.notification))

  if (!notification.message)
    return null
  
  return (
    <Text color={notification.type === 'success' ? 'green' : 'red'}>
      {notification.type === 'success' ? <IconCheck size={20} /> : <IconMoodSad size={20} />}
      {notification.message}
    </Text>
  )
}

export default Notification