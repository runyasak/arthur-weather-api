describe('Request to get api data', () => {
  it('#get response data', () => {
    cy
      .request('http://localhost:3000/weather')
      .its('body')
      .should('haveOwnProperty', 'success')
      .should('haveOwnProperty', 'current_condition')
      .should('haveOwnProperty', 'weather_log')
  })
})

describe('Request to get data from db', () => {
  it('#get history data', () => {
    cy
      .request('http://localhost:3000/api/v1/weather/history')
      .its('body')
      .should('haveOwnProperty', 'success')
      .should('haveOwnProperty', 'weather_log')
  })
})
