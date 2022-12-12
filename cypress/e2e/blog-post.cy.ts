// This entire test suite could possibly be made dynamic similar to how the tests for the tagging system are dynamic

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

    it('shows the cover photo if there is one, and does not show the content divider', () => {
      cy.dataCy('cover-photo')
      cy.dataCy('content-divider').should('not.exist')
    })

    it('shows the blog post series widget if the post belongs to a series, and does not show the content divider', () => {
      cy.visit('/posts/2020-11-13-end-procrastination')
      cy.dataCy('blog-post-series')
      cy.dataCy('content-divider').should('not.exist')
    })

    it('shows a content divider if there is no cover photo or series widget', () => {
      cy.visit('/posts/2021-12-29-why-is-facebook-not-paying-the-apple-tax')
      cy.dataCy('content-divider')
      cy.dataCy('cover-photo').should('not.exist')
      cy.dataCy('blog-post-series').should('not.exist')
    })

    it('does not publish draft posts', () => {
      cy.visit('/posts/DRAFT-this-is-a-draft', {
        failOnStatusCode: false,
      }).dataCy('404-text')
    })

    it('shows the publish date', () => {
      cy.dataCy('publish-date')
    })

    it('shows the tag(s) and they link to the tags pages', () => {
      cy.dataCy('tags-bar').children().assertLength(4)
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

  describe('pagination', () => {
    it('has a "next" link on the first blog post, but not a "previous" link', () => {
      cy.dataCy('next')
      cy.dataCy('previous').should('not.be.visible')
    })

    it('has a "next" and a "previous" link on the second blog post and the links work correctly', () => {
      cy.dataCy('next').click()
      cy.url().should(
        'include',
        '2021-12-29-why-is-facebook-not-paying-the-apple-tax'
      )
      cy.dataCy('next')
      cy.dataCy('previous').click()
      cy.url().should('include', '2022-01-01-lorem-ipsum')
    })
  })
})
