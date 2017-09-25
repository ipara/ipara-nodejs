const computeHash = require("./computeHash");
const settings = require("../settings");

function Validate3DReturn(paymentResponse){
    if(!paymentResponse || !paymentResponse.hash) return {
        error : "Ödeme cevabı hash bilgisi boş.",
        code : 0
    }

    const hashText = paymentResponse.orderId + paymentResponse.result + paymentResponse.amount + paymentResponse.mode + paymentResponse.errorCode + paymentResponse.errorMessage + paymentResponse.transactionDate + settings.publicKey + settings.privateKey
    const hashed = computeHash(hashText)
    if(hashed != paymentResponse.hash) return {
        error : "Ödeme cevabı hash doğrulaması hatalı.",
        code : 0
    }
    return {
        success : true
    }
}

module.exports = Validate3DReturn