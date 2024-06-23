import {expect, test} from '@jest/globals';
import { MainPage } from "../pages/main.page"; 
import { LaptopSctionPage } from "../pages/laptop-section.page";

describe('laptop filters tests', ()=>{
    
    test('price filter test', async()=>{
        const mainPage = new MainPage();
        const laptopSectionPage = new LaptopSctionPage();
        const minPrice = 100;
        const maxPrice = 2000;

        //main page
        await mainPage.open();
        await mainPage.changeLanguage();
        await mainPage.openLaptopSectionPage();
       
        //laptop section page
        await laptopSectionPage.fillPricesFilter(minPrice,maxPrice);
        await laptopSectionPage.sleep(4000);
        await laptopSectionPage.pressShowMoreButton();
        await laptopSectionPage.sleep(2000);
        let productPrices = await laptopSectionPage.getAllProductPrices();
        for (let i = 0; i< productPrices.length; i++){
            let price = await productPrices[i].getText();
            price = price.slice(1);
            price = Number(price);
            expect(price>maxPrice).toBe(false);
            expect(price<minPrice).toBe(false);
        }
    });

    test('brand filter test',async()=>{
        const mainPage = new MainPage();
        const laptopSectionPage = new LaptopSctionPage();
        const brandName = 'Lenovo';
        
        //main page
        await mainPage.open();
        await mainPage.changeLanguage();
        await mainPage.openLaptopSectionPage();

        //laptop section page
        await laptopSectionPage.selectBrandFilter(brandName);
        await laptopSectionPage.sleep(4000);
        await laptopSectionPage.pressShowMoreButton();
        await laptopSectionPage.sleep(2000);
        let productNames = await laptopSectionPage.getAllProductNames();
        for (let i = 0; i< productNames.length; i++){
            let name = await productNames[i].getText();
            expect(name.includes(brandName)).toBe(true);
        }
    });
});
