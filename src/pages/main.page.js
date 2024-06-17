import {By, until} from 'selenium-webdriver';

export class MainPage{
    constructor(driver){
        this.driver=driver;
        this.xpathLoginLink = "//div[@id='kabinet']/div/div/a[@class='enter_link']";
        this.xpathLoginForm = '//form[contains(@class,"form_enter")]';
        this.xpathNavApliances = "//div[@id=\"#all-categories\"]/descendant::a[text()=\"Побутова техніка\"]";
        this.xpathSelectLanguage = "//div[@class=\"language_select\"]//button[@class=\"language-dropdown-button\"]";
        this.xpathSelectCurrency = "//nav[@class=\"currency_select\"]/descendant::div[contains(@class,'selectize-input items')]";
        this.xpathUkrainianLanguage = "//div[contains(@class,\"language_select\")]/ul/li/a[contains(text(),\"Українська\")]";
        this.xpathUahCurrency = "//nav[@class=\"currency_select\"]/descendant::div[contains(@class,\"selectize-dropdown-content\")]/div[@data-value=\"UAH\"]";
        this.xpathOpenCartButton = "//div[@id=\"shopping_cart_box\"]/div/div[@class=\"img_basket popup_cart\"]/*";
    }

    async clickLoginLink(){
        const link = await this.driver.findElement(By.xpath(this.xpathLoginLink));
        link.click();
    }

    async isLoggedOut(){
       return await this.driver.findElement(By.xpath(this.xpathLoginLink)).isDisplayed();
    }

    async openApliancesMenu(){
        //let apliancesLink = await  this.driver.wait(until.elementIsVisible(this.driver.findElement(By.xpath(xpathNavApliances))),2000);
        const apliancesLink = await  this.driver.wait(until.elementIsVisible(By.xpath(xpathNavApliances)),2000);
        apliancesLink.click();
        await this.driver.wait(until.urlContains('https://demo.solomono.net/uk/pobutova-tehnika'),2000);
    }

    async changeLanguage(){
        await this.driver.findElement(By.xpath(this.xpathSelectLanguage)).click();
//        let selectLanguage = await this.driver.wait(until.elementIsVisible(driver.findElement(By.xpath(xpathUkrainianLanguage))),2000);
        const selectLanguage = await this.driver.wait(until.elementIsVisible(By.xpath(this.xpathUkrainianLanguage)),2000);
        selectLanguage.click();
        //wait until
    }

    async changeCurrency(){
        await this.driver.findElement(By.xpath(this.xpathSelectCurrency)).click();
        //let selectCurrency = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(xpathUahCurrency))),2000);
        const selectCurrency = await this.driver.wait(until.elementIsVisible(By.xpath(this.xpathUahCurrency)),2000);
        selectCurrency.click();
        //wait until
    }

    async openCart(){
        await this.driver.findElement(By.xpath(this.xpathOpenCartButton)).click();
    }
}
