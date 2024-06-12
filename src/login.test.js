import {Builder, Browser, By, until} from 'selenium-webdriver';
import fs from "fs";
import {expect, it, afterEach, beforeEach, test} from '@jest/globals';

jest.setTimeout(30000);

describe("Login testing", ()=>{
    let driver;
    const xpathForgetPasswordLink = "//form[@class='form_enter']/a[@class='forget_password']"
    const xpathLoginLink = "//div[@id='kabinet']/div/div/a[@class='enter_link']";
    const xpathLoginForm ='//form[contains(@class,"form_enter")]';
    const xpathLoginInput ="//form[@class=\"form_enter\"and@name=\"login\"]/input[@class=\"form-control name_enter\"and@type=\"email\"]";
    const xpathPasswordInput="//form[@class=\"form_enter\"and@name=\"login\"]/input[@class=\"form-control password_enter\"and@type=\"password\"]";
    const xpathLoginButton ="//form[@class=\"form_enter\"and@name=\"login\"]/button[@class=\"submit_enter\"and@type=\"submit\"]";
    const xpathRegisterLink = "//form[@class=\"form_enter\" and @name='login']/following-sibling::a[@class=\"registration\"]";
    const xpathPaswFogottenForm ="//form[@name=\"password_forgotten\"]";
    const xpathPaswFogottenInputEmail="//input[@id=\"inputEmail_address\"]";
    const xpathPaswFogottenBackButton ="//form[@name=\"password_forgotten\"]/descendant::a[contains(@class,\"btn btn-primary\")]";
    const xpathPaswFogottenContinueButton ="//form[@name=\"password_forgotten\"]/descendant::button[contains(@class,\"btn btn-primary\")]";


    beforeAll(async()=>{
        driver = await new Builder().forBrowser(Browser.CHROME).build();
    });

    afterAll(async()=>{
        if(driver){
            await driver.quit();
        }
    });

    beforeEach(async()=>{
        // driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://demo.solomono.net');
    });

    // afterEach(async()=>{
    //     if(driver){
    //         await driver.close();
    //     }
    // })

    test("validation of forms", async()=>{
        let link = await driver.findElement(By.xpath(xpathLoginLink));
        link.click();
        await driver.sleep(2000);

        let loginForm = await driver.findElement(By.xpath(xpathLoginForm));
        expect(await loginForm.getAttribute("name")).toBe("login");
        expect(await loginForm.findElement(By.xpath(xpathLoginInput))).toBeTruthy();
        expect(await loginForm.findElement(By.xpath(xpathPasswordInput))).toBeTruthy();
        expect(await loginForm.findElement(By.xpath(xpathForgetPasswordLink))).toBeTruthy();
        expect(await loginForm.findElement(By.xpath(xpathLoginButton))).toBeTruthy();
        expect(await loginForm.findElement(By.xpath(xpathRegisterLink))).toBeTruthy();

        await driver.findElement(By.xpath(xpathForgetPasswordLink)).click();
        expect(await driver.getCurrentUrl()).toBe('https://demo.solomono.net/password_forgotten.php');

        let paswwFoggotenForm = await driver.findElement(By.xpath(xpathPaswFogottenForm));
        expect(await paswwFoggotenForm.getAttribute("name")).toBe("password_forgotten");
        expect(await paswwFoggotenForm.findElement(By.xpath(xpathPaswFogottenInputEmail))).toBeTruthy();
        expect(await paswwFoggotenForm.findElement(By.xpath(xpathPaswFogottenBackButton))).toBeTruthy();
        expect(await paswwFoggotenForm.findElement(By.xpath(xpathPaswFogottenContinueButton))).toBeTruthy();

    });

    // test("password recovery script", async()=>{
    //     await driver.findElement(By.xpath(xpathLoginLink)).click();
    //     await driver.findElement(By.xpath(xpathForgetPasswordLink)).click();

    // })

})
