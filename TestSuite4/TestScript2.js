const { Builder, By, Browser, until, Key } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const should = require("chai").should();

describe('Booking a Service', () => {
    it("Signin and Visit Service Detail to book a Service", async function () {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();

        //Sign in
        await driver.get("https://wmservicemp.thewealthmarket.com/#/authentication/signin");
        // await driver.findElement(By.xpath("/html/body/app-root/div[1]/div/app-header/header/nav/ul/li/a")).click();

        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input")).sendKeys("admin@thewealthmarket.com");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input")).sendKeys("admin");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[2]/button")).click();

        // Wait for the home page to load
        await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/index'), 5000);

        const bookAService = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[3]/a'));
        await bookAService.click();

        //Wait for 5 seconds for the page to load
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Click on a service to see the detail and book it. I choose the 2th service on the page at random
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[2]/div/div[2]/h3/a")).click();

        //Wait for 5 seconds for the page to load
        await driver.manage().setTimeouts({ implicit: 5000 });
        //Book Now
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[1]/div/div/div[2]/div/section[3]/div/div/div[3]/a")).click();

        let serviceTotalPrice = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[1]/div/div/div[2]/div/section[3]/div/div/div[2]/div[2]/h5")).getText();
        //convert the service price from string to number
        serviceTotalPrice = parseFloat(serviceTotalPrice.replace(/[^\d.-]/g, ''));
        console.log(serviceTotalPrice);

        //Wait for 5 seconds for the page to load
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Order confirmation page/module pop up
        // WM user Id
        let WMuserID = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[2]/div/div/div[2]/div/form/div/div[2]/input")).getText(); // This is empty
        assert.notStrictEqual(WMuserID.trim(), '', 'The order confirmation page is largely pending, the WM user Id field on the order confirmation page is empty and should not be');

        //confirm the price on the confirmation page is the same as the total service price 
        let priceOnConfrimationPage = await driver.findElement(By.xpath("")); //No price on the confirmation page yet
        assert.ok(priceOnConfrimationPage >= serviceTotalPrice, 'No price on the confirmation page')
        // priceOnConfrimationPage.should.equal(serviceTotalPrice);

        //Order id 
        let orderID = await driver.findElement(By.xpath("")); //No order Id on the confirmation page yet
        assert.notStrictEqual(orderID.trim(), '', 'The order Id field should not be empty');


        //Confrim order and proceed, we click yes.
        let yes = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[2]/div/div/div[3]/button[1]")).click();
        let no = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[2]/div/div/div[3]/button[2]"));
    });

    it("Book a service with add-on selected", async function () {

        let driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();

        //Sign in
        await driver.get("https://wmservicemp.thewealthmarket.com/#/authentication/signin");
        // await driver.findElement(By.xpath("/html/body/app-root/div[1]/div/app-header/header/nav/ul/li/a")).click();

        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input")).sendKeys("admin@thewealthmarket.com");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input")).sendKeys("admin");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[2]/button")).click();

        // Wait for the home page to load
        await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/index'), 5000);

        const bookAService = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[3]/a'));
        await bookAService.click();

        //Wait for 5 seconds for the page to load
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Click on a service to see the detail and book it. I choose the 2th service on the page at random
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[2]/div/div[2]/h3/a")).click();

        //Wait for 5 seconds for the page to load
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Add the first add-on on the add-on section
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[1]/div/div/div[2]/div/section[2]/div/div/div/div/div[1]/div/div/label/input")).click();

        let servicePrice = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[1]/div/div/div[2]/div/section[1]/div/div/span")).getText();
        //convert the service price from string to number
        servicePrice = parseFloat(servicePrice.replace(/[^\d.-]/g, ''));
        console.log(servicePrice);

        let addOnPrice = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[1]/div/div/div[2]/div/section[2]/div/div/div/div/div[2]/ul/li")).getText();
        addOnPrice = parseFloat(addOnPrice.replace(/[^\d.-]/g, ''));
        console.log(addOnPrice);

        let serviceTotalPrice = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[1]/div/div/div[2]/div/section[3]/div/div/div[2]/div[2]/h5")).getText();
        //convert the service price from string to number
        serviceTotalPrice = parseFloat(serviceTotalPrice.replace(/[^\d.-]/g, ''));
        console.log(serviceTotalPrice);

        assert.ok(serviceTotalPrice == (servicePrice + addOnPrice), `${servicePrice + addOnPrice} This should be the total service Price with addon included`)

        //Book Now
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[1]/div/div/div[2]/div/section[3]/div/div/div[3]/a")).click();

        //Wait for 5 seconds for the page to load
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Order confirmation page/module pop up
        // WM user Id
        let WMuserID = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[2]/div/div/div[2]/div/form/div/div[2]/input")).getText(); // This is empty
        assert.notStrictEqual(WMuserID.trim(), '', 'The order confirmation page is largely pending, the WM user Id field on the order confirmation page is empty and should not be');

        //confirm the price on the confirmation page is the same as the total service price 
        let priceOnConfrimationPage = await driver.findElement(By.xpath("")); //No price on the confirmation page yet
        assert.ok(priceOnConfrimationPage >= serviceTotalPrice, 'No price on the confirmation page')
        // priceOnConfrimationPage.should.equal(serviceTotalPrice);

        //Order id 
        let orderID = await driver.findElement(By.xpath("")); //No order Id on the confirmation page yet
        assert.notStrictEqual(orderID.trim(), '', 'The order Id field should not be empty');


        //Confrim order and proceed, we click yes.
        let yes = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[2]/div/div/div[3]/button[1]")).click();
        let no = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-pages/app-service-details/div[2]/div/div/div[3]/button[2]"));
    });
})

