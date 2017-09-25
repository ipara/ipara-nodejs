const axios = require("axios");
const settings = require("../settings");
const helpers = require("../helpers/index");
const Guid = require("guid");


function ApiPaymentWithWallet(userId, cardId, installment) {
    return new Promise((resolve, reject) => {
        const orderId = Guid.raw();
        const amount = "10000"
        const xml_data = '<?xml version="1.0" encoding="UTF-8"?>\n' +
            "<auth>\n" +
            "    <threeD>" + false + "</threeD>\n" +
            "    <orderId>" + orderId + "</orderId>\n" +
            "    <amount>" + amount + "</amount>\n" +
            "    <cardOwnerName>" + "" + "</cardOwnerName>\n" +
            "    <cardNumber>" + "" + "</cardNumber>\n" +
            "    <cardExpireMonth>" + "" + "</cardExpireMonth>\n" +
            "    <cardExpireYear>" + "" + "</cardExpireYear>\n" +
            "    <installment>" + installment + "</installment>\n" +
            "    <cardCvc>" + "" + "</cardCvc>\n" +
            "    <userId>" + userId + "</userId>\n" +
            "    <cardId>" + cardId + "</cardId>\n" +
            "    <mode>" + settings.mode + "</mode>\n" +
            "    <vendorId></vendorId>\n" +
            "    <products>\n" +
            "<product>\n" +
            "	<productCode>" + "123123123" + "</productCode>\n" +
            "	<productName>" + encodeURIComponent("Cep telefonu") + "</productName>\n" +
            "	<quantity>" + "1" + "</quantity>\n" +
            "	<price>" + "10000" + "</price>\n" +
            "</product>\n" +
            "    </products>\n" +
            "    <purchaser>\n" +
            "        <name>" + encodeURIComponent("Muhammed Furkan") + "</name>\n" +
            "        <surname>" + encodeURIComponent("Aydın") + "</surname>\n" +
            "        <birthDate>" + "1994.10.31" + "</birthDate>\n" +
            "        <email>" + "enterdarkside@gmail.com" + "</email>\n" +
            "        <gsmNumber>" + "5070732987" + "</gsmNumber>\n" +
            "        <tcCertificate>" + "11111111111" + "</tcCertificate>\n" +
            "        <clientIp>" + "78.191.6.240" + "</clientIp>\n" +
            "    </purchaser>\n" +
            "</auth>";

        const transactionDateForRequest = helpers.GetTransactionDateString();
        axios({
            url: settings.baseURL + "/rest/payment/auth",
            method: 'POST',
            headers: {
                "transactionDate": (transactionDateForRequest),
                "version": (settings.version),
                "token": (helpers.CreateToken(settings.publicKey, settings.privateKey + orderId + amount + settings.mode + "" + "" + "" + "" + "" + userId + cardId + "Muhammed Furkan" + "Aydın" + "enterdarkside@gmail.com" + transactionDateForRequest)),
                'Content-Type': 'application/xml',
                'Content-Length': Buffer.byteLength(xml_data)
            },
            data: xml_data
        }).then(result => {
            resolve(result.data)
        }).catch(err => {
            reject(err)
        })
    })
}


module.exports = ApiPaymentWithWallet;