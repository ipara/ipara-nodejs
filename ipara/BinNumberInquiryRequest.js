const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function BinNumberInquiryRequest(obj) {
    return new Promise((resolve, reject) => {
        if (!obj.binNumber || !obj.amount)
            return reject({
                error: "Eksik alanlar var !",
            });

        const data = JSON.stringify({
            binNumber: obj.binNumber,
            amount: obj.amount,
            threeD: obj.threeD,
        });

        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey + obj.binNumber + transactionDate
        );
        axios({
            url: settings.baseURL + "/rest/payment/bin/lookup/v2",
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

module.exports = BinNumberInquiryRequest;
