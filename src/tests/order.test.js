import { Builder, By, until } from "selenium-webdriver";
import {expect} from '@jest/globals';
import { ErrorMessages } from "../enums/errorMessages";
import { MainPage } from "../pages/main.page";
import { LoginPage } from "../pages/login.page";
import { AppliancesSectionPage } from "../pages/apliances-section.page";
import { CheckoiutPage } from "../pages/checkout.page";
import { ProductDetailsPage } from "../pages/product-details.page";
import { ShoppingCartPage } from "../pages/shopping-cart.page";
import { LoginSteps } from "../steps/login.step";

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
        const password = "";
        
    });
});
