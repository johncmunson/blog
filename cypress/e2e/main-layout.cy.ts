describe('main layout', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('header', () => {
    it('has a header', () => {
      cy.get('header')
    })

    it('has the blog title that links to the homepage', () => {
      cy.visit('/posts/tags')
      cy.dataCy('blog-title').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('has a hamburger menu that opens, closes, and contains the same nav content as the footer', () => {
      cy.dataCy('nav-content', ':visible').should('have.length', 1)
      cy.dataCy('hamburger-menu').click()
      cy.dataCy('nav-content', ':visible').should('have.length', 2)
      cy.dataCy('hamburger-menu').click()
      cy.dataCy('nav-content', ':visible').should('have.length', 1)
    })

    it('has a dark mode toggle that turns dark mode on and off', () => {
      cy.wait(100)
        .then(() => {
          expect(localStorage.getItem('dark-mode')).to.eq('false')
        })
        .dataCy('dark-mode-switch')
        .click()
        .then(() => {
          expect(localStorage.getItem('dark-mode')).to.eq('true')
        })
        .dataCy('dark-mode-switch')
        .click()
        .then(() => {
          expect(localStorage.getItem('dark-mode')).to.eq('false')
        })
    })
  })

  describe('footer', () => {
    it('has a footer with nav content', () => {
      cy.get('footer').find('[data-cy=nav-content]')
      cy.get('footer').contains('Most Popular')
      cy.get('footer').contains('Trending')
      cy.get('footer').contains('Subscribe')
      cy.get('footer').contains('Address')
      cy.get('footer').contains('Downloads')
      cy.get('footer').contains('About')
    })
  })

  describe('newsletter', () => {
    it("let's you submit your email to subscribe to the newsletter", () => {
      cy.dataCy('newsletter-form')
        .find('input[type=email]')
        .type('jeff@gmail.com')
      cy.dataCy('newsletter-form').find('input[type=submit]').click()
      cy.contains('Thank you for subscribing')
    })
  })

  it('wraps other pages besides just the homepage', () => {
    cy.visit('/posts/2022-01-01-lorem-ipsum').get('header').get('footer')
    cy.visit('/posts/tags').get('header').get('footer')
    cy.visit('/posts/tags/one').get('header').get('footer')
    // Even the 404 page should have the main layout
    cy.visit('/abcxyz', { failOnStatusCode: false }).get('header').get('footer')
  })
})
