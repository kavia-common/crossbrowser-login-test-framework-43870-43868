/**
 * BasePage - Abstract base class for all Page Object Model (POM) pages.
 * Provides shared navigation and interaction utilities that concrete
 * page classes can inherit and extend.
 */
class BasePage {
  /**
   * Creates a new BasePage instance.
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
  }

  // PUBLIC_INTERFACE
  /**
   * Navigates the browser to the specified URL.
   * @param {string} url - The URL to navigate to
   */
  async navigateTo(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  // PUBLIC_INTERFACE
  /**
   * Returns the current page title.
   * @returns {Promise<string>} The page title
   */
  async getTitle() {
    return await this.page.title();
  }

  // PUBLIC_INTERFACE
  /**
   * Returns the current page URL.
   * @returns {Promise<string>} The current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }

  // PUBLIC_INTERFACE
  /**
   * Waits for a specific element to become visible on the page.
   * @param {string|import('@playwright/test').Locator} selector - CSS selector or locator
   * @param {number} [timeout=10000] - Maximum wait time in milliseconds
   */
  async waitForElement(selector, timeout = 10000) {
    if (typeof selector === 'string') {
      await this.page.locator(selector).waitFor({ state: 'visible', timeout });
    } else {
      await selector.waitFor({ state: 'visible', timeout });
    }
  }
}

module.exports = BasePage;
