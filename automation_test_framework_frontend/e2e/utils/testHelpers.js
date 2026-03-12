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

// PUBLIC_INTERFACE
/**
 * Measures the response time of an async action in milliseconds.
 * Useful for validating that login requests complete within acceptable thresholds.
 * @param {Function} actionFn - Async function whose execution time is measured
 * @returns {Promise<number>} Elapsed time in milliseconds
 */
async function measureResponseTime(actionFn) {
  const startTime = Date.now();
  await actionFn();
  const endTime = Date.now();
  return endTime - startTime;
}

// PUBLIC_INTERFACE
/**
 * Asserts that a Playwright locator element has the specified attribute value.
 * @param {import('@playwright/test').Locator} locator - Playwright locator
 * @param {string} attribute - HTML attribute name
 * @param {string|RegExp} expectedValue - Expected attribute value or pattern
 */
async function expectElementAttribute(locator, attribute, expectedValue) {
  await expect(locator).toHaveAttribute(attribute, expectedValue);
}

// PUBLIC_INTERFACE
/**
 * Asserts that a Playwright locator element is visible on the page.
 * @param {import('@playwright/test').Locator} locator - Playwright locator
 * @param {number} [timeout=10000] - Maximum wait time in milliseconds
 */
async function expectElementToBeVisible(locator, timeout = 10000) {
  await expect(locator).toBeVisible({ timeout });
}

// PUBLIC_INTERFACE
/**
 * Asserts that a Playwright locator element is not visible on the page.
 * @param {import('@playwright/test').Locator} locator - Playwright locator
 * @param {number} [timeout=5000] - Maximum wait time in milliseconds
 */
async function expectElementToBeHidden(locator, timeout = 5000) {
  await expect(locator).toBeHidden({ timeout });
}

// PUBLIC_INTERFACE
/**
 * Asserts that a numeric value is less than or equal to the specified threshold.
 * Commonly used for response time assertions.
 * @param {number} actual - Actual measured value
 * @param {number} threshold - Maximum acceptable value
 * @param {string} [message] - Optional descriptive message
 */
function expectValueBelowThreshold(actual, threshold, message) {
  if (message) {
    expect(actual, message).toBeLessThanOrEqual(threshold);
  } else {
    expect(actual).toBeLessThanOrEqual(threshold);
  }
}

module.exports = {
  expectUrlToMatch,
  expectConditionToBeTrue,
  expectTextToContain,
  waitFor,
  takeScreenshot,
  logStep,
  measureResponseTime,
  expectElementAttribute,
  expectElementToBeVisible,
  expectElementToBeHidden,
  expectValueBelowThreshold,
};
