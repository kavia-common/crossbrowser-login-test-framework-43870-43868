// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright configuration for cross-browser login test framework.
 *
 * Configures test directory, timeouts, retries, reporters, and
 * browser projects for Chromium, Firefox, and WebKit.
 *
 * HTML Report (saved to playwright-report/) captures:
 *  - Total tests executed
 *  - Passed / failed / skipped test counts
 *  - Execution time (duration) per test and overall
 *  - Browser used (project name and device info)
 *  - Individual test steps (enabled via trace recording)
 *
 * @see https://playwright.dev/docs/test-configuration
 * @see https://playwright.dev/docs/test-reporters#html-reporter
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

  /**
   * Reporter configuration.
   *
   * - 'list'  : real-time console output during test execution.
   * - 'html'  : generates an interactive HTML report inside the
   *             "playwright-report" folder.  The report automatically
   *             includes totals, pass/fail/skipped counts, execution
   *             duration, browser/project info, and detailed test steps.
   *             `open: 'never'` prevents auto-opening in CI.
   * - 'json'  : machine-readable results saved for downstream tooling.
   */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  /* Shared settings applied to every project/browser */
  use: {
    /**
     * Trace recording — captures step-by-step actions, network, DOM
     * snapshots and console output so the HTML report can display
     * individual test steps with timing information.
     * 'retain-on-failure' keeps traces for failed tests; use 'on' to
     * capture traces for every test run (useful for full step reporting).
     */
    trace: 'retain-on-failure',

    /* Capture screenshot on failure for visual debugging */
    screenshot: 'only-on-failure',

    /* Record video on failure for step-level playback in HTML report */
    video: 'retain-on-failure',

    /* Default action timeout */
    actionTimeout: 10000,

    /* Default navigation timeout */
    navigationTimeout: 15000,
  },

  /**
   * Cross-browser projects.
   * Each project name (chromium, firefox, webkit) and device
   * configuration is displayed in the HTML report so the reader
   * can see which browser executed each test.
   */
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
