// @ts-check
const { test, expect } = require('@playwright/test');
const { HerokuLoginPage } = require('../pages');
const { HEROKU_LOGIN, INVALID_CREDENTIALS } = require('../utils/credentials');
const { expectUrlToMatch, expectConditionToBeTrue, expectTextToContain, logStep } = require('../utils/testHelpers');

/**
 * Login functionality tests for https://the-internet.herokuapp.com/login
 * Covers: valid login, invalid username, invalid password, empty credentials
 */
test.describe('Heroku App - Login Functionality', () => {
  /** @type {HerokuLoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new HerokuLoginPage(page);
    await loginPage.navigate();
    logStep('HerokuLogin', 'Navigated to login page');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const { validUsername, validPassword } = HEROKU_LOGIN;
    await loginPage.login(validUsername, validPassword);
    logStep('HerokuLogin', 'Submitted valid credentials');
    await expectUrlToMatch(page, /\/secure/);
    const isSuccess = await loginPage.isSuccessMessageVisible();
    expectConditionToBeTrue(isSuccess, 'Success message should be visible');
    const flashText = await loginPage.getFlashMessageText();
    expectTextToContain(flashText, 'You logged into a secure area!');
  });

  test('should show error message with invalid username', async () => {
    const invalidUsername = INVALID_CREDENTIALS.username;
    const { validPassword } = HEROKU_LOGIN;
    await loginPage.login(invalidUsername, validPassword);
    logStep('HerokuLogin', 'Submitted invalid username');
    const isError = await loginPage.isErrorMessageVisible();
    expectConditionToBeTrue(isError, 'Error message should be visible');
    const flashText = await loginPage.getFlashMessageText();
    expectTextToContain(flashText, 'Your username is invalid!');
  });

  test('should show error message with invalid password', async () => {
    const { validUsername } = HEROKU_LOGIN;
    const invalidPassword = INVALID_CREDENTIALS.password;
    await loginPage.login(validUsername, invalidPassword);
    logStep('HerokuLogin', 'Submitted invalid password');
    const isError = await loginPage.isErrorMessageVisible();
    expectConditionToBeTrue(isError, 'Error message should be visible');
    const flashText = await loginPage.getFlashMessageText();
    expectTextToContain(flashText, 'Your password is invalid!');
  });

  test('should show error message with empty credentials', async () => {
    const emptyUsername = INVALID_CREDENTIALS.empty;
    const emptyPassword = INVALID_CREDENTIALS.empty;
    await loginPage.login(emptyUsername, emptyPassword);
    logStep('HerokuLogin', 'Submitted empty credentials');
    const isError = await loginPage.isErrorMessageVisible();
    expectConditionToBeTrue(isError, 'Error message should be visible');
    const flashText = await loginPage.getFlashMessageText();
    expectTextToContain(flashText, 'Your username is invalid!');
  });
});
