import blogService from '../services/blogs'

import { createSlice } from '@reduxjs/toolkit'

const byLikes = (a, b) => b.likes > a.likes ? 1 : -1

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const id = action.payload.id
      return state
        .map(a => a.id !== id ? a : action.payload)
        .sort(byLikes)
    },
    appendBlog(state, action){
      state.push(action.payload)
      state.sort(byLikes)
    },
    removeBlogById(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  }
})
export const { updateBlog, appendBlog, removeBlogById, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort(byLikes)))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const addLike = (blog) => {
  const likedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, likedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlogById(id))
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const blog = await blogService.addComment(id, comment)
    dispatch(updateBlog(blog))
  }
}

export default blogSlice.reducer