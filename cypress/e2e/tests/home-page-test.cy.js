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
        cy.get('[data-test-id="address-picker-input.input"]').type("Kauno Dokas");
        cy.get('#suggestions', { timeout: 10000 }).should('be.visible');
        cy.get('[data-test-id="address-picker-input.input"]').type('{enter}');
        cy.url().should('eq', 'https://wolt.com/en/discovery');
        cy.get(`[data-test-id="header.address-select-button.address-text"]`).contains('Jonavos gatvė 7');
        //need to improve selector
        cy.get(':nth-child(2) > .sc-147d0703-0')
        .click();
        cy.get('h1').should('have.text', "Restaurants near me");
        cy.url().should('eq', 'https://wolt.com/en/discovery/restaurants');
        cy.contains('Burger').click();
        cy.get('h1').should('have.text', "Burger near me");
        cy.url().should('eq', 'https://wolt.com/en/discovery/category/burgers');
        cy.get(`[data-test-id="VenueVerticalListGrid"]>a`).its('length').should('be.gt', 0);
    })
    xit("select favorite burger and add it to chart", function () {
        cy.clickDataLocalizationKeyButton("gdpr-consents.banner.accept-button");
        cy.get('[data-test-id="address-picker-input.input"]').type("Kauno Dokas");
        cy.get('#suggestions', { timeout: 10000 }).should('be.visible');
        cy.get('[data-test-id="address-picker-input.input"]').type('{enter}');
        //need to improve selector
        cy.get(':nth-child(2) > .sc-147d0703-0')
            .click();
        cy.contains('Burger').click();
        cy.get('[data-test-id="venueCard.sventas-dumas"]').click();
        cy.contains('420 Blaze Burger with CBD').click({force: true});
        cy.get('div[data-modal-content-container="true"] h2')
            .should('have.text', "420 Blaze Burger with CBD");
        cy.get('[data-test-id="product-modal.submit"]').click();
        cy.get('[data-test-id="cart-view-button"]').should('exist');

    })
    xit("check if the burger is added to the chart correctly", function () {
        cy.clickDataLocalizationKeyButton("gdpr-consents.banner.accept-button");
        cy.get('[data-test-id="address-picker-input.input"]').type("Kauno Dokas");
        cy.get('#suggestions', { timeout: 10000 }).should('be.visible');
        cy.get('[data-test-id="address-picker-input.input"]').type('{enter}');
        //need to improve selector
        cy.get(':nth-child(2) > .sc-147d0703-0')
            .click();
        cy.contains('Burger').click();
        cy.get('[data-test-id="venueCard.sventas-dumas"]').click();
        cy.contains('420 Blaze Burger with CBD').click({force: true});
        let price;
        cy.get('[data-test-id="product-modal.total-price"]').invoke('text').then(text => {
            price = text;
            cy.get('[data-test-id="product-modal.submit"]').click();
            cy.get('[data-test-id="cart-view-button"] div:last-child > div > div:first-child').eq(0).should('have.text', '1');
            cy.get('[data-test-id="cart-view-button"] div:last-child > div > div:last-child').eq(0).should('have.text', price);
            cy.contains('View order').click();
            cy.contains('Your order').should('exist');
            cy.get('[data-test-id="CartItemName"]').should('have.text', "420 Blaze Burger with CBD");
            cy.get('[data-test-id="CartItemName"]').parent('div').find('div > span').eq(2).should('have.text', price);
            cy.get('[data-test-id="CartItemStepperValue"]').should('have.text', '1')
            cy.get('[data-test-id="CartViewNextStepButton"]').should('be.visible');
            cy.get('[data-test-id="CartViewItemCount"]').should('have.text', "1");
            cy.contains('Go to checkout').find('span').eq(1).should('have.text', price);
        })
       
        
        
    })
})