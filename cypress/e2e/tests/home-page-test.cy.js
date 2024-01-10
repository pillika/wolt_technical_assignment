/// <reference types="cypress" />
import { HomePage } from "../pages/home-page.js"
import { DiscoveryPage } from "../pages/discovery-page.js";
import { RestaurantsPage } from "../pages/restaurants-page.js";
import { FoodCategoryPage } from "../pages/food-category-page.js";
import { RestaurantMenuPage } from "../pages/restaurant-menu-page.js";


describe("home-page-test", function () {
    let homePage;
    let discoveryPage;
    let restaurantsPage;
    let foodCategoryPage;
    let restaurantMenuPage;
    const address = "Kauno Dokas";
    const foodTypeFilter = "Burger";
    const restaurantName = 'sventas-dumas';
    const menuItemName = '420 Blaze Burger with CBD'

    beforeEach(function () {
        cy.visit("https://wolt.com")
         homePage = new HomePage();
         discoveryPage = new DiscoveryPage();
         restaurantsPage = new RestaurantsPage();
         foodCategoryPage = new FoodCategoryPage();
         restaurantMenuPage = new RestaurantMenuPage();
    })

    it("check if page title is correct", function () {
        const pageTitle = "Wolt Delivery: Food and more | Lithuania";
        cy.title().should('eq', pageTitle);
    })

    it("search for restaurant that delivers burgers to kauno dokas", function () {
        homePage.cookiePolicyConsent('accept');
        homePage.enterDeliveryAddress(address);

        const discoveryUrl ='https://wolt.com/en/discovery';
        cy.url().should('eq', discoveryUrl);

        discoveryPage.elements.headerAddressText().contains('Jonavos gatvė 7');
        discoveryPage.clickRestaurantsButton();

        const restaurantsPageHeading ="Restaurants near me";
        discoveryPage.elements.pageHeading().should('have.text', restaurantsPageHeading);

        const restaurantsUrl = 'https://wolt.com/en/discovery/restaurants';
        cy.url().should('eq', restaurantsUrl);
        
        restaurantsPage.filterRestaurantsByFood(foodTypeFilter);

        const foodCategoryPageHeading = foodTypeFilter +" near me";
        foodCategoryPage.elements.pageHeading().should('have.text', foodCategoryPageHeading);
        
        const burgersUrl = 'https://wolt.com/en/discovery/category/burgers';
        cy.url().should('eq', burgersUrl);

        foodCategoryPage.elements.restaurantsList().its('length').should('be.gt', 0);
    })

    it("select favorite burger and add it to chart", function () {
        homePage.cookiePolicyConsent('accept');
        homePage.enterDeliveryAddress(address);
        discoveryPage.clickRestaurantsButton();
        restaurantsPage.filterRestaurantsByFood(foodTypeFilter);
        foodCategoryPage.clickOnRestaurant(restaurantName);
        restaurantMenuPage.clickMenuItem(menuItemName);
        restaurantMenuPage.elements.modalItemHeading().should('have.text', menuItemName);
        restaurantMenuPage.addItemToCartInModal();
        restaurantMenuPage.elements.viewOrderButton().should('exist');
    })
  
    it("check if the burger is added to the chart correctly", function () {
        homePage.cookiePolicyConsent('accept');
        homePage.enterDeliveryAddress(address);
        discoveryPage.clickRestaurantsButton();
        restaurantsPage.filterRestaurantsByFood(foodTypeFilter);
        foodCategoryPage.clickOnRestaurant(restaurantName);
        restaurantMenuPage.clickMenuItem(menuItemName);
        let price;
        restaurantMenuPage.elements.modalTotalPrice().invoke('text').then(text => {
            price = text;
            restaurantMenuPage.addItemToOrderInModal();
            restaurantMenuPage.elements.viewOrderButtonItemCount().should('have.text', '1');
            restaurantMenuPage.elements.viewOrderButtonTotalPrice().should('have.text', price);
            restaurantMenuPage.clickViewOrderButton();

            restaurantMenuPage.elements.modalYourOrderTitle().should('exist');
            restaurantMenuPage.elements.modalYourOrderItemName().should('have.text', menuItemName);
            restaurantMenuPage.elements.modalYourOrderItemPrice().should('have.text', price);
            restaurantMenuPage.elements.modalYourOrderItemCount().should('have.text', '1')

            restaurantMenuPage.elements.goToCheckoutButton().should('be.visible');
            restaurantMenuPage.elements.goToCheckoutButtonItemCount().should('have.text', "1");
            restaurantMenuPage.elements.goToCheckoutButtonTotalPrice().should('have.text', price);
        })      
    })

    it("when burger is added to cart, user can log in to proceed to checkout", function () {
        homePage.cookiePolicyConsent('accept');
        homePage.enterDeliveryAddress(address);
        discoveryPage.clickRestaurantsButton();
        restaurantsPage.filterRestaurantsByFood(foodTypeFilter);
        foodCategoryPage.clickOnRestaurant(restaurantName);
        restaurantMenuPage.clickMenuItem(menuItemName);
        restaurantMenuPage.addItemToOrderInModal();
        restaurantMenuPage.clickViewOrderButton();
        restaurantMenuPage.clickGoToCheckoutButton();
        cy.selectAuthenticationMethodByGoogle();
        cy.authenticateWithGoogleAccount();

        cy.url().should('contain', '/checkout');
    })
        
    it("Registered user can log in, set  new delivery address, filter restaurants, add items to cart and proceed to checkout", function() {
        homePage.cookiePolicyConsent('accept');
        homePage.clickUsersDropdown(); 
        homePage.elements.loginOrRegisterButton().should('be.visible');
        homePage.clickLoginOrRegisterButton();
        cy.selectAuthenticationMethodByGoogle();
        cy.authenticateWithGoogleAccount();
        
        homePage.elements.usersProfileImage().should('exist');
        homePage.clickUsersDropdown();
        homePage.elements.logoutButton().should('be.visible');
        
        discoveryPage.clickAddressSelectButton();
        discoveryPage.clickAddNewAddress();
        discoveryPage.enterAddress(address);
        discoveryPage.setAddressType();
        discoveryPage.typeAddressDetails();
        discoveryPage.selectDropOffOption();
        discoveryPage.clickAddressDetailsSubmitButton();
        discoveryPage.elements.headerAddressText().contains('Work (Kauno Dokas)');
        discoveryPage.clickRestaurantsButton();
        restaurantsPage.filterRestaurantsByFood(foodTypeFilter);
        foodCategoryPage.clickOnRestaurant(restaurantName);
        restaurantMenuPage.clickMenuItem(menuItemName);
        restaurantMenuPage.addItemToOrderInModal();
        restaurantMenuPage.clickViewOrderButton();
        restaurantMenuPage.clickGoToCheckoutButton();
    })
})
