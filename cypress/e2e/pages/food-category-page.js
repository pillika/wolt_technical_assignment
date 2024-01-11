export class FoodCategoryPage {
    elements ={
        filtersOfRestaurants: (foodName) => cy.contains(`${foodName}`),
        pageHeading: () =>cy.get('h1'),
        restaurantsList: () => cy.get(`[data-test-id="VenueVerticalListGrid"]>a`),
        restaurant: (restaurantName) => cy.get(`[data-test-id="venueCard.${restaurantName}"]`)
     } 
     clickOnRestaurant (restaurantName) {
        this.elements.restaurant(restaurantName).click();
     }
}