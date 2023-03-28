const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Service Provider Registration', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should register a service provider', async function () {
    // Navigate to the registration page
    await driver.get('https://wmservicemp.thewealthmarket.com/#/providers/register');

    // Wait for the registration form to load
    await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/div[1]/app-providers/div/div/div/div/app-service-provider/div[1]/div/div/div/div[2]/div/mat-horizontal-stepper')), 10000);

    // Fill out the personal information form

    // Upload a photo
    // await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[1]/div[1]/div/div/div/div/div[2]/div/div/label/input')).click();
    // await fileInput.sendKeys('C:\Users\corep\Downloads\me.jpeg');

    await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[1]/div[1]/div/div/input')).sendKeys('Rainbow Enterprise');
    const serviceTypeDropdown = await driver.findElement(By.css('.selection'));

    // const serviceTypeOption = await serviceTypeDropdown.findElement(By.xpath('//*[@id="select2-5w3b-container"][title="Corporate"]'));
    // await serviceTypeOption.click();
    await driver.findElement(By.id('select2-dk1m-container')).click();
    const skill = driver.findElement(By.xpath('/html/body/span/span/span[1]/input')).sendKeys('front');
    await skill.click();

    await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[1]/div[3]/div/div/textarea')).sendKeys('This is a company that gives color to your life');
    await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[1]/div[4]/div/div/textarea')).sendKeys('Chief Shittu Street, Alaguntan, mobil rd Ajah');
    await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[2]/button')).click();
  
  });
});



describe('Service Provider Registration - Negative test', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function () {
    await driver.quit();
  });

  it('should not register a service provider when fields are left blank', async function () {
    // Navigate to the registration page
    await driver.get('https://wmservicemp.thewealthmarket.com/#/providers/register');

    // Wait for the registration form to load
    await driver.wait(until.elementLocated(By.xpath('/html/body/app-root/div[1]/app-providers/div/div/div/div/app-service-provider/div[1]/div/div/div/div[2]/div/mat-horizontal-stepper')), 10000);

    // Fill out the personal information form

    // Upload a photo
    // await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[1]/div[1]/div/div/div/div/div[2]/div/div/label/input')).click();
    // await fileInput.sendKeys('C:\Users\corep\Downloads\me.jpeg');

    await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[1]/div[1]/div/div/input')).sendKeys('');
    const serviceTypeDropdown = await driver.findElement(By.css('.selection'));

    // const serviceTypeOption = await serviceTypeDropdown.findElement(By.xpath('//*[@id="select2-5w3b-container"][title="Corporate"]'));
    // await serviceTypeOption.click();
    
    // await driver.findElement(By.id('select2-dk1m-container')).click();
    // const skill = driver.findElement(By.xpath('/html/body/span/span/span[1]/input')).sendKeys('front');
    // await skill.click();

    await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[1]/div[3]/div/div/textarea')).sendKeys('');
    await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[1]/div[4]/div/div/textarea')).sendKeys('');
    await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[2]/button')).click();
  
  });
});