import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('The user is logged in as an {string}', (role: string) => {
  cy.visit('http://localhost:4200/login');
  cy.get('#username').clear().type(role);
  cy.get('#password').clear().type('password123');
  cy.get('button[type="submit"]').click();
  cy.url().should('not.include', 'login');
});

When('I go to the create advertisement page', () => {
  cy.visit('http://localhost:4200/advertisement/create');
  cy.get('h1').should('contain', 'Create Advertisement');
});

And('I fill the {string} field with {string}', (field: string, value: string) => {
  const fieldId = field.toLowerCase().replace(' ', '');
  cy.get(`#${fieldId}`).clear().type(value);
});

And('I click the {string} button', (buttonName: string) => {
  cy.contains('button', buttonName).should('be.visible').click();
});

Then('I should see the advertisement in the advertisements list', () => {
  cy.url().should('include', '/advertisements');
  cy.get('table').should('be.visible');
  cy.get('table tbody tr').last().within(() => {
    cy.get('td').should('contain', 'Sunny Apartment');
    cy.get('td').should('contain', 'A cozy apartment in the city center');
    cy.get('td').should('contain', '1200');
    cy.get('td').should('contain', '08001');
    cy.get('td').should('contain', 'Spain');
    cy.get('td').should('contain', 'Carrer de Mallorca, 123');
    cy.get('td').should('contain', '2025-12-31');
  });
});
