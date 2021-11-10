const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function PaymentInquiryRequest(obj) {
    return new Promise((resolve, reject) => {
        if (!obj.orderId)
            return reject({
                error: "OrderId bulunamadı !",
            });
        const xml_data =
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            "<inquiry>\n" +
            "    <orderId>" +
            obj.orderId +
            "</orderId>\n" +
            "    <mode>" +
            settings.mode +
            "</mode>\n" +
            "</inquiry>";

        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey + obj.orderId + settings.mode + transactionDate
        );
        axios({
            url: settings.baseURL + "/rest/payment/inquiry",
            method: "POST",
            headers: {
                transactionDate,
                version: settings.version,
                token,
                "Content-Type": "application/xml",
                "Content-Length": Buffer.byteLength(xml_data),
            },
            data: xml_data,
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = PaymentInquiryRequest;
