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

  it('should register a service provider using matstepper form', async function () {
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

    await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[1]/div[3]/div/div/textarea')).sendKeys('This is a company that gives color to your life');
    await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[1]/div[4]/div/div/textarea')).sendKeys('Chief Shittu Street, Alaguntan, mobil rd Ajah');
    await driver.findElement(By.xpath('//*[@id="cdk-step-content-0-0"]/form/div[2]/button')).click();

    // // Fill out the professional information form

    // skills field
    await driver.findElement(By.xpath('//*[@id="addr0"]/td[1]/input')).sendKeys('Microsoft Office Suite');
    await driver.findElement(By.xpath('//*[@id="addr0"]/td[2]/input')).sendKeys('intermediate');

    await driver.findElement(By.xpath('#address-input')).sendKeys('123 Main St');
    await driver.findElement(By.xpath('#city-input')).sendKeys('Anytown');
    await driver.findElement(By.xpath('#state-input')).sendKeys('CA');
    await driver.findElement(By.xpath('#zip-input')).sendKeys('12345');
    await driver.findElement(By.xpath('#next-button')).click();

    // // Fill out the service information form
    // await driver.findElement(By.css('#service-info-tab')).click();
    // await driver.findElement(By.css('#service-name-input')).sendKeys('Web Development');
    // await driver.findElement(By.css('#service-description-input')).sendKeys('Custom web development services');
    // await driver.findElement(By.css('#service-rate-input')).sendKeys('100');
    // await driver.findElement(By.css('#next-button')).click();

    // // Submit the registration form
    // await driver.findElement(By.css('#submit-button')).click();

    // // Wait for the confirmation message to appear
    // await driver.wait(until.elementLocated(By.css('#confirmation-message')), 10000);

    // // Verify the confirmation message
    // const confirmationMessage = await driver.findElement(By.css('#confirmation-message')).getText();
    // expect(confirmationMessage).to.equal('Thank you for registering as a service provider!');
  });
});
