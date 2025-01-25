import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('The user is logged in as an {string}', (role: string) => {
  cy.visit('http://localhost:4200/login');
  cy.get('#username').clear().type(role);
  cy.get('#password').clear().type('password');
  cy.get('button[type="submit"]').click();
  cy.url().should('not.include', 'login');
});

When('I go to the create advertisement page', () => {
  cy.visit('http://localhost:4200/advertisement/1/create');
  cy.get('h1').should('contain', 'Create Advertisement');
});

And('I fill the {string} field with {string}', (field: string, value: string) => {
  const fieldMap: { [key: string]: string } = {
    'Title': 'title',
    'Description': 'description',
    'Price': 'price',
    'Zip Code': 'zipCode',
    'Country': 'country',
    'Address': 'address',
    'Expiration Date': 'expirationDate'
  };

  const fieldId = fieldMap[field];

  if (!fieldId) {
    throw new Error(`Field "${field}" is not mapped to any ID.`);
  }

  cy.get(`#${fieldId}`).clear().type(value);
});

And('I click the {string} button', (buttonName: string) => {
  cy.contains('button', buttonName).should('be.visible').click();
});

Then('I should see the advertisement in the advertisements list', () => {
  cy.url().should('include', '/advertisements');

  const advertisementTitle = 'Sunny Apartment';
  cy.get('.card h5').should('contain.text', advertisementTitle);
});
