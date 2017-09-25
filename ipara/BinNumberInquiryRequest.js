const axios = require("axios");
const settings = require("../settings");
const helpers = require("../helpers/index");

function BinNumberInquiryRequest(binNumber) {
    return new Promise((resolve, reject) => {
        if (!binNumber) return reject({
            error: "binNumber bulunamadı !"
        })
        const data = JSON.stringify({
            binNumber: binNumber
        })
        const transactionDateForRequest = helpers.GetTransactionDateString();
        axios({
            url: settings.baseURL + "/rest/payment/bin/lookup",
            method: 'POST',
            headers: {
                "transactionDate": (transactionDateForRequest),
                "version": (settings.version),
                "token": (helpers.CreateToken(settings.publicKey, settings.privateKey + binNumber + transactionDateForRequest)),
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            },
            data: data
        }).then(result => {
            resolve(result.data)
        }).catch(err => {
            reject(err)
        })
    })
}

module.exports = BinNumberInquiryRequest;