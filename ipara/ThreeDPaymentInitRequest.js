const settings = require("../settings");
const helpers = require("../helpers/index");
const Guid = require("guid");

function ThreeDPaymentInitRequest(cardOwnerName, cardNumber, cardExpireMonth, cardExpireYear, cardCvc, installment) {
    const transactionDate = helpers.GetTransactionDateString()
    const orderId = Guid.raw();
    const amount = "10000";
    const purchaserName = "Murat";
    const purchaserSurname = "Kaya";
    const purchaserEmail = "enterdarkside@gmail.com"
    const userId = "";
    const cardId = "";
    const echo = "";
    const token = helpers.CreateToken(settings.publicKey, (settings.privateKey + orderId + amount + settings.mode + cardOwnerName + cardNumber + cardExpireMonth + cardExpireYear + cardCvc + userId + cardId + purchaserName + purchaserSurname + purchaserEmail + transactionDate))

    return {
        mode: settings.mode,
        orderId: orderId,
        cardOwnerName: cardOwnerName,
        cardNumber: cardNumber,
        cardExpireMonth: cardExpireMonth,
        cardExpireYear: cardExpireYear,
        cardCvc: cardCvc,
        userId: userId,
        cardId: cardId,
        installment: installment,
        amount: amount,
        echo: echo,
        purchaserName: purchaserName,
        purchaserSurname: purchaserSurname,
        purchaserEmail: purchaserEmail,
        successUrl: "http://localhost:3000/api/success",
        failureUrl: "http://localhost:3000/api/error",
        transactionDate: transactionDate,
        version: settings.version,
        token: token
    }
}

module.exports = ThreeDPaymentInitRequest;