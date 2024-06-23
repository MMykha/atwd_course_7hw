import { WebDriverInstance } from "../core/driver-instance";

export class BasePage{
    constructor() {
        this.driver = WebDriverInstance.getDriver();
    }

    async getDriver(){
        this.driver = WebDriverInstance.getDriver();
    }

    async open() {
        this.driver.get(this.baseUrl);
    }

    async getPageURL() {
        return await this.driver.getCurrentUrl();
    }

    async getPageTitle() {
        return await this.driver.getTitle();
    }

    async sleep(time) {
        await this.driver.sleep(time);
    }
}
