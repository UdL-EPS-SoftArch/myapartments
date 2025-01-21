Feature: Create Apartment
  In order to use the app
  As admin
  I want to create a apartment

  Scenario: Create a new apartment
    Given I'm on the homepage logged in as an owner
    When I go to the apartment list page
    And I click on the create button
    And I fill the form with correct data
    And I click the "Submit" button
    Then I should see the apartment created



  Scenario: Create a new apartment with empty compulsory spaces
    Given I'm on the homepage logged in as an owner
    When I go to the apartment list page
    And I click on the create button
    And I fill the form with some empty fields
    And I click the "Submit" button
    Then I should see an error message
