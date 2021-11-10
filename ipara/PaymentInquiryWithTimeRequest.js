const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function PaymentInquiryWithTimeRequest(obj) {
    return new Promise((resolve, reject) => {
        if (!obj.startDate || !obj.endDate)
            return reject({
                error: "Eksik alan var!",
            });

        const data = JSON.stringify({
            startDate: obj.startDate,
            endDate: obj.endDate,
            mode: settings.mode,
            echo: "",
        });

        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey + settings.mode + transactionDate
        );
        axios({
            url: settings.baseURL + "/rest/payment/search",
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

module.exports = PaymentInquiryWithTimeRequest;
