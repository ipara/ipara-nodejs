const express = require("express");
const axios = require("axios");
const parseString = require('xml2js').parseString;

const helpers = require("../helpers/index");
const settings = require("../settings");
const ipara = require("../ipara/index");

exports.api = express.Router();

exports.api
    .post('/init-3d-payment-request', (req, res) => {
        if (!req.body ||  !req.body.cardOwnerName || !req.body.cardNumber ||  !req.body.cardExpireMonth ||  !req.body.cardExpireYear ||  !req.body.cardCvc ||  !req.body.installment) return res.json({
            error: "Eksik alanlar var !",
            code: 0
        })
        res.render("3d-form", {
            form: ipara.ThreeDPaymentInitRequest(req.body.cardOwnerName, req.body.cardNumber, req.body.cardExpireMonth, req.body.cardExpireYear, req.body.cardCvc, req.body.installment)
        })
    })
    .post("/success", (req, res) => {
        if (!req.body) return res.redirect("/error?error=" + encodeURIComponent("3D Cevabı Boş!"));

        const validate = helpers.Validate3DReturn(req.body);
        if (validate.error) return res.redirect("/error?error=" + encodeURIComponent(validate.error));

        ipara.ThreeDPaymentCompleteRequest(req.body).then(results => {
            parseString(results, function (err, result) {
                if (err) throw new Error(err);
                res.render("result", {
                    results: result.authResponse,
                    status : "İşlem Başarılı"
                })
            });
        })

    })
    .post("/error", (req, res) => {
        res.render("result", {
            results: req.body,
            status : "İşlem Başarısız"
        })
    })
    .post("/non-3d-payment", (req, res) => {
        if (!req.body || !req.body.cardOwnerName || !req.body.cardNumber || !req.body.cardExpireMonth || !req.body.cardExpireYear || !req.body.cardCvc || !req.body.installment) return res.json({
            error: "Gerekli alanlar boş!"
        });

        ipara.ApiPaymentRequest(req.body.cardOwnerName, req.body.cardNumber, req.body.cardExpireMonth, req.body.cardExpireYear, req.body.cardCvc, req.body.installment).then(results => {
            parseString(results, function (err, result) {
                if (err) throw new Error(err);
                res.json(result)
            });
        })
    })
    .post("/payment-inquiry", (req, res) => {
        if (!req.body || !req.body.quary) return res.json({
            error: "Gerekli alanlar boş!"
        });

        ipara.PaymentInquiryRequest(req.body.quary).then(requestResult=>{
            parseString(requestResult, (err, result)=>{
                if (err) throw new Error(err);
                res.json(result)
            })
        }).catch(err=>{
            console.log(err)
        })
    })
    .post("/bin-inquiry", (req, res) => {
        if (!req.body || !req.body.quary) return res.json({
            error: "Gerekli alanlar boş!"
        });
        ipara.BinNumberInquiryRequest(req.body.quary).then(requestResult=>{
            res.json(requestResult)
        }).catch(err=>{
            console.log(err)
        })
    })
    .post("/add-cart-to-wallet", (req, res) => {
        if (!req.body || !req.body.userId || !req.body.cardOwnerName || !req.body.cardNumber || !req.body.cardAlias || !req.body.cardExpireMonth || !req.body.cardExpireYear) return res.json({
            error: "Gerekli alanlar boş!"
        });
        ipara.AddCardToWallet(req.body.userId, req.body.cardOwnerName, req.body.cardNumber, req.body.cardAlias, req.body.cardExpireMonth, req.body.cardExpireYear, "31.145.116.98").then(requestResult=>{
            res.json(requestResult)
        }).catch(err=>{
            console.log(err)
        })
    })
    .post("/card-inquiry", (req, res) => {
        if (!req.body || !req.body.userId) return res.json({
            error: "Gerekli alanlar boş!"
        });
        ipara.BankCardInquiryRequest(req.body.userId, req.body.cardId || "","31.145.116.98").then(requestResult=>{
            res.json(requestResult)
        }).catch(err=>{
            console.log(err)
        })
    })
    .post("/card-delete", (req, res) => {
        if (!req.body || !req.body.userId) return res.json({
            error: "Gerekli alanlar boş!"
        });
        ipara.BankCardDeleteRequest(req.body.userId, req.body.cardId || "","31.145.116.98").then(requestResult=>{
            res.json(requestResult)
        }).catch(err=>{
            console.log(err)
        })
    })
    .post("/payment-with-wallet", (req, res) => {
        if (!req.body || !req.body.userId || !req.body.cardId || !req.body.installment) return res.json({
            error: "Gerekli alanlar boş!"
        });

        ipara.ApiPaymentWithWallet(req.body.userId, req.body.cardId, req.body.installment).then(results => {
            parseString(results, function (err, result) {
                if (err) throw new Error(err);
                res.json(result)
            });
        })
    })