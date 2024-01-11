/// <reference types="cypress" />
// Importing Page Objects
import { HomePage } from "../pages/home-page.js"
import { DiscoveryPage } from "../pages/discovery-page.js";
import { RestaurantsPage } from "../pages/restaurants-page.js";
import { FoodCategoryPage } from "../pages/food-category-page.js";
import { RestaurantMenuPage } from "../pages/restaurant-menu-page.js";

// Test Suite
describe("Wolt.com smoke-test (Order a burger to Kauno Dokas office)", function () {
     // Declaring variables for Page Objects
    let homePage;
    let discoveryPage;
    let restaurantsPage;
    let foodCategoryPage;
    let restaurantMenuPage;

    // Constants for test data
    const address = "Kauno Dokas";
    const foodCategoryFilter = "Burger";
    const restaurantName = 'sventas-dumas';
    const menuItemName = '420 Blaze Burger with CBD'

    // Setup before each test
    beforeEach(function () {
        // Visit Wolt homepage and instantiate Page Objects
        cy.visit("https://wolt.com")
         homePage = new HomePage();
         discoveryPage = new DiscoveryPage();
         restaurantsPage = new RestaurantsPage();
         foodCategoryPage = new FoodCategoryPage();
         restaurantMenuPage = new RestaurantMenuPage();
    })
    
    // Test Case 1: Check if page title is correct
    it("check if page title is correct", function () {
        // Define expected page title
        const pageTitle = "Wolt Delivery: Food and more | Lithuania";
        // Assert that the actual page title is equal to the expected title
        cy.title().should('eq', pageTitle);
    })
    // Test Case 2: Search for restaurants that deliver burgers to Kauno Dokas
    it("search for restaurants that deliver burgers to kauno dokas", function () {
        // Accept cookie policy
        homePage.cookiePolicyConsent('accept');
        // Enter delivery address
        homePage.enterDeliveryAddress(address);
        // Assert that the URL is the Discovery page URL
        const discoveryUrl ='https://wolt.com/en/discovery';
        cy.url().should('eq', discoveryUrl);
        // Assert that the header address text contains the correct address
        discoveryPage.elements.headerAddressText().contains('Jonavos gatvė 7');
        // Click on Restaurants button
        discoveryPage.clickRestaurantsButton();
        // Assert that the page heading is "Restaurants near me"
        const restaurantsPageHeading ="Restaurants near me";
        discoveryPage.elements.pageHeading().should('have.text', restaurantsPageHeading);
        // Assert that the URL is the Restaurants page URL
        const restaurantsUrl = 'https://wolt.com/en/discovery/restaurants';
        cy.url().should('eq', restaurantsUrl);
        // Filter restaurants by food category
        restaurantsPage.filterRestaurantsByFood(foodCategoryFilter);
        // Assert that the page heading reflects the selected food category
        const foodCategoryPageHeading = foodCategoryFilter +" near me";
        foodCategoryPage.elements.pageHeading().should('have.text', foodCategoryPageHeading);
        // Assert that the URL is the Burgers category page URL
        const burgersUrl = 'https://wolt.com/en/discovery/category/burgers';
        cy.url().should('eq', burgersUrl);
        // Assert that there is at least one restaurant in the list
        foodCategoryPage.elements.restaurantsList().its('length').should('be.gt', 0);
    })
    // Test Case 3: Select favorite menu item and add it to cart
    it("select favorite menu item and add it to chart", function () {
        // Accept cookie policy
        homePage.cookiePolicyConsent('accept');
        // Enter delivery address
        homePage.enterDeliveryAddress(address);
        // Click on Restaurants button
        discoveryPage.clickRestaurantsButton();
         // Filter restaurants by food category
        restaurantsPage.filterRestaurantsByFood(foodCategoryFilter);
        // Click on a specific restaurant
        foodCategoryPage.clickOnRestaurant(restaurantName);
        // Click on a menu item
        restaurantMenuPage.clickMenuItem(menuItemName);
         // Assert that the modal displays the selected menu item
        restaurantMenuPage.elements.modalItemHeading().should('have.text', menuItemName);
        // Add the item to the order in the modal
        restaurantMenuPage.addItemToOrderInModal();
         // Assert that the item count is visible and the "View Order" button exists
        restaurantMenuPage.elements.itemCardTopRightCornerCount().should('be.visible');
        restaurantMenuPage.elements.viewOrderButton().should('exist');
    })
    // Test Case 4: Check if the burger is added to the chart correctly
    it("check if the burger is added to the chart correctly", function () {
        // Accept cookie policy
        homePage.cookiePolicyConsent('accept');
        // Enter delivery address
        homePage.enterDeliveryAddress(address);
        // Click on Restaurants button
        discoveryPage.clickRestaurantsButton();
        // Filter restaurants by food category
        restaurantsPage.filterRestaurantsByFood(foodCategoryFilter);
        // Click on a specific restaurant
        foodCategoryPage.clickOnRestaurant(restaurantName);
        // Click on a menu item
        restaurantMenuPage.clickMenuItem(menuItemName);
        // Get the price of the selected item, stated in menu
        let price;
        restaurantMenuPage.elements.modalTotalPrice().invoke('text').then(text => {
            price = text;
            // Add the item to the order in the modal
            restaurantMenuPage.addItemToOrderInModal();
             // Assert that the "View order" button item count is 1, and the total price matches
            restaurantMenuPage.elements.viewOrderButtonItemCount().should('have.text', '1');
            restaurantMenuPage.elements.viewOrderButtonTotalPrice().should('have.text', price);
            // Click on the "View Order" button
            restaurantMenuPage.clickViewOrderButton();
            // Assert item name, price and count in the "Your Order" modal
            restaurantMenuPage.elements.modalYourOrderTitle().should('exist');
            restaurantMenuPage.elements.modalYourOrderItemName().should('have.text', menuItemName);
            restaurantMenuPage.elements.modalYourOrderItemPrice().should('have.text', price);
            restaurantMenuPage.elements.modalYourOrderItemCount().should('have.text', '1')
             // Assert "Go to Checkout" button, item price and count
            restaurantMenuPage.elements.goToCheckoutButton().should('be.visible');
            restaurantMenuPage.elements.goToCheckoutButtonItemCount().should('have.text', "1");
            restaurantMenuPage.elements.goToCheckoutButtonTotalPrice().should('have.text', price);
        })      
    })
    // Test Case 5: When food item is added to cart, registered user can log in and proceed to checkout
    it("when food item is added to cart, registered user can log in and proceed to checkout", function () {
        // Accept cookie policy
        homePage.cookiePolicyConsent('accept');
         // Enter delivery address
        homePage.enterDeliveryAddress(address);
        // Click on Restaurants button
        discoveryPage.clickRestaurantsButton();
        // Filter restaurants by food category
        restaurantsPage.filterRestaurantsByFood(foodCategoryFilter);
        // Click on a specific restaurant
        foodCategoryPage.clickOnRestaurant(restaurantName);
        // Click on a menu item
        restaurantMenuPage.clickMenuItem(menuItemName);
        // Add the item to the order in the modal
        restaurantMenuPage.addItemToOrderInModal();
        // Click on the "View Order" button
        restaurantMenuPage.clickViewOrderButton();
        // Click on the "Go to Checkout" button
        restaurantMenuPage.clickGoToCheckoutButton();
        // Select Google as the authentication method
        cy.selectAuthenticationMethodByGoogle();
         // Authenticate with a Google account
        cy.authenticateWithGoogleAccount();
        // Assert that the URL contains '/checkout'
        cy.url().should('contain', '/checkout');
    })
     // Test Case 6: Registered user can log in, add delivery address, filter restaurants, add items to cart, and proceed to checkout   
    it("Registered user can log in, add delivery address, filter restaurants, add items to cart and proceed to checkout", function() {
        // Accept cookie policy
        homePage.cookiePolicyConsent('accept');
         // Click on the user's dropdown
        homePage.clickUsersDropdown(); 
         // Assert that the login/register button is visible and click on it
        homePage.elements.loginOrRegisterButton().should('be.visible');
        homePage.clickLoginOrRegisterButton();
         // Select Google as the authentication method
        cy.selectAuthenticationMethodByGoogle();
        // Authenticate with a Google account
        cy.authenticateWithGoogleAccount();
        // Assert that login was successful: the user's profile image exists, the log out button exists
        homePage.elements.usersProfileImage().should('exist');
        homePage.clickUsersDropdown();
        homePage.elements.logoutButton().should('be.visible');
        // Set adress: click on the address select button in the Discovery page
        discoveryPage.clickAddressSelectButton();
        // Click on the "Add New Address" button
        discoveryPage.clickAddNewAddress();
         // Enter address details
        discoveryPage.enterAddress(address);
        // Set address type
        discoveryPage.setAddressType('office');
        // Type address details
        discoveryPage.typeAddressDetails("Kauno Dokas, B entrance, Present Connection");
        // Select drop-off option
        discoveryPage.selectDropOffOption("at_office");
        // Click on the address details submit button
        discoveryPage.clickAddressDetailsSubmitButton();
        // Assert that the header address text contains the entered address
        discoveryPage.elements.headerAddressText().contains(address);
        // Click on the Restaurants button
        discoveryPage.clickRestaurantsButton();
        // Filter restaurants by food category
        restaurantsPage.filterRestaurantsByFood(foodCategoryFilter);
        // Click on a specific restaurant
        foodCategoryPage.clickOnRestaurant(restaurantName);
        // Click on a menu item
        restaurantMenuPage.clickMenuItem(menuItemName);
        // Add the item to the order in the modal
        restaurantMenuPage.addItemToOrderInModal();
        // Click on the "View Order" button
        restaurantMenuPage.clickViewOrderButton();
        // Click on the "Go to Checkout" button
        restaurantMenuPage.clickGoToCheckoutButton();
        // Assert that the URL contains '/checkout'
        cy.url().should('contain', '/checkout');
    })
})
