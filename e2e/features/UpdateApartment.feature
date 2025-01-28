Feature: Update Apartment
  In order to use the app
  As admin
  I want to update a apartment

  Scenario: Create a new apartment
    Given I'm on the homepage logged in as an owner
    When I click the "List" submenu in the "Apartments" menu
    And I click on the create button
    And I fill the form with correct data
    And I click the "Submit" button
    Then I should see the apartment created

  Scenario: Update the apartment just created
    Given I'm on the homepage logged in as an owner
    When I click the "List" submenu in the "Apartments" menu
    And I click on the edit button
    And I fill some of the form with different data
    And I click the "Submit" button
    Then I should see the apartment updated

  Scenario: Update the apartment with empty compulsory spaces
    Given I'm on the homepage logged in as an owner
    When I click the "List" submenu in the "Apartments" menu
    And I click on the edit button
    And I fill the form with some empty fields
    And I click the "Submit" button
    Then I see error message "Invalid form: field country is required"
