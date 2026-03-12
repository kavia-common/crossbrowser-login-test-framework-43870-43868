/**
 * Reusable test helper utilities for Playwright E2E tests.
 * Provides common assertion patterns, wait utilities, and logging helpers.
 */
const { expect } = require('@playwright/test');

// PUBLIC_INTERFACE
/** Asserts that the current page URL matches the given regex pattern. */
async function expectUrlToMatch(page, urlPattern, timeout = 10000) {
  await expect(page).toHaveURL(urlPattern, { timeout });
}

// PUBLIC_INTERFACE
/** Asserts that a boolean condition is true. */
function expectConditionToBeTrue(condition, message = 'Expected condition to be true') {
  expect(condition, message).toBe(true);
}

// PUBLIC_INTERFACE
/** Asserts that a text string contains an expected substring. */
function expectTextToContain(actualText, expectedSubstring, message) {
  if (message) {
    expect(actualText, message).toContain(expectedSubstring);
  } else {
    expect(actualText).toContain(expectedSubstring);
  }
}

// PUBLIC_INTERFACE
/** Waits for a specified duration. Use sparingly. */
async function waitFor(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// PUBLIC_INTERFACE
/** Takes a named screenshot of the current page state. */
async function takeScreenshot(page, name) {
  return await page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
}

// PUBLIC_INTERFACE
/** Logs a structured message for test execution tracing. */
function logStep(context, message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${context}] ${message}`);
}

module.exports = {
  expectUrlToMatch,
  expectConditionToBeTrue,
  expectTextToContain,
  waitFor,
  takeScreenshot,
  logStep,
};
