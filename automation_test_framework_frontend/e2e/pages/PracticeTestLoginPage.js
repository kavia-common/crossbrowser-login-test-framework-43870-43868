const BasePage = require('./BasePage');

/**
 * PracticeTestLoginPage - Page Object Model for practicetestautomation.com/practice-test-login/.
 * Encapsulates all locators and interactions for the Practice Test Automation login page,
 * including form fields, submit button, success and error messages.
 *
 * Valid credentials: student / Password123
 */
class PracticeTestLoginPage extends BasePage {
  /**
   * Creates a new PracticeTestLoginPage instance with all page locators.
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);

    /** @type {string} URL of the Practice Test login page */
    this.url = 'https://practicetestautomation.com/practice-test-login/';

    // Form element locators
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#submit');

    // Feedback message locators
    this.errorMessage = page.locator('#error');

    // Post-login locators
    this.successPageHeading = page.locator('.post-title');
    this.logoutLink = page.locator('a:has-text("Log out")');
  }

  // PUBLIC_INTERFACE
  /**
   * Navigates to the Practice Test Automation login page.
   */
  async navigate() {
    await this.navigateTo(this.url);
  }

  // PUBLIC_INTERFACE
  /**
   * Performs a login action with the given credentials.
   * @param {string} username - The username to enter
   * @param {string} password - The password to enter
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // PUBLIC_INTERFACE
  /**
   * Returns the text content of the error message element.
   * @returns {Promise<string>} The error message text
   */
  async getErrorMessageText() {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.errorMessage.textContent();
    return text ? text.trim() : '';
  }

  // PUBLIC_INTERFACE
  /**
   * Checks if the error message is visible on the page.
   * @returns {Promise<boolean>} True if error message is displayed
   */
  async isErrorMessageVisible() {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Checks if the login was successful by verifying the post-login page heading.
   * @returns {Promise<boolean>} True if logged in successfully
   */
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
  /**
   * Checks if the logout link is visible on the post-login page.
   * @returns {Promise<boolean>} True if logout link is displayed
   */
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
