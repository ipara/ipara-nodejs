const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function BankCardDeleteRequest(obj) {
    return new Promise((resolve, reject) => {
        if (!obj.userId)
            return reject({
                error: "userId bulunamadı !",
            });

        const data = JSON.stringify({
            userId: obj.userId,
            cardId: obj.cardId || "",
            clientIp: obj.clientIp,
        });

        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey +
                obj.userId +
                obj.cardId +
                obj.clientIp +
                transactionDate
        );
        axios({
            url: settings.baseURL + "/bankcard/delete",
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

module.exports = BankCardDeleteRequest;
