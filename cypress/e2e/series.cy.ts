describe('blog post series', () => {
  beforeEach(() => {
    cy.visit('/posts/2020-11-13-end-procrastination')
  })

  it('shows the series widget if a post is part of a series', () => {
    cy.dataCy('blog-post-series')
    cy.visit('/posts/2022-01-01-lorem-ipsum')
    cy.dataCy('blog-post-series').should('not.exist')
  })

  it('shows the series title and says how many posts are in the series', () => {
    cy.dataCy('blog-post-series').contains('This Is A Series (5 Part Series)')
  })

  it('renders the correct number of posts in the series in the correct order', () => {
    cy.dataCy('blog-post-series')
      .find('ol')
      .children()
      .assertLength(5)
      .first()
      .contains('End Procrastination')
    cy.dataCy('blog-post-series')
      .find('ol')
      .children()
      .last()
      .contains('This Is Another Draft In A Series')
  })

  it('does not render a link for the current post', () => {
    cy.dataCy('blog-post-series')
      .contains('End Procrastination')
      .click()
      .url()
      .should('include', '2020-11-13-end-procrastination')
  })

  it('renders links for the other posts that have been published', () => {
    cy.dataCy('blog-post-series')
      .contains('How to Use MDX With Custom Components')
      .click()
      .url()
      .should('include', '2021-01-01-how-to-use-mdx-with-custom-components')
  })

  it("shows upcoming drafts in the series, but doesn't render a link", () => {
    cy.dataCy('blog-post-series')
      .find('ol')
      .last()
      .contains('This Is Another Draft In A Series')
      .click()
      .url()
      .should('include', '2020-11-13-end-procrastination')

    cy.dataCy('blog-post-series').find('ol').last().contains('(coming soon)')
  })
})
