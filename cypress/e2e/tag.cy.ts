import { PostsByTag, Tag } from '../../types'

describe('tag page', () => {
  const tag = 'three' as Tag

  beforeEach(() => {
    cy.visit(`/posts/tags/${tag}`)
    cy.dataCy('publish-date-0')
      .invoke('text')
      .as('newDate')
      .dataCy('publish-date-1')
      .invoke('text')
      .as('oldDate')
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

  it('should show the correct number of blog posts for this tag', () => {
    expect(posts.length).to.equal(2)
  })

  posts.forEach((post) => {
    it(`has a link to the "${post.frontmatter.title}" blog post`, () => {
      cy.dataCy('blog-feed').find(`a[href="/posts/${post.slug}"]`)
    })
  })

  it('should sort blog posts from most recent to oldest', function () {
    const newDate = new Date(this.newDate)
    const oldDate = new Date(this.oldDate)

    expect(newDate).to.be.greaterThan(oldDate)
  })
})
