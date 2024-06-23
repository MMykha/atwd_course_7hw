import { BaseStep } from "./base.steps";

export class ChangePasswSteps extends BaseStep{
    constructor(){
        super();
    }

    async changePassw(userEmail){
        await this.loginPage.pressPasswForgetLink();
        await this.changePasswPage.fillEmailInput(userEmail);
        await this.changePasswPage.pressContinueButton();
    }
}
