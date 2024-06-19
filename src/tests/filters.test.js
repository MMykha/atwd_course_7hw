
//вводити ціну 100-2000
//ентер
//знайти помилку
//тест має зламатися
//масив  цін усіх продуктів
// і значення не менше 100 і не більше 2000

//laptop-section
//ввести  мінімальну 
//ввести максимальну ціну
// попрацювати з брендами
//в enum можна винести значенння фільтра

import { Builder } from "selenium-webdriver";
import { MainPage } from "../pages/main.page"; 
import { LaptopSctionPage } from "../pages/laptop-section.page";

jest.setTimeout(300000);

let driver;

describe('laptop filters tests', ()=>{
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

    test('price filter test'), async()=>{
        const mainPage = new MainPage(driver);
        const laptopSectionPage = new LaptopSctionPage(driver);
        const minPrice = 100;
        const maxPrice = 40000;

        await driver.get(baseUrl);

        //main page
        await mainPage.changeLanguage();
        await mainPage.changeCurrency();
        await mainPage.openLaptopSectionPage();
       
        //laptop section page
        await laptopSectionPage.fillPricesFilter(minPrice,maxPrice);
        await laptopSectionPage.pressShowMoreButton();
        let productPrices = laptopSectionPage.getAllProductPrices();
        productPrices.forEach((elem)=>{
            expect(elem>maxPrice).toBeFalsy();
            expect(elem<minPrice).toBeFalsy();
        });
    };

    test('brand filter test'),async()=>{
        const mainPage = new MainPage(driver);
        const laptopSectionPage = new LaptopSctionPage(driver);
        const brandName = 'Lenovo';

        await driver.get(baseUrl);
        
        //main page
        await mainPage.changeLanguage();
        await mainPage.changeCurrency();
        await mainPage.openLaptopSectionPage();

        //laptop section page
        await laptopSectionPage.selectBrandFilter(brandName);
        let productNames = await laptopSectionPage.getAllProductNames();
        productNames.forEach((elem)=>{
            expect(elem.includes(brandName)).toBeTruthy();
        });
    };
});
