beforeEach(() => {
  cy.viewport(1024, 768)
  cy.visit('http://localhost:3000')
})

describe('Bowling Scorecard interactions only', () => {
  it('pressing non spare or strike buttons renders the chosen numbers in the scorecard', async () => {
    const frame1bowl1 = cy.get('[data-testid="frame-1-first-bowl"]')
    const frame1bowl2 = cy.get('[data-testid="frame-1-second-bowl"]')
    const frame2bowl1 = cy.get('[data-testid="frame-2-first-bowl"]')
    const frame2bowl2 = cy.get('[data-testid="frame-2-second-bowl"]')
    const frame3bowl1 = cy.get('[data-testid="frame-3-first-bowl"]')
    const frame3bowl2 = cy.get('[data-testid="frame-3-second-bowl"]')
    const frame4bowl1 = cy.get('[data-testid="frame-4-first-bowl"]')
    const frame4bowl2 = cy.get('[data-testid="frame-4-second-bowl"]')
    const frame5bowl1 = cy.get('[data-testid="frame-5-first-bowl"]')
    const frame5bowl2 = cy.get('[data-testid="frame-5-second-bowl"]')
    const frame6bowl1 = cy.get('[data-testid="frame-6-first-bowl"]')
    const frame6bowl2 = cy.get('[data-testid="frame-6-second-bowl"]')
    const frame7bowl1 = cy.get('[data-testid="frame-7-first-bowl"]')
    const frame7bowl2 = cy.get('[data-testid="frame-7-second-bowl"]')
    const frame8bowl1 = cy.get('[data-testid="frame-8-first-bowl"]')
    const frame8bowl2 = cy.get('[data-testid="frame-8-second-bowl"]')
    const frame9bowl1 = cy.get('[data-testid="frame-9-first-bowl"]')
    const frame9bowl2 = cy.get('[data-testid="frame-9-second-bowl"]')
    const frame10bowl1 = cy.get('[data-testid="frame-10-first-bowl"]')
    const frame10bowl2 = cy.get('[data-testid="frame-10-second-bowl"]')
    const frame10bowl3 = cy.get('[data-testid="frame-10-third-bowl"]')
    frame1bowl1.should('have.text', '')
    frame1bowl2.should('have.text', '')
    frame2bowl1.should('have.text', '')
    frame2bowl2.should('have.text', '')
    frame3bowl1.should('have.text', '')
    frame3bowl2.should('have.text', '')
    frame4bowl1.should('have.text', '')
    frame4bowl2.should('have.text', '')
    frame5bowl1.should('have.text', '')
    frame5bowl2.should('have.text', '')
    frame6bowl1.should('have.text', '')
    frame6bowl2.should('have.text', '')
    frame7bowl1.should('have.text', '')
    frame7bowl2.should('have.text', '')
    frame8bowl1.should('have.text', '')
    frame8bowl2.should('have.text', '')
    frame9bowl1.should('have.text', '')
    frame9bowl2.should('have.text', '')
    frame10bowl1.should('have.text', '')
    frame10bowl2.should('have.text', '')
    frame10bowl3.should('have.text', '')

    cy.get('[data-testid="button-0"]').click()
    cy.get('[data-testid="button-1"]').click()
    cy.get('[data-testid="button-0"]').click()
    cy.get('[data-testid="button-1"]').click()
    cy.get('[data-testid="button-0"]').click()
    cy.get('[data-testid="button-1"]').click()
    cy.get('[data-testid="button-0"]').click()
    cy.get('[data-testid="button-1"]').click()
    cy.get('[data-testid="button-0"]').click()
    cy.get('[data-testid="button-1"]').click()
    cy.get('[data-testid="button-0"]').click()
    cy.get('[data-testid="button-1"]').click()
    cy.get('[data-testid="button-0"]').click()
    cy.get('[data-testid="button-1"]').click()
    cy.get('[data-testid="button-0"]').click()
    cy.get('[data-testid="button-1"]').click()
    cy.get('[data-testid="button-0"]').click()
    cy.get('[data-testid="button-1"]').click()
    cy.get('[data-testid="button-0"]').click()
    cy.get('[data-testid="button-1"]').click()
    frame1bowl1.should('have.text', '0')
    frame1bowl2.should('have.text', '1')
    frame2bowl1.should('have.text', '0')
    frame2bowl2.should('have.text', '1')
    frame3bowl1.should('have.text', '0')
    frame3bowl2.should('have.text', '1')
    frame4bowl1.should('have.text', '0')
    frame4bowl2.should('have.text', '1')
    frame5bowl1.should('have.text', '0')
    frame5bowl2.should('have.text', '1')
    frame6bowl1.should('have.text', '0')
    frame6bowl2.should('have.text', '1')
    frame7bowl1.should('have.text', '0')
    frame7bowl2.should('have.text', '1')
    frame8bowl1.should('have.text', '0')
    frame8bowl2.should('have.text', '1')
    frame9bowl1.should('have.text', '0')
    frame9bowl2.should('have.text', '1')
    frame10bowl1.should('have.text', '0')
    frame10bowl2.should('have.text', '1')
    frame10bowl3.should('have.text', '0')
  })
})
