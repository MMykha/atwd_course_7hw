import { By } from 'selenium-webdriver';
import { BasePage } from './base.page';

export class LaptopDetailsPage extends BasePage{
    constructor(){
        super();

        this.xpathProductPrice ='//span[@id="summ_price"]/span';
        this.xpathProductName='//h1[contains(@class,"category_heading")]';
        this.xpathProductDescription='//div[@class="short-description"]/p';
        this.xpathProductColor='//div[@id="info"]/label[contains(@class,"active")]/div[contains(@class,"attribute-description")]/div[1]';
        this.xpathCharDiagonal='//div[contains(@class,"simple_attribute")]/descendant::td[text()="Діагональ:"]/following-sibling::td';
        this.xpathCharScreenResolution='//div[contains(@class,"simple_attribute")]/descendant::td[text()="Роздільна здатність:"]/following-sibling::td';
        this.xpathCharProcessor='//div[contains(@class,"simple_attribute")]/descendant::td[text()="Процесор:"]/following-sibling::td';
    }

    async getProductName(){
        return await this.driver.findElement(By.xpath(this.xpathProductName)).getText();
    }

    async getProductPrice(){
        return await this.driver.findElement(By.xpath(this.xpathProductPrice)).getText();
    }

    async getProductColor(){
        return await this.driver.findElement(By.xpath(this.xpathProductColor)).getText();
    }

    async getProductCharDiagonal(){
        return await this.driver.findElement(By.xpath(this.xpathCharDiagonal)).getText();
    }

    async getProductCharScreenResolution(){
        return await this.driver.findElement(By.xpath(this.xpathCharScreenResolution)).getText();
    }

    async getCharProcessor(){
        return await this.driver.findElement(By.xpath(this.xpathCharProcessor)).getText();
    }

    async getProductDescription(){
        return await this.driver.findElement(By.xpath(this.xpathProductDescription)).getText();
    }
}
