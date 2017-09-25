const threeDObjectCreater = require("./ThreeDPaymentInitRequest");

const axios = require("axios");
const settings = require("../settings");
const helpers = require("../helpers/index");

function ThreeDPaymentCompleteRequest(resBody) {
    return new Promise((resolve, reject) => {
        const cardOwnerName = "Fatih Coşkun";
        const cardNumber = "4282209027132016";
        const cardExpireMonth = "05";
        const cardExpireYear = "18";
        const cardCvc = "000";
        const installment = "1";

        const initRequestObject = threeDObjectCreater(cardOwnerName, cardNumber, cardExpireMonth, cardExpireYear, cardCvc, installment);

        initRequestObject.successUrl = "http://localhost:3000/api/success";
        initRequestObject.failureUrl = "http://localhost:3000/api/error";

        const xml_data = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        "<auth>\n" + 
        "    <threeD>" + true + "</threeD>\n"+
        "    <orderId>" + resBody.orderId + "</orderId>\n" +
        "    <amount>" + resBody.amount + "</amount>\n" +
        "    <cardOwnerName>" + encodeURIComponent(initRequestObject.cardOwnerName) + "</cardOwnerName>\n" +
        "    <cardNumber>" + initRequestObject.cardNumber + "</cardNumber>\n" +
        "    <cardExpireMonth>" + initRequestObject.cardExpireMonth + "</cardExpireMonth>\n" +
        "    <cardExpireYear>" + initRequestObject.cardExpireYear + "</cardExpireYear>\n" +
        "    <installment>" + initRequestObject.installment + "</installment>\n" +
        "    <cardCvc>" + initRequestObject.cardCvc + "</cardCvc>\n" +
        "    <userId>" + initRequestObject.userId + "</userId>\n" +
        "    <cardId>" + initRequestObject.cardId + "</cardId>\n" +
        "    <mode>" + initRequestObject.mode + "</mode>\n" +
        "    <threeDSecureCode>" + resBody.threeDSecureCode + "</threeDSecureCode>\n"+
        "    <vendorId></vendorId>\n" +
        "    <products>\n" +
        "<product>\n" +
        "	<productCode>" + "123123123" + "</productCode>\n" +
        "	<productName>" + encodeURIComponent("Samsung Galaxy S5")+ "</productName>\n" +
        "	<quantity>" + "1" + "</quantity>\n" +
        "	<price>" + "10000" + "</price>\n" +
        "</product>\n"+
        "    </products>\n" +
        "    <purchaser>\n" +
        "        <name>" + encodeURIComponent(initRequestObject.purchaserName)+ "</name>\n" +
        "        <surname>" + encodeURIComponent(initRequestObject.purchaserSurname) + "</surname>\n" +
        "        <birthDate>" + "1994.10.31" + "</birthDate>\n" +
        "        <email>" + encodeURIComponent(initRequestObject.purchaserEmail) + "</email>\n" +
        "        <gsmNumber>" + "5070732987" + "</gsmNumber>\n" +
        "        <tcCertificate>" + "34909290804" + "</tcCertificate>\n" +
        "        <clientIp>" + "78.191.6.240" + "</clientIp>\n" +
        "    </purchaser>\n" +
        "</auth>";

        const transactionDateForRequest = helpers.GetTransactionDateString();
        axios({
            url: "https://apitest.ipara.com" + "/rest/payment/auth",
            method: 'POST',
            headers: {
                "transactionDate": (transactionDateForRequest),
                "version": (initRequestObject.version),
                "token": (helpers.CreateToken(settings.publicKey, settings.privateKey + resBody.orderId + resBody.amount + resBody.mode + resBody.threeDSecureCode + transactionDateForRequest)),
                'Content-Type': 'application/xml',
                'Content-Length': Buffer.byteLength(xml_data)
            },
            data : xml_data
        }).then(result=>{
            resolve(result.data)
        }).catch(err=>{
            reject(err)
        })
    })
}

module.exports = ThreeDPaymentCompleteRequest;