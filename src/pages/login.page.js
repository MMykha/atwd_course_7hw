import {By, until} from 'selenium-webdriver';

export class LoginPage {
    constructor(driver){
        this.driver = driver;
        this.xpathLoginForm = '//form[contains(@class,"form_enter")]';
        this.xpathLoginInput = "//form[@class=\"form_enter\"and@name=\"login\"]/input[@class=\"form-control name_enter\"and@type=\"email\"]";
        this.xpathPasswordInput = "//form[@class=\"form_enter\"and@name=\"login\"]/input[@class=\"form-control password_enter\"and@type=\"password\"]";
        this.xpathLoginButton = "//form[@class=\"form_enter\"and@name=\"login\"]/button[@class=\"submit_enter\"and@type=\"submit\"]";
        this.xpathRegisterLink = "//form[@class=\"form_enter\" and @name='login']/following-sibling::a[@class=\"registration\"]";
        this.xpathForgetPasswordLink = "//form[@class='form_enter']/a[@class='forget_password']";        
    }

    async isEmailInputDisplayed(){
        return await this.driver.findElement(By.xpath(this.xpathLoginInput)).isDisplayed();
    }

    async isPasswordInputDisplayed(){
        return await this.driver.findElement(By.xpath(this.xpathPasswordInput)).isDisplayed();     
    }

    async isLoginButtonDisplayed(){
        return await this.driver.findElement(By.xpath(this.xpathLoginButton)).isDisplayed();   

    }

    async isForgetPasswordLinkDisplayed(){
        return await this.driver.findElement(By.xpath(this.xpathForgetPasswordLink)).isDisplayed();
    }

    async isRegisterLinkDisplayed(){
        return await this.driver.findElement(By.xpath(this.xpathRegisterLink)).isDisplayed();
    }

    async getNameOfForm(){
        return await this.driver.getAttribute("name");
    }

    async fillEmailInput(email){
        await this.driver.findElement(By.xpath(this.xpathLoginInput)).sendKeys(email);
    }

    async fillPasswordInput(password){
        await this.driver.findElement(By.xpath(this.xpathPasswordInput)).sendKeys(password);
    }

    async pressLoginButton(){
        await this.driver.findElement(By.xpath(this.xpathLoginButton)).click();
    }

    async pressPasswForgetLink(){
        await this.driver.findElement(By.xpath(this.xpathForgetPasswordLink)).click();
        await this.driver.wait(until.urlContains('https://demo.solomono.net/password_forgotten.php'),2000);
    }
}
