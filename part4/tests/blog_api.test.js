const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

// wait for each promise in order
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const newUser = {
    'username': 'root',
    'name': 'Superuser',
    'password': 'root'
  }
  await api
    .post('/api/users')
    .send(newUser)

  const user = await User.findOne({ 'username': 'root' })

  await Blog.insertMany(helper.initialBlogs(user._id.toString()))
})

describe('when there is initially some blogs saved', () => {
  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs('').length)

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(
      helper.initialBlogs('')[0].title
    )
  })

  test('verify uuid is id, not _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(r => {
      expect(r.id).toBeDefined()
      expect(r._id).not.toBeDefined()
    })
  })
})

describe('add some blogs', () => {
  let token
  beforeEach(async () => {
    const rootUser = {
      'username': 'root',
      'password': 'root'
    }
    token = 'bearer ' + await api
      .post('/api/login')
      .send(rootUser)
      .then(res => res.body.token)
  })

  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'New blog in God',
      author: 'Jesus',
      url: 'http://www.ihategiuda.com',
      likes: 33
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs('').length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      newBlog.title
    )
  })

  test('if likes property is missing, the default value is 0', async () => {
    const newBlog = {
      title: 'Zero likes and baguska',
      author: 'Chad',
      url: 'http://www.bagooska.com',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const savedBlog = blogsAtEnd.filter(b => b.title === newBlog.title)[0]
    expect(savedBlog.likes).toBe(0)
  })

  test('fails with status 400, without title and url property', async () => {
    const newBlog = {
      author: 'Enrico',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .set('Authorization', token)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs('').length)
  })

  test('fails with status 401 if no authorization token is provided', async () => {
    const newBlog = {
      title: 'Zero likes and baguska',
      author: 'Chad',
      url: 'http://www.bagooska.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('viewing a specific blog', () => {
  test('with a valid id ', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with status 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  let token
  beforeEach(async () => {
    const rootUser = {
      'username': 'root',
      'password': 'root'
    }
    token = 'bearer ' + await api
      .post('/api/login')
      .send(rootUser)
      .then(res => res.body.token)
  })

  test('succeed with status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs('').length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status 400 if id is not valid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .set('Authorization', token)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs('').length)
  })

  test('fails with status 401 if authorization token is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
  })
})

describe('update a blog', () => {
  test('succeeds with status 200 if data is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[1]
    const blogLikes = blogToUpdate.likes
    blogToUpdate.likes += 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.filter(b => b.id === blogToUpdate.id)[0]
    expect(updatedBlog.likes).toBe(blogLikes + 1)
  })

  test('fails with status 400 if id is not valid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes += 1

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(blogToUpdate)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.filter(b => b.id === blogToUpdate.id)[0]
    expect(updatedBlog.likes).toBe(blogToUpdate.likes - 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})