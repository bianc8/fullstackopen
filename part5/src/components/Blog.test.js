import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog, { incrementLikes, handleBlogDelete } from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'title',
  url: 'http://www.google.com',
  author: 'Enrico',
  likes: 11,
  user: {
    name: 'superUser'
  }
}

describe('<Blog />', () => {
  let container
  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        incrementLikes={incrementLikes}
        handleDelete={handleBlogDelete}
        loggedUser='superUser'
      />
    ).container
  })

  test('renders title, author, but not url or likes by default', async () => {
    const element = await screen.findByText('title Enrico')
    expect(element).toBeDefined()

    const div = container.querySelector('.blog-action')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, url and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.blog-action')
    expect(div).not.toHaveStyle('display: none')
  })
})

test('click like twice', async () => {
  const likeBlog = jest.fn()

  render(
    <Blog
      blog={blog}
      incrementLikes={likeBlog}
      handleDelete={handleBlogDelete}
      loggedUser='superUser'
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeBlog.mock.calls).toHaveLength(2)
})
