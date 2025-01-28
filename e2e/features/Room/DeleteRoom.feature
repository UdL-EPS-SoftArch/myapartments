Feature: Delete a Room
  In order to use the app
  As admin
  I want to delete a room

  Scenario: Delete a room
    Given I am in the homepage logged in as owner with username "owner" and password "password"
    Given I create a room with surface "1234"
    When I go to roomList
    And I delete the room with surface "1234"
    Then The room with surface "1234" is deleted




