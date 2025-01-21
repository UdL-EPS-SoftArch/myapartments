import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';

Given('I am in the homepage logged in as owner with username {string} and password {string}', (username, password) => {
cy.visit('http://localhost:4200');
cy.get('.nav-link').contains('Login').click();
cy.get('#username').type(username).blur();
cy.get('#password').type(password).blur();
cy.get('button').contains('Submit').click();
});

Given('I create a room', () => {
  cy.wait(500);
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

  cy.visit('http://localhost:4200/room/create');

  cy.wait(4000);
  cy.reload();
  cy.get('#apartmentSelect').should('be.visible').select('NEW');

  cy.get('#trueFalseSelectOcupied').select('True');
  cy.get('#trueFalseSelectHasBed').select('True');
  cy.get('#trueFalseSelectHasWindow').select('True');
  cy.get('#trueFalseSelectHasDesk').select('True');
  cy.get('#surfaceInput').type('45');
  cy.contains('button', "Submit")
    .should('be.visible')
    .click();

});

When('I go to roomList', () => {
  cy.visit('http://localhost:4200/rooms');
});

And('I click the {string} button', (buttonName) => {
  cy.contains('button', buttonName)
    .should('be.visible')
    .click();
});


Then('Room is deleted', () => {
  cy.visit('http://localhost:4200/rooms');
});
