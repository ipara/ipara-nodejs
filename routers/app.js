const express = require("express");
exports.app = express.Router();

exports.app
    .get("/", (req, res) => {
        res.render("3d-payment", {
            pageName: "3D Ödeme",
        });
    })
    .get("/3d-payment", (req, res) => {
        res.render("3d-payment", {
            pageName: "3D Ödeme",
        });
    })
    .get("/non-3d-payment", (req, res) => {
        res.render("non-3d-payment", {
            pageName: "Non-3D ile Ödeme",
        });
    })
    .get("/payment-inquiry", (req, res) => {
        res.render("payment-inquiry", {
            pageName: "Ödeme Sorgulama",
        });
    })
    .get("/payment-inquiry-with-time", (req, res) => {
        res.render("payment-inquiry-with-time", {
            pageName: "Ödeme Listele",
        });
    })
    .get("/bin-inquiry", (req, res) => {
        res.render("bin-inquiry", {
            pageName: "Bin Sorgulama",
        });
    })
    .get("/add-cart-to-wallet", (req, res) => {
        res.render("add-cart-to-wallet", {
            pageName: "Cüzdana Kart Ekleme",
        });
    })
    .get("/card-inquiry", (req, res) => {
        res.render("card-inquiry", {
            pageName: "Cüzdandaki Kartları Listele",
        });
    })
    .get("/card-delete", (req, res) => {
        res.render("card-delete", {
            pageName: "Cüzdandan Kart Sil",
        });
    })
    .get("/payment-with-wallet", (req, res) => {
        res.render("payment-with-wallet", {
            pageName: "Cüzdandaki Kartları ile Ödeme",
        });
    })
    .get("/payment-link-create", (req, res) => {
        res.render("payment-link-create", {
            pageName: "Ödeme Linki Oluştur",
        });
    })
    .get("/payment-link-delete", (req, res) => {
        res.render("payment-link-delete", {
            pageName: "Ödeme Linki Sil",
        });
    })
    .get("/payment-link-inquiry", (req, res) => {
        res.render("payment-link-inquiry", {
            pageName: "Ödeme Linki Sorgula",
        });
    })
    .get("/payment-refund", (req, res) => {
        res.render("payment-refund", {
            pageName: "Iade",
        });
    })
    .get("/payment-refund-inquiry", (req, res) => {
        res.render("payment-refund-inquiry", {
            pageName: "Iade Sorgula",
        });
    })
    .get("/success", (req, res) => {
        res.send("success !");
        res.end();
    });
