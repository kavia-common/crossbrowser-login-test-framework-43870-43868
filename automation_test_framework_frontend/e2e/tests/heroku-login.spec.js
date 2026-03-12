// @ts-check
const { test, expect } = require('@playwright/test');
const HerokuLoginPage = require('../pages/HerokuLoginPage');

/**
 * Login functionality tests for https://the-internet.herokuapp.com/login
 *
 * Covers four key scenarios:
 * 1. Valid login with correct credentials
 * 2. Invalid username with correct password
 * 3. Valid username with invalid password
 * 4. Empty credentials submission
 *
 * Valid credentials: tomsmith / SuperSecretPassword!
 */
test.describe('Heroku App - Login Functionality', () => {

  /** @type {HerokuLoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new HerokuLoginPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Arrange: valid credentials for the-internet.herokuapp.com
    const validUsername = 'tomsmith';
    const validPassword = 'SuperSecretPassword!';

    // Act: perform login
    await loginPage.login(validUsername, validPassword);

    // Assert: verify successful login
    // URL should change to /secure
    await expect(page).toHaveURL(/\/secure/);

    // Success flash message should be visible
    const isSuccess = await loginPage.isSuccessMessageVisible();
    expect(isSuccess).toBe(true);

    // Flash message should contain success text
    const flashText = await loginPage.getFlashMessageText();
    expect(flashText).toContain('You logged into a secure area!');
  });

  test('should show error message with invalid username', async () => {
    // Arrange: invalid username with valid password
    const invalidUsername = 'invaliduser';
    const validPassword = 'SuperSecretPassword!';

    // Act: attempt login with invalid username
    await loginPage.login(invalidUsername, validPassword);

    // Assert: verify error message is displayed
    const isError = await loginPage.isErrorMessageVisible();
    expect(isError).toBe(true);

    // Error message should indicate invalid username
    const flashText = await loginPage.getFlashMessageText();
    expect(flashText).toContain('Your username is invalid!');
  });

  test('should show error message with invalid password', async () => {
    // Arrange: valid username with invalid password
    const validUsername = 'tomsmith';
    const invalidPassword = 'WrongPassword123';

    // Act: attempt login with invalid password
    await loginPage.login(validUsername, invalidPassword);

    // Assert: verify error message is displayed
    const isError = await loginPage.isErrorMessageVisible();
    expect(isError).toBe(true);

    // Error message should indicate invalid password
    const flashText = await loginPage.getFlashMessageText();
    expect(flashText).toContain('Your password is invalid!');
  });

  test('should show error message with empty credentials', async () => {
    // Arrange: empty username and password
    const emptyUsername = '';
    const emptyPassword = '';

    // Act: attempt login with empty fields
    await loginPage.login(emptyUsername, emptyPassword);

    // Assert: verify error message is displayed
    const isError = await loginPage.isErrorMessageVisible();
    expect(isError).toBe(true);

    // Error message should indicate invalid credentials
    const flashText = await loginPage.getFlashMessageText();
    expect(flashText).toContain('Your username is invalid!');
  });
});
