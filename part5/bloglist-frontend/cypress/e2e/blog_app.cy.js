describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Matti Luukkainen logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.contains('wrong username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'mluukkai', password: 'salainen' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Testing creation')
            cy.get('#author').type('cypress')
            cy.get('#url').type('http://example.com')
            cy.contains('create').click()
            cy.contains('a new blog Testing creation by cypress added')
        })

        describe('and a blogs exists', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'Default blog', author: 'cypress', url: 'http://example.com', likes: 5 })
                cy.createBlog({ title: 'Default second blog', author: 'cypress', url: 'http://example.com', likes: 3 })
                cy.createBlog({ title: 'Default third blog', author: 'cypress', url: 'http://example.com', likes: 7 })
            })

            it('it can be liked', function() {
                cy.contains('Default second blog').contains('view').click()
                cy.contains('likes 3').find('button').click()
                cy.contains('likes 4')
            })

            it('it can be deleted', function() {
                cy.contains('Default blog').find('button').as('view').click()
                cy.contains('likes 5').parent().contains('remove').click()
            })

            it('are sorted in the right way', function() {
                cy.get('.blog').eq(0).should('contain', 'Default third blog')
                cy.get('.blog').eq(1).should('contain', 'Default blog')
                cy.get('.blog').eq(2).should('contain', 'Default second blog')
                cy.get('.blog').eq(2).contains('view').click()
                cy.get('.blog').eq(2).contains('like').as('like')
                cy.get('@like').click()
                cy.wait(200)
                cy.get('@like').click()
                cy.wait(200)
                cy.get('@like').click()
                cy.wait(200)
                cy.get('.blog').eq(0).should('contain', 'Default third blog')
                cy.get('.blog').eq(1).should('contain', 'Default second blog')
                cy.get('.blog').eq(2).should('contain', 'Default blog')
            })
        })
    })
})