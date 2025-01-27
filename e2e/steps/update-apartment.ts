import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';

Given('I\'m on the homepage logged in as an owner', () => {
  cy.visit('http://localhost:4200');
  cy.get('.nav-link').contains('Login').click();
  cy.get('#username').type('owner');
  cy.get('#password').type('password');
  cy.get('button').contains('Submit').click();
});

When('I go to the apartment list page', () => {
  cy.get('.nav-link').contains('Apartments').click();
});

And('I click on the create button', () => {
  cy.get('button').contains('Create').click();
  cy.url().should('include', '/apartment/create');
});

And('I click on the edit button', () => {
  cy.get('table tbody tr:last-child button').contains('Edit').click();
});

And('I fill the form with correct data', () => {
  cy.get('#name').type('New Apartment');
  cy.get('#floor').type('5');
  cy.get('#address').type('123 Main Street');
  cy.get('#postalCode').type('12345');
  cy.get('#city').type('City Name');
  cy.get('#country').type('Country Name');
  cy.get('#description').type('A description of the apartment');
});

And('I fill some of the form with different data', () => {
  cy.get('#name').clear().type('Different Name');
  cy.get('#city').clear().type('City Name');
  cy.get('#country').clear().type('Country Name');
  cy.get('#description').clear().type('A different description of the apartment');
});

And('I click the "Submit" button', () => {
  cy.get('button').contains('Submit').click();
});

Then('I should see the apartment created', () => {
  cy.url().should('include', '/apart');
});

Then('I should see the apartment updated', () => {
  cy.url().should('include', '/apart');
  cy.get('table tbody tr:last-child td:nth-child(2)').should('have.text', 'Different Name');

});

And('I fill the form with some empty fields', () => {
  cy.get('#name').type('New Apartment');
  cy.get('#floor').type('5');
  cy.get('#address').clear();
  cy.get('#postalCode').clear();
  cy.get('#city').clear();
  cy.get('#country').clear();
  cy.get('#description').type('A description of the apartment');
});

Then('I should see an error message', () => {
  cy.get('ngb-alert.alert-danger')
    .should('be.visible')
    .and('contain', 'Invalid form: field country is required.');
});
