import { PostsByTag } from '../../types'

describe('all tags page', () => {
  beforeEach(() => {
    cy.visit('/posts/tags')
  })

  const postsByTag = Cypress.env('postsByTag') as PostsByTag

  it('does not include tags from draft posts', () => {
    expect(Object.keys(postsByTag)).not.to.contain('draft')
  })

  Object.entries(postsByTag).forEach(([tag, posts]) => {
    it(`has a section for the "${tag}" tag that includes all of it's associated posts`, () => {
      cy.dataCy(`tag-${tag}-with-posts`)
        .find(`h2:contains(${tag})`)
        .find(`a[href="/posts/tags/${tag}"]`)
      posts.forEach((post) => {
        cy.dataCy(`tag-${tag}-with-posts`).find(`a[href="/posts/${post.slug}"]`)
      })
    })
  })

  it('has an autolinked header', () => {
    cy.get('h1:contains(Posts tagged with...)')
      .find('a')
      .click()
      .url()
      .should('eq', Cypress.config().baseUrl + '/posts/tags')
  })
})
