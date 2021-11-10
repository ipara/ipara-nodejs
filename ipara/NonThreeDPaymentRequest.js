const axios = require("axios");
const settings = require("../settings").settings;
const helpers = require("../helpers/index");

function NonThreeDPaymentRequest(obj) {
    return new Promise((resolve, reject) => {
        if (!obj)
            return resolve({
                error: "3D Payment Sonuçları Bulunamadı !",
            });
        const { threeD } = obj;
        if (!threeD)
            return resolve({
                error: "Lütfen threeD bilgisi giriniz...",
            });

        const threeD_xml = `<threeD>${threeD}</threeD>`;

        const {
            cardOwnerName,
            cardNumber,
            cardExpireMonth,
            cardExpireYear,
            cardCvc,
            installment,
            cardId,
            userId,
        } = obj;
        if (
            !cardOwnerName ||
            !cardNumber ||
            !cardExpireMonth ||
            !cardExpireYear ||
            !cardCvc
        ) {
            if (!userId)
                return resolve({
                    error: "Kard bilgileri eksik !",
                });
        }

        const card_xml = `<cardOwnerName>${cardOwnerName}</cardOwnerName>
                          <cardNumber>${cardNumber}</cardNumber>
                          <cardExpireMonth>${cardExpireMonth}</cardExpireMonth>
                          <cardExpireYear>${cardExpireYear}</cardExpireYear>
                          <cardCvc>${cardCvc}</cardCvc>`;

        const cardAndUserId_xml = `<cardId>${cardId}</cardId>
                                   <userId>${userId}</userId>`;

        if (!installment)
            return resolve({
                error: "Installment bulumanadı !",
            });

        const installment_xml = `<installment>${installment}</installment>`;

        const { orderId, amount } = obj;

        if (!orderId)
            return resolve({
                error: "orderId bulunamadı !",
            });

        const orderId_xml = `<orderId>${orderId}</orderId>`;

        if (!amount)
            return resolve({
                error: "amount bulunamadı !",
            });

        const amount_xml = `<amount>${amount}</amount>`;

        const { products } = obj;

        if (products.length < 1)
            return resolve({
                error: "En az 1 adet ürün olmalıdır !",
            });

        let productList = "";
        products.forEach((product) => {
            productList += `<product><productCode>${product.productCode}</productCode>
            <productName>${product.productName}</productName>
            <quantity>${product.quantity}</quantity>
            <price>${product.price}</price></product>`;
        });

        const products_xml = `<products>${productList}</products>`;

        const { purchaser } = obj;

        let purchaser_xml = "";
        if (purchaser) {
            let userInfo = `<name>${purchaser.name}</name>
                            <surname>${purchaser.surname}</surname>
                            <email>${purchaser.email}</email>
                            <clientIp>${purchaser.clientIp}</clientIp>
                            <birthDate>${purchaser.birthDate}</birthDate>
                            <gsmNumber>${purchaser.gsmNumber}</gsmNumber>
                            <tcCertificate>${purchaser.tcCertificate}</tcCertificate>`;
            let invoiceAddress = "";
            if (purchaser.invoiceAddress) {
                invoiceAddress = `<invoiceAddress><name>${
                    purchaser.invoiceAddress.name || ""
                }</name>
                <surname>${purchaser.invoiceAddress.surname || ""}</surname>
                <address>${purchaser.invoiceAddress.address || ""}</address>
                <zipcode>${purchaser.invoiceAddress.zipcode || ""}</zipcode>
                <city>${purchaser.invoiceAddress.city || ""}</city>
                <tcCertificate>${
                    purchaser.invoiceAddress.tcCertificate || ""
                }</tcCertificate>
                <country>${purchaser.invoiceAddress.country || ""}</country>
                <taxNumber>${
                    purchaser.invoiceAddress.taxNumber || ""
                }</taxNumber>
                <taxOffice>${
                    purchaser.invoiceAddress.taxOffice || ""
                }</taxOffice>
                <companyName>${
                    purchaser.invoiceAddress.companyName || ""
                }</companyName>
                <phoneNumber>${
                    purchaser.invoiceAddress.phoneNumber || ""
                }</phoneNumber> </invoiceAddress>`;
            }
            let shippingAddress = "";
            if (purchaser.shippingAddress) {
                shippingAddress = `<shippingAddress><name>${
                    purchaser.shippingAddress.name || ""
                }</name>
                <surname>${purchaser.shippingAddress.surname || ""}</surname>
                <address>${purchaser.shippingAddress.address || ""}</address>
                <zipcode>${purchaser.shippingAddress.zipcode || ""}</zipcode>
                <city>${purchaser.shippingAddress.city || ""}</city>
                <country>${purchaser.shippingAddress.country || ""}</country>
                <phoneNumber>${
                    purchaser.shippingAddress.phoneNumber || ""
                }</phoneNumber> </shippingAddress>`;
            }
            purchaser_xml = `<purchaser>${
                userInfo + invoiceAddress + shippingAddress
            }</purchaser>`;
        }

        const mode_xml = `<mode>${settings.mode}</mode>`;
        const { echo } = obj;
        let echo_xml = "";
        if (echo) {
            echo_xml = `<echo>${echo}</echo>`;
        }

        const xml_body = `<?xml version="1.0" encoding="UTF-8"?><auth>${threeD_xml}${card_xml}${cardAndUserId_xml}${installment_xml}${orderId_xml}${echo_xml}${amount_xml}${mode_xml}${products_xml}${purchaser_xml}</auth>`;

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
        axios({
            url: settings.baseURL + "/rest/payment/auth",
            method: "POST",
            headers: {
                transactionDate,
                version: settings.version,
                token,
                "Content-Type": "application/xml",
                "Content-Length": Buffer.byteLength(xml_body),
            },
            data: xml_body,
        })
            .then((result) => {
                resolve(result.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = NonThreeDPaymentRequest;
