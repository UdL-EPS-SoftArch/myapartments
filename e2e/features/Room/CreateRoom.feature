Feature: Create a new Room
  In order to use the app
  As admin
  I want to create a new room

  Scenario: Create a new room 
    Given I'm in the homepage logged in as owner with username "owner" and password "password"
    When  I go to the room list page
    And I click on create room button
    And I select "This apartment is static DO NOT TOUCH" for "Select apartment"
    And I select "True" for "Is occupied?"
    And I select "True" for "Has bed?"
    And I select "True" for "Has window?"
    And I select "True" for "Has desk?"
    And I enter "45" into the "Surface" field
    And I click the "Submit" button
    Then I've created a new room with creation user "owner", apartment "This apartment is static DO NOT TOUCH", is occupied "True", has bed "True", has window "True", has desk "True" and Surface"45"