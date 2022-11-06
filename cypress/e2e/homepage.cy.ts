describe('homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('sort order', () => {
    beforeEach(() => {
      cy.dataCy('publish-date-0')
        .invoke('text')
        .as('newDate')
        .dataCy('publish-date-1')
        .invoke('text')
        .as('oldDate')
    })

    // This test avoids using an arrow function as it's callback because we're utilizing
    // Cypress aliases and accessing them with `this`.
    // https://docs.cypress.io/guides/core-concepts/variables-and-aliases
    it('should sort blog posts from most recent to oldest', function () {
      const newDate = new Date(this.newDate)
      const oldDate = new Date(this.oldDate)

      expect(newDate).to.be.greaterThan(oldDate)
    })
  })

  // This is a little overkill for an E2E test, it's probably a little brittle, and it's redundant b/c the
  // sort order tests are already checking for the presence of a publish date. But it was fun to write!
  it('has a publish date for each blog post', () => {
    const publishDateRegex = /20[0-9][0-9]\.[0-1][0-9]\.[0-3][0-9]/
    cy.dataCy('blog-feed')
      .children()
      .each((el, i) => {
        if (i % 2 === 0) {
          if (!publishDateRegex.test(el.text()))
            throw new Error('No publish date found')
        }
      })
  })

  it('links to individual blog posts from the title and from the description', () => {
    cy.dataCy('title-0')
      .click()
      .url()
      .should('include', '/posts/2022-01-01-lorem-ipsum')
    cy.go('back')
    cy.dataCy('description-0')
      .click()
      .url()
      .should('include', '/posts/2022-01-01-lorem-ipsum')
  })

  describe('pagination', () => {
    it('has a "next" link on the first page, but not a "previous" link', () => {
      cy.dataCy('next')
      cy.dataCy('previous').should('not.be.visible')
    })

    it('has a "next" and a "previous" link on the second page and the links work correctly', () => {
      cy.dataCy('next').click()
      cy.url().should('include', 'page=2')
      cy.dataCy('next')
      cy.dataCy('previous').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })
})
