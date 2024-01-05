/// <reference types="cypress" />

describe("home-page-test", function () {
    this.beforeEach(function () {
        cy.visit("https://wolt.com")
    })
    xit("check if page title is correct", function () {
        cy.title().should('eq', "Wolt Delivery: Food and more | Lithuania")
    })
    xit("search for restaurant that delivers burgers to kauno dokas", function () {
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
        cy.get('h1').should('have.text', "Burger near me");
        cy.get(`[data-test-id="VenueVerticalListGrid"]>a`).its('length').should('be.gt', 0);
    })
    xit("select favorite burger and add it to chart", function () {
        cy.clickDataLocalizationKeyButton("gdpr-consents.banner.accept-button");
        cy.get('#front-page-input').type("Kauno Dokas");
        cy.get('#suggestions', { timeout: 10000 }).should('be.visible');
        cy.get('#front-page-input').type('{enter}');
        //need to improve selector
        cy.get(':nth-child(2) > .sc-147d0703-0')
            .click();
        cy.contains('Burger').click();
        cy.get('[data-test-id="venueCard.sventas-dumas"]').click();
        cy.contains('420 Blaze Burger with CBD').click();
        cy.get('div[data-modal-content-container="true"] h2')
            .should('have.text', "420 Blaze Burger with CBD");
        cy.get('[data-test-id="product-modal.submit"]').click();
        cy.get('[data-test-id="cart-view-button"]').should('exist');

    })
    it("check if the burger is added to the chart correctly", function () {
        cy.clickDataLocalizationKeyButton("gdpr-consents.banner.accept-button");
        cy.get('#front-page-input').type("Kauno Dokas");
        cy.get('#suggestions', { timeout: 10000 }).should('be.visible');
        cy.get('#front-page-input').type('{enter}');
        //need to improve selector
        cy.get(':nth-child(2) > .sc-147d0703-0')
            .click();
        cy.contains('Burger').click();
        cy.get('[data-test-id="venueCard.sventas-dumas"]').click();
        cy.contains('420 Blaze Burger with CBD').click();
        let price;
        cy.get('[data-test-id="product-modal.total-price"]').invoke('text').then(text => {
            price = text;
            cy.get('[data-test-id="product-modal.submit"]').click();
            cy.get('[data-test-id="cart-view-button"] div:last-child > div > div:first-child').eq(0).should('have.text', '1');
            cy.get('[data-test-id="cart-view-button"] div:last-child > div > div:last-child').eq(0).should('have.text', price);
        })
        
    })
})