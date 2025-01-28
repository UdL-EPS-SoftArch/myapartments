import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';

Given('I\'m on the homepage logged in as an owner', () => {
  cy.visit('http://localhost:4200');
  cy.get('.nav-link').contains('Login').click();
  cy.get('#username').type('owner');
  cy.get('#password').type('password');
  cy.get('button').contains('Submit').click();
});

And('There is at least one apartment', () => {
  cy.get('tbody tr').should('have.length.greaterThan', 0);
});

And('I delete the apartment {string}', (apartmentId) => {
  cy.get('#apartment_'+apartmentId).parent().find('.btn-danger').contains('Delete').click();
});

Then ('The apartment {string} should be deleted', (apartmentId) => {
  cy.get('.apartment-list-container').then(($container) => {


    const apartmentSelector = `#apartment_id`;
    const apartmentExists = $container.find(apartmentSelector).length > 0;

    if (apartmentExists) {

      cy.get('#apartment_id').contains(apartmentId).should('not.exist')
    } else {

      cy.get('body').should('not.have.descendants', '#apartment_id');
    }
  });

});
