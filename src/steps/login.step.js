import { LoginPage } from "../pages/login.page";

export class LoginSteps{
    constructor(driver){
        this.loginPage = new LoginPage(driver);
        
    }

    async login(userEmail, userPassword){
        await this.loginPage.fillEmailInput(userEmail);
        await this.loginPage.fillPasswordInput(userPassword);
        await this.loginPage.pressLoginButton();
    }
}
