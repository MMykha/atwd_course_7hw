import { BaseStep } from "./base.steps";

export class ClearShoppingCartSteps extends BaseStep{
    constructor(){
        super();
    }

    async removeAllProducts(){
        await this.mainPage.openCart();
        let number = await this.shoppingCartPage.getNumberProductsInCart();
        if(number>0){
            await this.shoppingCartPage.clearCart();
        }        
        await this.shoppingCartPage.closeCart();
    }

    async checkNumberProductsInCart(){
        await this.mainPage.openCart();
        let number = await this.shoppingCartPage.getNumberProductsInCart();
        await this.shoppingCartPage.closeCart();
        return number;
    }
}
