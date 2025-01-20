import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';
import { DataTable } from '@cucumber/cucumber';

Given('I\'m in the homepage logged in as owner with username {string} and password {string}', (username, password) => {
    cy.visit('http://localhost:4200');
    cy.get('.nav-link').contains('Login').click();
    cy.get('#username').type(username).blur();
    cy.get('#password').type(password).blur();
    cy.get('button').contains('Submit').click();
});

Given('The test apartment', () => {
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
    
});


When(/^I go to the room list page$/, function () {
    cy.get('.nav-link').contains('Rooms').click();
});

And(/^I click on create room button$/, function () {
    cy.get('button.btn.btn-primary.mt-3.mb-3')
    .contains('Create')
    .click(); 
});

And('I select "NEW" for "Select apartment"', () => {
    cy.get('#apartmentSelect').should('be.visible').select('NEW');
});

And('I select "True" for "Is occupied?"', () => {
    cy.get('#trueFalseSelectOcupied').select('True');
}); 

And('I select "True" for "Has bed?"', () => {
    cy.get('#trueFalseSelectHasBed').select('True');
});

And('I select "True" for "Has window?"', () => {
    cy.get('#trueFalseSelectHasWindow').select('True');
});

And('I select "True" for "Has desk?"', () => {
    cy.get('#trueFalseSelectHasDesk').select('True');
});

And('I enter "45" into the "Surface" field', () => {
    cy.get('#surfaceInput').type('45');
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
  