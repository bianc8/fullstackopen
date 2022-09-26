describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown',  function() {
    cy.contains('login').click()
    cy.contains('username')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()

      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Superuser logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'root' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Enrico')
      cy.get('#url').type('https://instagram.com')

      cy.contains('create').click()
      cy.contains('a blog created by cypress')
    })

    describe('Like', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'another blog cypress', author: 'Enrico', url: 'http://www.google.com' })
      })

      it('it can be liked', function () {
        cy.contains('another blog cypress Enrico').contains('view').as('theButton').click()
        cy.get('@theButton').parent().find('.blog-likes').find('button').click().then(() => {
          cy.get('@theButton').parent().should('contain', 'likes 1')
        })
      })
    })

    describe('Delete blog', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'Enrico', url: 'http://www.google.com/#1' }).then(() => {
          localStorage.removeItem('loggedBlogAppUser')
          const newUser = {
            name: 'Bob',
            username: 'bob',
            password: 'bob'
          }
          cy.request('POST', 'http://localhost:3003/api/users/', newUser)
          cy.login({ username: 'bob', password: 'bob' })

          cy.visit('http://localhost:3000')
          cy.createBlog({ title: 'second blog', author: 'Enrico', url: 'http://www.google.com/#2' })
          cy.createBlog({ title: 'third blog', author: 'Enrico', url: 'http://www.google.com/#3' })
        })
      })

      it('author Bob can delete his blogs', function () {
        cy.contains('second blog').contains('view').as('secondBlog').click()
        cy.get('@secondBlog').parent().find('.blog-remove').click()
        cy.should('not.contain', 'second blog')
      })

      it('author Bob can\'t delete Enrico\'s blogs', function () {
        cy.contains('first blog').contains('view').as('firstBlog').click()
        cy.get('@firstBlog').parent().find('.blog-remove').should('not.exist')
      })
    })

    describe('Order', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'Enrico', url: 'http://www.google.com/#1' })
        cy.createBlog({ title: 'second blog', author: 'Enrico', url: 'http://www.google.com/#2' })
        cy.createBlog({ title: 'third blog', author: 'Enrico', url: 'http://www.google.com/#3' })
      })

      it('check order', function () {
        cy.get('.blog-content').eq(0).should('contain', 'first blog')
        cy.get('.blog-content').eq(1).should('contain', 'second blog')
        cy.get('.blog-content').eq(2).should('contain', 'third blog').as('thirdBlog')

        cy.get('@thirdBlog').contains('view').click().parent().find('.blog-likes').find('button').click().then(() => {
          cy.visit('http://localhost:3000')
          cy.get('.blog-content').eq(0).should('contain', 'third blog')
        })
      })
    })
  })
})