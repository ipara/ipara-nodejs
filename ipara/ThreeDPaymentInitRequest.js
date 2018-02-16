const settings = require("../settings").settings;
const helpers = require("../helpers/index");
const Guid = require("guid");

function ThreeDPaymentInitRequest(obj) {

    const transactionDate = helpers.GetTransactionDateString()
    const echo = "";
    const token = helpers.CreateToken(settings.publicKey, (settings.privateKey + obj.orderId + obj.amount + settings.mode + obj.cardOwnerName + obj.cardNumber + obj.cardExpireMonth + obj.cardExpireYear + obj.cardCvc + obj.userId + obj.cardId + obj.purchaserName + obj.purchaserSurname + obj.purchaserEmail + transactionDate))

    return {
        mode: settings.mode,
        orderId: obj.orderId,
        cardOwnerName: obj.cardOwnerName,
        cardNumber: obj.cardNumber,
        cardExpireMonth: obj.cardExpireMonth,
        cardExpireYear: obj.cardExpireYear,
        cardCvc: obj.cardCvc,
        userId: obj.userId,
        cardId: obj.cardId,
        installment: obj.installment,
        amount: obj.amount,
        echo: obj.echo,
        purchaserName: obj.purchaserName,
        purchaserSurname: obj.purchaserSurname,
        purchaserEmail: obj.purchaserEmail,
        successUrl: obj.successUrl,
        failureUrl: obj.failureUrl,
        transactionDate: transactionDate,
        version: settings.version,
        token: token
    }
}

module.exports = ThreeDPaymentInitRequest;