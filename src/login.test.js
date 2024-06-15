import {Builder, Browser, By, until} from 'selenium-webdriver';
import {expect, afterEach, beforeEach, test} from '@jest/globals';
import { Locator, LoginData } from './locators';
jest.setTimeout(30000);

describe("Login testing", ()=>{
    let driver;

    // beforeAll(async()=>{
    //     driver = await new Builder().forBrowser(Browser.CHROME).build();
    // });

    // afterAll(async()=>{
    //     if(driver){
    //         await driver.quit();
    //     }
    // });

    beforeEach(async()=>{
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        await driver.get('https://demo.solomono.net');
    });

    afterEach(async()=>{
        if(driver){
            await driver.quit();
        }
    });

    test("validation of forms", async()=>{
        let link = await driver.findElement(By.xpath(Locator.xpathLoginLink));
        link.click();
        await driver.sleep(2000);

        let loginForm = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(Locator.xpathLoginForm))), 2000);
        expect(await loginForm.getAttribute("name")).toBe("login");
        expect(await loginForm.findElement(By.xpath(Locator.xpathLoginInput))).toBeTruthy();
        expect(await loginForm.findElement(By.xpath(Locator.xpathPasswordInput))).toBeTruthy();
        expect(await loginForm.findElement(By.xpath(Locator.xpathForgetPasswordLink))).toBeTruthy();
        expect(await loginForm.findElement(By.xpath(Locator.xpathLoginButton))).toBeTruthy();
        expect(await loginForm.findElement(By.xpath(Locator.xpathRegisterLink))).toBeTruthy();

        await driver.findElement(By.xpath(Locator.xpathForgetPasswordLink)).click();
        expect(await driver.getCurrentUrl()).toBe('https://demo.solomono.net/password_forgotten.php');

        let paswwFoggotenForm = await driver.findElement(By.xpath(Locator.xpathPaswFogottenForm));
        expect(await paswwFoggotenForm.getAttribute("name")).toBe("password_forgotten");
        expect(await paswwFoggotenForm.findElement(By.xpath(Locator.xpathPaswFogottenInputEmail))).toBeTruthy();
        expect(await paswwFoggotenForm.findElement(By.xpath(Locator.xpathPaswFogottenBackButton))).toBeTruthy();
        expect(await paswwFoggotenForm.findElement(By.xpath(Locator.xpathPaswFogottenContinueButton))).toBeTruthy();
    });

    test("password recovery script", async()=>{
        await driver.findElement(By.xpath(Locator.xpathLoginLink)).click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath(Locator.xpathForgetPasswordLink)).click();
        expect(await driver.getCurrentUrl()).toBe('https://demo.solomono.net/password_forgotten.php');
        await driver.findElement(By.xpath(Locator.xpathPaswFogottenInputEmail)).sendKeys(LoginData.email);
        await driver.findElement(By.xpath(Locator.xpathPaswFogottenContinueButton)).click();
        expect(await driver.getCurrentUrl()).toBe('https://demo.solomono.net/login.php');
    });
});
