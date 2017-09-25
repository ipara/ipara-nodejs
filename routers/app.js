const express = require("express");


exports.app = express.Router();

exports.app
    .get('/', (req, res) => {
        res.render("index", {
            pageName : "3D Ödeme"
        })
    })
    .get("/non-3d-payment", (req, res)=>{
        res.render("non-3d-payment", {
            pageName : "API Payment Metodu ile Ödeme"
        })
    })
    .get("/payment-inquiry", (req, res)=>{
        res.render("payment-inquiry", {
            pageName : "Ödeme Sorgulama"
        })
    })
    .get("/bin-inquiry", (req, res)=>{
        res.render("bin-inquiry", {
            pageName : "Bin Sorgulama"
        })
    })
    .get("/add-cart-to-wallet", (req, res)=>{
        res.render("add-cart-to-wallet", {
            pageName : "Cüzdana Kart Ekleme"
        })
    })
    .get("/card-inquiry", (req, res)=>{
        res.render("card-inquiry", {
            pageName : "Cüzdandaki Kartları Listele"
        })
    })
    .get("/card-delete", (req, res)=>{
        res.render("card-delete", {
            pageName : "Cüzdandan Kart Sil"
        })
    })
    .get("/payment-with-wallet", (req, res)=>{
        res.render("payment-with-wallet", {
            pageName : "Tek tıkla ödeme"
        });
    })
    .get("/success", (req, res)=>{
        res.send("success !");
        res.end()
    })