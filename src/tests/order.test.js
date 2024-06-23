import { expect } from '@jest/globals';
import { MainPage } from "../pages/main.page";
import { AppliancesSectionPage } from "../pages/apliances-section.page";
import { CheckoutPage } from "../pages/checkout.page";
import { ProductDetailsPage } from "../pages/product-details.page";
import { ShoppingCartPage } from "../pages/shopping-cart.page";
import { LoginSteps } from "../steps/login.step";
import { ClearShoppingCartSteps } from "../steps/clear-shopping-cart.step";
import { CheckoutResultPage } from "../pages/checkout-result.page";

describe('order the products test', ()=>{

    test ('orderProduct', async ()=>{
        const email = 'mikhailenkomasha0@gmail.com';
        const password = "V2iRZ";
        const name = "Марія";
        const surname = "Михайленко";
        const phone ="38097";
        
        const mainPage = new MainPage();
        const loginSteps = new LoginSteps();
        const appliancePage = new AppliancesSectionPage();
        const productDetailsPage = new ProductDetailsPage();
        const shoppingCartPage = new ShoppingCartPage();
        const checkoutPage = new CheckoutPage();
        const clearCartSteps = new ClearShoppingCartSteps();
        const checkoutResultPage = new CheckoutResultPage();

        //login in
        await mainPage.open();
        await mainPage.clickLoginLink();
        await loginSteps.login(email, password);
        await mainPage.sleep(1000);
        await clearCartSteps.removeAllProducts();
        
        //select language and currency
        await mainPage.changeLanguage();
        await mainPage.changeCurrency();

        //appliance page
        await mainPage.openApliancesMenu();
        await appliancePage.openProductDetails("Міксер ARITA");
        
        //page of product MixerArita
        let productPrice = await productDetailsPage.getPrice();
        expect(productPrice).toBe("8000 грн");
        await productDetailsPage.setQuantity('2');
        await productDetailsPage.buyProduct();

        //cart
        let productsInCart = await shoppingCartPage.getNumberProductsInCart();
        expect(productsInCart).toBe(1);
        await shoppingCartPage.sleep(1000);

        let productPriceInCart = await shoppingCartPage.getkMixerPrice();
        let productQualityInCart = await shoppingCartPage.checkQuantityOfMixer();
        let productSumInCart = await shoppingCartPage.cgetSumMixers();
        let productTotalPriceInCart = await shoppingCartPage.getTotalPrice();
        
        expect(productPriceInCart).toBe('8000 грн');
        expect(productQualityInCart).toBe("2");
        expect(productSumInCart).toBe("16000 грн");
        expect(productTotalPriceInCart).toBe('16000 грн');

        await shoppingCartPage.pressCheckoutButton();

        //checkout page
        let inputEmail = await checkoutPage.getEmailInput();
        if(inputEmail){
            await checkoutPage.chooseWithoutRegistrationCase();
            await checkoutPage.fillEmailInput(email);
        }   
        
        await checkoutPage.fillNameInput(name);
        await checkoutPage.sleep(1000);

        await checkoutPage.fillSurnameInput(surname);
        await checkoutPage.sleep(1000);

        await checkoutPage.fillPhoneInput(phone);
        await checkoutPage.sleep(1000);

        await checkoutPage.chooseCountryUkraine();
        await checkoutPage.sleep(3000);
        await checkoutPage.pressCheckoiuButton();
        
        //result of checkout
        expect(await checkoutResultPage.getPageTitle()).toBe('Ваше замовлення успішно оформлено!');
        expect(await checkoutResultPage.getPageURL()).toContain('https://demo.solomono.net/uk/checkout_success.php?order_id=');
        expect(await checkoutResultPage.isSuccessContinueButtonDisplayed()).toBe(true);
        expect(await checkoutResultPage.isTitleSuccesDisplayed()).toBe(true);
    });
});
