import { By, until } from 'selenium-webdriver';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage{
    constructor(){
        super();
        
        this.xpathProductPrice = "//span[@id=\"summ_price\"]/span";
        this.xpathProductQuantity = "//span[@class=\"quantity-selector-mask\"]/input";
        this.xpathProductBuyButton = "//div[@id=\"r_buy_intovar\"]/button";
        this.xpathCart = "//div[@id=\"cartContent-page\"]";
    }

    async getPrice(){
        const productPrice = await this.driver.findElement(By.xpath(this.xpathProductPrice)).getText();
        return productPrice;
    }

    async setQuantity(quantity){
        const productQuantity = await this.driver.findElement(By.xpath(this.xpathProductQuantity));
        productQuantity.clear();
        productQuantity.sendKeys(quantity);
    }

    async buyProduct(){
        await this.driver.findElement(By.xpath(this.xpathProductBuyButton)).click();
        await this.driver.wait(until.elementLocated(By.xpath(this.xpathCart)),5000);
    }
}
