// @ts-check
const { test, expect } = require('@playwright/test');
const SauceDemoLoginPage = require('../pages/SauceDemoLoginPage');

/**
 * Login functionality tests for https://www.saucedemo.com/
 *
 * Covers four key scenarios:
 * 1. Valid login with correct credentials
 * 2. Invalid username with correct password
 * 3. Valid username with invalid password
 * 4. Empty credentials submission
 *
 * Valid credentials: standard_user / secret_sauce
 */
test.describe('Sauce Demo - Login Functionality', () => {

  /** @type {SauceDemoLoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new SauceDemoLoginPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Arrange: valid credentials for saucedemo.com
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';

    // Act: perform login
    await loginPage.login(validUsername, validPassword);

    // Assert: verify successful login
    // URL should change to /inventory.html
    await expect(page).toHaveURL(/\/inventory\.html/);

    // Inventory container should be visible
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBe(true);

    // Products title should display "Products"
    const productsTitle = await loginPage.getProductsTitle();
    expect(productsTitle).toBe('Products');
  });

  test('should show error message with invalid username', async () => {
    // Arrange: invalid username with valid password
    const invalidUsername = 'invalid_user';
    const validPassword = 'secret_sauce';

    // Act: attempt login with invalid username
    await loginPage.login(invalidUsername, validPassword);

    // Assert: verify error message is displayed
    const isError = await loginPage.isErrorMessageVisible();
    expect(isError).toBe(true);

    // Error message should indicate credentials don't match
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Username and password do not match any user in this service');
  });

  test('should show error message with invalid password', async () => {
    // Arrange: valid username with invalid password
    const validUsername = 'standard_user';
    const invalidPassword = 'wrong_password';

    // Act: attempt login with invalid password
    await loginPage.login(validUsername, invalidPassword);

    // Assert: verify error message is displayed
    const isError = await loginPage.isErrorMessageVisible();
    expect(isError).toBe(true);

    // Error message should indicate credentials don't match
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Username and password do not match any user in this service');
  });

  test('should show error message with empty credentials', async () => {
    // Arrange: empty username and password (just click login)
    const emptyUsername = '';
    const emptyPassword = '';

    // Act: attempt login with empty fields
    await loginPage.login(emptyUsername, emptyPassword);

    // Assert: verify error message is displayed
    const isError = await loginPage.isErrorMessageVisible();
    expect(isError).toBe(true);

    // Error message should indicate username is required
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Username is required');
  });
});
