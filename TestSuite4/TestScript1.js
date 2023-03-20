const { Builder, By, Browser, Key, until } = require("selenium-webdriver");
const { assert, expect } = require("chai");
const should = require("chai").should();

describe(`Verify that you can visit the Book a Service Page,
that there is at least one service displaying on the page
and you can use the fliter features`, () => {


    it("Verifying fliter by searching with key term", async function () {

        let  driver = await new Builder().forBrowser("chrome").build();
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

        let serviceSearch = "cooking"
        await driver.findElement(By.xpath("//div/div[1]/input")).sendKeys(serviceSearch);
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/button")).click();

        //Wait for 5 seconds before looking for the element
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Search Results
        let foundServiceName = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[1]/div/div[1]/div/div[2]/a")).getText();
        console.log(foundServiceName)


        // assert.ok(serviceSearch.includes(foundServiceName), `Text "${foundServiceName}" is not included in "${serviceSearch}"`);
        foundServiceName.should.to.include(serviceSearch)

        //close browser
        await driver.quit();
    });

    it("Verifying fliter for flitering from highest to lowest price", async function () {

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

        // await driver.findElement(By.xpath("//div/div[1]/input")).clear();

        let filterTerm = " Price High to Low ";
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/div/div[2]/ng-select2/span/span[1]/span/span[1]")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("/html/body/span/span/span[1]/input")).sendKeys(filterTerm, Key.RETURN);
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/button")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Get the price of the first item
        let firstResult = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[1]/div/div[1]/div/div[1]/span")).getText();
       
        //Remove the currency sign "₦" in the price
        const thePriceforFirstResult = firstResult.replace(/₦/g, '')

        //Convert the new value into a number
        var price1 = Number (thePriceforFirstResult)

        //Get the price of the second item
        let secondResult = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[2]/div/div[1]/div/div[1]/span")).getText();
        
        //Remove the currency sign "₦" in the price
        const thePriceForSecondResult = secondResult.replace(/₦/g, '')
      
        //Convert the new value into a number
        var price2 = Number(thePriceForSecondResult)

        //Get the price of the third item
        let thirdResult = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[3]/div/div[1]/div/div[1]/span")).getText();

        //Remove the currency sign "₦" in the price
        const thePriceForThirdResult = thirdResult.replace(/₦/g, '')

        //Convert the new value into a number
        var price3 = Number(thePriceForThirdResult)
        
        console.log(price1, price2, price3)
        assert.ok(price1 >= price2, 'The price of the first service is not greater than the second, so it did not arrange the prices from high to low');
        assert.ok(price2 >= price3, 'The price of the second service is not greater than the first, so it did not arrange the prices from high to low');

        //close browser
        await driver.quit();

    });

    it("Verifying fliter for flitering from lowest to highest price", async function () {
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

        // await driver.findElement(By.xpath("//div/div[1]/input")).clear();

        let filterTerm = " Price Low to High ";
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/div/div[2]/ng-select2/span/span[1]/span/span[1]")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("/html/body/span/span/span[1]/input")).sendKeys(filterTerm, Key.RETURN);
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/button")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Get the price of the first item
        let firstResult = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[1]/div/div[1]/div/div[1]/span")).getText();

        //Remove the currency sign "₦" in the price
        const thePriceforFirstResult = firstResult.replace(/₦/g, '')

        //Convert the new value into a number
        var price1 = Number(thePriceforFirstResult)

        //Get the price of the second item
        let secondResult = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[2]/div/div[1]/div/div[1]/span")).getText();

        //Remove the currency sign "₦" in the price
        const thePriceForSecondResult = secondResult.replace(/₦/g, '')

        //Convert the new value into a number
        var price2 = Number(thePriceForSecondResult)

        //Get the price of the third item
        let thirdResult = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[3]/div/div[1]/div/div[1]/span")).getText();

        //Remove the currency sign "₦" in the price
        const thePriceForThirdResult = thirdResult.replace(/₦/g, '')

        //Convert the new value into a number
        var price3 = Number(thePriceForThirdResult)

        console.log(price1, price2, price3)
        assert.ok(price1 <= price2, 'The price of the first service is greater than the second, so it did not arrange the prices from Low to High');
        assert.ok(price2 <= price3, 'The price of the second service is greater than the third, so it did not arrange the prices from Low to High');

        //close browser
        await driver.quit();
    });

    it("Verifying fliter for flitering from A - Z", async function () {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();

        //Sign in
        await driver.get("https://wmservicemp.thewealthmarket.com/#/authentication/signin");

        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input")).sendKeys("admin@thewealthmarket.com");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input")).sendKeys("admin");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[2]/button")).click();

        // Wait for the home page to load
        await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/index'), 5000);

        const bookAService = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[3]/a'));
        await bookAService.click();

        let filterTerm = "Name (A-Z)";
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/div/div[2]/ng-select2/span/span[1]/span/span[1]")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("/html/body/span/span/span[1]/input")).sendKeys(filterTerm, Key.RETURN);
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/button")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });

        //Get resut items
        let firstResult = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[1]/div/div[1]/div/div[2]/a")).getText();
        let secondResult = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[2]/div/div[1]/div/div[2]/a")).getText();
        let thirdResult = await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[2]/div[2]/div/div[3]/div/div[1]/div/div[2]")).getText();

        console.log(firstResult, secondResult, thirdResult);
        //Get the first letters of each search resutl items (first 3 results)
        const firstLetter_firstReult = firstResult.charAt(0);
        const firstLetter_secondResult = secondResult.charAt(0);
        const firstLetter_thirdResult = thirdResult.charAt(0);

        console.log(firstLetter_firstReult, firstLetter_secondResult, firstLetter_thirdResult);
        //Compare the first letters
        assert(firstLetter_firstReult <= firstLetter_secondResult, 'The first letter of first item does not come before the first letter of second item')
        assert(firstLetter_secondResult <= firstLetter_thirdResult, 'The first letter of Z does not come before the first letter of A');

        //close browser
        await driver.quit();

    });

    /*
    it("Verifying fliter for flitering by Sale(Best sellers)", async function () {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();
        
        //Sign in
        await driver.get("https://wmservicemp.thewealthmarket.com/#/authentication/signin");
        
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input")).sendKeys("admin@thewealthmarket.com");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input")).sendKeys("admin");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[2]/button")).click();

        // Wait for the home page to load
        await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/index'), 5000);

        const bookAService = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[3]/a'));
        await bookAService.click();

        let filterTerm = "Sales (best sellers)";
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/div/div[2]/ng-select2/span/span[1]/span/span[1]")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("/html/body/span/span/span[1]/input")).sendKeys(filterTerm, Key.RETURN);
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/button")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });
    });

    it("Verifying fliter for flitering by service rating (Highest rated)", async function () {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();

        //Sign in
        await driver.get("https://wmservicemp.thewealthmarket.com/#/authentication/signin");

        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input")).sendKeys("admin@thewealthmarket.com");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input")).sendKeys("admin");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[2]/button")).click();

        // Wait for the home page to load
        await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/index'), 5000);

        const bookAService = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[3]/a'));
        await bookAService.click();

        let filterTerm = "Service Rating (highest rated)";
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/div/div[2]/ng-select2/span/span[1]/span/span[1]")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("/html/body/span/span/span[1]/input")).sendKeys(filterTerm, Key.RETURN);
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/button")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });
    });

    it("Verifying fliter for flitering by service provider rating (Highest rated)", async function () {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();

        //Sign in
        await driver.get("https://wmservicemp.thewealthmarket.com/#/authentication/signin");

        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input")).sendKeys("admin@thewealthmarket.com");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input")).sendKeys("admin");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[2]/button")).click();

        // Wait for the home page to load
        await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/index'), 5000);

        const bookAService = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[3]/a'));
        await bookAService.click();

        let filterTerm = "Service Provider Rating (highest rated)";
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/div/div[2]/ng-select2/span/span[1]/span/span[1]")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("/html/body/span/span/span[1]/input")).sendKeys(filterTerm, Key.RETURN);
        await driver.manage().setTimeouts({ implicit: 5000 });

        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/button")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });
    });
    */

    /*
    //No way to fliter by Newest because the date the service was posted is not displayed on the page so we can know which can before the other.
    //So this can not be automated
    it("Verifying fliter for flitering by newest", async function () {
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();
    
        //Sign in
        await driver.get("https://wmservicemp.thewealthmarket.com/#/authentication/signin");
    
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[1]/div/input")).sendKeys("admin@thewealthmarket.com");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[1]/div/div[2]/div/input")).sendKeys("admin");
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-authentication/app-signin/div/div/div/div/form/div[2]/button")).click();
    
        // Wait for the home page to load
        await driver.wait(until.urlIs('https://wmservicemp.thewealthmarket.com/#/index'), 5000);
    
        const bookAService = await driver.findElement(By.xpath('/html/body/app-root/div[1]/div/app-header/header/nav/div[2]/ul/li[3]/a'));
        await bookAService.click();
    
        let filterTerm = "Newest";
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/div/div[2]/ng-select2/span/span[1]/span/span[1]")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });
    
        await driver.findElement(By.xpath("/html/body/span/span/span[1]/input")).sendKeys(filterTerm, Key.RETURN);
        await driver.manage().setTimeouts({ implicit: 5000 });
    
        await driver.findElement(By.xpath("/html/body/app-root/div[1]/app-listings/div[2]/div/div/div[1]/div/div/form/button")).click();
        await driver.manage().setTimeouts({ implicit: 5000 });
    });
    */
})



