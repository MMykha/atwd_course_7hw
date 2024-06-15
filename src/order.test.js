import {Builder, Browser, By, until} from 'selenium-webdriver';
import {expect, test} from '@jest/globals';
import { Locator, LoginData,CheckoutData } from './locators.js';
jest.setTimeout(300000);

describe('order the product', ()=>{
    let driver;

    beforeAll(async()=>{
        driver = await new Builder().forBrowser(Browser.CHROME).build();
    });

    afterAll(async()=>{
        if(driver){
            await driver.quit();
        }
    });

    beforeEach(async()=>{
        await driver.get('https://demo.solomono.net');
    });

    test("buying a product script",async()=>{
        //login in
        await driver.findElement(By.xpath(Locator.xpathLoginLink)).click();
        await driver.sleep(2000);
        await driver.findElement(By.xpath(Locator.xpathLoginInput)).sendKeys(LoginData.email);
        await driver.findElement(By.xpath(Locator.xpathPasswordInput)).sendKeys(LoginData.password);
        await driver.findElement(By.xpath(Locator.xpathLoginButton)).click();

        let login = true;
        try{
            await driver.findElement(By.xpath(Locator.xpathLoginLink));
        }catch(e){
            login = false;
        }

        //delete products from the cart
        if(!login){
            await driver.findElement(By.xpath(Locator.xpathOpenCartButton)).click();
            await driver.sleep(2000);
            let cartCheck = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(Locator.xpathCloseCartButton))),3000);
            try{
                let productsInCart =  await cartCheck.findElements(By.xpath(Locator.xpathDeleteProductFromCartButton));
                for(let i = productsInCart.length-1; i >= 0; i--){
                    productsInCart[i].click();
                    await driver.sleep(2000);
                }
                await driver.sleep(2000);
                let productsInCartCheck = await cartCheck.findElements(By.xpath(Locator.xpathDeleteProductFromCartButton));
                expect(productsInCartCheck.length).toBe(0);
            }finally{
                await driver.findElement(By.xpath(Locator.xpathCloseCartButton)).click();
                await driver.sleep(2000);
            }       
        }
        
        //select language
        await driver.findElement(By.xpath(Locator.xpathSelectLanguage)).click();
        let selectLanguage = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(Locator.xpathUkrainianLanguage))),2000);
        selectLanguage.click();
        await driver.sleep(2000);

        //select currency
        await driver.findElement(By.xpath(Locator.xpathSelectCurrency)).click();
        let selectCurrency = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(Locator.xpathUahCurrency))),2000);
        selectCurrency.click();
        await driver.sleep(2000);

        //Apliances page
        let apliancesLink = await  driver.wait(until.elementIsVisible(driver.findElement(By.xpath(Locator.xpathNavApliances))),2000);
        apliancesLink.click();
        await driver.sleep(2000);
        expect(await driver.getCurrentUrl()).toBe('https://demo.solomono.net/uk/pobutova-tehnika/c-417.html');
        await driver.findElement(By.xpath(Locator.xpathMixerAritaLink)).click();
                
        //page of product MixerArita
        expect(await driver.getCurrentUrl()).toBe('https://demo.solomono.net/uk/mikser-arita/p-560.html');
        let productPrice = await driver.findElement(By.xpath(Locator.xpathProductPrice)).getText();
        expect(productPrice).toBe("8000 грн");
        let productQuantity = await driver.findElement(By.xpath(Locator.xpathProductQuantity));
        productQuantity.clear();
        productQuantity.sendKeys("2");
        await driver.findElement(By.xpath(Locator.xpathProductBuyButton)).click();
        await driver.sleep(2000);

        //cart
        let cart = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(Locator.xpathCart))),3000);
        let result =  await cart.findElements(By.xpath(Locator.xpathProductInCart));
        expect(result.length).toBe(1);

        let productPriceInCart = await driver.findElement(By.xpath(Locator.xpathProductPriceInCart)).getText();
        let productQualityInCart = await driver.findElement(By.xpath(Locator.xpathProductQuantityInCart)).getAttribute("value");
        let productSumInCart = await driver.findElement(By.xpath(Locator.xpathProductSumInCart)).getText();
        let productTotalPriceInCart = await driver.findElement(By.xpath(Locator.xpathTotalPriceInCart)).getText();

        expect(productPriceInCart).toBe('8000 грн');
        expect(productQualityInCart).toBe("2");
        expect(productSumInCart).toBe("16000 грн");
        expect(productTotalPriceInCart).toBe('16000 грн');
        await driver.findElement(By.xpath(Locator.xpathCheckoutButtonInCart)).click();

        //chekout page
        await driver.sleep(2000);
        expect(await driver.getCurrentUrl()).toBe('https://demo.solomono.net/uk/checkout.php');
        if(login){
            await driver.findElement(By.xpath(Locator.xpathCheckoutWithoutReqistrationCheckbox)).click();
            await driver.findElement(By.xpath(Locator.xpathCheckoutEmailInput)).sendKeys(CheckoutData.email);
        }        
        let name = await driver.findElement(By.xpath(Locator.xpathCheckoutNameInput));
        name.clear();
        name.sendKeys(CheckoutData.name);

        let surname = await driver.findElement(By.xpath(Locator.xpathCheckoutSurnameInput));
        surname.clear();
        surname.sendKeys(CheckoutData.surname);

        let phone = await driver.findElement(By.xpath(Locator.xpathCheckoutPhoneInput));
        phone.clear();
        phone.sendKeys(CheckoutData.phone);

        await driver.findElement(By.xpath(Locator.xpathCheckoutCountrySelect)).click();
        let checkoutCountrySelect = await driver.wait(until.elementIsVisible(driver.findElement(By.xpath(Locator.xpathCheckoutCountryUkraineSelect))),2000);
        checkoutCountrySelect.click();
        await driver.sleep(3000);

        let checkoutButton = await driver.wait(until.elementIsEnabled(driver.findElement(By.xpath(Locator.xpathCheckoutButton))),5000);
        checkoutButton.click();
        await driver.sleep(4000);

        //result of checkout
        expect(await driver.getTitle()).toBe('Ваше замовлення успішно оформлено!');
        expect(await driver.getCurrentUrl()).toContain('https://demo.solomono.net/uk/checkout_success.php?order_id=');
        expect(await driver.findElement(By.xpath(Locator.xpathTitleSuccess))).toBeTruthy();
        expect(await driver.findElement(By.xpath(Locator.xpathSuccessContinueButton))).toBeTruthy();

    }); 
});
