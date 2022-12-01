// @ts-nocheck
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getById(value: string): Chainable<Element>
    }
  }
}

// Not sure how to solve this typescript error on the value parameter
Cypress.Commands.add('getById', (value) => {
  return cy.get(`[data-testid=${value}]`)
})

export {}
