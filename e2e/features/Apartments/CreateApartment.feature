Feature: Create Apartment
  In order to use the app
  As admin
  I want to create a apartment

  Scenario: Create a new apartment
    Given I'm on the homepage logged in as an owner
    When I click the "List" submenu in the "Apartment" menu
    And I click on the create button
    And I fill the form with correct data
    And I click the "Submit" button
    Then I should see the apartment created

  Scenario: Create a new apartment with empty compulsory spaces
    Given I'm on the homepage logged in as an owner
    When I click the "Create" submenu in the "Apartment" menu
    And I fill the form but leave some empty fields
    And I click the "Submit" button
    Then I see error message "Failed to create apartment. Please try again"
