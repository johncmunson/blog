describe('blog post', () => {
  beforeEach(() => {
    cy.visit('/posts/2022-01-01-lorem-ipsum')
  })

  describe('frontmatter', () => {
    it("shows an autolinked title and it's the only <h1> on the page", () => {
      cy.assertLength('h1', 1)
    })

    xit('shows the description')

    xit('shows the author')

    xit('shows the coverphoto, if there is one')

    xit('shows the publish date')

    xit('shows the tag(s)')

    xit('has the correct url')
  })

  describe('content', () => {
    xit('has autolinked headers')

    xit('has a paragraph')

    xit('has an image')

    xit('has an image caption')

    xit('allows raw html')
  })
})
