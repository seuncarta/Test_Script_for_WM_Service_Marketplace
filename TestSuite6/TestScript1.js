const { Builder, By, Browser, until, Key } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const should = require("chai").should();

describe('Customer Side', () => {
    it("", async function () {

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

        // Find the customer dropdown list element and click on it
        const dropdownList = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[1]/a'));
        await dropdownList.click();

    })
})
