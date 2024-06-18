import {By, until} from 'selenium-webdriver';

export class ShoppingCartPage {
    constructor(driver){
        this.driver = driver;
        this.xpathCart = "//div[@id=\"cartContent-page\"]";
        this.xpathProductInCart = "//div[@id=\"cartContent-page\"]/div[contains(@class, \"cartContent_body\")]";
        this.xpathProductPriceInCart = "//div[@id=\"cartContent-page\"]/descendant::div[contains(@class,\"col-xs-3 product_price\") and text()=\"8000 грн\"]";
        this.xpathProductQuantityInCart = "//div[@id=\"cartContent-page\"]/descendant::div[@class=\"col-xs-3 product_price\" and text()=\"8000 грн\"]/following-sibling::div[@class=\"col-xs-4 product_qty\"]/descendant::input[@class=\"form-control inputnumber\"]";
        this.xpathProductSumInCart = "//div[@id=\"cartContent-page\"]/descendant::div[@class=\"col-xs-3 product_price\" and text()=\"8000 грн\"]/following-sibling::div[@class=\"col-xs-3 product_total\"]";
        this.xpathTotalPriceInCart = "//div[@id=\"cart_order_total\"]/b";
        this.xpathCheckoutButtonInCart = "//a[@id=\"checkoutButton\"]";
        this.xpathCloseCartButton = "//div[@id=\"modal_cart_popup\"]/descendant::button[@class=\"close\"]";
        this.xpathDeleteProductFromCartButton = "//div[@id=\"cartContent-page\"]/descendant::div[@class=\"col-xs-2 product_delete\"]/button";
    }

    async getCart(){
        return this.driver.findElement(By.xpath(this.xpathCart));
    }

    async isCartIsEmpty(){
        return await this.driver.findElements(By.xpath(this.xpathDeleteProductFromCartButton));
    }

    async getNumberProductsInCart(){
        const cart = this.getCart();
        const result =  await cart.findElements(By.xpath(this.xpathProductInCart));
        return result.length;
    }

    async getkMixerPrice(){
        return await this.driver.findElement(By.xpath(this.xpathProductPriceInCart)).getText();
    }

    async checkQuantityOfMixer(){
        return await this.driver.findElement(By.xpath(this.xpathProductQuantityInCart)).getAttribute("value");
    }

    async cgetSumMixers(){
        return await this.driver.findElement(By.xpath(this.xpathProductSumInCart)).getText();
    }

    async getTotalPrice(){
        return await this.driver.findElement(By.xpath(this.xpathTotalPriceInCart)).getText();
    }

    async pressCheckoutButton(){
        await this.driver.findElement(By.xpath(this.xpathCheckoutButtonInCart)).click();
        await this.driver.wait(until.urlContains('https://demo.solomono.net/uk/checkout.php'), 2000);
    }

    async clearCart(){
        let cartCheck = await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.xpath(this.xpathCloseCartButton))),3000);
        let productsInCart =  await cartCheck.findElements(By.xpath(this.xpathDeleteProductFromCartButton));
                for(let i = productsInCart.length-1; i >= 0; i--){
                    productsInCart[i].click();
                    await this.driver.sleep(2000);
                }       
    }

    async closeCart(){
        await this.driver.findElement(By.xpath(this.xpathCloseCartButton)).click();
    }
}
