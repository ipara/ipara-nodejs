const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function PaymentRefundInquiryRequest(obj) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            clientIp: obj.clientIp,
            orderId: obj.orderId,
            amount: obj.amount,
        });

        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey + obj.orderId + obj.clientIp + transactionDate
        );
        axios({
            url: settings.baseURL + "corporate/payment/refund/inquiry",
            method: "POST",
            headers: {
                transactionDate,
                version: settings.version,
                token,
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(data),
            },
            data,
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = PaymentRefundInquiryRequest;
