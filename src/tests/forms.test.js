import { expect } from '@jest/globals';
import { MainPage } from '../pages/main.page';
import { LoginPage } from '../pages/login.page';
import { ChangePasswPage } from '../pages/change-password.page';
import { ChangePasswSteps } from '../steps/changePassw.step';
import log from '../utils/logger';

describe('Forms tests',()=>{
    
    test('checkElementsOnForms', async()=>{
        //Arrange
        const mainPage = new MainPage();
        const loginPage = new LoginPage();
        const changePasswPage = new ChangePasswPage();

        //Act
        log.info('Open "Login" form');
        await mainPage.open();
        await mainPage.clickLoginLink();
        await mainPage.sleep(1000);

        //Assert
        expect(await loginPage.isEmailInputDisplayed()).toBe(true);
        expect(await loginPage.isPasswordInputDisplayed()).toBe(true);
        expect(await loginPage.isLoginButtonDisplayed()).toBe(true);
        expect(await loginPage.isForgetPasswordLinkDisplayed()).toBe(true);
        expect(await loginPage.isRegisterLinkDisplayed()).toBe(true);

        //Act
        log.info('Open "Password forget" form');
        await loginPage.pressPasswForgetLink();

        //Assert
        expect(await changePasswPage.isEmailInputDisplayed()).toBe(true);
        expect(await changePasswPage.isBackButtonDisplayed()).toBe(true);
        expect(await changePasswPage.isContinueButtonDispalyed()).toBe(true);
    });

    test('password recovery script', async()=>{
        //Arrange
        log.info('Change an old password');
        const mainPage = new MainPage();
        const changePasswSteps = new ChangePasswSteps();

        const email = 'mikhailenkomasha0@gmail.com';

        //Act
        await mainPage.open();
        await mainPage.clickLoginLink();
        log.info(`Change a password for email: ${email}`);
        await changePasswSteps.changePassw(email);

        //Assert
        expect(await mainPage.getPageURL()).toBe('https://demo.solomono.net/login.php');
    });
});
