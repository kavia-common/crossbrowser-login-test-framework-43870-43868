// @ts-check
const { test, expect } = require('@playwright/test');
const { SauceDemoLoginPage } = require('../pages');
const {
  SAUCE_DEMO_LOGIN,
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
 * Expanded login tests for https://www.saucedemo.com/
 *
 * Covers:
 *  - Boundary input tests (long strings, special characters, unicode, whitespace)
 *  - Security tests (SQL injection, XSS payloads)
 *  - UI validation (element visibility, attributes, password masking)
 *  - Session behavior (logout, unauthorized access to inventory)
 *  - Response time validation
 */
test.describe('Sauce Demo - Expanded Login Scenarios', () => {
  /** @type {SauceDemoLoginPage} */
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new SauceDemoLoginPage(page);
    await loginPage.navigate();
    logStep('SauceDemoExpanded', 'Navigated to login page');
  });

  // ===== BOUNDARY INPUT TESTS =====

  test.describe('Boundary Inputs', () => {
    test('should handle very long username input gracefully', async () => {
      await loginPage.login(BOUNDARY_INPUTS.longUsername, SAUCE_DEMO_LOGIN.validPassword);
      logStep('SauceDemoExpanded', 'Submitted long username (500 chars)');
      const isError = await loginPage.isErrorMessageVisible();
      expectConditionToBeTrue(isError, 'Error message should appear for long username');
    });

    test('should handle very long password input gracefully', async () => {
      await loginPage.login(SAUCE_DEMO_LOGIN.validUsername, BOUNDARY_INPUTS.longPassword);
      logStep('SauceDemoExpanded', 'Submitted long password (500 chars)');
      const isError = await loginPage.isErrorMessageVisible();
      expectConditionToBeTrue(isError, 'Error message should appear for long password');
    });

    test('should handle special characters in username', async () => {
      await loginPage.login(BOUNDARY_INPUTS.specialCharsUsername, SAUCE_DEMO_LOGIN.validPassword);
      logStep('SauceDemoExpanded', 'Submitted special characters in username');
      const isError = await loginPage.isErrorMessageVisible();
      expectConditionToBeTrue(isError, 'Error message should appear for special char username');
    });

    test('should handle special characters in password', async () => {
      await loginPage.login(SAUCE_DEMO_LOGIN.validUsername, BOUNDARY_INPUTS.specialCharsPassword);
      logStep('SauceDemoExpanded', 'Submitted special characters in password');
      const isError = await loginPage.isErrorMessageVisible();
      expectConditionToBeTrue(isError, 'Error message should appear for special char password');
    });

    test('should handle unicode characters in credentials', async () => {
      await loginPage.login(BOUNDARY_INPUTS.unicodeUsername, BOUNDARY_INPUTS.unicodePassword);
      logStep('SauceDemoExpanded', 'Submitted unicode characters in credentials');
      const isError = await loginPage.isErrorMessageVisible();
      expectConditionToBeTrue(isError, 'Error message should appear for unicode credentials');
    });

    test('should handle whitespace-only input', async () => {
      await loginPage.login(BOUNDARY_INPUTS.whitespaceOnly, BOUNDARY_INPUTS.whitespaceOnly);
      logStep('SauceDemoExpanded', 'Submitted whitespace-only input');
      const isError = await loginPage.isErrorMessageVisible();
      expectConditionToBeTrue(isError, 'Error message should appear for whitespace-only input');
    });
  });

  // ===== SECURITY TESTS =====

  test.describe('Security - SQL Injection', () => {
    for (const payload of SQL_INJECTION_PAYLOADS) {
      test(`should safely handle SQL injection payload: ${payload.substring(0, 30)}`, async () => {
        await loginPage.login(payload, payload);
        logStep('SauceDemoExpanded', `Submitted SQL injection: ${payload.substring(0, 30)}`);
        // App should not grant access — should show error or remain on login
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).not.toContain('/inventory');
        logStep('SauceDemoExpanded', 'Verified SQL injection did not grant access');
      });
    }
  });

  test.describe('Security - XSS', () => {
    for (const payload of XSS_PAYLOADS) {
      test(`should safely handle XSS payload: ${payload.substring(0, 30)}`, async () => {
        await loginPage.login(payload, payload);
        logStep('SauceDemoExpanded', `Submitted XSS payload: ${payload.substring(0, 30)}`);
        // Verify still on login page and no script injection occurred
        const currentUrl = await loginPage.getCurrentUrl();
        expect(currentUrl).toContain('saucedemo.com');
        expect(currentUrl).not.toContain('/inventory');
        const scriptInjected = await loginPage.page.locator('script:has-text("alert")').count();
        expect(scriptInjected).toBe(0);
        logStep('SauceDemoExpanded', 'Verified XSS payload was not executed');
      });
    }
  });

  // ===== UI VALIDATION TESTS =====

  test.describe('UI Element Validation', () => {
    test('should display username input field', async () => {
      await expectElementToBeVisible(loginPage.usernameInput);
      logStep('SauceDemoExpanded', 'Username input is visible');
    });

    test('should display password input field', async () => {
      await expectElementToBeVisible(loginPage.passwordInput);
      logStep('SauceDemoExpanded', 'Password input is visible');
    });

    test('should display login button', async () => {
      await expectElementToBeVisible(loginPage.loginButton);
      logStep('SauceDemoExpanded', 'Login button is visible');
    });

    test('should mask password input (type=password)', async () => {
      await expectElementAttribute(loginPage.passwordInput, 'type', 'password');
      logStep('SauceDemoExpanded', 'Password field is masked (type=password)');
    });

    test('should have username placeholder text', async () => {
      await expectElementAttribute(loginPage.usernameInput, 'placeholder', /[Uu]ser/);
      logStep('SauceDemoExpanded', 'Username input has placeholder text');
    });

    test('should have password placeholder text', async () => {
      await expectElementAttribute(loginPage.passwordInput, 'placeholder', /[Pp]ass/);
      logStep('SauceDemoExpanded', 'Password input has placeholder text');
    });

    test('should have correct page title', async () => {
      const title = await loginPage.getTitle();
      expect(title).toBeTruthy();
      logStep('SauceDemoExpanded', `Page title: ${title}`);
    });
  });

  // ===== SESSION BEHAVIOR TESTS =====

  test.describe('Session Behavior', () => {
    test('should logout successfully after login', async ({ page }) => {
      const { validUsername, validPassword } = SAUCE_DEMO_LOGIN;
      await loginPage.login(validUsername, validPassword);
      logStep('SauceDemoExpanded', 'Logged in with valid credentials');
      await expectUrlToMatch(page, /\/inventory\.html/);

      // Open burger menu and click logout
      await loginPage.burgerMenuButton.click();
      const logoutLink = page.locator('#logout_sidebar_link');
      await logoutLink.waitFor({ state: 'visible', timeout: 5000 });
      await logoutLink.click();
      logStep('SauceDemoExpanded', 'Clicked logout link');

      // Verify redirected back to login page
      await expectUrlToMatch(page, /saucedemo\.com\/?$/);
      await expectElementToBeVisible(loginPage.loginButton);
      logStep('SauceDemoExpanded', 'Verified logout redirect to login page');
    });

    test('should not access inventory page without login', async ({ page }) => {
      // Attempt to navigate directly to inventory without logging in
      await page.goto('https://www.saucedemo.com/inventory.html', { waitUntil: 'domcontentloaded' });
      logStep('SauceDemoExpanded', 'Attempted direct access to /inventory.html');

      // Should show error or redirect to login
      const isError = await loginPage.isErrorMessageVisible();
      const errorText = await loginPage.getErrorMessageText();
      expectConditionToBeTrue(isError, 'Error should appear for unauthorized access');
      expect(errorText.toLowerCase()).toContain('can only access');
      logStep('SauceDemoExpanded', 'Verified unauthorized access was blocked');
    });
  });

  // ===== RESPONSE TIME TESTS =====

  test.describe('Response Time Validation', () => {
    test('should complete valid login within acceptable time', async ({ page }) => {
      const { validUsername, validPassword } = SAUCE_DEMO_LOGIN;
      const responseTime = await measureResponseTime(async () => {
        await loginPage.login(validUsername, validPassword);
        await page.waitForURL(/\/inventory\.html/, { timeout: 15000 });
      });
      logStep('SauceDemoExpanded', `Login response time: ${responseTime}ms`);
      expectValueBelowThreshold(responseTime, 10000, 'Login should complete within 10 seconds');
    });

    test('should show error for invalid login within acceptable time', async () => {
      const responseTime = await measureResponseTime(async () => {
        await loginPage.login('wrong_user', 'wrong_pass');
        await loginPage.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
      });
      logStep('SauceDemoExpanded', `Invalid login error response time: ${responseTime}ms`);
      expectValueBelowThreshold(responseTime, 10000, 'Error response should appear within 10 seconds');
    });
  });
});
