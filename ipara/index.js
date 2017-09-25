const ApiPaymentRequest = require("./ApiPaymentRequest");
const ThreeDPaymentCompleteRequest = require("./ThreeDPaymentCompleteRequest");
const ThreeDPaymentInitRequest = require("./ThreeDPaymentInitRequest");
const PaymentInquiryRequest = require("./PaymentInquiryRequest");
const BinNumberInquiryRequest = require("./BinNumberInquiryRequest");
const AddCardToWallet = require("./AddCardToWallet");
const BankCardInquiryRequest = require("./BankCardInquiryRequest");
const BankCardDeleteRequest = require("./BankCardDeleteRequest");
const ApiPaymentWithWallet = require("./ApiPaymentWithWallet");

module.exports = {
    ApiPaymentRequest : ApiPaymentRequest,
    ThreeDPaymentCompleteRequest : ThreeDPaymentCompleteRequest,
    ThreeDPaymentInitRequest : ThreeDPaymentInitRequest,
    PaymentInquiryRequest : PaymentInquiryRequest,
    BinNumberInquiryRequest : BinNumberInquiryRequest,
    AddCardToWallet : AddCardToWallet,
    BankCardInquiryRequest : BankCardInquiryRequest,
    BankCardDeleteRequest : BankCardDeleteRequest,
    ApiPaymentWithWallet : ApiPaymentWithWallet
}