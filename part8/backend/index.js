require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
      }
      if (args.author && !args.genre) {
        return Book.find({ author: args.author })
      }
      if (!args.author && args.genre) {
        return Book.find({ genres: { $in: [args.genre] } })
      }
      return Book.find({ author: args.author, genres: { $in: [args.genre] } })
    },
    allAuthors: async (root, args) => Author.find({}),
    me: (root, args, { currentUser }) => currentUser,
  },
  Author: {
    bookCount: (args) => Book.find({ author: args.author}).countDocuments(),
  },
  Book: {
    author: (args) => Author.find({ _id: args.author })
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const authors = Author.find({ name: args.author })
      if (!authors) {
        const author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args, })
        }
      }
      const book = new Book({ ...args })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args, })
      }
      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = Author.find({ name: args.author })
      if (!author) {
        return null
      }
      const updatedAuthor = new Author({ ...author, born: args.setBornTo })
      try {
        await updatedAuthor.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args, })
      }
      return updatedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, { invalidArgs: args, })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})