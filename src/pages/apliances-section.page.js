import {By, until} from 'selenium-webdriver';

export class AppliancesSectionPage{
    constructor(driver){
        this.driver = driver;
    }
    
    async openProductDetails(productName){
        await this.driver.findElement(By.xpath(`//div[@id=\"r_spisok\"]/descendant::a[text()=\"${productName}\"]`)).click();
        await this.driver.wait(until.urlContains('https://demo.solomono.net/uk/mikser-arita/p-560.html'));
    }
}
