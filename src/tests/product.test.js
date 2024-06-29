import { expect, test } from '@jest/globals';
import { MainPage } from "../pages/main.page"; 
import { LaptopSctionPage } from "../pages/laptop-section.page";
import { LaptopDetailsPage } from '../pages/laptop-details.page';
import log from '../utils/logger';
import readJsonFile from "../utils/jsonFile.Reader";

describe('product characteristics tests', ()=>{
    test('laptop characteristics test',async()=>{
        //Arrange
        log.info('Check product characteristics');
        const mainPage = new MainPage();
        const laptopSectionPage = new LaptopSctionPage();
        const laptopDetailsPage = new LaptopDetailsPage();

        const credentials = await readJsonFile('src/testdata/ProductTestData.json');
        log.debug(`Product name: "${credentials.product_name}",\n
                   product price: "${credentials.product_price}",\n
                   product color: "${credentials.product_color}",\n
                   product diagonal: "${credentials.product_characteristic_diagonal}",\n
                   product screen resolution: "${credentials.product_characteristic_screen_resolution}",\n
                   product processor: "${credentials.product_characteristic_processor}",\n
                   product description: "${credentials.product_description}"`);

        //Act
        await mainPage.open();
        log.info('Change language on "Українська"');
        await mainPage.changeLanguage();
        await mainPage.sleep(2000);
        await mainPage.openLaptopSectionPage();
        await laptopSectionPage.openLaptopDetails("Apple MacBook Air");
        
        //Assert               
        expect(await laptopDetailsPage.getProductName()).toBe(credentials.product_name);
        expect(await laptopDetailsPage.getProductPrice()).toBe(credentials.product_price);
        expect(await laptopDetailsPage.getProductColor()).toBe(credentials.product_color);
        expect(await laptopDetailsPage.getProductCharDiagonal()).toBe(credentials.product_characteristic_diagonal);
        expect(await laptopDetailsPage.getProductCharScreenResolution()).toBe(credentials.product_characteristic_screen_resolution);
        expect(await laptopDetailsPage.getCharProcessor()).toBe(credentials.product_characteristic_processor);
        expect(await laptopDetailsPage.getProductDescription()).toBe(credentials.product_description);
    });
});
