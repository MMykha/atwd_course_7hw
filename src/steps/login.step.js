import { BaseStep } from "./base.steps";

export class LoginSteps extends BaseStep{
    constructor(){
        super();       
    }

    async login(userEmail, userPassword){
        await this.loginPage.fillEmailInput(userEmail);
        await this.loginPage.fillPasswordInput(userPassword);
        await this.loginPage.pressLoginButton();
    }
}
