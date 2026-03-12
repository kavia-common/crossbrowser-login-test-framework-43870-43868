/**
 * Test credentials and constants module.
 * Centralizes all test user credentials and site URLs used across
 * login tests. Updating credentials here propagates to all test files.
 *
 * IMPORTANT: These are publicly available demo/test site credentials.
 * Do not store real credentials in source code.
 */

// PUBLIC_INTERFACE
/** Credentials and URL for the-internet.herokuapp.com login page. */
const HEROKU_LOGIN = {
  url: 'https://the-internet.herokuapp.com/login',
  validUsername: 'tomsmith',
  validPassword: 'SuperSecretPassword!',
};

// PUBLIC_INTERFACE
/** Credentials and URL for practicetestautomation.com login page. */
const PRACTICE_TEST_LOGIN = {
  url: 'https://practicetestautomation.com/practice-test-login/',
  validUsername: 'student',
  validPassword: 'Password123',
};

// PUBLIC_INTERFACE
/** Credentials and URL for www.saucedemo.com login page. */
const SAUCE_DEMO_LOGIN = {
  url: 'https://www.saucedemo.com/',
  validUsername: 'standard_user',
  validPassword: 'secret_sauce',
};

// PUBLIC_INTERFACE
/** Common invalid credential values for negative test scenarios. */
const INVALID_CREDENTIALS = {
  username: 'invaliduser',
  password: 'WrongPassword123',
  empty: '',
};

// PUBLIC_INTERFACE
/**
 * Boundary input test data for login field validation.
 * Includes long strings, special characters, and unicode inputs.
 */
const BOUNDARY_INPUTS = {
  longUsername: 'a'.repeat(500),
  longPassword: 'p'.repeat(500),
  specialCharsUsername: '!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~',
  specialCharsPassword: '!@#$%^&*()_+-=[]{}|;:\'",.<>?/`~',
  unicodeUsername: '用户名テスト🚀',
  unicodePassword: 'пароль密码🔒',
  whitespaceOnly: '   ',
  leadingTrailingSpaces: '  tomsmith  ',
};

// PUBLIC_INTERFACE
/**
 * SQL injection payloads for security testing.
 * These are common attack vectors that login forms must safely handle.
 */
const SQL_INJECTION_PAYLOADS = [
  "' OR '1'='1",
  "' OR '1'='1' --",
  "'; DROP TABLE users; --",
  "admin'--",
  "1' OR '1' = '1",
  "' UNION SELECT * FROM users --",
];

// PUBLIC_INTERFACE
/**
 * XSS (Cross-Site Scripting) payloads for security testing.
 * Login forms should sanitize or escape these inputs.
 */
const XSS_PAYLOADS = [
  '<script>alert("XSS")</script>',
  '<img src=x onerror=alert(1)>',
  '"><script>alert(document.cookie)</script>',
];

module.exports = {
  HEROKU_LOGIN,
  PRACTICE_TEST_LOGIN,
  SAUCE_DEMO_LOGIN,
  INVALID_CREDENTIALS,
  BOUNDARY_INPUTS,
  SQL_INJECTION_PAYLOADS,
  XSS_PAYLOADS,
};
