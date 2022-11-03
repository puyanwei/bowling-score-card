// When asserts fail it still shows a pass in Cypress UI - https://github.com/cypress-io/cypress/issues/4742

describe('Bowling Scorecard interactions only', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')

    cy.get('[data-testid="frame-1-first-bowl"]').as('frame1bowl1')
    cy.get('[data-testid="frame-1-second-bowl"]').as('frame1bowl2')
    cy.get('[data-testid="frame-2-first-bowl"]').as('frame2bowl1')
    cy.get('[data-testid="frame-2-second-bowl"]').as('frame2bowl2')
    cy.get('[data-testid="frame-3-first-bowl"]').as('frame3bowl1')
    cy.get('[data-testid="frame-3-second-bowl"]').as('frame3bowl2')
    cy.get('[data-testid="frame-4-first-bowl"]').as('frame4bowl1')
    cy.get('[data-testid="frame-4-second-bowl"]').as('frame4bowl2')
    cy.get('[data-testid="frame-5-first-bowl"]').as('frame5bowl1')
    cy.get('[data-testid="frame-5-second-bowl"]').as('frame5bowl2')
    cy.get('[data-testid="frame-6-first-bowl"]').as('frame6bowl1')
    cy.get('[data-testid="frame-6-second-bowl"]').as('frame6bowl2')
    cy.get('[data-testid="frame-7-first-bowl"]').as('frame7bowl1')
    cy.get('[data-testid="frame-7-second-bowl"]').as('frame7bowl2')
    cy.get('[data-testid="frame-8-first-bowl"]').as('frame8bowl1')
    cy.get('[data-testid="frame-8-second-bowl"]').as('frame8bowl2')
    cy.get('[data-testid="frame-9-first-bowl"]').as('frame9bowl1')
    cy.get('[data-testid="frame-9-second-bowl"]').as('frame9bowl2')
    cy.get('[data-testid="frame-10-first-bowl"]').as('frame10bowl1')
    cy.get('[data-testid="frame-10-second-bowl"]').as('frame10bowl2')
    cy.get('[data-testid="frame-10-third-bowl"]').as('frame10bowl3')
    cy.get('[data-testid="button-0"]').as('button0')
    cy.get('[data-testid="button-1"]').as('button1')
    cy.get('[data-testid="button-2"]').as('button2')
    cy.get('[data-testid="button-3"]').as('button3')
    cy.get('[data-testid="button-4"]').as('button4')
    cy.get('[data-testid="button-5"]').as('button5')
    cy.get('[data-testid="button-6"]').as('button6')
    cy.get('[data-testid="button-7"]').as('button7')
    cy.get('[data-testid="button-8"]').as('button8')
    cy.get('[data-testid="button-9"]').as('button9')
    cy.get('[data-testid="button-10"]').as('button10')
    cy.get('[data-testid="button-reset"]').as('buttonReset')
  })
  it('pressing non spare or strike buttons renders the chosen numbers in the scorecard', async () => {
    cy.get('@frame1bowl1').should('have.text', '')
    cy.get('@frame1bowl2').should('have.text', '')
    cy.get('@frame2bowl1').should('have.text', '')
    cy.get('@frame2bowl2').should('have.text', '')
    cy.get('@frame3bowl1').should('have.text', '')
    cy.get('@frame3bowl2').should('have.text', '')
    cy.get('@frame4bowl1').should('have.text', '')
    cy.get('@frame4bowl2').should('have.text', '')
    cy.get('@frame5bowl1').should('have.text', '')
    cy.get('@frame5bowl2').should('have.text', '')
    cy.get('@frame6bowl1').should('have.text', '')
    cy.get('@frame6bowl2').should('have.text', '')
    cy.get('@frame7bowl1').should('have.text', '')
    cy.get('@frame7bowl2').should('have.text', '')
    cy.get('@frame8bowl1').should('have.text', '')
    cy.get('@frame8bowl2').should('have.text', '')
    cy.get('@frame9bowl1').should('have.text', '')
    cy.get('@frame9bowl2').should('have.text', '')
    cy.get('@frame10bowl1').should('have.text', '')
    cy.get('@frame10bowl2').should('have.text', '')
    cy.get('@frame10bowl3').should('have.text', '')

    cy.get('@button0').click().get('@frame1bowl1').should('have.text', '0')
    cy.get('@button1').click().get('@frame1bowl2').should('have.text', '1')
    cy.get('@button0').click().get('@frame2bowl1').should('have.text', '0')
    cy.get('@button2').click().get('@frame2bowl2').should('have.text', '2')
    cy.get('@button0').click().get('@frame3bowl1').should('have.text', '0')
    cy.get('@button3').click().get('@frame3bowl2').should('have.text', '3')
    cy.get('@button0').click().get('@frame4bowl1').should('have.text', '0')
    cy.get('@button4').click().get('@frame4bowl2').should('have.text', '4')
    cy.get('@button0').click().get('@frame5bowl1').should('have.text', '0')
    cy.get('@button5').click().get('@frame5bowl2').should('have.text', '5')
    cy.get('@button0').click().get('@frame6bowl1').should('have.text', '0')
    cy.get('@button6').click().get('@frame6bowl2').should('have.text', '6')
    cy.get('@button0').click().get('@frame7bowl1').should('have.text', '0')
    cy.get('@button7').click().get('@frame7bowl2').should('have.text', '7')
    cy.get('@button0').click().get('@frame8bowl1').should('have.text', '0')
    cy.get('@button8').click().get('@frame8bowl2').should('have.text', '8')
    cy.get('@button0').click().get('@frame9bowl1').should('have.text', '0')
    cy.get('@button9').click().get('@frame9bowl2').should('have.text', '9')
    cy.get('@button0').click().get('@frame10bowl1').should('have.text', '0')
    cy.get('@button10').click().get('@frame10bowl2').should('have.text', 'X')
  })
  it('a forward slash should show to represent a spare', async () => {
    cy.get('@frame1bowl1').should('have.text', '')
    cy.get('@frame1bowl2').should('have.text', '')
    cy.get('@frame2bowl1').should('have.text', '')
    cy.get('@frame2bowl2').should('have.text', '')
    cy.get('@frame3bowl1').should('have.text', '')
    cy.get('@frame3bowl2').should('have.text', '')
    cy.get('@frame4bowl1').should('have.text', '')
    cy.get('@frame4bowl2').should('have.text', '')
    cy.get('@frame5bowl1').should('have.text', '')
    cy.get('@frame5bowl2').should('have.text', '')
    cy.get('@frame6bowl1').should('have.text', '')
    cy.get('@frame6bowl2').should('have.text', '')
    cy.get('@frame7bowl1').should('have.text', '')
    cy.get('@frame7bowl2').should('have.text', '')
    cy.get('@frame8bowl1').should('have.text', '')
    cy.get('@frame8bowl2').should('have.text', '')
    cy.get('@frame9bowl1').should('have.text', '')
    cy.get('@frame9bowl2').should('have.text', '')
    cy.get('@frame10bowl1').should('have.text', '')
    cy.get('@frame10bowl2').should('have.text', '')
    cy.get('@frame10bowl3').should('have.text', '')

    cy.get('@button6').click().get('@frame1bowl1').should('have.text', '6')
    cy.get('@button4').click().get('@frame1bowl1').should('have.text', '/')
  })
})
