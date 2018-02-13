const axios = require("axios");
const settings = require("../settings");
const helpers = require("../helpers/index");

function BankCardInquiryRequest(userId, cardId, clientIp) {
    return new Promise((resolve, reject) => {
        if (!userId) return reject({
            error: "userId bulunamadı !"
        })
        const data = JSON.stringify({
            userId: userId,
            cardId: cardId || "",
            clientIp: clientIp
        })
        const transactionDateForRequest = helpers.GetTransactionDateString();
        axios({
            url: settings.baseURL + "/bankcard/inquiry",
            method: 'POST',
            headers: {
                "transactionDate": (transactionDateForRequest),
                "version": (settings.version),
                "token": (helpers.CreateToken(settings.publicKey, settings.privateKey + userId + cardId + clientIp + transactionDateForRequest)),
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

module.exports = BankCardInquiryRequest;