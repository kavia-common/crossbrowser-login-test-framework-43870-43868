const BasePage = require('./BasePage');
const { PRACTICE_TEST_LOGIN } = require('../utils/credentials');

/**
 * PracticeTestLoginPage - Page Object Model for practicetestautomation.com/practice-test-login/.
 * Valid credentials: student / Password123
 */
class PracticeTestLoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = PRACTICE_TEST_LOGIN.url;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#submit');
    this.errorMessage = page.locator('#error');
    this.successPageHeading = page.locator('.post-title');
    this.logoutLink = page.locator('a:has-text("Log out")');
  }

  // PUBLIC_INTERFACE
  /** Navigates to the Practice Test Automation login page. */
  async navigate() {
    await this.navigateTo(this.url);
  }

  // PUBLIC_INTERFACE
  /** Performs a login action with the given credentials. */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // PUBLIC_INTERFACE
  /** Returns the text content of the error message element. */
  async getErrorMessageText() {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.errorMessage.textContent();
    return text ? text.trim() : '';
  }

  // PUBLIC_INTERFACE
  /** Checks if the error message is visible on the page. */
  async isErrorMessageVisible() {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // PUBLIC_INTERFACE
  /** Checks if the login was successful by verifying the post-login page heading. */
  async isLoggedIn() {
    try {
      await this.successPageHeading.waitFor({ state: 'visible', timeout: 10000 });
      const text = await this.successPageHeading.textContent();
      return text ? text.includes('Logged In Successfully') : false;
    } catch {
      return false;
    }
  }

  // PUBLIC_INTERFACE
  /** Checks if the logout link is visible on the post-login page. */
  async isLogoutLinkVisible() {
    try {
      await this.logoutLink.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = PracticeTestLoginPage;
