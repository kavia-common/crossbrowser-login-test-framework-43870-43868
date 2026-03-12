const BasePage = require('./BasePage');

/**
 * HerokuLoginPage - Page Object Model for the-internet.herokuapp.com/login.
 * Encapsulates all locators and interactions for the Heroku login page,
 * including form fields, submit button, success and error messages.
 *
 * Valid credentials: tomsmith / SuperSecretPassword!
 */
class HerokuLoginPage extends BasePage {
  /**
   * Creates a new HerokuLoginPage instance with all page locators.
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);

    /** @type {string} URL of the Heroku login page */
    this.url = 'https://the-internet.herokuapp.com/login';

    // Form element locators
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');

    // Feedback message locators
    this.flashMessage = page.locator('#flash');
    this.successMessage = page.locator('#flash.success');
    this.errorMessage = page.locator('#flash.error');

    // Post-login locator
    this.logoutButton = page.locator('a[href="/logout"]');
    this.pageHeading = page.locator('h2');
  }

  // PUBLIC_INTERFACE
  /**
   * Navigates to the Heroku login page.
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
   * Returns the text content of the flash message element.
   * @returns {Promise<string>} The flash message text
   */
  async getFlashMessageText() {
    await this.flashMessage.waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.flashMessage.textContent();
    return text ? text.trim() : '';
  }

  // PUBLIC_INTERFACE
  /**
   * Checks if the success flash message is visible.
   * @returns {Promise<boolean>} True if success message is displayed
   */
  async isSuccessMessageVisible() {
    try {
      await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Checks if the error flash message is visible.
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
}

module.exports = HerokuLoginPage;
