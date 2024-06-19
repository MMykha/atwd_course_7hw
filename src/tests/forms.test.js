import {Builder, Browser, By, until} from 'selenium-webdriver';
import {expect, test} from '@jest/globals';
import { MainPage } from '../pages/main.page';
import { LoginPage } from '../pages/login.page';
import { ChangePasswPage } from '../pages/change-password.page';
import { ChangePasswSteps } from '../steps/changePassw.step';

jest.setTimeout(30000);

let driver;

const baseUrl = 'https://demo.solomono.net';

describe('Forms tests',()=>{
    beforeEach(async()=>{
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
    });

    afterEach(async()=>{
        if(driver){
            await driver.quit();
        }
    });

    test('checkElementsOnForms', async()=>{
        await driver.get(baseUrl);
        const mainPage = new MainPage(driver);
        const loginPage = new LoginPage(driver);
        const changePasswPage = new ChangePasswPage(driver);

        //open login form
        await mainPage.clickLoginLink();
        await driver.sleep(1000);

        //assert elements on login form
        expect(await loginPage.isEmailInputDisplayed()).toBe(true);
        expect(await loginPage.isPasswordInputDisplayed()).toBe(true);
        expect(await loginPage.isLoginButtonDisplayed()).toBe(true);
        expect(await loginPage.isForgetPasswordLinkDisplayed()).toBe(true);
        expect(await loginPage.isRegisterLinkDisplayed()).toBe(true);

        //open page of changing password
        await loginPage.pressPasswForgetLink();

        //assert element on page of changing password
        expect( await changePasswPage.isEmailInputDisplayed()).toBe(true);
        expect(await changePasswPage.isBackButtonDisplayed()).toBe(true);
        expect(await changePasswPage.isContinueButtonDispalyed()).toBe(true);
    });

    test('password recovery script', async()=>{
        const mainPage = new MainPage(driver);
        const changePasswSteps = new ChangePasswSteps(driver);

        const email = 'mikhailenkomasha0@gmail.com';

        //open login form
        await driver.get(baseUrl);
        await mainPage.clickLoginLink();

        //change password form
        await changePasswSteps.changePassw(email);
        expect(await driver.getCurrentUrl()).toBe('https://demo.solomono.net/login.php');
   
    });
});
