const BasePage = require('./BasePage');

/**
 * SauceDemoLoginPage - Page Object Model for www.saucedemo.com.
 * Encapsulates all locators and interactions for the Sauce Demo login page,
 * including form fields, submit button, success and error messages.
 *
 * Valid credentials: standard_user / secret_sauce
 */
class SauceDemoLoginPage extends BasePage {
  /**
   * Creates a new SauceDemoLoginPage instance with all page locators.
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    super(page);

    /** @type {string} URL of the Sauce Demo login page */
    this.url = 'https://www.saucedemo.com/';

    // Form element locators
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');

    // Feedback message locators
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorContainer = page.locator('.error-message-container');

    // Post-login locators
    this.inventoryContainer = page.locator('#inventory_container');
    this.productsTitle = page.locator('.title');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
  }

  // PUBLIC_INTERFACE
  /**
   * Navigates to the Sauce Demo login page.
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
   * Checks if the error message container is visible on the page.
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
   * Checks if the login was successful by verifying the inventory page is loaded.
   * @returns {Promise<boolean>} True if the inventory container is visible
   */
  async isLoggedIn() {
    try {
      await this.inventoryContainer.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Returns the products page title text after successful login.
   * @returns {Promise<string>} The products title text
   */
  async getProductsTitle() {
    await this.productsTitle.waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.productsTitle.textContent();
    return text ? text.trim() : '';
  }
}

module.exports = SauceDemoLoginPage;
