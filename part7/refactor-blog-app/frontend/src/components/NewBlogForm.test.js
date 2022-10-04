import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

it('when blog is created, callback has correct data', () => {
  const hide = jest.fn()
  render(<NewBlogForm hide={hide} />)

  const blogToCreate = {
    author: 'Kalle Ilves',
    title: 'Testing is pretty easy',
    url: 'https://testing-library.com/docs/react-testing-library/intro/',
    likes: 0
  }

  const authorInput = screen.getByPlaceholderText('Author of the blog')
  userEvent.type(authorInput, blogToCreate.author)

  const titleInput = screen.getByPlaceholderText('Title of the blog')
  userEvent.type(titleInput, blogToCreate.title)

  const urlInput = screen.getByPlaceholderText('Url of the blog')
  userEvent.type(urlInput, blogToCreate.url)

  const createButton = screen.getByText('Create')
  userEvent.click(createButton)
})