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
       addressTypeButton: (addressType) => cy.get(`[data-test-id="ChooseAddressTypeButton.${addressType}"]`),
       addressDetailsInputField: () => cy.get('[data-test-id="edit-address-details-input.building_name"]'),
       dropOffRadioButton: (dropOffOption) =>cy.get(`input[value="dropoff_${dropOffOption}"]`),
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
setAddressType(addressType){
    this.elements.addressTypeButton(addressType).click({force:true});
}
typeAddressDetails(addressDetails) {
    this.elements.addressDetailsInputField().type(addressDetails, { force: true });
}
selectDropOffOption(dropOffOption) {
this.elements.dropOffRadioButton(dropOffOption).click({force:true});
}
clickAddressDetailsSubmitButton() {
    this.elements.addressDetailsSubmitButton().click({force:true});
}
}
