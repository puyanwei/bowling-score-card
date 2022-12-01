//@ts-nocheck
/// <reference types="cypress" />

// Not sure how to solve this typescript error on the value parameter
Cypress.Commands.add('getById', (value) => {
  return cy.get(`[data-testid=${value}]`)
})

declare global {
  namespace Cypress {
    interface Chainable {
      getById(value: string): Chainable<Element>
    }
  }
}

export {}
