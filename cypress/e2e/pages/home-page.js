 export class HomePage{
    elements ={
        cookiePolicyConsentButton : (label) => cy.get(`[data-localization-key="gdpr-consents.banner.${label}-button"]`),
        addressInputField : () =>  cy.get('[data-test-id="address-picker-input.input"]'),
        addressSuggestions : () => cy.get('#suggestions', { timeout: 10000 }),
        usersDropdown: () => cy.get('[data-test-id="UserStatusDropdown"]'),
        loginOrRegisterButton: () => cy.get('div[role="menu"] div > button').eq(0),
        usersProfileImage: () => cy.get('[data-test-id="UserStatus.ProfileImage"]', {timeout:10000}),
        logoutButton: () => cy.contains('Log out'), 
    }
    cookiePolicyConsent(label){
        this.elements.cookiePolicyConsentButton(label).click();
    }
    enterDeliveryAddress(address) {
        this.elements.addressInputField().type(address);
        this.elements.addressSuggestions().should('be.visible');
        this.elements.addressInputField().type('{enter}');
    }
    clickUsersDropdown(){
        this.elements.usersDropdown().click();
    }   
    clickLoginOrRegisterButton() {
        this.elements.loginOrRegisterButton().click({force:true});
    }
}
