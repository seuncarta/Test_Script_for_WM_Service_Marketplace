const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');
const assert = require('assert');

// describe('View Customer dashboard', function () {
//   let driver;

//   before(async function () {
//     driver = await new Builder().forBrowser('chrome').build();
//   });

//   // after(async function () {
//   //   await driver.quit();
//   // });

//   it('Customer should be able to view dashboard', async function () {
//     // Navigate to the login page
//     await driver.get('https://wmservicemp.thewealthmarket.com/#/authentication/signin');

//     // Fill in the sign in form
//     await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input')).sendKeys('Michaelajiri@gmail.com');
//     await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input')).sendKeys('demo', Key.RETURN);

//     // Wait for the home page to load
//     await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/index'), 5000);

//   // Find the customer dropdown list element and click on it
//     const dropdownList = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[2]/a'));
    
//     await dropdownList.click();
   
//     // Find the dashboard button element and click on it
    
//     const button = await driver.findElement(By.xpath('//*[@id="submenu"]/li[1]/a'));
//     await driver.executeScript('arguments[0].scrollIntoView()', button);
//     await button.click();

//     // Assert that the page has loaded the expected content after clicking on the button
//     await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/customers/dashboard'), 5000);

//     // Check if spendings is present in the dashboard
//    const spendingElement = await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-customers/div/div/div/div[2]/app-dashboard/div[1]/div[1]/div/div/h6'));
//     assert.ok(await spendingElement.isDisplayed(), 'Spending element not displayed');

//     //  Get the amount the customer has spent
//     const spendings = await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-customers/div/div/div/div[2]/app-dashboard/div[1]/div[1]/div/div/div/h6/span'))
//     const spendingAmount = await spendings.getText();
//     console.log('Spending amount:', spendingAmount);


//      // Check if Total service purchased is present in the dashboard
//    const servicePurchased = await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-customers/div/div/div/div[2]/app-dashboard/div[1]/div[2]/div/div/h6'));
//    assert.ok(await servicePurchased.isDisplayed(), 'Services purchased card not displayed');

//    //  Get the amount the customer has spent
//    const serviceTotal = await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-customers/div/div/div/div[2]/app-dashboard/div[1]/div[2]/div/div/p/span'))
//    const serviceCount = await serviceTotal.getText();
//    console.log('Total service purchased:', serviceCount);


//     // Check if jobs posted is present in the dashboard
//     const jobs = await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-customers/div/div/div/div[2]/app-dashboard/div[1]/div[3]/div/div/h6'));
//     assert.ok(await jobs.isDisplayed(), 'Jobs posted card not displayed');

//     //  Get the number of jobs posted by the customer
//     const jobsPosted = await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-customers/div/div/div/div[2]/app-dashboard/div[1]/div[3]/div/div/p/span'))
//     const jobsNo = await jobsPosted.getText();
//     console.log('Total jobs posted:', jobsNo);

  
//      // Check if ongoing jobs is present in the dashboard
//      const ongoingJobs = await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-customers/div/div/div/div[2]/app-dashboard/div[1]/div[4]/div/div/h6'));
//      assert.ok(await ongoingJobs.isDisplayed(), 'Ongoing jobs card not displayed');

//      //  Get the number of ongoing jobs
//      const onJobs = await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-customers/div/div/div/div[2]/app-dashboard/div[1]/div[4]/div/div/div/p/span'))
//      const ongoingJobsNo = await onJobs.getText();
//      console.log('Ongoing Jobs:', ongoingJobsNo);
//   })
// });


describe('View Recent Activities', function() {

  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    await driver.quit();
  });

  it('should display recent activities', async function() {

 // Navigate to the login page
 await driver.get('https://wmservicemp.thewealthmarket.com/#/authentication/signin');

 // Fill in the sign in form
 await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input')).sendKeys('Michaelajiri@gmail.com');
 await driver.findElement(By.xpath('/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input')).sendKeys('demo', Key.RETURN);

 // Wait for the home page to load
 await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/index'), 5000);

// Find the customer dropdown list element and click on it
 const dropdownList = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[2]/a'));
 
 await dropdownList.click();

 // Find the dashboard button element and click on it
 
 const button = await driver.findElement(By.xpath('//*[@id="submenu"]/li[1]/a'));
 await driver.executeScript('arguments[0].scrollIntoView()', button);
 await button.click();

 // Assert that the page has loaded the expected content after clicking on the button
 await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/customers/dashboard'), 5000);


    const activitiesTable = await driver.findElement(By.className('table'), 5000);

    assert.ok(await activitiesTable.isDisplayed(), 'Activities table not displayed');

    const tableRows = await activitiesTable.findElements(By.css('tr'));
    console.log(`Found ${tableRows.length} rows in activities table`);
    console.log('Recent activities:');
    for (let i = 1; i < tableRows.length; i++) { // skip first row (header)
      const tableCells = await tableRows[i].findElements(By.css('td'));
      const date = await tableCells[0].getText();
      const status = await tableCells[1].getText();
      const price = await tableCells[2].getText();
      console.log(`- ${date} - ${status} - ${price}`);
    }
  });
});