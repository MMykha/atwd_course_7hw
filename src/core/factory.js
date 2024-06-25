import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { Options as FirefoxOptions } from "selenium-webdriver/firefox";
import { Options as EdgeOptions } from "selenium-webdriver/edge";
import { Builder } from "selenium-webdriver";

export class WebDriverFactory{

    async getDriver(browser){
        let driver;
        switch (browser){
            case "chrome":
                return await this.getChromeDriver();
            case "firefox":
                return await this.getFirefoxDriver();
            case "edge":
                return await this.getEdgeDiver();
            default:
                console.log(`Browser "${browser}" is not available`);
                return driver = await this.getChromeDriver();
        }
    }

    async getChromeDriver() {
        let options = new ChromeOptions();
        const driver = await new Builder()
            .setChromeOptions(options)
            .forBrowser("chrome")
            .build();        
        return driver;
    }

    async getFirefoxDriver() {
        let options = new FirefoxOptions();
        const driver = await new Builder()
            .setChromeOptions(options)
            .forBrowser("firefox")
            .build();        
        return driver;
    }

    async getEdgeDiver() {
        let options = new EdgeOptions();
        const driver = await new Builder()
            .setChromeOptions(options)
            .forBrowser("edge")
            .build();        
        return driver;
    }
}
