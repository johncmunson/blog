describe('blog post', () => {
  beforeEach(() => {
    cy.visit('/posts/2022-01-01-lorem-ipsum')
  })

  describe('frontmatter', () => {
    it("shows an autolinked title and it's the only <h1> on the page", () => {
      cy.get('h1')
        .assertLength(1)
        .find('a')
        .click()
        .url()
        .should(
          'eq',
          Cypress.config().baseUrl + '/posts/2022-01-01-lorem-ipsum'
        )
    })

    it('shows the description', () => {
      cy.dataCy('description')
    })

    it('shows the author', () => {
      cy.dataCy('author')
    })

    it('shows the cover photo, if there is one', () => {
      cy.dataCy('cover-photo')
      cy.visit('/posts/2021-12-29-why-is-facebook-not-paying-the-apple-tax')
      cy.dataCy('cover-photo').should('not.exist')
    })

    it('shows the publish date', () => {
      cy.dataCy('publish-date')
    })

    it('shows the tag(s) and they link to the tags pages', () => {
      cy.dataCy('tags-bar').children().assertLength(3)
      cy.dataCy('tags-link')
        .click()
        .url()
        .should('eq', Cypress.config().baseUrl + '/posts/tags')
      cy.go('back')
      cy.dataCy('tag-0-link')
        .click()
        .url()
        .should('eq', Cypress.config().baseUrl + '/posts/tags/one')
    })
  })

  describe('content', () => {
    it('has autolinked headers', () => {
      cy.get('article')
        .find('h2')
        .assertLength(3)
        .first()
        .find('a')
        .click()
        .location('hash')
        .should('eq', '#what-is-lorem-ipsum')
    })

    it('has paragraphs', () => {
      cy.get('article').find('p').assertLength(2)
    })

    it('has an image with a caption', () => {
      cy.get('article').find('figure').find('img')
      cy.get('article').find('figure').find('figcaption')
    })

    it('allows raw html', () => {
      cy.dataCy('raw-div')
    })
  })
})
