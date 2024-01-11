export class RestaurantMenuPage {
elements = {
    menuItem: (itemName) => cy.contains(`${itemName}`),
    modalItemHeading: () =>cy.get('div[data-modal-content-container="true"] h2'),
    modalAddToOrderButton: () => cy.get('[data-test-id="product-modal.submit"]'),
    viewOrderButton: () => cy.get('[data-test-id="cart-view-button"]').eq(0),
    modalTotalPrice: () => cy.get('[data-test-id="product-modal.total-price"]'),
    viewOrderButtonItemCount: () => cy.get('[data-test-id="cart-view-button"] div:last-child > div > div:first-child').eq(0),
    viewOrderButtonTotalPrice: () => cy.get('[data-test-id="cart-view-button"] div:last-child > div > div:last-child').eq(0),
    modalYourOrderTitle: () => cy.contains('Your order'),
    modalYourOrderItemName: () => cy.get('[data-test-id="CartItemName"]'),
    modalYourOrderItemPrice: () => cy.get('[data-test-id="CartItemName"]').parent('div').find('div > span').eq(2),
    modalYourOrderItemCount: () => cy.get('[data-test-id="CartItemStepperValue"]'),
    goToCheckoutButton: () => cy.get('[data-test-id="CartViewNextStepButton"]'),
    goToCheckoutButtonItemCount: () => cy.get('[data-test-id="CartViewItemCount"]'),
    goToCheckoutButtonTotalPrice: () =>cy.contains('Go to checkout').find('span').eq(1),
    modalContinueYourOrder: () => cy.get('div[data-modal-content-container="true"]', {timeout:10000}),
    itemCardTopRightCornerCount: () => cy.get('[data-test-id="horizontal-item-card-stepperValue"]', {timeout:10000}), 
}
clickMenuItem (itemName) {
    this.elements.menuItem(itemName).click({force:true});
}
addItemToOrderInModal(){
    this.elements.modalAddToOrderButton().click();
}
clickViewOrderButton() {
    this.elements.viewOrderButton().should('be.visible', {timeout: 20000}).click();
}
clickGoToCheckoutButton(){
    this.elements.goToCheckoutButton().click();
}
}