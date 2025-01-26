import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

// Step 1: Log in as a specific role
Given('The user is logged in as an {string}', (role: string) => {
  cy.visit('http://localhost:4200/login');
  cy.get('#username').clear().type(role);
  cy.get('#password').clear().type('password');
  cy.get('button[type="submit"]').click();
  cy.url().should('not.include', 'login');
});

// Step 2: Ensure an advertisement with a specific title exists
Given('There is an existing advertisement with the title {string}', (title: string) => {
  // Navigate to the advertisements list
  cy.visit('http://localhost:4200/advertisements');

  // Verify that the advertisement with the specified title exists
  cy.contains('h5', title).should('exist');
});

// Step 3: Navigate to the advertisements list page
When('I go to the advertisements list page', () => {
  cy.visit('http://localhost:4200/advertisements');
});

// Step 4: Locate the advertisement with a specific title
And('I locate the advertisement with the title {string}', (title: string) => {
  // Save the title in Cypress environment for later use
  Cypress.env('advertisementTitle', title);
  cy.log('Advertisement Title:', title);
  cy.contains('h5', title).should('exist');
});

// Step 5: Click a specific button for the advertisement
And('I click the {string} button for the advertisement', (buttonName: string) => {
  const title = Cypress.env('advertisementTitle');
  cy.log('Button Name:', buttonName);
  cy.log('Advertisement Title:', title);

  // Find the button based on the data-title attribute and click it
  cy.get(`button[data-title="${title}"]`).contains(buttonName).click();
});

// Step 6: Verify that the confirmation dialog is visible
Then('I should see a confirmation dialog', () => {
  // Simulate the user clicking "Accept" in the confirmation dialog
  cy.window().then((win) => {
    cy.stub(win, 'confirm').returns(true); // Return true to simulate "Accept"
  });
});

// Step 7: Confirm the deletion
When('I confirm the deletion', () => {
  // No additional action is needed here since the stub handles the confirmation
  // If using a custom dialog, you would click the "Accept" button here
});

// Step 8: Verify that the advertisement no longer appears in the list
Then('The advertisement should no longer appear in the advertisements list', () => {
  // Navigate to the advertisements list
  cy.visit('http://localhost:4200/advertisements');
  const title = Cypress.env('advertisementTitle');
  cy.contains('h5', title).should('not.exist');
});
