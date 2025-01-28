import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';

Given('I am in the homepage logged in as owner with username {string} and password {string}', (username, password) => {
  cy.visit('http://localhost:4200');
  cy.get('.nav-link').contains('Login').click();
  cy.get('#username').type(username).blur();
  cy.get('#password').type(password).blur();
  cy.get('button').contains('Submit').click();
});

Given('I create a room with surface {string}', (surface) => {
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

  cy.visit('http://localhost:4200/rooms');
  cy.get('button').contains('Create').click();

  cy.get('#apartmentSelect').focus()
  cy.wait(1000);
  cy.get('#apartmentSelect').blur()
  cy.get('#apartmentSelect').should('not.be.empty').select(0);
  cy.get('#surfaceInput').type(surface);
  cy.contains('button', "Create")
    .should('be.visible')
    .click();
});

When('I go to roomList', () => {
  cy.visit('http://localhost:4200/rooms');
});

And('I delete the room with surface {string}', (surface) => {
  cy.get('table tbody tr').contains(surface)
    .parent().find('button').contains('Delete').should('be.visible').click();
});

Then('The room with surface {string} is deleted', (surface) => {
  cy.get('table tbody tr').contains(surface).should('not.exist');
});
