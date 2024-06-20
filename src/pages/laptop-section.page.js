import {By, until} from 'selenium-webdriver'

export class LaptopSctionPage{
    constructor(driver){
        this.driver = driver;
        this.xpathPriceRangeInput1 = '//input[@id="range1"]';
        this.xpathPriceRangeInput2 ='//input[@id="range2"]';
        this.xpathPricesProduct ='//div[@id="r_spisok"]/descendant::span[@class="new_price"]';
        this.xpathBrandCheckbox = '//div[@id="ajax_search_brands"]/descendant::div[@class="item"]/label';
        this.xpathProductNames ='//div[@id="r_spisok"]/descendant::a[@class="model_product"]';
        this.xpathMoreButton = '//button[@id="loadMoreProducts"]';
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
        const elements = this.driver.findElements(By.xpath(this.xpathPricesProduct)).then((el)=>{
            
        });
        return elements[0].getText();;
        /*.then((res) => {
            console.log(res);
            res.forEach(element => {
                element = element.getText();
            });
            console.log(res);
            return res;
        });*/
    }

    //select brend
    async selectBrandFilter(brandName){
        await this.driver.findElement(By.xpath(this.xpathBrandCheckbox+`[text()='${brandName}']`)).click();
    }

    //get array of all product names on the page
    async getAllProductNames(){
        let result = this.driver.findElements(By.xpath(this.xpathProductNames)).then((res) => {
            res.forEach(element => {
                element = element.getText();
                console.log(element);
            });
            return res;
        });
        return result;
    }

    //get number of showen products in order to chossen filter
    async getSupposedNumberFilteredProduct(brandName){
        return await this.driver.findElement(By.xpath(`//div[@id="ajax_search_brands"]/descendant::div[@class="item"]/label[text()="${brandName}"]/*[@class="qty"]`)).getText();
        //return await this.driver.findElement(By.xpath(`//div[@id="ajax_search_brands"]/descendant::div[@class="item"]/label[text()="${brandName}"]/*[@class="qty"]`)).getAttribute('innerText');
    }

    // show all existed products
    async pressShowMoreButton(){
        try{
            while(await this.driver.findElement(By.xpath(this.xpathMoreButton))){
                await this.driver.findElement(By.xpath(this.xpathMoreButton)).click();
            }
        }catch(e){
            console.log(e);
        }
    }
}
