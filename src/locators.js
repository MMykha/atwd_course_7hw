
export const Locator = {
    xpathForgetPasswordLink: "//form[@class='form_enter']/a[@class='forget_password']",
    xpathLoginLink : "//div[@id='kabinet']/div/div/a[@class='enter_link']",
    xpathLoginForm :'//form[contains(@class,"form_enter")]',
    xpathLoginInput :"//form[@class=\"form_enter\"and@name=\"login\"]/input[@class=\"form-control name_enter\"and@type=\"email\"]",
    xpathPasswordInput:"//form[@class=\"form_enter\"and@name=\"login\"]/input[@class=\"form-control password_enter\"and@type=\"password\"]",
    xpathLoginButton :"//form[@class=\"form_enter\"and@name=\"login\"]/button[@class=\"submit_enter\"and@type=\"submit\"]",
    xpathRegisterLink : "//form[@class=\"form_enter\" and @name='login']/following-sibling::a[@class=\"registration\"]",

    xpathPaswFogottenForm :"//form[@name=\"password_forgotten\"]",
    xpathPaswFogottenInputEmail :"//input[@id=\"inputEmail_address\"]",
    xpathPaswFogottenBackButton :"//form[@name=\"password_forgotten\"]/descendant::a[contains(@class,\"btn btn-primary\")]",
    xpathPaswFogottenContinueButton :"//form[@name=\"password_forgotten\"]/descendant::button[contains(@class,\"btn btn-primary\")]",
    
    xpathSelectLanguage: "//div[@class=\"language_select\"]//button[@class=\"language-dropdown-button\"]",
    xpathSelectCurrency: "//nav[@class=\"currency_select\"]/descendant::div[contains(@class,'selectize-input items')]",
    xpathUkrainianLanguage: "//div[contains(@class,\"language_select\")]/ul/li/a[contains(text(),\"Українська\")]",
    xpathUahCurrency: "//nav[@class=\"currency_select\"]/descendant::div[contains(@class,\"selectize-dropdown-content\")]/div[@data-value=\"UAH\"]",
    
    xpathNavApliances: "//div[@id=\"#all-categories\"]/descendant::a[text()=\"Побутова техніка\"]",
    xpathMixerAritaLink: "//div[@id=\"r_spisok\"]/descendant::a[text()=\"Міксер ARITA\"]",
    xpathProductPrice: "//span[@id=\"summ_price\"]/span",    
    xpathProductQuantity: "//span[@class=\"quantity-selector-mask\"]/input",
    xpathProductBuyButton: "//div[@id=\"r_buy_intovar\"]/button",

    xpathCart:"//div[@id=\"cartContent-page\"]",
    xpathProductInCart: "//div[@id=\"cartContent-page\"]/div[contains(@class, \"cartContent_body\")]",
    xpathProductPriceInCart: "//div[@id=\"cartContent-page\"]/descendant::div[contains(@class,\"col-xs-3 product_price\") and text()=\"8000 грн\"]",
    xpathProductQuantityInCart: "//div[@id=\"cartContent-page\"]/descendant::div[@class=\"col-xs-3 product_price\" and text()=\"8000 грн\"]/following-sibling::div[@class=\"col-xs-4 product_qty\"]/descendant::input[@class=\"form-control inputnumber\"]",
    xpathProductSumInCart: "//div[@id=\"cartContent-page\"]/descendant::div[@class=\"col-xs-3 product_price\" and text()=\"8000 грн\"]/following-sibling::div[@class=\"col-xs-3 product_total\"]",
    xpathTotalPriceInCart: "//div[@id=\"cart_order_total\"]/b",
    xpathCheckoutButtonInCart:"//a[@id=\"checkoutButton\"]",

    xpathCheckoutNameInput:"//div[@id=\"shippingAddress\"]/descendant::input[@name=\"shipping_firstname\"]",
    xpathCheckoutSurnameInput:"//div[@id=\"shippingAddress\"]/descendant::input[@name=\"shipping_lastname\"]",
    xpathCheckoutEmailInput:"//div[@id=\"shippingAddress\"]/descendant::input[@name=\"billing_email_address\"]",
    xpathCheckoutPhoneInput:"//div[@id=\"shippingAddress\"]/descendant::input[@name=\"billing_telephone\"]",
    xpathCheckoutCountrySelect:"//div[@id=\"shippingAddress\"]/descendant::span[text()=\"Країна:\"]/following-sibling::div/div[contains(@class,\"selectize-input items \")]",
    xpathCheckoutCountryUkraineSelect:"//div[@id=\"shippingAddress\"]/descendant::div[contains(@class,\"selectize-dropdown-content\")]/div[text()=\"Ukraine\"]",
    xpathCheckoutWithoutReqistrationCheckbox:"//input[@id=\"registration-off\"]/following-sibling::label",
    xpathCheckoutButton:"//span[@id=\"checkoutButton\"]",

    xpathTitleSuccess:"//div[contains(@class,\"size1of2\")]/h1[text()=\"Ваше замовлення успішно оформлено!\"]",
    xpathSuccessContinueButton:"//div[contains(@class,\"size1of2\")]/descendant::input[contains(@class,\"btn bold\")]",
    
    xpathOpenCartButton:"//div[@id=\"shopping_cart_box\"]/div/div[@class=\"img_basket popup_cart\"]/*",
    xpathCloseCartButton:"//div[@id=\"modal_cart_popup\"]/descendant::button[@class=\"close\"]",
    xpathDeleteProductFromCartButton:"//div[@id=\"cartContent-page\"]/descendant::div[@class=\"col-xs-2 product_delete\"]/button",
}

export const LoginData ={
    email : "mikhailenkomasha0@gmail.com",
    password: "4ODQk"
}

export const CheckoutData={
    name: "Марія",
    surname: "Михайленко",
    phone: "38097",
    email: "mikhailenkomasha0@gmail.com",
    country: "Ukraine"
}
