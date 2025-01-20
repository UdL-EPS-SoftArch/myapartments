Feature: Create a new Room
  In order to use the app
  As admin
  I want to create a new room

  Scenario: Create a new room 
    Given I'm in the homepage logged in as owner with username "owner" and password "password"
    Given The test apartment
    When  I go to the room list page
    And I click on create room button
    And I select "NEW" for "Select apartment"
    And I select "True" for "Is occupied?"
    And I select "True" for "Has bed?"
    And I select "True" for "Has window?"
    And I select "True" for "Has desk?"
    And I enter "45" into the "Surface" field
    And I click the "Submit" button
    Then I should see a new room