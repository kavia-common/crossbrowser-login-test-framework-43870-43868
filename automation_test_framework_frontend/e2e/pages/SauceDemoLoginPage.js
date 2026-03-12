const BasePage = require('./BasePage');
const { SAUCE_DEMO_LOGIN } = require('../utils/credentials');

/**
 * SauceDemoLoginPage - Page Object Model for www.saucedemo.com.
 * Valid credentials: standard_user / secret_sauce
 */
class SauceDemoLoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = SAUCE_DEMO_LOGIN.url;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorContainer = page.locator('.error-message-container');
    this.inventoryContainer = page.locator('#inventory_container');
    this.productsTitle = page.locator('.title');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
  }

  // PUBLIC_INTERFACE
  /** Navigates to the Sauce Demo login page. */
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
  /** Checks if the error message container is visible on the page. */
  async isErrorMessageVisible() {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  // PUBLIC_INTERFACE
  /** Checks if the login was successful by verifying the inventory page is loaded. */
  async isLoggedIn() {
    try {
      await this.inventoryContainer.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  // PUBLIC_INTERFACE
  /** Returns the products page title text after successful login. */
  async getProductsTitle() {
    await this.productsTitle.waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.productsTitle.textContent();
    return text ? text.trim() : '';
  }
}

module.exports = SauceDemoLoginPage;
