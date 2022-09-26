const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return {}

  let max = blogs[0].likes
  let maxBlog = blogs[0]

  blogs.map((blog) => {
    if (blog.likes > max) {
      max = blog.likes
      maxBlog = blog
    }
  })
  return maxBlog
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return {}

  // authors: {blog.author: count}
  let authors = {}
  let maxCount = 0
  let maxAuthor = {}

  blogs.map((blog) => {
    authors[blog.author] = blog.author in authors ? authors[blog.author] + 1 : 1

    if (authors[blog.author] > maxCount) {
      maxCount = authors[blog.author]
      maxAuthor = {
        author: blog.author,
        blogs: authors[blog.author]
      }
    }
  })

  return maxAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return {}

  // authors = {author.name: like counter}
  let authors = {}
  let maxLikesPost = 0
  let maxAuthor = {}

  blogs.map((blog) => {
    authors[blog.author] = blog.author in authors ? authors[blog.author] + blog.likes : blog.likes

    if (blog.likes > maxLikesPost) {
      maxLikesPost = blog.likes
      maxAuthor = {
        author: blog.author,
        likes: authors[blog.author]
      }
    }
  })

  return maxAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}