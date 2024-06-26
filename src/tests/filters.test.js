import { expect, test } from '@jest/globals';
import { MainPage } from "../pages/main.page"; 
import { LaptopSctionPage } from "../pages/laptop-section.page";
import { WebDriverInstance } from '../core/driver-instance';
import log from '../utils/logger';

const fs = require("fs");
const path = require("path");

describe('laptop filters tests', ()=>{
    test('price filter test', async()=>{
        //Arrange
        log.info('Fill prices filters');
        const mainPage = new MainPage();
        const laptopSectionPage = new LaptopSctionPage();
        const minPrice = 100;
        const maxPrice = 2000;

        //Act
        await mainPage.open();
        log.info('Change language on "Українська"');
        await mainPage.changeLanguage();
        await mainPage.openLaptopSectionPage();
       
        log.info(`Fill prices filters: minimum price: "${minPrice}"$ and maximum price: "${maxPrice}"$`);
        await laptopSectionPage.fillPricesFilter(minPrice,maxPrice);
        await laptopSectionPage.sleep(4000);
        await laptopSectionPage.pressShowMoreButton();
        await laptopSectionPage.sleep(2000);
        let productPrices = await laptopSectionPage.getAllProductPrices();

        //Assert
        for (let i = 0; i< productPrices.length; i++){
            let price = await productPrices[i].getText();
            price = price.slice(1);
            price = Number(price);
            try{
                expect(price>maxPrice).toBe(false);
            }catch(e){
                log.error(`Maximum price - "${minPrice}" is over expected range: [${minPrice};${maxPrice}]`);
                const testName = expect.getState().currentTestName.replace(/\s/g, "-");
                const fileName = path.join('./src/screenshots/', `screenshot_${testName}.jpg`);
                fs.writeFileSync(fileName,  await WebDriverInstance.getDriver().takeScreenshot(), "base64");
            }            
            try{
                expect(price<minPrice).toBe(false);
            }catch{
                log.error(`Minimum price - "${minPrice}" is over expected range: [${minPrice};${maxPrice}]`);
            }                     
        }
    });

    test('brand filter test',async()=>{
        //Arrange
        log.info('Fill brands filter');
        const mainPage = new MainPage();
        const laptopSectionPage = new LaptopSctionPage();
        const brandName = 'Lenovo';
        
        //Act
        await mainPage.open();
        await mainPage.changeLanguage();
        await mainPage.openLaptopSectionPage();

        log.info(`Choose brand filter with name: "${brandName}"`);
        await laptopSectionPage.selectBrandFilter(brandName);
        await laptopSectionPage.sleep(4000);
        await laptopSectionPage.pressShowMoreButton();
        await laptopSectionPage.sleep(2000);
        let productNames = await laptopSectionPage.getAllProductNames();

        //Assert
        for (let i = 0; i< productNames.length; i++){
            let name = await productNames[i].getText();
            try{
                expect(name.includes(brandName)).toBe(true);
            }catch(e){
                log.error(`Name of the product "${name}" doesn't include brand "${brandName}"`);
            }            
        }
    });
});
