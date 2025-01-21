Feature: Delete a Room
  In order to use the app
  As admin
  I want to delete a room

  Scenario: Delete a room
    Given I am in the homepage logged in as owner with username "owner" and password "password"
    Given I create a room
    When I go to roomList
    And I click the "Delete" button
    Then Room is deleted




