import { MainPage } from "../pages/main.page";
import { ShoppingCartPage } from "../pages/shopping-cart.page";

export class ClearShoppingCartSteps{
    constructor(driver){
        this.shoppingCartPage=new ShoppingCartPage(driver);
        this.mainPage = new MainPage(driver);
    }

    async removeAllProducts(){
        await this.mainPage.openCart();
        await this.shoppingCartPage.clearCart();
        let number = await this.shoppingCartPage.getNumberProductsInCart();
        await this.shoppingCartPage.clearCart();
        return number;
    }

    async checkNumberProductsInCart(){
        await this.mainPage.openCart();
        let number = await this.shoppingCartPage.getNumberProductsInCart();
        await this.shoppingCartPage.clearCart();
        return number;
    }
}
