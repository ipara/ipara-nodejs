const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function AddCardToWalletRequest(obj) {
    return new Promise((resolve, reject) => {
        if (
            !obj.userId ||
            !obj.cardOwnerName ||
            !obj.cardNumber ||
            !obj.cardAlias ||
            !obj.cardExpireMonth ||
            !obj.cardExpireYear ||
            !obj.clientIp
        )
            return reject({
                error: "Eksik alanlar var !",
            });

        const data = JSON.stringify({
            userId: obj.userId,
            cardOwnerName: obj.cardOwnerName,
            cardNumber: obj.cardNumber,
            cardAlias: obj.cardAlias,
            cardExpireMonth: obj.cardExpireMonth,
            cardExpireYear: obj.cardExpireYear,
            clientIp: obj.clientIp,
        });

        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey +
                obj.userId +
                obj.cardOwnerName +
                obj.cardNumber +
                obj.cardExpireMonth +
                obj.cardExpireYear +
                obj.clientIp +
                transactionDate
        );
        axios({
            url: settings.baseURL + "/bankcard/create",
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

module.exports = AddCardToWalletRequest;
