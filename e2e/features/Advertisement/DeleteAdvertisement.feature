Feature: Delete Advertisement
  As an authorized user
  I want to delete an advertisement
  So that I can remove an apartment listing

  Background:
    Given The user is logged in as an "owner"

  Scenario: Successfully delete an advertisement
    When I go to the advertisements list page
    And I locate the advertisement with the title "Sunny Apartment"
    And I click the "Delete" button for the advertisement
    Then I should see a confirmation dialog
    When I confirm the deletion
    Then The advertisement should no longer appear in the advertisements list
