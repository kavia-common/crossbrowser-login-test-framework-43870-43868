// @ts-check
const { test, expect } = require('@playwright/test');
const PracticeTestLoginPage = require('../pages/PracticeTestLoginPage');

/**
 * Login functionality tests for https://practicetestautomation.com/practice-test-login/
 *
 * Covers four key scenarios:
 * 1. Valid login with correct credentials
 * 2. Invalid username with correct password
 * 3. Valid username with invalid password
 * 4. Empty credentials submission
 *
 * Valid credentials: student / Password123
 */
test.describe('Practice Test Automation - Login Functionality', () => {

  /** @type {PracticeTestLoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new PracticeTestLoginPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Arrange: valid credentials for practicetestautomation.com
    const validUsername = 'student';
    const validPassword = 'Password123';

    // Act: perform login
    await loginPage.login(validUsername, validPassword);

    // Assert: verify successful login
    // URL should change to logged-in-successfully page
    await expect(page).toHaveURL(/practicetestautomation\.com\/logged-in-successfully/);

    // Page should display success heading
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);

    // Logout link should be visible on the success page
    const isLogoutVisible = await loginPage.isLogoutLinkVisible();
    expect(isLogoutVisible).toBe(true);
  });

  test('should show error message with invalid username', async () => {
    // Arrange: invalid username with valid password
    const invalidUsername = 'incorrectUser';
    const validPassword = 'Password123';

    // Act: attempt login with invalid username
    await loginPage.login(invalidUsername, validPassword);

    // Assert: verify error message is displayed
    const isError = await loginPage.isErrorMessageVisible();
    expect(isError).toBe(true);

    // Error message should indicate invalid username
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Your username is invalid!');
  });

  test('should show error message with invalid password', async () => {
    // Arrange: valid username with invalid password
    const validUsername = 'student';
    const invalidPassword = 'WrongPass456';

    // Act: attempt login with invalid password
    await loginPage.login(validUsername, invalidPassword);

    // Assert: verify error message is displayed
    const isError = await loginPage.isErrorMessageVisible();
    expect(isError).toBe(true);

    // Error message should indicate invalid password
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Your password is invalid!');
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
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Your username is invalid!');
  });
});
