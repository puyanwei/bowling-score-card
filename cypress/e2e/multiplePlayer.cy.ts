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
  context('Bowl box score interactions only', () => {
    it.only('pressing non spare or strike buttons renders the chosen numbers in the scorecard, and should announce player 2 as the winner', () => {
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

      cy.getById('game-over').should('have.text', 'Game over - the winner is Joanna')
    })
    //   it('a forward slash should show in the UI to represent a spare', () => {
    //     cy.get('@button6').click().get('@frame1bowl1').should('have.text', '6')
    //     cy.get('@button4').click().get('@frame1bowl2').should('have.text', '/')
    //     cy.get('@button0').click().get('@frame2bowl1').should('have.text', '0')
    //     cy.get('@button10').click().get('@frame2bowl2').should('have.text', '/')
    //   })
    //   it('a X should show in the UI to represent a strike', () => {
    //     cy.get('@button10').click().get('@frame1bowl1').should('have.text', 'X')
    //     cy.get('@button10').click().get('@frame2bowl1').should('have.text', 'X')
    //     cy.get('@button10').click().get('@frame2bowl1').should('have.text', 'X')
    //   })
    //   it('pressing the reset button should reset the scores back to its initial state', () => {
    //     cy.get('@button0').click().get('@frame1bowl1').should('have.text', '0')
    //     cy.get('@button1').click().get('@frame1bowl2').should('have.text', '1')
    //     cy.get('@button0').click().get('@frame2bowl1').should('have.text', '0')
    //     cy.get('@button2').click().get('@frame2bowl2').should('have.text', '2')
    //     cy.get('@button0').click().get('@frame3bowl1').should('have.text', '0')
    //     cy.get('@button3').click().get('@frame3bowl2').should('have.text', '3')
    //     cy.get('@button0').click().get('@frame4bowl1').should('have.text', '0')
    //     cy.get('@button4').click().get('@frame4bowl2').should('have.text', '4')
    //     cy.get('@button0').click().get('@frame5bowl1').should('have.text', '0')
    //     cy.get('@button5').click().get('@frame5bowl2').should('have.text', '5')
    //     cy.get('@button0').click().get('@frame6bowl1').should('have.text', '0')
    //     cy.get('@button6').click().get('@frame6bowl2').should('have.text', '6')
    //     cy.get('@button0').click().get('@frame7bowl1').should('have.text', '0')
    //     cy.get('@buttonReset').click()
    //     cy.get('@frame1bowl1').should('have.text', '')
    //     cy.get('@frame1bowl2').should('have.text', '')
    //     cy.get('@frame2bowl1').should('have.text', '')
    //     cy.get('@frame2bowl2').should('have.text', '')
    //     cy.get('@frame3bowl1').should('have.text', '')
    //     cy.get('@frame3bowl2').should('have.text', '')
    //     cy.get('@frame4bowl1').should('have.text', '')
    //     cy.get('@frame4bowl2').should('have.text', '')
    //     cy.get('@frame5bowl1').should('have.text', '')
    //     cy.get('@frame5bowl2').should('have.text', '')
    //     cy.get('@frame6bowl1').should('have.text', '')
    //     cy.get('@frame6bowl2').should('have.text', '')
    //     cy.get('@frame7bowl1').should('have.text', '')
    //     cy.get('@frame7bowl2').should('have.text', '')
    //     cy.get('@frame8bowl1').should('have.text', '')
    //     cy.get('@frame8bowl2').should('have.text', '')
    //     cy.get('@frame9bowl1').should('have.text', '')
    //     cy.get('@frame9bowl2').should('have.text', '')
    //     cy.get('@frame10bowl1').should('have.text', '')
    //     cy.get('@frame10bowl2').should('have.text', '')
    //     cy.get('@frame10bowl3').should('have.text', '')
    //   })
    // })
    // context('Accumulated score calculations', () => {
    //   it.only('total points (no strikes or spares) accumulate correctly', () => {
    //     cy.get('@button1').click().get('@button3').click()
    //     cy.get('@total1').should('have.text', '4')
    //     cy.get('@button4').click().get('@button5').click()
    //     cy.get('@total2').should('have.text', '13')
    //     cy.get('@button5').click().get('@button3').click()
    //     cy.get('@total3').should('have.text', '21')
    //     cy.get('@button8').click().get('@button1').click()
    //     cy.get('@total4').should('have.text', '30')
    //     cy.get('@button8').click().get('@button1').click()
    //     cy.get('@total5').should('have.text', '39')
    //     cy.get('@button7').click().get('@button2').click()
    //     cy.get('@total6').should('have.text', '48')
    //     cy.get('@button4').click().get('@button4').click()
    //     cy.get('@total7').should('have.text', '56')
    //     cy.get('@button3').click().get('@button3').click()
    //     cy.get('@total8').should('have.text', '62')
    //     cy.get('@button6').click().get('@button0').click()
    //     cy.get('@total9').should('have.text', '68')
    //     cy.get('@button3').click().get('@button3').click()
    //     cy.get('@total10').should('have.text', '74')
    //   })

    //   it(`total points with spares should add 10 to that current frame, then add the first bowl's score to it the frame after`, () => {
    //     cy.get('@button1').click().get('@button3').click()
    //     cy.get('@total1').should('have.text', '4')
    //     cy.get('@button5').click().get('@button5').click()
    //     cy.get('@total2').should('have.text', '14')
    //     cy.get('@button5').click()
    //     cy.get('@total2').should('have.text', '19').get('@button3').click()
    //     cy.get('@total3').should('have.text', '27')
    //   })
    //   it(`total points with strikes should add 10 to that current frame, then add the both bowl's score to it the frame after`, () => {
    //     cy.get('@button10').click().get('@total1').should('have.text', '10')
    //     cy.get('@button4').click().get('@total1').should('have.text', '14')
    //     cy.get('@button4').click()
    //     cy.get('@total1').should('have.text', '18')
    //     cy.get('@total2').should('have.text', '26')
    //   })
    //   it('total points calculate correcly for double strikes', () => {
    //     cy.get('@button10').click()
    //     cy.get('@button10').click()
    //     cy.get('@button8').click()
    //     cy.get('@total1').should('have.text', '28')
    //     cy.get('@total2').should('have.text', '38')
    //     cy.get('@total3').should('have.text', '46')
    //     cy.get('@button1').click()
    //     cy.get('@total1').should('have.text', '28')
    //     cy.get('@total2').should('have.text', '47')
    //     cy.get('@total3').should('have.text', '56')
    //   })
    //   it('total points calculate correcly for triple strikes', () => {
    //     cy.get('@button10').click()
    //     cy.get('@button10').click()
    //     cy.get('@button10').click()
    //     cy.get('@button8').click()
    //     cy.get('@total1').should('have.text', '30')
    //     cy.get('@total2').should('have.text', '58')
    //     cy.get('@total3').should('have.text', '68')
    //     cy.get('@total4').should('have.text', '76').get('@button1').click()
    //     cy.get('@total1').should('have.text', '30')
    //     cy.get('@total2').should('have.text', '58')
    //     cy.get('@total3').should('have.text', '77')
    //     cy.get('@total4').should('have.text', '86')
    //   })
    //   it('total points with a mix of spares and strikes accumulate correctly', () => {
    //     cy.get('@button6').click()
    //     cy.get('@button3').click()
    //     cy.get('@button5').click()
    //     cy.get('@button5').click()
    //     cy.get('@button10').click()
    //     cy.get('@button10').click()
    //     cy.get('@button4').click()
    //     cy.get('@button4').click()
    //     cy.get('@button2').click()
    //     cy.get('@button8').click()
    //     cy.get('@button9').click()
    //     cy.get('@button1').click()
    //     cy.get('@button10').click()
    //     cy.get('@button0').click()
    //     cy.get('@button1').click()
    //     cy.get('@button5').click()
    //     cy.get('@button5').click()
    //     cy.get('@button10').click()
    //     cy.get('@total1').should('have.text', '9')
    //     cy.get('@total2').should('have.text', '29')
    //     cy.get('@total3').should('have.text', '53')
    //     cy.get('@total4').should('have.text', '71')
    //     cy.get('@total5').should('have.text', '79')
    //     cy.get('@total6').should('have.text', '98')
    //     cy.get('@total7').should('have.text', '118')
    //     cy.get('@total8').should('have.text', '129')
    //     cy.get('@total9').should('have.text', '130')
    //     cy.get('@total10').should('have.text', '150')
    //   })
    //   it('total points should equal 150 for a game of all spares', () => {
    //     cy.get('@button5').click()
    //     cy.get('@button5').click()
    //     cy.get('@total1').should('have.text', '10')
    //     cy.get('@button5').click()
    //     cy.get('@total1').should('have.text', '15')
    //     cy.get('@total2').should('have.text', '20')
    //     cy.get('@button5').click()
    //     cy.get('@total2').should('have.text', '25')
    //     cy.get('@button5').click()
    //     cy.get('@total2').should('have.text', '30')
    //     cy.get('@total3').should('have.text', '35')
    //     cy.get('@button5').click()
    //     cy.get('@total3').should('have.text', '40')
    //     cy.get('@button5').click()
    //     cy.get('@total3').should('have.text', '45')
    //     cy.get('@total4').should('have.text', '50')
    //     cy.get('@button5').click()
    //     cy.get('@total4').should('have.text', '55')
    //     cy.get('@button5').click()
    //     cy.get('@total4').should('have.text', '60')
    //     cy.get('@total5').should('have.text', '65')
    //     cy.get('@button5').click()
    //     cy.get('@total5').should('have.text', '70')
    //     cy.get('@button5').click()
    //     cy.get('@total5').should('have.text', '75')
    //     cy.get('@total6').should('have.text', '80')
    //     cy.get('@button5').click()
    //     cy.get('@total6').should('have.text', '85')
    //     cy.get('@button5').click()
    //     cy.get('@total6').should('have.text', '90')
    //     cy.get('@total7').should('have.text', '95')
    //     cy.get('@button5').click()
    //     cy.get('@total7').should('have.text', '100')
    //     cy.get('@button5').click()
    //     cy.get('@total7').should('have.text', '105')
    //     cy.get('@total8').should('have.text', '110')
    //     cy.get('@button5').click()
    //     cy.get('@total8').should('have.text', '115')
    //     cy.get('@button5').click()
    //     cy.get('@total8').should('have.text', '120')
    //     cy.get('@total9').should('have.text', '125')
    //     cy.get('@button5').click()
    //     cy.get('@total9').should('have.text', '130')
    //     cy.get('@button5').click()
    //     cy.get('@total9').should('have.text', '135')
    //     cy.get('@total10').should('have.text', '140')
    //     cy.get('@button5').click()
    //     cy.get('@total10').should('have.text', '145')
    //     cy.get('@button5').click()
    //     cy.get('@total10').should('have.text', '150')
    //   })
    //   it('total points for perfect game equals 300 points', () => {
    //     cy.get('@button10').click()
    //     cy.get('@button10').click()
    //     cy.get('@button10').click()
    //     cy.get('@total1').should('have.text', '30').get('@button10').click()
    //     cy.get('@total2').should('have.text', '60').get('@button10').click()
    //     cy.get('@total3').should('have.text', '90').get('@button10').click()
    //     cy.get('@total4').should('have.text', '120').get('@button10').click()
    //     cy.get('@total5').should('have.text', '150').get('@button10').click()
    //     cy.get('@total6').should('have.text', '180').get('@button10').click()
    //     cy.get('@total7').should('have.text', '210').get('@button10').click()
    //     cy.get('@total8').should('have.text', '240').get('@button10').click()
    //     cy.get('@total9').should('have.text', '270').get('@button10').click()
    //     cy.get('@total10').should('have.text', '300')
    //   })
    // })
    // context('Tenth frame interactions', () => {
    //   it(`the tenth frame only allows two bowls if it's not a spare or a strike`, () => {
    //     cy.get('@button1').click().get('@button3').click()
    //     cy.get('@total1').should('have.text', '4')
    //     cy.get('@button4').click().get('@button5').click()
    //     cy.get('@total2').should('have.text', '13')
    //     cy.get('@button5').click().get('@button3').click()
    //     cy.get('@total3').should('have.text', '21')
    //     cy.get('@button8').click().get('@button1').click()
    //     cy.get('@total4').should('have.text', '30')
    //     cy.get('@button8').click().get('@button1').click()
    //     cy.get('@total5').should('have.text', '39')
    //     cy.get('@button7').click().get('@button2').click()
    //     cy.get('@total6').should('have.text', '48')
    //     cy.get('@button4').click().get('@button4').click()
    //     cy.get('@total7').should('have.text', '56')
    //     cy.get('@button3').click().get('@button3').click()
    //     cy.get('@total8').should('have.text', '62')
    //     cy.get('@button6').click().get('@button0').click()
    //     cy.get('@total9').should('have.text', '68')
    //     cy.get('@button3').click().get('@button3').click()
    //     cy.get('@total10').should('have.text', '74')
    //     cy.get('[data-testid="game-over"]').should('be.visible')
    //   })
    //   it('a spare in the tenth frame should allow another bowl', () => {
    //     cy.get('@button1').click().get('@button3').click()
    //     cy.get('@button4').click().get('@button5').click()
    //     cy.get('@button5').click().get('@button3').click()
    //     cy.get('@button8').click().get('@button1').click()
    //     cy.get('@button8').click().get('@button1').click()
    //     cy.get('@button7').click().get('@button2').click()
    //     cy.get('@button4').click().get('@button4').click()
    //     cy.get('@button3').click().get('@button3').click()
    //     cy.get('@button6').click().get('@button0').click()
    //     cy.get('@total9').should('have.text', '68')
    //     cy.get('@button9').click()
    //     cy.get('@frame10bowl1').should('have.text', '9')
    //     cy.get('@button1').click()
    //     cy.get('@frame10bowl2').should('have.text', '/')
    //     cy.get('@button8').click()
    //     cy.get('@frame10bowl3').should('have.text', '8')
    //     cy.get('@total10').should('have.text', '86')
    //     cy.get('[data-testid="game-over"]').should('be.visible')
    //   })
    //   it(`a strike in the tenth frame's first bowl should allow two more bowls`, () => {
    //     cy.get('@button1').click().get('@button3').click()
    //     cy.get('@button4').click().get('@button5').click()
    //     cy.get('@button5').click().get('@button3').click()
    //     cy.get('@button8').click().get('@button1').click()
    //     cy.get('@button8').click().get('@button1').click()
    //     cy.get('@button7').click().get('@button2').click()
    //     cy.get('@button4').click().get('@button4').click()
    //     cy.get('@button3').click().get('@button3').click()
    //     cy.get('@button6').click()
    //     cy.get('@button0').click()
    //     cy.get('@total9').should('have.text', '68')
    //     cy.get('@button10').click()
    //     cy.get('@frame10bowl1').should('have.text', 'X')
    //     cy.get('@button1').click().get('@frame10bowl2').should('have.text', '1')
    //     cy.get('@button8').click().get('@frame10bowl3').should('have.text', '8')
    //     cy.get('[data-testid="game-over"]').should('be.visible')
    //   })
    //   it('three strikes are allowed in the tenth frame', () => {
    //     cy.get('@button1').click().get('@button3').click()
    //     cy.get('@button4').click().get('@button5').click()
    //     cy.get('@button5').click().get('@button3').click()
    //     cy.get('@button8').click().get('@button1').click()
    //     cy.get('@button8').click().get('@button1').click()
    //     cy.get('@button7').click().get('@button2').click()
    //     cy.get('@button4').click().get('@button4').click()
    //     cy.get('@button3').click().get('@button3').click()
    //     cy.get('@button6').click().get('@button3').click()
    //     cy.get('@button10').click()
    //     cy.get('@frame10bowl1').should('have.text', 'X')
    //     cy.get('@button10').click()
    //     cy.get('@frame10bowl2').should('have.text', 'X')
    //     cy.get('@button10').click()
    //     cy.get('@frame10bowl3').should('have.text', 'X')
    //     cy.get('[data-testid="game-over"]').should('be.visible')
    //   })
  })
})

export {}
