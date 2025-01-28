Feature: Update an existing Room
Feature: Update Apartment
In order to use the app
As admin
I want to update a Room

  Background:
    Given I'm in the homepage
    And I log in as "owner" with password "password"
    And I'm logged in as user "owner"
    And The test apartment
    When I go to the create room page
    And I select the first option for "apartmentSelect"
    And I check "isOccupied"
    And I check "hasBed"
    And I check "hasWindow"
    And I check "hasDesk"
    And I enter "45" into the "Surface" field
    And I click the "Create" button

  Scenario: Update the room just created
    Given I'm logged in as user "owner"
    And I go to the homepage
    When I go to the rooms list page
    And I click on the edit room button
    And I fill some of the room form with different data
    And I click the "Update" button
    Then I should see the room updated

  Scenario: Update the room with not valid data
    Given I'm logged in as user "owner"
    And I go to the homepage
    When I go to the rooms list page
    And I click on the edit room button
    And I fill some of the room form with different and invalid data
    And I click the "Update" button
    Then I should see an error message and still be in editing page

