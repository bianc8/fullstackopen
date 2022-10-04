import { useDispatch } from 'react-redux'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Title, TextInput, Button } from '@mantine/core'
import { useForm } from '@mantine/form'

const NewBlogForm = ({ hide }) => {
  const form = useForm({
    initialValues: {
      title: '',
      author: '',
      url: '',
    },
  });

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (form.values.title && form.values.author && form.values.url) {
      dispatch(createBlog({ title: form.values.title, author: form.values.author, url: form.values.url, likes: 0 }))
      dispatch(setNotification(`You've added a new blog: '${form.values.title}' author ${form.values.author}`, 'success', 5))
      form.reset()
      hide()
    }
  }


  return (
    <div>
      <Title order={3}>Create new blog</Title>

      <form onSubmit={handleSubmit}>
        <TextInput
          placeholder='Title of the blog'
          label="Title"
          withAsterisk
          {...form.getInputProps('title')} 
        />
        <TextInput
          placeholder='Author of the blog'
          label="Author"
          withAsterisk
          {...form.getInputProps('author')} 
        />
        <TextInput
          placeholder='Url of the blog'
          label="Url"
          withAsterisk
          {...form.getInputProps('url')} 
        />
        <Button type='submit' size="md" mt="lg">Create</Button>
      </form>
    </div>
  )
}

export default NewBlogForm