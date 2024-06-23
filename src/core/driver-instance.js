export class WebDriverInstance{
    static driver = null;

    static setDriver(driverInstance){        
        this.driver = driverInstance;
    }

    static getDriver(){
        if (!this.driver){
            throw new Error('Driver is not initialized');
        }
        return this.driver;
    }
}
