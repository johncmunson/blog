import { PostsByAuthor } from '../../types'

describe('all authors page', () => {
  beforeEach(() => {
    cy.visit('/posts/authors')
  })

  const postsByAuthor = Cypress.env('postsByAuthor') as PostsByAuthor

  it('does not include authors from draft posts', () => {
    expect(Object.keys(postsByAuthor)).not.to.contain('George Washington')
  })

  it('has an author card for every published author', () => {
    cy.dataCy('author-card').assertLength(Object.keys(postsByAuthor).length)
  })

  Object.entries(postsByAuthor).forEach(([authorName, posts]) => {
    it(`links to the author page for ${authorName}`, () => {
      cy.get(`a[href="/posts/authors/${encodeURI(authorName)}"]`)
    })
  })

  it('sorts the authors by number of posts in descending order', () => {
    cy.dataCy('number-of-posts')
      .first()
      .invoke('text')
      .then((textFirst) => {
        const numberOfPostsFirst = Number(textFirst[0])
        cy.dataCy('number-of-posts')
          .last()
          .invoke('text')
          .then((textLast) => {
            const numberOfPostsLast = Number(textLast[0])
            expect(numberOfPostsFirst).to.be.greaterThan(numberOfPostsLast)
          })
      })
  })

  it('has an autolinked header', () => {
    cy.get('h1:contains(Contributors)')
      .find('a')
      .click()
      .url()
      .should('eq', Cypress.config().baseUrl + '/posts/authors')
  })
})
