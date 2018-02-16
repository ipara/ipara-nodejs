const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function PaymentInquiryRequest(orderId) {
    return new Promise((resolve, reject) => {
        if (!orderId) return reject({
            error: "OrderId bulunamadı !"
        })
        const xml_data = '<?xml version="1.0" encoding="UTF-8"?>\n' +
            "<inquiry>\n" +
            "    <orderId>" + orderId + "</orderId>\n" +
            "    <mode>" + settings.mode + "</mode>\n" +
            "</inquiry>";

        const transactionDateForRequest = helpers.GetTransactionDateString();
        axios({
            url: settings.baseURL + "/rest/payment/inquiry",
            method: 'POST',
            headers: {
                "transactionDate": (transactionDateForRequest),
                "version": (settings.version),
                "token": (helpers.CreateToken(settings.publicKey, settings.privateKey + orderId + settings.mode + transactionDateForRequest)),
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

module.exports = PaymentInquiryRequest;