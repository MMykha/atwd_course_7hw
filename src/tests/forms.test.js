import { expect } from '@jest/globals';
import { MainPage } from '../pages/main.page';
import { LoginPage } from '../pages/login.page';
import { ChangePasswPage } from '../pages/change-password.page';
import { ChangePasswSteps } from '../steps/changePassw.step';


describe('Forms tests',()=>{
    
    test('checkElementsOnForms', async()=>{
        const mainPage = new MainPage();
        const loginPage = new LoginPage();
        const changePasswPage = new ChangePasswPage();

        //open login form
        await mainPage.open();
        await mainPage.clickLoginLink();
        await mainPage.sleep(1000);

        //assert elements on login form
        expect(await loginPage.isEmailInputDisplayed()).toBe(true);
        expect(await loginPage.isPasswordInputDisplayed()).toBe(true);
        expect(await loginPage.isLoginButtonDisplayed()).toBe(true);
        expect(await loginPage.isForgetPasswordLinkDisplayed()).toBe(true);
        expect(await loginPage.isRegisterLinkDisplayed()).toBe(true);

        //open page of changing password
        await loginPage.pressPasswForgetLink();

        //assert element on page of changing password
        expect(await changePasswPage.isEmailInputDisplayed()).toBe(true);
        expect(await changePasswPage.isBackButtonDisplayed()).toBe(true);
        expect(await changePasswPage.isContinueButtonDispalyed()).toBe(true);
    });

    test('password recovery script', async()=>{
        const mainPage = new MainPage();
        const changePasswSteps = new ChangePasswSteps();

        const email = 'mikhailenkomasha0@gmail.com';

        //open login form
        await mainPage.open();
        await mainPage.clickLoginLink();

        //change password form
        await changePasswSteps.changePassw(email);
        expect(await mainPage.getPageURL()).toBe('https://demo.solomono.net/login.php');
   
    });
});
