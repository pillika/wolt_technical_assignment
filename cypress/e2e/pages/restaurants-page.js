export class RestaurantsPage{
    elements ={
       
        filtersOfRestaurants: (foodName) => cy.contains(`${foodName}`),
        pageHeading: () =>cy.get('h1'),
     } 
filterRestaurantsByFood(foodName) {
    this.elements.filtersOfRestaurants(foodName).click();
}
}