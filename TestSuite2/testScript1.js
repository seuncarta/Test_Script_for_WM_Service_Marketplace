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

    // Click the book a service button on the page
    const button = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[3]/a'));
    await button.click();
    // Click the book a service button on the page
    // const jobButton = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[4]/a'));


    // await driver.executeScript("document.evaluate('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[4]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();");
    // await jobButton.click();


    // // Find the customer dropdown list element and click on it
    // const dropdownList = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[2]/a'));
    // await dropdownList.click();
   
    // // Find the dashboard button element and click on it
    
    // const button = await driver.findElement(By.xpath('//*[@id="submenu"]/li[1]/a'));
    // await driver.executeScript('arguments[0].scrollIntoView()', button);
    // await button.click();

    // // Assert that the page has loaded the expected content after clicking on the button
    // await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/customers/dashboard'), 5000);
  

    // // Assert that the button click triggered the expected action
    // const confirmationMessage = await driver.findElement(By.id('confirmation-message')).getText();
    // expect(confirmationMessage).to.equal('Button clicked successfully!');
  });
});
