import {By, until} from 'selenium-webdriver';
import { BasePage } from './base.page';

export class MainPage extends BasePage{
    constructor(){
        super();

        this.baseUrl = "https://demo.solomono.net/";
        
        this.xpathLoginLink = "//div[@id='kabinet']/div/div/a[@class='enter_link']";
        this.xpathLoginForm = '//form[contains(@class,"form_enter")]';
        this.xpathNavApliances = "//div[@id=\"#all-categories\"]/descendant::a[text()=\"Побутова техніка\"]";
        this.xpathSelectLanguage = "//div[@class=\"language_select\"]//button[@class=\"language-dropdown-button\"]";
        this.xpathSelectCurrency = "//nav[@class=\"currency_select\"]/descendant::div[contains(@class,'selectize-input items')]";
        this.xpathUkrainianLanguage = "//div[contains(@class,\"language_select\")]/ul/li/a[contains(text(),\"Українська\")]";
        this.xpathUahCurrency = "//nav[@class=\"currency_select\"]/descendant::div[contains(@class,\"selectize-dropdown-content\")]/div[@data-value=\"UAH\"]";
        this.xpathOpenCartButton = "//div[@id=\"shopping_cart_box\"]/div/div[@class=\"img_basket popup_cart\"]/*";
        this.xpathNavLaptops = "//div[@id=\"#all-categories\"]/descendant::a[text()=\"Ноутбуки\"]";
        this.xpathCloseCartButton = "//div[@id=\"modal_cart_popup\"]/descendant::button[@class=\"close\"]";
    }

    async clickLoginLink(){
        await this.driver.findElement(By.xpath(this.xpathLoginLink)).click();
        await this.driver.wait(until.elementLocated(By.xpath(this.xpathLoginForm)),2000);        
    }

    async isLoggedOut(){
        try{
            await this.driver.findElement(By.xpath(this.xpathLoginLink));
            return true;
        }catch(e){
            return false;
        }
    }

    async openApliancesMenu(){
        const apliancesLink = await  this.driver.wait(until.elementLocated(By.xpath(this.xpathNavApliances)),2000);
        apliancesLink.click();
        await this.driver.wait(until.urlContains('https://demo.solomono.net/uk/pobutova-tehnika'),2000);
    }

    async openLaptopSectionPage(){
        await this.driver.findElement(By.xpath(this.xpathNavLaptops)).click();
        await this.driver.wait(until.urlContains('https://demo.solomono.net/uk/noutbuki'),2000);
    }

    async changeLanguage(){
        await this.driver.findElement(By.xpath(this.xpathSelectLanguage)).click();
        const selectLanguage = await this.driver.wait(until.elementLocated(By.xpath(this.xpathUkrainianLanguage)),2000);
        selectLanguage.click();
        await this.driver.sleep(2000);
    }

    async changeCurrency(){
        await this.driver.findElement(By.xpath(this.xpathSelectCurrency)).click();
        const selectCurrency = await this.driver.wait(until.elementLocated(By.xpath(this.xpathUahCurrency)),2000);
        selectCurrency.click();
        await this.driver.sleep(2000);
    }

    async openCart(){
        await this.driver.findElement(By.xpath(this.xpathOpenCartButton)).click();
        await this.driver.wait(until.elementLocated(By.xpath(this.xpathCloseCartButton)),2000);
    }
}
