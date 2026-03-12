// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright configuration for cross-browser login test framework.
 * Configures test directory, timeouts, retries, reporters, and
 * browser projects for Chromium, Firefox, and WebKit.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  /* Directory containing the test files */
  testDir: './e2e/tests',

  /* Maximum time one test can run for (30 seconds) */
  timeout: 30000,

  /* Maximum time expect() assertions can wait (10 seconds) */
  expect: {
    timeout: 10000,
  },

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if test.only is accidentally left in code */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests once on CI, no retries locally */
  retries: process.env.CI ? 1 : 0,

  /* Limit parallel workers on CI for stability */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter configuration: HTML report + list output */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  /* Shared settings for all projects */
  use: {
    /* Collect trace on first retry for debugging */
    trace: 'on-first-retry',

    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',

    /* Default action timeout */
    actionTimeout: 10000,

    /* Default navigation timeout */
    navigationTimeout: 15000,
  },

  /* Configure cross-browser projects */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
