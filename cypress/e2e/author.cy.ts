import { PostsByAuthor } from '../../types'

describe('author page', () => {
  const author = 'John Munson'

  beforeEach(() => {
    cy.visit(`/posts/authors/${encodeURI(author)}`)
    cy.dataCy('publish-date-0')
      .invoke('text')
      .as('newDate')
      .dataCy('publish-date-1')
      .invoke('text')
      .as('oldDate')
  })

  const postsByAuthor = Cypress.env('postsByAuthor') as PostsByAuthor
  const posts = postsByAuthor[author]

  it('should show the author name', () => {
    cy.contains(author)
  })

  it('should show the number of posts published by the author', () => {
    cy.contains(`${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`)
  })

  it('should show an image of the author', () => {
    cy.get(`img[alt="${author}"`)
  })

  it('should show the author bio', () => {
    cy.dataCy('author-bio')
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
