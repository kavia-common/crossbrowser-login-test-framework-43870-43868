// @ts-check
const { test, expect } = require('@playwright/test');
const { SauceDemoLoginPage } = require('../pages');
const { SAUCE_DEMO_LOGIN, INVALID_CREDENTIALS } = require('../utils/credentials');
const { expectUrlToMatch, expectConditionToBeTrue, expectTextToContain, logStep } = require('../utils/testHelpers');

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
    logStep('SauceDemoLogin', 'Navigated to login page');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const { validUsername, validPassword } = SAUCE_DEMO_LOGIN;
    await loginPage.login(validUsername, validPassword);
    logStep('SauceDemoLogin', 'Submitted valid credentials');
    await expectUrlToMatch(page, /\/inventory\.html/);
    const isLoggedIn = await loginPage.isLoggedIn();
    expectConditionToBeTrue(isLoggedIn, 'Should be logged in successfully');
    const productsTitle = await loginPage.getProductsTitle();
    expect(productsTitle).toBe('Products');
  });

  test('should show error message with invalid username', async () => {
    const invalidUsername = 'invalid_user';
    const { validPassword } = SAUCE_DEMO_LOGIN;
    await loginPage.login(invalidUsername, validPassword);
    logStep('SauceDemoLogin', 'Submitted invalid username');
    const isError = await loginPage.isErrorMessageVisible();
    expectConditionToBeTrue(isError, 'Error message should be visible');
    const errorText = await loginPage.getErrorMessageText();
    expectTextToContain(errorText, 'Username and password do not match any user in this service');
  });

  test('should show error message with invalid password', async () => {
    const { validUsername } = SAUCE_DEMO_LOGIN;
    const invalidPassword = 'wrong_password';
    await loginPage.login(validUsername, invalidPassword);
    logStep('SauceDemoLogin', 'Submitted invalid password');
    const isError = await loginPage.isErrorMessageVisible();
    expectConditionToBeTrue(isError, 'Error message should be visible');
    const errorText = await loginPage.getErrorMessageText();
    expectTextToContain(errorText, 'Username and password do not match any user in this service');
  });

  test('should show error message with empty credentials', async () => {
    const emptyUsername = INVALID_CREDENTIALS.empty;
    const emptyPassword = INVALID_CREDENTIALS.empty;
    await loginPage.login(emptyUsername, emptyPassword);
    logStep('SauceDemoLogin', 'Submitted empty credentials');
    const isError = await loginPage.isErrorMessageVisible();
    expectConditionToBeTrue(isError, 'Error message should be visible');
    const errorText = await loginPage.getErrorMessageText();
    expectTextToContain(errorText, 'Username is required');
  });
});
