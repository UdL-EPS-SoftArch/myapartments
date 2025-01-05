import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';
import { error } from 'console';


Given('I\'m in the homepage logged in as owner with username {string} and password {string}', (username,password) => {
    cy.visit('http://localhost:4200');
    cy.get('.nav-link').contains('Login').click();
    cy.get('input[name=username]').type(username);
    cy.get('input[name=password]').type(password);
    cy.get('button[type=submit]').click()
})

When(/^I go to the room list page$/, function () {
    cy.get('.nav-link').contains('Rooms').click();
});

When(/^I click on create room button$/, function () {
    cy.get('button.btn.btn-primary.mt-3.mb-3')
    .contains('Create')
    .click(); 
});

When('I select {string} for {string}', (value: string, fieldName: 'Select apartment' | 'Is occupied?' | 'Has bed?' | 'Has window?' | 'Has desk?') => {
    const dropdownSelectors: { [key: string]: string } = {
      "Select apartment": '#apartmentSelect',
      "Is occupied?": '#trueFalseSelectOcupied',
      "Has bed?": '#trueFalseSelectHasBed',
      "Has window?": '#trueFalseSelectHasWindow',
      "Has desk?": '#trueFalseSelectHasDesk',
    };
  
    // Usamos el índice con seguridad porque fieldName está tipado
    cy.get(dropdownSelectors[fieldName], { timeout: 10000 })
      .should('be.visible')
      .select(value);
  });

  When('I enter {string} into the {string} field', (value: string, fieldName: 'Surface') => {
    const fieldSelectors = {
      "Surface": '#surfaceInput',
    };
  
    cy.get(fieldSelectors[fieldName])
      .should('be.visible')
      .clear()
      .type(value);
  });
  When('I click the {string} button', (buttonName) => {
    cy.contains('button', buttonName)
      .should('be.visible')
      .click();
  });