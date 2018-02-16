const express = require("express");
const axios = require("axios");
const parseString = require('xml2js').parseString;
const Guid = require("guid");

const helpers = require("../helpers/index");
const settings = require("../settings").settings;
const hosturl = require("../settings").HOST_URL;
const ipara = require("../ipara/index");

exports.api = express.Router();

exports.api.post('/init-3d-payment-request', (req, res) => {
    if (!req.body || !req.body.cardOwnerName || !req.body.cardNumber || !req.body.cardExpireMonth || !req.body.cardExpireYear || !req.body.cardCvc || !req.body.installment) return res.json({
        error: "Eksik alanlar var !",
        code: 0
    })
    const obj = {
        orderId: Guid.raw(),
        cardOwnerName: req.body.cardOwnerName,
        cardNumber: req.body.cardNumber,
        cardExpireMonth: req.body.cardExpireMonth,
        cardExpireYear: req.body.cardExpireYear,
        cardCvc: req.body.cardCvc,
        userId: "",
        cardId: "",
        installment: req.body.installment,
        amount: "10000",
        echo: "",
        purchaserName: "Murat",
        purchaserSurname: "Kaya",
        purchaserEmail: "murat@kaya.com",
        successUrl: hosturl + "/api/success",
        failureUrl: hosturl + "/api/error"
    }
    res.render("3d-form", {
        form: ipara.ThreeDPaymentInitRequest(obj)
    })
})


exports.api.post("/error", (req, res) => {
    var body = helpers.Object2XML(req.body, "authResponse");
    if (body == null || body == "") {
        body = "Yanıt Boş!";
    }
    res.render("result", {
        status: "İşlem Başarısız",
        results: body
    })
})

exports.api.post("/success", (req, res) => {
    if (!req.body) return res.redirect("/error?error=" + encodeURIComponent("3D Cevabı Boş!"));
    const {
            echo,
        result,
        amount,
        publicKey,
        orderId,
        mode,
        errorCode,
        errorMessage,
        transactionDate,
        hash,
        threeDSecureCode
        } = req.body;

    const obj = {
        echo,
        result,
        amount,
        publicKey,
        orderId,
        mode,
        errorCode,
        errorMessage,
        transactionDate,
        hash,
        threeDSecureCode,
        threeD: "true",
        products: [{
            productName: "Telefon",
            productCode: "TLF0001",
            quantity: "1",
            price: "5000"
        },
        {
            productName: "Bilgisayar",
            productCode: "BIL0002",
            quantity: "1",
            price: "5000"
        }
        ],
        purchaser: {
            birthDate: "1986-07-11",
            gsmNumber: "5881231212",
            tcCertificate: "1234567890",
            name: "Murat",
            surname: "Kaya",
            email: "murat@kaya.com",
            clientIp: "123.58.7.4",
            invoiceAddress: {
                name: "Murat",
                surname: "Kaya",
                address: "Mevlüt Pehlivan Mah. Multinet Plaza Şişli",
                zipcode: "34782",
                city: "34",
                tcCertificate: "12345678901",
                country: "tr",
                taxNumber: "123456890",
                taxOffice: "Şişli",
                companyName: "iPara",
                phoneNumber: "2123886600"
            },
            shippingAddress: {
                name: "Murat",
                surname: "Kaya",
                address: "Mevlüt Pehlivan Mah. Multinet Plaza Şişli",
                zipcode: "34782",
                city: "34",
                country: "tr",
                phoneNumber: "2123886600"
            }
        }
    }
    ipara.ThreeDPaymentCompleteRequest(obj).then(results => {
        if (typeof results == "object" && results.error) return console.log(results.error)
        var pd = require('pretty-data').pd;
        var data = pd.xml(results);
        res.render("result", {
            results: data,
            status: "İşlem Başarılı"
        })
    }).catch(err => {
        console.log(err)
    })

})

exports.api.post("/non-3d-payment", (req, res) => {
    if (!req.body || !req.body.cardOwnerName || !req.body.cardNumber || !req.body.cardExpireMonth || !req.body.cardExpireYear || !req.body.cardCvc || !req.body.installment) return res.json({
        error: "Gerekli alanlar boş!"
    });

    const {
            cardOwnerName,
        cardNumber,
        cardExpireMonth,
        cardExpireYear,
        cardCvc,
        installment
        } = req.body

    const obj = {
        echo: "",
        amount: "10000",
        publicKey: settings.publicKey,
        orderId: Guid.raw(),
        mode: settings.mode,
        threeD: "false",
        cardId: "",
        userId: "",
        cardOwnerName: cardOwnerName,
        cardNumber: cardNumber,
        cardExpireMonth: cardExpireMonth,
        cardExpireYear: cardExpireYear,
        cardCvc: cardCvc,
        installment: installment,
        products: [{
            productName: "Telefon",
            productCode: "TLF0001",
            quantity: "1",
            price: "5000"
        },
        {
            productName: "Bilgisayar",
            productCode: "BIL0002",
            quantity: "1",
            price: "5000"
        }
        ],
        purchaser: {
            birthDate: "1986-07-11",
            gsmNumber: "5881231212",
            tcCertificate: "1234567890",
            name: "Murat",
            surname: "Kaya",
            email: "murat@kaya.com",
            clientIp: "123.58.7.4",
            invoiceAddress: {
                name: "Murat",
                surname: "Kaya",
                address: "Mevlüt Pehlivan Mah. Multinet Plaza Şişli",
                zipcode: "34782",
                city: "34",
                tcCertificate: "12345678901",
                country: "tr",
                taxNumber: "123456890",
                taxOffice: "Şişli",
                companyName: "iPara",
                phoneNumber: "2123886600"
            },
            shippingAddress: {
                name: "Murat",
                surname: "Kaya",
                address: "Mevlüt Pehlivan Mah. Multinet Plaza Şişli",
                zipcode: "34782",
                city: "34",
                country: "tr",
                phoneNumber: "2123886600"
            }
        }
    }

    ipara.ApiPaymentRequest(obj).then(results => {
        res.json({
            data: results
        })
    }).catch(err => {
        console.log(err)
    })
})

exports.api.post("/payment-inquiry", (req, res) => {
    if (!req.body || !req.body.quary) return res.json({
        error: "Gerekli alanlar boş!"
    });

    ipara.PaymentInquiryRequest(req.body.quary).then(requestResult => {
        console.log(requestResult)
        res.json({
            data: requestResult
        })
    }).catch(err => {
        console.log(err)
    })
})

exports.api.post("/bin-inquiry", (req, res) => {
    if (!req.body || !req.body.quary) return res.json({
        error: "Gerekli alanlar boş!"
    });
    ipara.BinNumberInquiryRequest(req.body.quary).then(requestResult => {
        res.json(requestResult)
    }).catch(err => {
        console.log(err)
    })
})

exports.api.post("/add-cart-to-wallet", (req, res) => {
    if (!req.body || !req.body.userId || !req.body.cardOwnerName || !req.body.cardNumber || !req.body.cardAlias || !req.body.cardExpireMonth || !req.body.cardExpireYear) return res.json({
        error: "Gerekli alanlar boş!"
    });
    ipara.AddCardToWallet(req.body.userId, req.body.cardOwnerName, req.body.cardNumber, req.body.cardAlias, req.body.cardExpireMonth, req.body.cardExpireYear, "31.145.116.98").then(requestResult => {
        res.json(requestResult)
    }).catch(err => {
        console.log(err)
    })
})

exports.api.post("/card-inquiry", (req, res) => {
    if (!req.body || !req.body.userId) return res.json({
        error: "Gerekli alanlar boş!"
    });
    ipara.BankCardInquiryRequest(req.body.userId, req.body.cardId || "", "31.145.116.98").then(requestResult => {
        res.json(requestResult)
    }).catch(err => {
        console.log(err)
    })
})

exports.api.post("/card-delete", (req, res) => {
    if (!req.body || !req.body.userId) return res.json({
        error: "Gerekli alanlar boş!"
    });

    ipara.BankCardDeleteRequest(req.body.userId, req.body.cardId || "", "31.145.116.98").then(requestResult => {
        res.json(requestResult)
    }).catch(err => {
        console.log(err)
    })
})

exports.api.post("/payment-with-wallet", (req, res) => {
    if (!req.body || !req.body.userId || !req.body.cardId || !req.body.installment) return res.json({
        error: "Gerekli alanlar boş!"
    });

    const obj = {
        echo: "",
        amount: "10000",
        publicKey: settings.publicKey,
        orderId: Guid.raw(),
        mode: settings.mode,
        threeD: "false",
        cardId: req.body.cardId,
        userId: req.body.userId,
        cardOwnerName: "",
        cardNumber: "",
        cardExpireMonth: "",
        cardExpireYear: "",
        cardCvc: "",
        installment: req.body.installment,
        products: [{
            productName: "Telefon",
            productCode: "TLF0001",
            quantity: "1",
            price: "5000"
        },
        {
            productName: "Bilgisayar",
            productCode: "BIL0002",
            quantity: "1",
            price: "5000"
        }
        ],
        purchaser: {
            birthDate: "1986-07-11",
            gsmNumber: "5881231212",
            tcCertificate: "1234567890",
            name: "Murat",
            surname: "Kaya",
            email: "murat@kaya.com",
            clientIp: "123.58.7.4",
            invoiceAddress: {
                name: "Murat",
                surname: "Kaya",
                address: "Mevlüt Pehlivan Mah. Multinet Plaza Şişli",
                zipcode: "34782",
                city: "34",
                tcCertificate: "12345678901",
                country: "tr",
                taxNumber: "123456890",
                taxOffice: "Şişli",
                companyName: "iPara",
                phoneNumber: "2123886600"
            },
            shippingAddress: {
                name: "Murat",
                surname: "Kaya",
                address: "Mevlüt Pehlivan Mah. Multinet Plaza Şişli",
                zipcode: "34782",
                city: "34",
                country: "tr",
                phoneNumber: "2123886600"
            }
        }
    }
    ipara.ApiPaymentWithWallet(obj).then(results => {
        res.json({
            data: results
        })
    }).catch(err => {
        console.log(err)
    })
})