import { ChangePasswPage } from "../pages/change-password.page";
import { LoginPage } from "../pages/login.page";

export class ChangePasswSteps{
    constructor(driver){
        this.LoginPage = new LoginPage(driver);
        this.ChangePasswPage = new ChangePasswPage(driver);
    }

    async changePassw(userEmail){
        await this.LoginPage.pressPasswForgetLink();
        await this.ChangePasswPage.fillEmailInput(userEmail);
        await this.ChangePasswPage.pressContinueButton();
    }
}