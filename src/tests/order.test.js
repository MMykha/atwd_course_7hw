import { Builder, By, until } from "selenium-webdriver";
import {expect} from '@jest/globals';
import { ErrorMessages } from "../enums/errorMessages";
import { MainPage } from "../pages/main.page";
import { LoginPage } from "../pages/login.page";
import { AppliancesSectionPage } from "../pages/apliances-section.page";
import { CheckoutPage } from "../pages/checkout.page";
import { ProductDetailsPage } from "../pages/product-details.page";
import { ShoppingCartPage } from "../pages/shopping-cart.page";
import { LoginSteps } from "../steps/login.step";
import { ClearShoppingCartSteps } from "../steps/clear-shopping-cart.step";

jest.setTimeout(300000);

let driver;

describe('order the products test', ()=>{
    const baseUrl = 'https://demo.solomono.net';

    beforeEach(async()=>{
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.manage().setTimeouts()({implicit: 300000});
    });

    afterEach(async()=>{
        if(driver){
            await driver.quit();
        }
    });

    test ('orderProduct', async ()=>{
        const email = 'mikhailenkomasha0@gmail.com';
        const password = "4ODQk";
        const name="";
        const surname = "";
        const phone ="";
        
        await driver.get(baseUrl);

        const mainPage = new MainPage(driver);
        const loginSteps = new LoginSteps(driver);
        const appliancePage = new AppliancesSectionPage(driver);
        const productDetailsPage = new ProductDetailsPage(driver);
        const shoppingCartPage = new ShoppingCartPage(driver);
        const checkoutPage = new CheckoutPage(driver);
        const clearCartSteps = new ClearShoppingCartSteps(driver);

        //login in
        await mainPage.clickLoginLink();
        await loginSteps.login(email, password);
        let login = MainPage.isLoggedOut(); 

        //clear the cart
        if(!login){
            let products = await clearCartSteps.removeAllProducts();
            expect(products).toBe(0);
        } 

        //select language and currency
        await mainPage.changeLanguage();
        await mainPage.changeCurrency();

        //appliance page
        await mainPage.openApliancesMenu();
        await appliancePage.openProductDetails();
        
        //page of product MixerArita
        let productPrice = await productDetailsPage.getPrice();
        expect(productPrice).toBe("8000 грн");
        await productDetailsPage.setQuantity('2');
        await productDetailsPage.buyProduct();

        //cart
        let productsInCart = await shoppingCartPage.getNumberProductsInCart();
        expect(productsInCart).toBe(1);
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
        if(login){
            await checkoutPage.chooseWithoutRegistrationCase();
            await checkoutPage.fillEmailInput(email);
        }
        await checkoutPage.fillNameInput(name);
        await checkoutPage.fillSurnameInput(surname);
        await checkoutPage.fillPhoneInput(phone);
        await checkoutPage.chooseCountryUkraine();
        await driver.sleep(3000);
        await checkoutPage.pressCheckoiuButton();
        
        //result of checkout
        expect(await driver.getTitle()).toBe('Ваше замовлення успішно оформлено!');
        expect(await driver.getCurrentUrl()).toContain('https://demo.solomono.net/uk/checkout_success.php?order_id=');
        expect(await driver.findElement(By.xpath(Locator.xpathTitleSuccess))).toBeTruthy();
        expect(await driver.findElement(By.xpath(Locator.xpathSuccessContinueButton))).toBeTruthy();
    });
});
