import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

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

And('I fill the form with correct data', () => {
  cy.get('#name').type('New Apartment');
  cy.get('#floor').type('5');
  cy.get('#address').type('123 Main Street');
  cy.get('#postalCode').type('12345');
  cy.get('#city').type('City Name');
  cy.get('#country').type('Country Name');
  cy.get('#description').type('A description of the apartment');
});

And('I click the "Submit" button', () => {
  cy.get('button').contains('Submit').click();
});

Then('I should see the apartment created', () => {
  cy.url().should('include', '/apart');
});

And('I fill the form but leave some empty fields', () => {
    cy.get('#address').type('123 Main Street');
    cy.get('#description').type('A description of the apartment');
    cy.get('button').contains('Submit').click();
});
