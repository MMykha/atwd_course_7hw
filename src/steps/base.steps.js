import { LoginPage } from "../pages/login.page";
import { MainPage } from "../pages/main.page";
import { AppliancesSectionPage } from "../pages/apliances-section.page";
import { ChangePasswPage } from "../pages/change-password.page";
import { CheckoutPage } from "../pages/checkout.page";
import { CheckoutResultPage } from "../pages/checkout-result.page";
import { LaptopSctionPage } from "../pages/laptop-section.page";
import { ProductDetailsPage } from "../pages/product-details.page";
import { ShoppingCartPage } from "../pages/shopping-cart.page";
import { LaptopDetailsPage } from "../pages/laptop-details.page";

export class BaseStep {
    constructor(){
        this.mainPage = new MainPage();
        this.loginPage = new LoginPage();
        this.appliancesSectionPage = new AppliancesSectionPage();
        this.changePasswPage = new ChangePasswPage();
        this.checkoutPage = new CheckoutPage();
        this.checkoutResultPage = new CheckoutResultPage();
        this.laptopSectionPage = new LaptopSctionPage();
        this.productDetailsPage = new ProductDetailsPage();
        this.shoppingCartPage = new ShoppingCartPage();
        this.laptopDetailsPage = new LaptopDetailsPage();
    }

    async commonStep(){
        console.log("Not implemented");
    }
}

