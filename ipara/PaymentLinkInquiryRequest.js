const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function PaymentLinkInquiryRequest(obj) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            email: obj.email,
            gsm: obj.gsm,
            linkState: obj.linkState,
            startDate: obj.startDate,
            endDate: obj.endDate,
            pageSize: obj.pageSize,
            pageIndex: obj.pageIndex,
            clientIp: obj.clientIp,
        });

        if (obj.linkId) {
            data.linkId = obj.linkId;
        }
        const transactionDate = helpers.GetTransactionDateString();
        const token = helpers.CreateToken(
            settings.publicKey,
            settings.privateKey + obj.clientIp + transactionDate
        );
        axios({
            url: settings.baseURL + "corporate/merchant/linkpayment/list",
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

module.exports = PaymentLinkInquiryRequest;