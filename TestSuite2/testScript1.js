const assert = require('assert');
const { Builder, By, Key, until } = require('selenium-webdriver');

// describe('Login functionality', function() {
//   let driver;

//   beforeEach(async function() {
//     driver = await new Builder().forBrowser('chrome').build();
//     await driver.get('https://wmservicemp.thewealthmarket.com/#/authentication/signin');
//   });

//   afterEach(async function() {
//     await driver.quit();
//   });

//   it('should login with valid credentials', async function() {
//     const emailInput = await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input'));
//     const passwordInput = await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input'));
//     const submitButton = await driver.findElement(By.css('button[type="submit"]')); 
//     await emailInput.sendKeys('admin@thewealthmarket.com');
//     await passwordInput.sendKeys('admin'); 
//     await submitButton.click();
//     await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/index'), 5000, 'Showld load home page');

//   });

//   it('should display error message with invalid credentials', async function() {
//     const emailInput = await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input'));
//     const passwordInput = await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input'));
//     const submitButton = await driver.findElement(By.css('button[type="submit"]')); 
//     await emailInput.sendKeys('omo@gmail.com');
//     await passwordInput.sendKeys('invalid');
//     await submitButton.click();
//     const currentUrl = await driver.getCurrentUrl();
//     assert.strictEqual(currentUrl, 'https://wmservicemp.thewealthmarket.com/#/authentication/signin', 'URL should remain the same after an unsuccessful login');

//   });
// });


describe('Click Button After Signing In', () => {
  let driver;

  beforeEach(async () => {
    // Create a new Selenium driver before each test
    driver = await new Builder().forBrowser('chrome').build();
  });

  // afterEach(async () => {
  //   // Quit the Selenium driver after each test
  //   await driver.quit();
  // });

  it('should sign in and click the button', async () => {
    // Navigate to the sign in page
    await driver.get('https://wmservicemp.thewealthmarket.com/#/authentication/signin');

    // Fill in the sign in form
    await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input')).sendKeys('admin@thewealthmarket.com');
    await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input')).sendKeys('admin', Key.RETURN);

    // Wait for the home page to load
    await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/index'), 5000);

    // Click the button on the dashboard page
    const button = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[3]/a'));
    await button.click();

    // // Assert that the button click triggered the expected action
    // const confirmationMessage = await driver.findElement(By.id('confirmation-message')).getText();
    // expect(confirmationMessage).to.equal('Button clicked successfully!');
  });
});
