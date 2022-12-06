describe('drafts', () => {
  it('does not publish draft posts', () => {
    cy.visit('/posts/DRAFT-this-is-a-draft', {
      failOnStatusCode: false,
    }).dataCy('404-text')
  })
})
