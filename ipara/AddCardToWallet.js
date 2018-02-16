const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");
const Guid = require("guid");


function AddCardToWallet(userId, cardOwnerName, cardNumber, cardAlias, cardExpireMonth, cardExpireYear, clientIp) {
    return new Promise((resolve, reject) => {
        if (!userId || !cardOwnerName ||  !cardNumber || !cardAlias || !cardExpireMonth || !cardExpireYear ||  !clientIp) return reject({
            error: "Eksik alanlar var !"
        })
        const data = JSON.stringify({
            userId: userId,
            cardOwnerName: cardOwnerName,
            cardNumber: cardNumber,
            cardAlias: cardAlias,
            cardExpireMonth: cardExpireMonth,
            cardExpireYear: cardExpireYear,
            clientIp: clientIp
        })
        const transactionDateForRequest = helpers.GetTransactionDateString();
        axios({
            url: settings.baseURL + "/bankcard/create",
            method: 'POST',
            headers: {
                "transactionDate": (transactionDateForRequest),
                "version": (settings.version),
                "token": (helpers.CreateToken(settings.publicKey, settings.privateKey + userId + cardOwnerName + cardNumber + cardExpireMonth + cardExpireYear + clientIp + transactionDateForRequest)),
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

module.exports = AddCardToWallet;