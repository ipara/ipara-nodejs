const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function PaymentRefundRequest(obj) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            orderId: obj.orderId,
            refundHash: obj.refundHash,
            amount: obj.amount,
            clientIp: obj.clientIp,
        });

        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey + obj.orderId + obj.clientIp + transactionDate
        );
        axios({
            url: settings.baseURL + "corporate/payment/refund",
            method: "POST",
            headers: {
                transactionDate,
                version: settings.version,
                token,
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(data),
            },
            data: data,
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = PaymentRefundRequest;
