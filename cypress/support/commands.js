// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add('Each', (selector, callback) => {
    cy.get(selector).each(callback)
})

Cypress.Commands.add('Type', (selector, value, options) => {
    if (options === undefined) {
        cy.get(selector).type(value)
    } else {
        cy.get(selector).type(value, options)
    }
})

Cypress.Commands.add('Select', (selector, value, options) => {
    if (options === undefined) {
        cy.get(selector).select(value)
    } else {
        cy.get(selector).select(value, options)
    }
})

Cypress.Commands.add('IsVisible', (selector, callback) => {
    cy.get(selector).then(
        $elem => callback(
            $elem.is(':visible')
        )
    )
})