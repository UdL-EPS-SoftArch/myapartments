Feature: Create Advertisement
  As an authorized user
  I want to create an advertisement
  So that I can list an apartment for rental

  Background:
    Given The user is logged in as an "owner"

  Scenario: Successfully create an advertisement
    When I go to the create advertisement page
    And I fill the "Title" field with "Sunny Apartment"
    And I fill the "Description" field with "A cozy apartment in the city center"
    And I fill the "Price" field with "1200"
    And I fill the "Zip Code" field with "08001"
    And I fill the "Country" field with "Spain"
    And I fill the "Address" field with "Carrer de Mallorca, 123"
    And I fill the "Expiration Date" field with "2025-12-31"
    And I click the "Submit" button
    Then I should see the advertisement in the advertisements list
