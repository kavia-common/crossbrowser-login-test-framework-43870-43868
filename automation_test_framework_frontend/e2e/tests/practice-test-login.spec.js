// @ts-check
const { test, expect } = require('@playwright/test');
const { PracticeTestLoginPage } = require('../pages');
const { PRACTICE_TEST_LOGIN, INVALID_CREDENTIALS } = require('../utils/credentials');
const { expectUrlToMatch, expectConditionToBeTrue, expectTextToContain, logStep } = require('../utils/testHelpers');

/**
 * Login functionality tests for https://practicetestautomation.com/practice-test-login/
 * Covers: valid login, invalid username, invalid password, empty credentials
 */
test.describe('Practice Test Automation - Login Functionality', () => {
  /** @type {PracticeTestLoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new PracticeTestLoginPage(page);
    await loginPage.navigate();
    logStep('PracticeTestLogin', 'Navigated to login page');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const { validUsername, validPassword } = PRACTICE_TEST_LOGIN;
    await loginPage.login(validUsername, validPassword);
    logStep('PracticeTestLogin', 'Submitted valid credentials');
    await expectUrlToMatch(page, /practicetestautomation\.com\/logged-in-successfully/);
    const isLoggedIn = await loginPage.isLoggedIn();
    expectConditionToBeTrue(isLoggedIn, 'Should be logged in successfully');
    const isLogoutVisible = await loginPage.isLogoutLinkVisible();
    expectConditionToBeTrue(isLogoutVisible, 'Logout link should be visible');
  });

  test('should show error message with invalid username', async () => {
    const invalidUsername = 'incorrectUser';
    const { validPassword } = PRACTICE_TEST_LOGIN;
    await loginPage.login(invalidUsername, validPassword);
    logStep('PracticeTestLogin', 'Submitted invalid username');
    const isError = await loginPage.isErrorMessageVisible();
    expectConditionToBeTrue(isError, 'Error message should be visible');
    const errorText = await loginPage.getErrorMessageText();
    expectTextToContain(errorText, 'Your username is invalid!');
  });

  test('should show error message with invalid password', async () => {
    const { validUsername } = PRACTICE_TEST_LOGIN;
    const invalidPassword = 'WrongPass456';
    await loginPage.login(validUsername, invalidPassword);
    logStep('PracticeTestLogin', 'Submitted invalid password');
    const isError = await loginPage.isErrorMessageVisible();
    expectConditionToBeTrue(isError, 'Error message should be visible');
    const errorText = await loginPage.getErrorMessageText();
    expectTextToContain(errorText, 'Your password is invalid!');
  });

  test('should show error message with empty credentials', async () => {
    const emptyUsername = INVALID_CREDENTIALS.empty;
    const emptyPassword = INVALID_CREDENTIALS.empty;
    await loginPage.login(emptyUsername, emptyPassword);
    logStep('PracticeTestLogin', 'Submitted empty credentials');
    const isError = await loginPage.isErrorMessageVisible();
    expectConditionToBeTrue(isError, 'Error message should be visible');
    const errorText = await loginPage.getErrorMessageText();
    expectTextToContain(errorText, 'Your username is invalid!');
  });
});
