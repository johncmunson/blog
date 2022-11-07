import { PostsByTag, Tag } from '../../types'

describe('tag page', () => {
  const tag = 'three' as Tag

  beforeEach(() => {
    cy.visit(`/posts/tags/${tag}`)
  })

  const postsByTag = Cypress.env('postsByTag') as PostsByTag
  const posts = postsByTag[tag]

  it('has an autolinked header', () => {
    cy.get('h1')
      .find('a')
      .click()
      .url()
      .should('eq', Cypress.config().baseUrl + '/posts/tags/three')
  })

  posts.forEach((post) => {
    it(`has a link to the "${post.frontmatter.title}" blog post`, () => {
      cy.get('ul')
        .find(`a[href="/posts/${post.slug}"]`)
        .should('have.text', post.frontmatter.title)
    })
  })
})
