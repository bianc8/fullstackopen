import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> calls the event handler right', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('insert title here')
  const authorInput = screen.getByPlaceholderText('insert author here')
  const urlInput = screen.getByPlaceholderText('insert url here')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'testing a form title')
  await user.type(authorInput, 'testing a form author')
  await user.type(urlInput, 'testing a form url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('testing a form title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing a form author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing a form url')
})