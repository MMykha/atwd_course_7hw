import {By, until} from 'selenium-webdriver';
import { BasePage } from './base.page';

export class ChangePasswPage extends BasePage{
    constructor(){
        super();
        
        this.xpathPaswFogottenForm = "//form[@name=\"password_forgotten\"]";
        this.xpathPaswFogottenInputEmail = "//input[@id=\"inputEmail_address\"]";
        this.xpathPaswFogottenBackButton = "//form[@name=\"password_forgotten\"]/descendant::a[contains(@class,\"btn btn-primary\")]";
        this.xpathPaswFogottenContinueButton = "//form[@name=\"password_forgotten\"]/descendant::button[contains(@class,\"btn btn-primary\")]";
    }

    async getPasswForgottenForm (){
        return await this.driver.findElement(By.xpath(this.xpathPaswFogottenForm));
    }
    
    async getNameOfForm(){
        const paswwFoggotenForm = await this.driver.findElement(By.xpath(this.xpathPaswFogottenForm));
        return  await paswwFoggotenForm.getAttribute("name");
    }

    async isEmailInputDisplayed(){
        const paswwFoggotenForm = await this.driver.findElement(By.xpath(this.xpathPaswFogottenForm));;
        return await paswwFoggotenForm.findElement(By.xpath(this.xpathPaswFogottenInputEmail)).isDisplayed();
    }

    async isBackButtonDisplayed(){
        const paswwFoggotenForm = await this.driver.findElement(By.xpath(this.xpathPaswFogottenForm));;
        return await paswwFoggotenForm.findElement(By.xpath(this.xpathPaswFogottenBackButton)).isDisplayed();
    }

    async isContinueButtonDispalyed(){
        const paswwFoggotenForm = await this.driver.findElement(By.xpath(this.xpathPaswFogottenForm));;
        return await paswwFoggotenForm.findElement(By.xpath(this.xpathPaswFogottenContinueButton)).isDisplayed();
    }

    async fillEmailInput (email){
        await this.driver.findElement(By.xpath(this.xpathPaswFogottenInputEmail)).sendKeys(email);
    }

    async pressContinueButton (){
        await this.driver.findElement(By.xpath(this.xpathPaswFogottenContinueButton)).click();
        await this.driver.wait(until.urlContains('https://demo.solomono.net/login.php'),2000);
    }
}
