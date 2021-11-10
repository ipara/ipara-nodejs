const NonThreeDPaymentRequest = require("./NonThreeDPaymentRequest");
const ThreeDPaymentRequest = require("./ThreeDPaymentRequest");
const PaymentInquiryRequest = require("./PaymentInquiryRequest");
const PaymentInquiryWithTimeRequest = require("./PaymentInquiryWithTimeRequest");
const BinNumberInquiryRequest = require("./BinNumberInquiryRequest");
const AddCardToWalletRequest = require("./AddCardToWalletRequest");
const BankCardInquiryRequest = require("./BankCardInquiryRequest");
const BankCardDeleteRequest = require("./BankCardDeleteRequest");
const NonThreeDPaymentWithWalletRequest = require("./NonThreeDPaymentWithWalletRequest");
const PaymentLinkCreateRequest = require("./PaymentLinkCreateRequest");
const PaymentLinkDeleteRequest = require("./PaymentLinkDeleteRequest");
const PaymentLinkInquiryRequest = require("./PaymentLinkInquiryRequest");
const PaymentRefundRequest = require("./PaymentRefundRequest");
const PaymentRefundInquiryRequest = require("./PaymentRefundInquiryRequest");

module.exports = {
    NonThreeDPaymentRequest: NonThreeDPaymentRequest,
    ThreeDPaymentRequest: ThreeDPaymentRequest,
    PaymentInquiryRequest: PaymentInquiryRequest,
    PaymentInquiryWithTimeRequest: PaymentInquiryWithTimeRequest,
    BinNumberInquiryRequest: BinNumberInquiryRequest,
    AddCardToWalletRequest: AddCardToWalletRequest,
    BankCardInquiryRequest: BankCardInquiryRequest,
    BankCardDeleteRequest: BankCardDeleteRequest,
    NonThreeDPaymentWithWalletRequest: NonThreeDPaymentWithWalletRequest,
    PaymentLinkCreateRequest: PaymentLinkCreateRequest,
    PaymentLinkInquiryRequest: PaymentLinkInquiryRequest,
    PaymentLinkDeleteRequest: PaymentLinkDeleteRequest,
    PaymentRefundRequest: PaymentRefundRequest,
    PaymentRefundInquiryRequest: PaymentRefundInquiryRequest,
};
