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

module.exports = {
  HEROKU_LOGIN,
  PRACTICE_TEST_LOGIN,
  SAUCE_DEMO_LOGIN,
  INVALID_CREDENTIALS,
};
