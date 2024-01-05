/// <reference types="cypress" />

describe("home-page-test", function () {
    this.beforeEach(function () {
        cy.visit("https://wolt.com")
    })
    it("check if page title is correct", function () {
        cy.title().should('eq', "Wolt Delivery: Food and more | Lithuania")
    })
    it("search for restaurant that delivers burgers to kauno dokas", function () {
        cy.clickDataLocalizationKeyButton("gdpr-consents.banner.accept-button");
        cy.get('#front-page-input').type("Kauno Dokas");
        cy.get('#suggestions', { timeout: 10000 }).should('be.visible');
        cy.get('#front-page-input').type('{enter}');
        cy.url().should('eq', 'https://wolt.com/en/discovery');
        cy.get(`[data-test-id="header.address-select-button.address-text"]`).contains('Jonavos gatvė 7');
        //need to improve selector
        cy.get(':nth-child(2) > .sc-147d0703-0')
        .click();
        cy.get('h1').should('have.text', "Restaurants near me");
        cy.contains('Burger').click();
        cy.get('h1').should('have.text', "Burgers near me");
        cy.get(`[data-test-id="VenueVerticalListGrid"]>a`);
    })
    
})