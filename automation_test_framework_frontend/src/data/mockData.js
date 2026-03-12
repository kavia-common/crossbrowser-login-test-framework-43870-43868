/**
 * Mock data module for the Automation Test Framework Frontend.
 * Provides embedded test report data, documentation entries, and screenshot metadata
 * since no backend exists.
 */

// PUBLIC_INTERFACE
/**
 * Mock test report results for cross-browser login tests.
 * Each entry represents a test suite run with individual test cases.
 */
export const testReports = [
  {
    id: 'report-001',
    suiteName: 'Login Functionality - Chrome',
    browser: 'Chrome',
    browserVersion: '120.0.6099',
    timestamp: '2024-01-15T10:30:00Z',
    duration: '2m 45s',
    status: 'passed',
    totalTests: 12,
    passed: 11,
    failed: 1,
    skipped: 0,
    tests: [
      { name: 'Valid login with correct credentials', status: 'passed', duration: '3.2s', category: 'positive' },
      { name: 'Login with remember me checked', status: 'passed', duration: '2.8s', category: 'positive' },
      { name: 'Login redirects to dashboard', status: 'passed', duration: '4.1s', category: 'positive' },
      { name: 'Login with valid email format', status: 'passed', duration: '2.5s', category: 'positive' },
      { name: 'Invalid password shows error message', status: 'passed', duration: '3.0s', category: 'negative' },
      { name: 'Empty username field validation', status: 'passed', duration: '1.8s', category: 'negative' },
      { name: 'Empty password field validation', status: 'passed', duration: '1.9s', category: 'negative' },
      { name: 'SQL injection attempt blocked', status: 'passed', duration: '2.2s', category: 'negative' },
      { name: 'XSS attempt in username field', status: 'passed', duration: '2.4s', category: 'negative' },
      { name: 'Account lockout after 5 failed attempts', status: 'failed', duration: '15.3s', category: 'negative', error: 'Expected lockout after 5 attempts but account remained accessible after 6 attempts.' },
      { name: 'Password field masks input', status: 'passed', duration: '1.5s', category: 'positive' },
      { name: 'Logout clears session', status: 'passed', duration: '3.7s', category: 'positive' },
    ],
  },
  {
    id: 'report-002',
    suiteName: 'Login Functionality - Firefox',
    browser: 'Firefox',
    browserVersion: '121.0',
    timestamp: '2024-01-15T10:35:00Z',
    duration: '3m 12s',
    status: 'passed',
    totalTests: 12,
    passed: 12,
    failed: 0,
    skipped: 0,
    tests: [
      { name: 'Valid login with correct credentials', status: 'passed', duration: '3.5s', category: 'positive' },
      { name: 'Login with remember me checked', status: 'passed', duration: '3.1s', category: 'positive' },
      { name: 'Login redirects to dashboard', status: 'passed', duration: '4.5s', category: 'positive' },
      { name: 'Login with valid email format', status: 'passed', duration: '2.9s', category: 'positive' },
      { name: 'Invalid password shows error message', status: 'passed', duration: '3.3s', category: 'negative' },
      { name: 'Empty username field validation', status: 'passed', duration: '2.0s', category: 'negative' },
      { name: 'Empty password field validation', status: 'passed', duration: '2.1s', category: 'negative' },
      { name: 'SQL injection attempt blocked', status: 'passed', duration: '2.6s', category: 'negative' },
      { name: 'XSS attempt in username field', status: 'passed', duration: '2.8s', category: 'negative' },
      { name: 'Account lockout after 5 failed attempts', status: 'passed', duration: '14.8s', category: 'negative' },
      { name: 'Password field masks input', status: 'passed', duration: '1.7s', category: 'positive' },
      { name: 'Logout clears session', status: 'passed', duration: '4.0s', category: 'positive' },
    ],
  },
  {
    id: 'report-003',
    suiteName: 'Login Functionality - Safari',
    browser: 'Safari',
    browserVersion: '17.2',
    timestamp: '2024-01-15T10:40:00Z',
    duration: '3m 05s',
    status: 'failed',
    totalTests: 12,
    passed: 10,
    failed: 2,
    skipped: 0,
    tests: [
      { name: 'Valid login with correct credentials', status: 'passed', duration: '3.8s', category: 'positive' },
      { name: 'Login with remember me checked', status: 'failed', duration: '5.2s', category: 'positive', error: 'Remember me cookie not persisted in Safari private mode.' },
      { name: 'Login redirects to dashboard', status: 'passed', duration: '4.3s', category: 'positive' },
      { name: 'Login with valid email format', status: 'passed', duration: '3.0s', category: 'positive' },
      { name: 'Invalid password shows error message', status: 'passed', duration: '3.5s', category: 'negative' },
      { name: 'Empty username field validation', status: 'passed', duration: '2.2s', category: 'negative' },
      { name: 'Empty password field validation', status: 'passed', duration: '2.3s', category: 'negative' },
      { name: 'SQL injection attempt blocked', status: 'passed', duration: '2.7s', category: 'negative' },
      { name: 'XSS attempt in username field', status: 'failed', duration: '3.1s', category: 'negative', error: 'XSS payload was partially rendered in Safari due to different parsing behavior.' },
      { name: 'Account lockout after 5 failed attempts', status: 'passed', duration: '15.0s', category: 'negative' },
      { name: 'Password field masks input', status: 'passed', duration: '1.8s', category: 'positive' },
      { name: 'Logout clears session', status: 'passed', duration: '3.9s', category: 'positive' },
    ],
  },
];

// PUBLIC_INTERFACE
/**
 * Mock documentation entries describing the test framework structure and usage.
 */
export const documentationItems = [
  {
    id: 'doc-001',
    title: 'Getting Started',
    category: 'Setup',
    description: 'How to set up the Playwright automation test framework for cross-browser login testing.',
    content: `## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Target web application URL

### Installation
\`\`\`bash
npm install
npx playwright install
\`\`\`

### Configuration
Update the \`playwright.config.js\` file with your target application URL and browser settings.

### Running Tests
\`\`\`bash
# Run all tests
npx playwright test

# Run tests for a specific browser
npx playwright test --project=chromium

# Run with headed browser
npx playwright test --headed
\`\`\`
`,
    lastUpdated: '2024-01-14',
  },
  {
    id: 'doc-002',
    title: 'Page Object Model',
    category: 'Architecture',
    description: 'Understanding the POM pattern used in this framework for maintainable test code.',
    content: `## Page Object Model (POM)

### Overview
The Page Object Model is a design pattern that creates an object repository for web UI elements. Each page of the application has a corresponding Page class.

### Structure
\`\`\`
pages/
├── LoginPage.js       # Login page interactions
├── DashboardPage.js   # Dashboard page interactions
└── BasePage.js        # Common page methods
\`\`\`

### LoginPage Example
\`\`\`javascript
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('[data-testid="login-btn"]');
    this.errorMessage = page.locator('.error-message');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
\`\`\`
`,
    lastUpdated: '2024-01-13',
  },
  {
    id: 'doc-003',
    title: 'Test Coverage Matrix',
    category: 'Testing',
    description: 'Comprehensive test coverage for positive and negative login scenarios across browsers.',
    content: `## Test Coverage Matrix

### Positive Test Cases
| Test Case | Chrome | Firefox | Safari |
|-----------|--------|---------|--------|
| Valid login | ✅ | ✅ | ✅ |
| Remember me | ✅ | ✅ | ⚠️ |
| Redirect to dashboard | ✅ | ✅ | ✅ |
| Valid email format | ✅ | ✅ | ✅ |
| Password masking | ✅ | ✅ | ✅ |
| Session logout | ✅ | ✅ | ✅ |

### Negative Test Cases
| Test Case | Chrome | Firefox | Safari |
|-----------|--------|---------|--------|
| Invalid password | ✅ | ✅ | ✅ |
| Empty username | ✅ | ✅ | ✅ |
| Empty password | ✅ | ✅ | ✅ |
| SQL injection | ✅ | ✅ | ✅ |
| XSS attempt | ✅ | ✅ | ❌ |
| Account lockout | ❌ | ✅ | ✅ |
`,
    lastUpdated: '2024-01-15',
  },
  {
    id: 'doc-004',
    title: 'Configuration Guide',
    category: 'Setup',
    description: 'Detailed configuration options for the Playwright test framework.',
    content: `## Configuration Guide

### playwright.config.js
\`\`\`javascript
module.exports = {
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  reporter: [['html', { open: 'never' }]],
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
};
\`\`\`

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| BASE_URL | Target application URL | http://localhost:3000 |
| CI | Enable CI mode | false |
| HEADLESS | Run headless | true |
`,
    lastUpdated: '2024-01-12',
  },
  {
    id: 'doc-005',
    title: 'Reporting & Artifacts',
    category: 'Reporting',
    description: 'How test reports, screenshots, and traces are generated and stored.',
    content: `## Reporting & Artifacts

### HTML Reports
Playwright generates detailed HTML reports after each test run. Reports are stored in the \`playwright-report/\` directory.

### Screenshots
Screenshots are captured on test failure by default. They can be found in the \`test-results/\` directory.

### Traces
Traces capture a detailed log of test execution including network requests, DOM snapshots, and console output.

### Custom Reporters
You can add custom reporters to integrate with CI/CD pipelines:
\`\`\`javascript
reporter: [
  ['html'],
  ['json', { outputFile: 'results.json' }],
  ['junit', { outputFile: 'results.xml' }],
]
\`\`\`
`,
    lastUpdated: '2024-01-11',
  },
];

// PUBLIC_INTERFACE
/**
 * Mock screenshot entries representing test failure screenshots and visual comparisons.
 */
export const screenshots = [
  {
    id: 'ss-001',
    testName: 'Account lockout after 5 failed attempts',
    browser: 'Chrome',
    timestamp: '2024-01-15T10:32:45Z',
    type: 'failure',
    description: 'Screenshot captured when account lockout test failed. The login form remained accessible after 6 failed attempts.',
    dimensions: '1920x1080',
  },
  {
    id: 'ss-002',
    testName: 'Login with remember me checked',
    browser: 'Safari',
    timestamp: '2024-01-15T10:42:12Z',
    type: 'failure',
    description: 'Screenshot showing the remember me checkbox state in Safari private browsing mode.',
    dimensions: '1920x1080',
  },
  {
    id: 'ss-003',
    testName: 'XSS attempt in username field',
    browser: 'Safari',
    timestamp: '2024-01-15T10:43:30Z',
    type: 'failure',
    description: 'Screenshot showing partial XSS payload rendering in Safari browser.',
    dimensions: '1920x1080',
  },
  {
    id: 'ss-004',
    testName: 'Valid login with correct credentials',
    browser: 'Chrome',
    timestamp: '2024-01-15T10:30:15Z',
    type: 'baseline',
    description: 'Baseline screenshot of the login page before entering credentials in Chrome.',
    dimensions: '1920x1080',
  },
  {
    id: 'ss-005',
    testName: 'Login redirects to dashboard',
    browser: 'Firefox',
    timestamp: '2024-01-15T10:36:20Z',
    type: 'baseline',
    description: 'Baseline screenshot of the dashboard after successful login in Firefox.',
    dimensions: '1920x1080',
  },
  {
    id: 'ss-006',
    testName: 'Empty username field validation',
    browser: 'Chrome',
    timestamp: '2024-01-15T10:31:05Z',
    type: 'baseline',
    description: 'Screenshot showing validation error message when username field is empty.',
    dimensions: '1920x1080',
  },
];

// PUBLIC_INTERFACE
/**
 * Summary statistics computed from the test reports for the dashboard.
 */
export const dashboardStats = {
  totalTests: 36,
  totalPassed: 33,
  totalFailed: 3,
  totalSkipped: 0,
  passRate: 91.7,
  browsers: ['Chrome', 'Firefox', 'Safari'],
  lastRunTimestamp: '2024-01-15T10:40:00Z',
  averageDuration: '3m 01s',
  totalSuites: 3,
};
