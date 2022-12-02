import '../support/commands'

describe('Multiple player tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
  context('Default initial values', () => {
    it('2 players should have the correct default values', () => {
      cy.getById('input-player-name').type('John')
      cy.getById('update-player-btn').click()
      cy.getById('add-player-btn').click()
      cy.getById('input-player-name').type('Bob')
      cy.getById('update-player-btn').click()
      cy.getById('start-game-btn').click()

      cy.getById('player-1-name').contains('John')
      cy.getById('player-2-name').contains('Bob')

      cy.getById('player-1-frame-1-first-bowl').should('have.text', '')
      cy.getById('player-1-frame-1-second-bowl').should('have.text', '')
      cy.getById('player-1-frame-2-first-bowl').should('have.text', '')
      cy.getById('player-1-frame-2-second-bowl').should('have.text', '')
      cy.getById('player-1-frame-3-first-bowl').should('have.text', '')
      cy.getById('player-1-frame-3-second-bowl').should('have.text', '')
      cy.getById('player-1-frame-4-first-bowl').should('have.text', '')
      cy.getById('player-1-frame-4-second-bowl').should('have.text', '')
      cy.getById('player-1-frame-5-first-bowl').should('have.text', '')
      cy.getById('player-1-frame-5-second-bowl').should('have.text', '')
      cy.getById('player-1-frame-6-first-bowl').should('have.text', '')
      cy.getById('player-1-frame-6-second-bowl').should('have.text', '')
      cy.getById('player-1-frame-7-first-bowl').should('have.text', '')
      cy.getById('player-1-frame-7-second-bowl').should('have.text', '')
      cy.getById('player-1-frame-8-first-bowl').should('have.text', '')
      cy.getById('player-1-frame-8-second-bowl').should('have.text', '')
      cy.getById('player-1-frame-9-first-bowl').should('have.text', '')
      cy.getById('player-1-frame-9-second-bowl').should('have.text', '')
      cy.getById('player-1-frame-10-first-bowl').should('have.text', '')
      cy.getById('player-1-frame-10-second-bowl').should('have.text', '')
      cy.getById('player-1-frame-10-third-bowl').should('have.text', '')
      cy.getById('player-1-frame-1-total-score').should('have.text', '0')
      cy.getById('player-1-frame-2-total-score').should('have.text', '0')
      cy.getById('player-1-frame-3-total-score').should('have.text', '0')
      cy.getById('player-1-frame-4-total-score').should('have.text', '0')
      cy.getById('player-1-frame-5-total-score').should('have.text', '0')
      cy.getById('player-1-frame-6-total-score').should('have.text', '0')
      cy.getById('player-1-frame-7-total-score').should('have.text', '0')
      cy.getById('player-1-frame-8-total-score').should('have.text', '0')
      cy.getById('player-1-frame-9-total-score').should('have.text', '0')
      cy.getById('player-1-frame-10-total-score').should('have.text', '0')

      cy.getById('player-2-frame-1-first-bowl').should('have.text', '')
      cy.getById('player-2-frame-1-second-bowl').should('have.text', '')
      cy.getById('player-2-frame-2-first-bowl').should('have.text', '')
      cy.getById('player-2-frame-2-second-bowl').should('have.text', '')
      cy.getById('player-2-frame-3-first-bowl').should('have.text', '')
      cy.getById('player-2-frame-3-second-bowl').should('have.text', '')
      cy.getById('player-2-frame-4-first-bowl').should('have.text', '')
      cy.getById('player-2-frame-4-second-bowl').should('have.text', '')
      cy.getById('player-2-frame-5-first-bowl').should('have.text', '')
      cy.getById('player-2-frame-5-second-bowl').should('have.text', '')
      cy.getById('player-2-frame-6-first-bowl').should('have.text', '')
      cy.getById('player-2-frame-6-second-bowl').should('have.text', '')
      cy.getById('player-2-frame-7-first-bowl').should('have.text', '')
      cy.getById('player-2-frame-7-second-bowl').should('have.text', '')
      cy.getById('player-2-frame-8-first-bowl').should('have.text', '')
      cy.getById('player-2-frame-8-second-bowl').should('have.text', '')
      cy.getById('player-2-frame-9-first-bowl').should('have.text', '')
      cy.getById('player-2-frame-9-second-bowl').should('have.text', '')
      cy.getById('player-2-frame-10-first-bowl').should('have.text', '')
      cy.getById('player-2-frame-10-second-bowl').should('have.text', '')
      cy.getById('player-2-frame-10-third-bowl').should('have.text', '')
      cy.getById('player-2-frame-1-total-score').should('have.text', '0')
      cy.getById('player-2-frame-2-total-score').should('have.text', '0')
      cy.getById('player-2-frame-3-total-score').should('have.text', '0')
      cy.getById('player-2-frame-4-total-score').should('have.text', '0')
      cy.getById('player-2-frame-5-total-score').should('have.text', '0')
      cy.getById('player-2-frame-6-total-score').should('have.text', '0')
      cy.getById('player-2-frame-7-total-score').should('have.text', '0')
      cy.getById('player-2-frame-8-total-score').should('have.text', '0')
      cy.getById('player-2-frame-9-total-score').should('have.text', '0')
      cy.getById('player-2-frame-10-total-score').should('have.text', '0')
    })
  })
  context('Bowl box score interactions', () => {
    it('pressing non spare or strike buttons renders the correct bowls and totals, and announces player 2 as the winner', () => {
      cy.getById('input-player-name').type('Peter')
      cy.getById('update-player-btn').click()
      cy.getById('add-player-btn').click()
      cy.getById('input-player-name').type('Joanna')
      cy.getById('update-player-btn').click()
      cy.getById('start-game-btn').click()

      cy.getById('player-1-name').contains('Peter')
      cy.getById('player-2-name').contains('Joanna')

      cy.getById('button-0').click()
      cy.getById('player-1-frame-1-first-bowl').should('have.text', '0')
      cy.getById('button-1').click()
      cy.getById('player-1-frame-1-total-score').should('have.text', '1')

      cy.getById('button-2').click()
      cy.getById('player-2-frame-1-first-bowl').should('have.text', '2')
      cy.getById('button-4').click()
      cy.getById('player-2-frame-1-second-bowl').should('have.text', '4')
      cy.getById('player-2-frame-1-total-score').should('have.text', '6')

      cy.getById('button-3').click()
      cy.getById('player-1-frame-2-first-bowl').should('have.text', '3')
      cy.getById('button-4').click()
      cy.getById('player-1-frame-2-second-bowl').should('have.text', '4')
      cy.getById('player-1-frame-2-total-score').should('have.text', '8')

      cy.getById('button-5').click()
      cy.getById('player-2-frame-2-first-bowl').should('have.text', '5')
      cy.getById('button-1').click()
      cy.getById('player-2-frame-2-second-bowl').should('have.text', '1')
      cy.getById('player-2-frame-2-total-score').should('have.text', '12')

      cy.getById('button-3').click()
      cy.getById('player-1-frame-3-first-bowl').should('have.text', '3')
      cy.getById('button-4').click()
      cy.getById('player-1-frame-3-second-bowl').should('have.text', '4')
      cy.getById('player-1-frame-3-total-score').should('have.text', '15')

      cy.getById('button-5').click()
      cy.getById('player-2-frame-3-first-bowl').should('have.text', '5')
      cy.getById('button-1').click()
      cy.getById('player-2-frame-3-second-bowl').should('have.text', '1')
      cy.getById('player-2-frame-3-total-score').should('have.text', '18')
      cy.getById('player-2-frame-2-total-score').should('have.text', '12')

      cy.getById('button-5').click()
      cy.getById('player-1-frame-4-first-bowl').should('have.text', '5')
      cy.getById('button-0').click()
      cy.getById('player-1-frame-4-second-bowl').should('have.text', '0')
      cy.getById('player-1-frame-4-total-score').should('have.text', '20')

      cy.getById('button-7').click()
      cy.getById('player-2-frame-4-first-bowl').should('have.text', '7')
      cy.getById('button-1').click()
      cy.getById('player-2-frame-4-second-bowl').should('have.text', '1')
      cy.getById('player-2-frame-4-total-score').should('have.text', '26')

      cy.getById('button-0').click()
      cy.getById('player-1-frame-5-first-bowl').should('have.text', '0')
      cy.getById('button-9').click()
      cy.getById('player-1-frame-5-second-bowl').should('have.text', '9')
      cy.getById('player-1-frame-5-total-score').should('have.text', '29')

      cy.getById('button-1').click()
      cy.getById('player-2-frame-5-first-bowl').should('have.text', '1')
      cy.getById('button-8').click()
      cy.getById('player-2-frame-5-second-bowl').should('have.text', '8')
      cy.getById('player-2-frame-5-total-score').should('have.text', '35')

      cy.getById('button-4').click()
      cy.getById('player-1-frame-6-first-bowl').should('have.text', '4')
      cy.getById('button-4').click()
      cy.getById('player-1-frame-6-second-bowl').should('have.text', '4')
      cy.getById('player-1-frame-6-total-score').should('have.text', '37')

      cy.getById('button-2').click()
      cy.getById('player-2-frame-6-first-bowl').should('have.text', '2')
      cy.getById('button-2').click()
      cy.getById('player-2-frame-6-second-bowl').should('have.text', '2')
      cy.getById('player-2-frame-6-total-score').should('have.text', '39')

      cy.getById('button-3').click()
      cy.getById('player-1-frame-7-first-bowl').should('have.text', '3')
      cy.getById('button-6').click()
      cy.getById('player-1-frame-7-second-bowl').should('have.text', '6')
      cy.getById('player-1-frame-7-total-score').should('have.text', '46')

      cy.getById('button-4').click()
      cy.getById('player-2-frame-7-first-bowl').should('have.text', '4')
      cy.getById('button-5').click()
      cy.getById('player-2-frame-7-second-bowl').should('have.text', '5')
      cy.getById('player-2-frame-7-total-score').should('have.text', '48')

      cy.getById('button-0').click()
      cy.getById('player-1-frame-8-first-bowl').should('have.text', '0')
      cy.getById('button-0').click()
      cy.getById('player-1-frame-8-second-bowl').should('have.text', '0')
      cy.getById('player-1-frame-8-total-score').should('have.text', '46')

      cy.getById('button-4').click()
      cy.getById('player-2-frame-8-first-bowl').should('have.text', '4')
      cy.getById('button-3').click()
      cy.getById('player-2-frame-8-second-bowl').should('have.text', '3')
      cy.getById('player-2-frame-8-total-score').should('have.text', '55')

      cy.getById('button-0').click()
      cy.getById('player-1-frame-9-first-bowl').should('have.text', '0')
      cy.getById('button-2').click()
      cy.getById('player-1-frame-9-second-bowl').should('have.text', '2')
      cy.getById('player-1-frame-9-total-score').should('have.text', '48')

      cy.getById('button-8').click()
      cy.getById('player-2-frame-9-first-bowl').should('have.text', '8')
      cy.getById('button-1').click()
      cy.getById('player-2-frame-9-second-bowl').should('have.text', '1')
      cy.getById('player-2-frame-9-total-score').should('have.text', '64')

      cy.getById('button-1').click()
      cy.getById('player-1-frame-10-first-bowl').should('have.text', '1')
      cy.getById('button-2').click()
      cy.getById('player-1-frame-10-second-bowl').should('have.text', '2')
      cy.getById('player-1-frame-10-total-score').should('have.text', '51')

      cy.getById('button-8').click()
      cy.getById('player-2-frame-10-first-bowl').should('have.text', '8')
      cy.getById('button-1').click()
      cy.getById('player-2-frame-10-second-bowl').should('have.text', '1')
      cy.getById('player-2-frame-10-total-score').should('have.text', '73')

      cy.getById('game-over').should(
        'have.text',
        'Game over - the winner is Joanna'
      )
    })
    it('announces a tie if there is at least two players with the same score that is the highest', () => {
      cy.getById('input-player-name').type('John')
      cy.getById('update-player-btn').click()
      cy.getById('add-player-btn').click()
      cy.getById('input-player-name').type('Mike')
      cy.getById('update-player-btn').click()
      cy.getById('add-player-btn').click()
      cy.getById('input-player-name').type('Susan')
      cy.getById('update-player-btn').click()
      cy.getById('start-game-btn').click()

      cy.getById('player-1-name').contains('John')
      cy.getById('player-2-name').contains('Mike')
      cy.getById('player-3-name').contains('Susan')

      cy.getById('button-0').click()
      cy.getById('button-1').click()
      cy.getById('player-1-frame-1-total-score').should('have.text', '1')

      cy.getById('button-2').click()
      cy.getById('button-4').click()
      cy.getById('player-2-frame-1-total-score').should('have.text', '6')

      cy.getById('button-2').click()
      cy.getById('button-4').click()
      cy.getById('player-3-frame-1-total-score').should('have.text', '6')

      cy.getById('button-5').click()
      cy.getById('button-2').click()
      cy.getById('player-1-frame-2-total-score').should('have.text', '8')

      cy.getById('button-2').click()
      cy.getById('button-4').click()
      cy.getById('player-2-frame-2-total-score').should('have.text', '12')

      cy.getById('button-2').click()
      cy.getById('button-4').click()
      cy.getById('player-3-frame-2-total-score').should('have.text', '12')

      cy.getById('button-2').click()
      cy.getById('button-2').click()
      cy.getById('player-1-frame-3-total-score').should('have.text', '12')

      cy.getById('button-9').click()
      cy.getById('button-0').click()
      cy.getById('player-2-frame-3-total-score').should('have.text', '21')

      cy.getById('button-8').click()
      cy.getById('button-1').click()
      cy.getById('player-3-frame-3-total-score').should('have.text', '21')

      cy.getById('button-2').click()
      cy.getById('button-5').click()
      cy.getById('player-1-frame-4-total-score').should('have.text', '19')

      cy.getById('button-9').click()
      cy.getById('button-0').click()
      cy.getById('player-2-frame-4-total-score').should('have.text', '30')

      cy.getById('button-8').click()
      cy.getById('button-1').click()
      cy.getById('player-3-frame-4-total-score').should('have.text', '30')

      cy.getById('button-2').click()
      cy.getById('button-2').click()
      cy.getById('player-1-frame-5-total-score').should('have.text', '23')

      cy.getById('button-9').click()
      cy.getById('button-0').click()
      cy.getById('player-2-frame-5-total-score').should('have.text', '39')

      cy.getById('button-8').click()
      cy.getById('button-1').click()
      cy.getById('player-3-frame-5-total-score').should('have.text', '39')

      cy.getById('button-0').click()
      cy.getById('button-2').click()
      cy.getById('player-1-frame-6-total-score').should('have.text', '25')

      cy.getById('button-7').click()
      cy.getById('button-1').click()
      cy.getById('player-2-frame-6-total-score').should('have.text', '47')

      cy.getById('button-2').click()
      cy.getById('button-2').click()
      cy.getById('player-3-frame-6-total-score').should('have.text', '43')

      cy.getById('button-0').click()
      cy.getById('button-2').click()
      cy.getById('player-1-frame-7-total-score').should('have.text', '27')

      cy.getById('button-7').click()
      cy.getById('button-1').click()
      cy.getById('player-2-frame-7-total-score').should('have.text', '55')

      cy.getById('button-2').click()
      cy.getById('button-2').click()
      cy.getById('player-3-frame-7-total-score').should('have.text', '47')

      cy.getById('button-0').click()
      cy.getById('button-2').click()
      cy.getById('player-1-frame-8-total-score').should('have.text', '29')

      cy.getById('button-7').click()
      cy.getById('button-1').click()
      cy.getById('player-2-frame-8-total-score').should('have.text', '63')

      cy.getById('button-2').click()
      cy.getById('button-2').click()
      cy.getById('player-3-frame-8-total-score').should('have.text', '51')

      cy.getById('button-9').click()
      cy.getById('button-0').click()
      cy.getById('player-1-frame-9-total-score').should('have.text', '38')

      cy.getById('button-0').click()
      cy.getById('button-1').click()
      cy.getById('player-2-frame-9-total-score').should('have.text', '64')

      cy.getById('button-9').click()
      cy.getById('button-0').click()
      cy.getById('player-3-frame-9-total-score').should('have.text', '60')

      cy.getById('button-5').click()
      cy.getById('button-4').click()
      cy.getById('player-1-frame-10-total-score').should('have.text', '47')

      cy.getById('button-2').click()
      cy.getById('button-3').click()
      cy.getById('player-2-frame-10-total-score').should('have.text', '69')

      cy.getById('button-9').click()
      cy.getById('button-0').click()
      cy.getById('player-3-frame-10-total-score').should('have.text', '69')

      cy.getById('game-over').should('have.text', `Game over - it's a tie!`)
    })
    it('all 3 players have a perfect game, and announces all players as being tied', () => {
      cy.getById('input-player-name').type('Chun Li')
      cy.getById('update-player-btn').click()
      cy.getById('add-player-btn').click()
      cy.getById('input-player-name').type('Ryu')
      cy.getById('update-player-btn').click()
      cy.getById('add-player-btn').click()
      cy.getById('input-player-name').type('Ken')
      cy.getById('update-player-btn').click()
      cy.getById('add-player-btn').click()
      cy.getById('input-player-name').type('Guile')
      cy.getById('update-player-btn').click()
      cy.getById('start-game-btn').click()

      cy.getById('player-1-name').contains('Chun Li')
      cy.getById('player-2-name').contains('Ryu')
      cy.getById('player-3-name').contains('Ken')
      cy.getById('player-4-name').contains('Guile')

      for (let index = 0; index < 48; index++) {
        cy.getById('button-10').click()
      }

      cy.getById('player-1-frame-10-total-score').should('have.text', '300')
      cy.getById('player-1-frame-10-first-bowl').should('have.text', 'X')
      cy.getById('player-1-frame-10-second-bowl').should('have.text', 'X')
      cy.getById('player-1-frame-10-third-bowl').should('have.text', 'X')

      cy.getById('player-2-frame-10-total-score').should('have.text', '300')
      cy.getById('player-2-frame-10-first-bowl').should('have.text', 'X')
      cy.getById('player-2-frame-10-second-bowl').should('have.text', 'X')
      cy.getById('player-2-frame-10-third-bowl').should('have.text', 'X')

      cy.getById('player-3-frame-10-total-score').should('have.text', '300')
      cy.getById('player-3-frame-10-first-bowl').should('have.text', 'X')
      cy.getById('player-3-frame-10-second-bowl').should('have.text', 'X')
      cy.getById('player-3-frame-10-third-bowl').should('have.text', 'X')

      cy.getById('player-4-frame-10-total-score').should('have.text', '300')
      cy.getById('player-4-frame-10-first-bowl').should('have.text', 'X')
      cy.getById('player-4-frame-10-second-bowl').should('have.text', 'X')
      cy.getById('player-4-frame-10-third-bowl').should('have.text', 'X')

      cy.getById('game-over').should('have.text', `Game over - it's a tie!`)
    })
  })
})

export {}
