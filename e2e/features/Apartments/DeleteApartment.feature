Feature: Delete Apartment
  In order to use the app
  As owner
  I want to delete an apartment

  Scenario: Delete an apartment
  Given I'm on the homepage logged in as an owner
  When I go to the apartment list page
  And There is at least one apartment
  And I delete the apartment "2"
  Then The apartment "2" should be deleted
