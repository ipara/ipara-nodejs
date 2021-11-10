const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function ThreeDPaymentRequest(obj) {
    const transactionDate = helpers.GetTransactionDateString();
    const token = helpers.CreateToken(
        settings.publicKey,
        settings.privateKey +
            obj.orderId +
            obj.amount +
            settings.mode +
            obj.cardOwnerName +
            obj.cardNumber +
            obj.cardExpireMonth +
            obj.cardExpireYear +
            obj.cardCvc +
            obj.userId +
            obj.cardId +
            obj.purchaser.name +
            obj.purchaser.surname +
            obj.purchaser.email +
            transactionDate
    );

    return JSON.stringify({
        ...obj,
        mode: settings.mode,
        version: settings.version,
        transactionDate,
        token,
    });
}

module.exports = ThreeDPaymentRequest;
