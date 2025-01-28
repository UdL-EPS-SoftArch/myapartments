import {When, Then, And} from 'cypress-cucumber-preprocessor/steps';

When('I go to the rooms list page', () => {
  cy.get('.nav-link').contains('Rooms').click();
});

And('I go to the homepage', () => {
  cy.visit('http://localhost:4200');
});

And(/^I click on the edit room button$/, function () {
  cy.get('table tbody tr:last-child button').contains('Edit').click();
});

And('I fill some of the room form with different data', () => {
  cy.get('#occupied').check();
  cy.get('#hasBed').check();
  cy.get('#surface').type('70');
});

And('I click the "Update" button', () => {
  cy.get('button').contains('Update').click();
});

Then('I should see the room updated', () => {
  cy.url().should('include', '/rooms');
});

And('I fill some of the room form with different and invalid data', () => {
  cy.get('#occupied').check();
  cy.get('#hasBed').check();
  cy.get('#surface').clear();
});

Then('I should see an error message and still be in editing page', () => {
  cy.url().should('include', '/room/update');
});
