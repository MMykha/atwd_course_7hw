import {By, until} from 'selenium-webdriver';

export class ProductDetailsPage{
    constructor(driver){
        this.driver = driver;
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
        await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.xpath(this.xpathCart))),3000);
    }
}
