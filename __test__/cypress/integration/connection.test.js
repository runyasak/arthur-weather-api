describe('Test connection', () => {
  it('#get response', () => {
    cy
      .request('http://localhost:3000/')
      .its('body')
      .should('eq', 'hello weather!')
  })
})
