/* eslint-disable @typescript-eslint/no-namespace */

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('dataCy', (value: string, modifier?: string) => {
  return cy.get(`[data-cy="${value}"]${modifier ? modifier : ''}`)
})

Cypress.Commands.add(
  'assertLength',
  // @ts-expect-error - Typing a dual command is weird. The public interface is different from
  // the actual interface because Cypress injects the subject and shifts the other args to the right.
  { prevSubject: 'optional' },
  (
    subject: Cypress.Chainable<JQuery<HTMLElement>> | undefined,
    arg1: number | string,
    arg2?: number
  ) => {
    if (subject) {
      return cy.wrap(subject).should('have.length', arg1)
    }
    // @ts-expect-error - See comment above
    return cy.get(arg1).should('have.length', arg2)
  }
)

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       * @example cy.dataCy('blog-post', ':visible')
       */
      dataCy(value: string, modifier?: string): Chainable<JQuery<HTMLElement>>

      /**
       * Custom dual command to assert the length of DOM elements
       * @example cy.get('h2').assertLength(3)
       * @example cy.assertLength('h2', 3)
       */
      assertLength(length: number): Chainable<JQuery<HTMLElement>>
      assertLength(
        selector: string,
        length: number
      ): Chainable<JQuery<HTMLElement>>
    }
  }
}

// The cypress docs don't mention that this part is needed when using `declare global` to avoid the following error...
// "Augmentations for the global scope can only be directly nested in external modules or ambient module declarations."
export {}
