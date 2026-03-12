/**
 * Page Object Model (POM) index module.
 * Re-exports all page objects for convenient access from test files.
 */
const BasePage = require('./BasePage');
const HerokuLoginPage = require('./HerokuLoginPage');
const PracticeTestLoginPage = require('./PracticeTestLoginPage');
const SauceDemoLoginPage = require('./SauceDemoLoginPage');

module.exports = {
  BasePage,
  HerokuLoginPage,
  PracticeTestLoginPage,
  SauceDemoLoginPage,
};
