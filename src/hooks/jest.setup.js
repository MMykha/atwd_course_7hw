import {beforeEach} from '@jest/globals';
import {WebDriverFactory} from '../core/factory';
import {WebDriverInstance} from '../core/driver-instance';


beforeEach(async () =>{
    const driver = await new WebDriverFactory().getDriver("chrome");
    await driver.manage().setTimeouts({script: 30000});
    await driver.manage().window().maximize();

    WebDriverInstance.setDriver(driver);
});

afterEach(async ()=>{
    await WebDriverInstance.getDriver().quit();
});
