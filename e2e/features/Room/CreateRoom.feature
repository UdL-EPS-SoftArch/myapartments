Feature: Create a new Room
  In order to use the app
  As admin
  I want to create a new room

  Scenario: Create a new room
    Given I'm in the homepage
    And I log in as "owner" with password "password"
    And I'm logged in as user "owner"
    And The test apartment
    When  I go to the create room page
    # And I click on create room button
    And I select the first option for "apartmentSelect"
    And I check "isOccupied"
    And I check "hasBed"
    And I check "hasWindow"
    And I check "hasDesk"
    And I enter "45" into the "Surface" field
    And I click the "Create" button
    # Then I should see a new room # Disabled because there is not a room details view yet
