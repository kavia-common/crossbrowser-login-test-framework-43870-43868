const BasePage = require('./BasePage');
const { HEROKU_LOGIN } = require('../utils/credentials');

/**
 * HerokuLoginPage - Page Object Model for the-internet.herokuapp.com/login.
 * Encapsulates all locators and interactions for the Heroku login page,
 * including form fields, submit button, success and error messages.
 *
 * Valid credentials: tomsmith / SuperSecretPassword!
 */
class HerokuLoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = HEROKU_LOGIN.url;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.flashMessage = page.locator('#flash');
    this.successMessage = page.locator('#flash.success');
    this.errorMessage = page.locator('#flash.error');
    this.logoutButton = page.locator('a[href="/logout"]');
    this.pageHeading = page.locator('h2');
  }

  // PUBLIC_INTERFACE
  /** Navigates to the Heroku login page. */
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
  /** Returns the text content of the flash message element. */
  async getFlashMessageText() {
    await this.flashMessage.waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.flashMessage.textContent();
    return text ? text.trim() : '';
  }

  // PUBLIC_INTERFACE
  /** Checks if the success flash message is visible. */
  async isSuccessMessageVisible() {
    try {
      await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // PUBLIC_INTERFACE
  /** Checks if the error flash message is visible. */
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
