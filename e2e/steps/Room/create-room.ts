import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';

Given('The test apartment', () => {
    cy.visit('http://localhost:4200/apartment/create');
    cy.get('#name').clear().type('NEW');

    cy.get('#floor').clear().type('0');
    cy.get('#address').clear().type('0');
    cy.get('#postalCode').clear().type('0');
    cy.get('#city').clear().type('0');
    cy.get('#country').clear().type('0');
    cy.get('#description').clear().type('0');

    // Hacer clic en el botón de submit
    cy.get('button').contains('Submit').click();
    cy.get('h1').should('contain', 'NEW');
});

And(/^I click on create room button$/, function () {
    cy.get('button.btn.btn-primary.mt-3.mb-3').contains('Create').click();
    cy.get('h1').should('contain', 'Create Room');
    cy.get('#apartmentSelect').should('not.be.empty');
});

And('I select the first option for {string}', (selection) => {
    cy.get('#' + selection).focus(); // Force form refresh to show options, it seems a bug...
    cy.wait(1000);
    cy.get('#' + selection).blur();
    cy.get('#' + selection).select(0);
});

And('I check {string}', (checkId) => {
    cy.get('#' + checkId).check();
});

And('I enter {string} into the "Surface" field', (text) => {
    cy.get('#surfaceInput').type(text);
});

And('I click the {string} button', (buttonName) => {
cy.contains('button', buttonName)
    .should('be.visible')
    .click();
});
Then('I should see a new room', () => {
    cy.get('table').should('be.visible');
    cy.get('table tbody tr').last().within(() => {
      cy.get('td').eq(1).should('contain.text', 'NEW');
      cy.get('td').eq(2).should('contain.text', 'true');
      cy.get('td').eq(3).should('contain.text', 'true');
      cy.get('td').eq(4).should('contain.text', 'true');
      cy.get('td').eq(5).should('contain.text', 'true');
      cy.get('td').eq(6).should('contain.text', '45');
    });
  });
