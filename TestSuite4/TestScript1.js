const { Builder, By, Browser, Key, until } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const should = require("chai").should();

describe('', () => {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();
        // await driver.manage().setTimeouts({ implicit: 5000 });

    });

    // after(async function () {
    //     //close browser
    //     await driver.quit();
    // });

    it("Verify that you can visit the Book a Service Page and that there is at least one service displaying on the page", async function () {
        //Sign in
        await driver.get("https://wmservicemp.thewealthmarket.com/#/authentication/signin");
        // await driver.findElement(By.xpath("/html/body/app-root/div[1]/div/app-header/header/nav/ul/li/a")).click();

        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input")).sendKeys("admin@thewealthmarket.com");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input")).sendKeys("admin", Key.RETURN);

        // await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[2]/button")).click();
        await driver.wait(until.urlIs("https://wmservicemp.thewealthmarket.com/#/index"), 5000);

        const bookAService = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[4]/a'));
        await bookAService.click();
        

        // await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[2]/button")).click();
        // await driver.manage().setTimeouts({ implicit: 5000 });

        // let bookAService = await driver.wait(until.elementLocated(By.id("cdk-overlay-0")), 9000).click();
        // // console.log(bookAService);
        // await driver.findElement(By.css('<a _ngcontent-sqy-c70="" href="# / customers / find - a - job">Find A Job</a>')).click();



        // await driver.get("https://wmservicemp.thewealthmarket.com/#/services/listings");
        // await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[2]/div/div[2]/h3/a")).click();


        // await driver.wait(until.urlIs("https://wmservicemp.thewealthmarket.com/#/services/listings"), 5000, "Should load the Book a service page")
    });

    it("", async function () {


    });

    it("", async function () {

    });
})



