import {By} from 'selenium-webdriver';

export class CheckoutResultPage{
    constructor(driver){
        this.driver = driver;
        this.xpathTitleSuccess ="//div[contains(@class,\"size1of2\")]/h1[text()=\"Ваше замовлення успішно оформлено!\"]";
        this.xpathSuccessContinueButton="//div[contains(@class,\"size1of2\")]/descendant::input[contains(@class,\"btn bold\")]";
    }

    async isTitleSuccesDisplayed(){
        return await this.driver.findElement(By.xpath(this.xpathTitleSuccess)).isDisplayed();
    }

    async isSuccessContinueButtonDisplayed(){
        return await this.driver.findElement(By.xpath(this.xpathSuccessContinueButton)).isDisplayed();
    }
}