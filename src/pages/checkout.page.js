import {By, until} from 'selenium-webdriver';

export class CheckoutPage{
    constructor(driver){
        this.driver=driver;
        this.xpathCheckoutNameInput = "//div[@id=\"shippingAddress\"]/descendant::input[@name=\"shipping_firstname\"]"
        this.xpathCheckoutSurnameInput = "//div[@id=\"shippingAddress\"]/descendant::input[@name=\"shipping_lastname\"]";
        this.xpathCheckoutEmailInput = "//div[@id=\"shippingAddress\"]/descendant::input[@name=\"billing_email_address\"]";
        this.xpathCheckoutPhoneInput = "//div[@id=\"shippingAddress\"]/descendant::input[@name=\"billing_telephone\"]";
        this.xpathCheckoutCountrySelect = "//div[@id=\"shippingAddress\"]/descendant::span[text()=\"Країна:\"]/following-sibling::div/div[contains(@class,\"selectize-input items \")]";
        this.xpathCheckoutCountryUkraineSelect = "//div[@id=\"shippingAddress\"]/descendant::div[contains(@class,\"selectize-dropdown-content\")]/div[text()=\"Ukraine\"]";
        this.xpathCheckoutWithoutReqistrationCheckbox = "//input[@id=\"registration-off\"]/following-sibling::label";
        this.xpathCheckoutButton = "//span[@id=\"checkoutButton\"]";
    }

    async getEmailInput(){
        try{
            await this.driver.findElement(By.xpath(this.xpathCheckoutEmailInput)).isDisplayed();
            return true;
        }catch(e){
            return false;
        }        
    }

    async chooseWithoutRegistrationCase(){
        await this.driver.findElement(By.xpath(this.xpathCheckoutWithoutReqistrationCheckbox)).click();
    }

    async fillEmailInput(email){
        await this.driver.findElement(By.xpath(this.xpathCheckoutEmailInput)).sendKeys(CheckoutData.email);
    }

    async fillNameInput(name){
        const nameInput = await this.driver.findElement(By.xpath(this.xpathCheckoutNameInput));
        nameInput.clear();
        nameInput.sendKeys(name);
    }

    async fillSurnameInput(surname){
        let surnameInput = await this.driver.findElement(By.xpath(this.xpathCheckoutSurnameInput));
        surnameInput.clear();
        surnameInput.sendKeys(surname);
    }

    async fillPhoneInput(phone){
        let phoneInput = await this.driver.findElement(By.xpath(this.xpathCheckoutPhoneInput));
        phoneInput.clear();
        phoneInput.sendKeys(phone);
    }

    async chooseCountryUkraine(){
        await this.driver.findElement(By.xpath(this.xpathCheckoutCountrySelect)).click();
        const checkoutCountrySelect = await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.xpath(this.xpathCheckoutCountryUkraineSelect))),2000);
        checkoutCountrySelect.click();
    }

    async pressCheckoiuButton(){
        const checkoutButton = await this.driver.wait(until.elementIsEnabled(this.driver.findElement(By.xpath(this.xpathCheckoutButton))),5000);
        checkoutButton.click();
        await this.driver.wait(until.urlContains('https://demo.solomono.net/uk/checkout_success.php?order_id='),4000);
    }
}
