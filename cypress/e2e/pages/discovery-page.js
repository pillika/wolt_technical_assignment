export class DiscoveryPage{
    elements ={
       headerAddressText: () => cy.get(`[data-test-id="header.address-select-button.address-text"]`),
       restaurantsButton: () => cy.contains('Restaurants'),
       pageHeading: () =>cy.get('h1'),
       addressSelectButton: () => cy.get('[data-test-id="header.address-select-button"]').eq(0),
       addNewAddressButton: () => cy.contains('Add new address'),
       addressInputField: () => cy.get('[data-test-id="AddressQueryInput"]'),
       addressSugestions: () => cy.get('#suggestions'),
       addressContinueButton: () =>  cy.get('[data-test-id="AddressPicker.ContinueButton"]'),
       addressTypeButton: () =>cy.get('[data-test-id="ChooseAddressTypeButton.office"]'),
       addressDetailsInputField: () => cy.get('[data-test-id="edit-address-details-input.building_name"]'),
       dropOffAtOfficeRadioButton: () =>cy.get('input[value="dropoff_at_office"]'),
       addressDetailsSubmitButton: () => cy.get('[data-test-id="edit-address-details-submit-button"]')
    } 
clickRestaurantsButton(){
    this.elements.restaurantsButton().click({force:true});
}
clickAddressSelectButton() {
    this.elements.addressSelectButton().click({force:true});
}
clickAddNewAddress() {
    this.elements.addNewAddressButton().click({force:true});
}
enterAddress(address){
    this.elements.addressInputField().focus().type(address, { force: true });
    this.elements.addressSugestions().should('be.visible', { force: true });
    this.elements.addressInputField().type('{enter}', { force: true });
    this.elements.addressContinueButton().click();
}

setAddressType(){
    this.elements.addressTypeButton().click({force:true});
}
typeAddressDetails() {
    this.elements.addressDetailsInputField().type("Kauno Dokas, B entrance, Present Connection", { force: true });
}
selectDropOffOption() {
this.elements.dropOffAtOfficeRadioButton().click({force:true});
}
clickAddressDetailsSubmitButton() {
    this.elements.addressDetailsSubmitButton().click({force:true});
}

}
