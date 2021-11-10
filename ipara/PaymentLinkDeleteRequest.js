const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function PaymentLinkDeleteRequest(obj) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            linkId: obj.linkId,
            clientIp: obj.clientIp,
        });

        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey + obj.clientIp + transactionDate
        );
        axios({
            url: settings.baseURL + "corporate/merchant/linkpayment/delete",
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

module.exports = PaymentLinkDeleteRequest;
