const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function PaymentLinkCreateRequest(obj) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            clientIp: obj.clientIp,
            name: obj.name,
            surname: obj.surname,
            tcCertificate: obj.tcCertificate,
            taxNumber: obj.taxNumber,
            email: obj.email,
            gsm: obj.gsm,
            amount: obj.amount,
            threeD: obj.threeD,
            installment: obj.installment,
            commissionType: obj.commissionType,
            expireDate: obj.expireDate,
            sendEmail: obj.sendEmail,
            mode: settings.mode,
        });

        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey +
                obj.name +
                obj.surname +
                obj.email +
                obj.amount +
                obj.clientIp +
                transactionDate
        );
        axios({
            url: settings.baseURL + "corporate/merchant/linkpayment/create",
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

module.exports = PaymentLinkCreateRequest;
