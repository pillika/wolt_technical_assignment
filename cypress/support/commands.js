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
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => {  })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('selectAuthenticationMethodByGoogle', () => {
  cy.get('[data-test-id="MethodSelect.Google"]').click();
})

// // Followed this example: https://medium.com/@neeleshrauniyar/log-in-through-facebook-using-cypress-b3a6d9490cfc
Cypress.Commands.add('authenticateWithGoogleAccount', () => {
 cy.origin("https://accounts.google.com/o/oauth2/auth", ()=>{
    cy.get('input[type="email"]').type(Cypress.env("email"), {force: true});
    cy.get("#identifierNext").click();
    Cypress.on(
        'uncaught:exception',
        (err) =>
          !err.message.includes('ResizeObserver loop') &&
          !err.message.includes('Error in protected function')
      )
    cy.wait(5000);
    cy.get('input[type="password"]').type(Cypress.env("password"), {force: true});
    cy.get("#passwordNext").click();
  })
})

// https://stackoverflow.com/questions/49384120/resizeobserver-loop-limit-exceeded
Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

Cypress.on(
  'uncaught:exception',
  (err) =>
    !err.message.includes('ResizeObserver loop') &&
    !err.message.includes('Error in protected function')
)