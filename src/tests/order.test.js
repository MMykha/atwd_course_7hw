import { expect } from '@jest/globals';
import { MainPage } from "../pages/main.page";
import { AppliancesSectionPage } from "../pages/apliances-section.page";
import { CheckoutPage } from "../pages/checkout.page";
import { ProductDetailsPage } from "../pages/product-details.page";
import { ShoppingCartPage } from "../pages/shopping-cart.page";
import { LoginSteps } from "../steps/login.step";
import { ClearShoppingCartSteps } from "../steps/clear-shopping-cart.step";
import { CheckoutResultPage } from "../pages/checkout-result.page";
import log from '../utils/logger';

describe('order the products test', ()=>{

    test ('orderProduct', async ()=>{
        //Arrange
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

        //Act
        log.info('Login as registered user');
        await mainPage.open();
        await mainPage.clickLoginLink();

        log.info(`Login as "${email}" with password: "${password}"`);
        await loginSteps.login(email, password);
        await mainPage.sleep(1000);

        log.info(`Check the cart and remove all products from it`);
        await clearCartSteps.removeAllProducts();

        log.info('Change the language on "Українська"');
        await mainPage.changeLanguage();
        log.info('Change the currency on "UAN"')
        await mainPage.changeCurrency();

        log.info('Add 2 number of product to cart');
        await mainPage.openApliancesMenu();
        await appliancePage.openProductDetails("Міксер ARITA");
        
        let productPrice = await productDetailsPage.getPrice();
        expect(productPrice).toBe("8000 грн");
        await productDetailsPage.setQuantity('2');
        await productDetailsPage.buyProduct();

        log.info('Check added products at the cart');
        let productsInCart = await shoppingCartPage.getNumberProductsInCart();
        expect(productsInCart).toBe(1);
        await shoppingCartPage.sleep(1000);

        let productPriceInCart = await shoppingCartPage.getkMixerPrice();
        let productQualityInCart = await shoppingCartPage.checkQuantityOfMixer();
        let productSumInCart = await shoppingCartPage.cgetSumMixers();
        let productTotalPriceInCart = await shoppingCartPage.getTotalPrice();
        
        //Assert
        expect(productPriceInCart).toBe('8000 грн');
        expect(productQualityInCart).toBe("2");
        expect(productSumInCart).toBe("16000 грн");
        expect(productTotalPriceInCart).toBe('16000 грн');

        //Act
        log.info("Check out the products");
        await shoppingCartPage.pressCheckoutButton();

        let inputEmail = await checkoutPage.getEmailInput();
        if(inputEmail){
            log.info(`Order products as unregistered user with data:\n
                 email: "${email}"\n
                 name: "${name}"\n
                 surname: "${surname}"\n
                 phone: "${phone}"\n
                 country: "Ukraine"`);
            await checkoutPage.chooseWithoutRegistrationCase();
            await checkoutPage.fillEmailInput(email);
        }else{
            log.info(`Order products as unregistered user with data:\n
                name: "${name}"\n
                surname: "${surname}"\n
                phone: "${phone}"\n
                country: "Ukraine"`);
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
        
        //Assert
        expect(await checkoutResultPage.getPageTitle()).toBe('Ваше замовлення успішно оформлено!');
        expect(await checkoutResultPage.getPageURL()).toContain('https://demo.solomono.net/uk/checkout_success.php?order_id=');
        expect(await checkoutResultPage.isSuccessContinueButtonDisplayed()).toBe(true);
        expect(await checkoutResultPage.isTitleSuccesDisplayed()).toBe(true);
    });
});
