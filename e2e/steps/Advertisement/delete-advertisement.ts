import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';


Given('The user is logged in as an {string}', (role: string) => {
  cy.visit('http://localhost:4200/login');
  cy.get('#username').clear().type(role);
  cy.get('#password').clear().type('password');
  cy.get('button[type="submit"]').click();
  cy.url().should('not.include', 'login');
});


Given('There is an existing advertisement with the title {string}', (title: string) => {

  cy.visit('http://localhost:4200/advertisements');


  cy.contains('h5', title).should('exist');
});


When('I go to the advertisements list page', () => {
  cy.visit('http://localhost:4200/advertisements');
});


And('I locate the advertisement with the title {string}', (title: string) => {

  Cypress.env('advertisementTitle', title);
  cy.log('Advertisement Title:', title);
  cy.contains('h5', title).should('exist');
});


And('I click the {string} button for the advertisement', (buttonName: string) => {
  const title = Cypress.env('advertisementTitle');
  cy.log('Button Name:', buttonName);
  cy.log('Advertisement Title:', title);


  cy.get(`button[data-title="${title}"]`).contains(buttonName).click();
});


Then('I should see a confirmation dialog', () => {

  cy.window().then((win) => {
    cy.stub(win, 'confirm').returns(true);
  });
});


When('I confirm the deletion', () => {
  // No additional action is needed here since the stub handles the confirmation
  // If using a custom dialog, you would click the "Accept" button here
});


Then('The advertisement should no longer appear in the advertisements list', () => {

  cy.visit('http://localhost:4200/advertisements');
  const title = Cypress.env('advertisementTitle');
  cy.contains('h5', title).should('not.exist');
});
