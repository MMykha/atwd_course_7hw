import { By, until } from 'selenium-webdriver';
import { BasePage } from './base.page';

export class LaptopSctionPage extends BasePage{
    constructor(){
        super();
        
        this.xpathPriceRangeInput1 = '//input[@id="range1"]';
        this.xpathPriceRangeInput2 ='//input[@id="range2"]';
        this.xpathPricesProduct ='//div[@id="r_spisok"]/descendant::span[@class="new_price"]';
        this.xpathBrandCheckbox = '//div[@id="ajax_search_brands"]/descendant::div[@class="item"]/label';
        this.xpathProductNames ='//div[@id="r_spisok"]/descendant::a[@class="model_product"]';
        this.xpathMoreButton = '//button[@id="loadMoreProducts"]';
        this.xpathPagesLinks = '//button[@id="loadMoreProducts"]/following-sibling::div/descendant::a[contains(@title,"Сторінка")][last()]';
        this.xpathShowAllBrandFiltersButton ='//div[@id="sidebar-left"]/descendant::button[contains(@class, "btn-filter-group-brands")][text()="Показати всі"]';
    }

    //open laptop product
    async openLaptopDetails(productName){
        await this.driver.findElement(By.xpath(`//div[@id=\"r_spisok\"]/descendant::a[text()=\"${productName}\"]`)).click();
        await this.driver.wait(until.urlContains('https://demo.solomono.net/uk/apple-macbook-air/p-543.html'));
    }

    //input price range
    async fillPricesFilter(price1,price2){
        const checkBoxPrice1 = await this.driver.findElement(By.xpath(this.xpathPriceRangeInput1));
        checkBoxPrice1.clear();
        checkBoxPrice1.sendKeys(price1);
        const checkBoxPrice2 =await this.driver.findElement(By.xpath(this.xpathPriceRangeInput2));
        checkBoxPrice2.clear();
        checkBoxPrice2.sendKeys(price2);
        await this.driver.wait(until.urlContains('rmax='+price2),2000);
    }

    //get minimum filter price
    async getMinFilterPrice(){
        return await this.driver.findElement(By.xpath(this.xpathPriceRangeInput1)).getAttribute('value');
    }

    //get maximum filter price
    async getMaxFilterPrice(){
        return await this.driver.findElement(By.xpath(this.xpathPriceRangeInput2)).getAttribute('value');
    }

    //get array of all product price on the page
    async getAllProductPrices(){
        return await this.driver.findElements(By.xpath(this.xpathPricesProduct));
    }

    //select brend
    async selectBrandFilter(brandName){
        await this.driver.findElement(By.xpath(this.xpathShowAllBrandFiltersButton)).click();
        await this.driver.sleep(2000);
        await this.driver.findElement(By.xpath(this.xpathBrandCheckbox+`[text()='${brandName}']`)).click();
    }

    //get array of all product names on the page
    async getAllProductNames(){
        return await this.driver.findElements(By.xpath(this.xpathProductNames));
    }

    //get number of showen products in order to chossen filter
    async getSupposedNumberFilteredProduct(brandName){
        return await this.driver.findElement(By.xpath(`//div[@id="ajax_search_brands"]/descendant::div[@class="item"]/label[text()="${brandName}"]/*[@class="qty"]`)).getText();
    }

    // show all existed products
    async pressShowMoreButton(){
        try{
            let n = await this.driver.findElement(By.xpath(this.xpathPagesLinks)).getText();
            n = Number(n);
            for(let i = 0; i < n-1; i++){
                await this.driver.findElement(By.xpath(this.xpathMoreButton)).click();
            }
        }catch(e){
            console.log(e);
        }        
    }
}
