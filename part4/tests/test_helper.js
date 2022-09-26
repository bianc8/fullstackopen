const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = (user) => [
  {
    title: 'Vlogging is Easy',
    author: 'Enrico',
    url: 'http://www.youtube.com',
    likes: 100,
    user: user
  },
  {
    title: 'G00gl3',
    author: 'Pajeet',
    url: 'http://www.google.com',
    likes: 1,
    user: user
  },
]

const nonExistingId = async () => {
  const note = new Blog({ title: 'willremovethissoon', author: 'Enrico', url: 'http://www.google.com', likes: 69 })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}