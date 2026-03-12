// @ts-check
const { test, expect } = require('@playwright/test');
const { HerokuLoginPage } = require('../pages');
const {
  HEROKU_LOGIN,
  BOUNDARY_INPUTS,
  SQL_INJECTION_PAYLOADS,
  XSS_PAYLOADS,
} = require('../utils/credentials');
const {
  logStep,
  expectConditionToBeTrue,
  expectElementToBeVisible,
  expectElementAttribute,
  expectUrlToMatch,
  measureResponseTime,
  expectValueBelowThreshold,
} = require('../utils/testHelpers');

/**
 * Expanded login tests for https://the-internet.herokuapp.com/login
 *
 * Covers:
 *  - Boundary input tests (long strings, special characters, unicode, whitespace)
 *  - Security tests (SQL injection, XSS payloads)
 *  - UI validation (element visibility, attributes, password masking)
 *  - Session behavior (logout, unauthorized access)
 *  - Response time validation
 */
test.describe('Heroku App - Expanded Login Scenarios', () => {
  /** @type {HerokuLoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new HerokuLoginPage(page);
    await loginPage.navigate();
    logStep('HerokuExpanded', 'Navigated to login page');
  });

  // ===== BOUNDARY INPUT TESTS =====

  test.describe('Boundary Inputs', () => {
    test('should handle very long username input gracefully', async () => {
      await loginPage.login(BOUNDARY_INPUTS.longUsername, HEROKU_LOGIN.validPassword);
      logStep('HerokuExpanded', 'Submitted long username (500 chars)');
      const isError = await loginPage.isErrorMessageVisible();
      expectConditionToBeTrue(isError, 'Error message should appear for long username');
    });

    test('should handle very long password input gracefully', async () => {
      await loginPage.login(HEROKU_LOGIN.validUsername, BOUNDARY_INPUTS.longPassword);
      logStep('HerokuExpanded', 'Submitted long password (500 chars)');
      const isError = await loginPage.isErrorMessageVisible();
      expectConditionToBeTrue(isError, 'Error message should appear for long password');
    });

    test('should handle special characters in username', async () => {
      await loginPage.login(BOUNDARY_INPUTS.specialCharsUsername, HEROKU_LOGIN.validPassword);
      logStep('HerokuExpanded', 'Submitted special characters in username');
      const isError = await loginPage.isErrorMessageVisible();
      expectConditionToBeTrue(isError, 'Error message should appear for special char username');
    });

    test('should handle special characters in password', async () => {
      await loginPage.login(HEROKU_LOGIN.validUsername, BOUNDARY_INPUTS.specialCharsPassword);
      logStep('HerokuExpanded', 'Submitted special characters in password');
      const isError = await loginPage.isErrorMessageVisible();
      expectConditionToBeTrue(isError, 'Error message should appear for special char password');
    });

    test('should handle unicode characters in credentials', async () => {
      await loginPage.login(BOUNDARY_INPUTS.unicodeUsername, BOUNDARY_INPUTS.unicodePassword);
      logStep('HerokuExpanded', 'Submitted unicode characters in credentials');
      const isError = await loginPage.isErrorMessageVisible();
      expectConditionToBeTrue(isError, 'Error message should appear for unicode credentials');
    });

    test('should handle whitespace-only input', async () => {
      await loginPage.login(BOUNDARY_INPUTS.whitespaceOnly, BOUNDARY_INPUTS.whitespaceOnly);
      logStep('HerokuExpanded', 'Submitted whitespace-only input');
      const isError = await loginPage.isErrorMessageVisible();
      expectConditionToBeTrue(isError, 'Error message should appear for whitespace-only input');
    });
  });

  // ===== SECURITY TESTS =====

  test.describe('Security - SQL Injection', () => {
    for (const payload of SQL_INJECTION_PAYLOADS) {
      test(`should safely handle SQL injection payload: ${payload.substring(0, 30)}`, async () => {
        await loginPage.login(payload, payload);
        logStep('HerokuExpanded', `Submitted SQL injection payload: ${payload.substring(0, 30)}`);
        // The app should not crash or grant access — it should show an error or remain on login
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).not.toContain('/secure');
        logStep('HerokuExpanded', 'Verified SQL injection did not grant unauthorized access');
      });
    }
  });

  test.describe('Security - XSS', () => {
    for (const payload of XSS_PAYLOADS) {
      test(`should safely handle XSS payload: ${payload.substring(0, 30)}`, async () => {
        await loginPage.login(payload, payload);
        logStep('HerokuExpanded', `Submitted XSS payload: ${payload.substring(0, 30)}`);
        // Verify the page did not execute script — check we are still on login
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).toContain('/login');
        // Verify no injected script element is present in the DOM
        const scriptInjected = await loginPage.page.locator('script:has-text("alert")').count();
        expect(scriptInjected).toBe(0);
        logStep('HerokuExpanded', 'Verified XSS payload was not executed');
      });
    }
  });

  // ===== UI VALIDATION TESTS =====

  test.describe('UI Element Validation', () => {
    test('should display username input field', async () => {
      await expectElementToBeVisible(loginPage.usernameInput);
      logStep('HerokuExpanded', 'Username input is visible');
    });

    test('should display password input field', async () => {
      await expectElementToBeVisible(loginPage.passwordInput);
      logStep('HerokuExpanded', 'Password input is visible');
    });

    test('should display login button', async () => {
      await expectElementToBeVisible(loginPage.loginButton);
      logStep('HerokuExpanded', 'Login button is visible');
    });

    test('should display page heading', async () => {
      await expectElementToBeVisible(loginPage.pageHeading);
      const headingText = await loginPage.pageHeading.textContent();
      expect(headingText).toBeTruthy();
      logStep('HerokuExpanded', `Page heading text: ${headingText}`);
    });

    test('should mask password input (type=password)', async () => {
      await expectElementAttribute(loginPage.passwordInput, 'type', 'password');
      logStep('HerokuExpanded', 'Password field is masked (type=password)');
    });

    test('should have correct page title', async () => {
      const title = await loginPage.getTitle();
      expect(title).toBeTruthy();
      logStep('HerokuExpanded', `Page title: ${title}`);
    });
  });

  // ===== SESSION BEHAVIOR TESTS =====

  test.describe('Session Behavior', () => {
    test('should logout successfully after login', async ({ page }) => {
      const { validUsername, validPassword } = HEROKU_LOGIN;
      await loginPage.login(validUsername, validPassword);
      logStep('HerokuExpanded', 'Logged in with valid credentials');
      await expectUrlToMatch(page, /\/secure/);

      // Click logout button
      await loginPage.logoutButton.click();
      logStep('HerokuExpanded', 'Clicked logout button');

      // Verify redirected back to login page
      await expectUrlToMatch(page, /\/login/);
      const flashText = await loginPage.getFlashMessageText();
      expect(flashText).toContain('You logged out of the secure area!');
      logStep('HerokuExpanded', 'Verified logout redirect and message');
    });

    test('should not access secure area without login', async ({ page }) => {
      // Attempt to navigate directly to the secure page without logging in
      await page.goto('https://the-internet.herokuapp.com/secure', { waitUntil: 'domcontentloaded' });
      logStep('HerokuExpanded', 'Attempted direct access to /secure');

      // Should be redirected to login page or show an error
      const currentUrl = page.url();
      expect(currentUrl).toContain('/login');
      logStep('HerokuExpanded', 'Verified unauthorized access was blocked');
    });
  });

  // ===== RESPONSE TIME TESTS =====

  test.describe('Response Time Validation', () => {
    test('should complete login request within acceptable time', async ({ page }) => {
      const { validUsername, validPassword } = HEROKU_LOGIN;
      const responseTime = await measureResponseTime(async () => {
        await loginPage.login(validUsername, validPassword);
        await page.waitForURL(/\/secure/, { timeout: 15000 });
      });
      logStep('HerokuExpanded', `Login response time: ${responseTime}ms`);
      // Login should complete within 10 seconds (generous threshold for network variability)
      expectValueBelowThreshold(responseTime, 10000, 'Login should complete within 10 seconds');
    });

    test('should show error for invalid login within acceptable time', async () => {
      const responseTime = await measureResponseTime(async () => {
        await loginPage.login('baduser', 'badpass');
        await loginPage.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
      });
      logStep('HerokuExpanded', `Invalid login error response time: ${responseTime}ms`);
      expectValueBelowThreshold(responseTime, 10000, 'Error response should appear within 10 seconds');
    });
  });
});
