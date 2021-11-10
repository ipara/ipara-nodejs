const settings = {
    //"Public Magaza Anahtarı - size mağaza başvurunuz sonucunda gönderilen public key (açık anahtar) bilgisini kullanınız.",
    publicKey: process.env.IPARA_PUBLIC_KEY || "",

    //"Private Magaza Anahtarı  - size mağaza başvurunuz sonucunda gönderilen privaye key (gizli anahtar) bilgisini kullanınız."
    privateKey: process.env.IPARA_PRIVATE_KEY || "",

    //iPara web servisleri API url'lerinin başlangıç bilgisidir. Restful web servis isteklerini takip eden kodlar halinde bulacaksınız.
    // Örneğin "https://api.ipara.com/" + "/rest/payment/auth"  = "https://api.ipara.com/rest/payment/auth"
    baseURL: process.env.IPARA_BASE_URL || "https://api.ipara.com/",

    // Kullandığınız iPara API versiyonudur.
    version: "1.0",

    // Test -> T, entegrasyon testlerinin sırasında "T" modunu, canlı sisteme entegre olarak ödeme almaya başlamak için ise Prod -> "P" modunu kullanınız.
    mode: process.env["IPARA_MODE"] || "T"
}

const host = "localhost";
const port = process.env.PORT || 3000;

function buildPublishingAddress(host, port) {
    if (port) {
        return `http://` + `${host}` + `:` + `${port}`;
    } else {
        return `http://` + host + `/`;
    }
}

const hostAddress = buildPublishingAddress(host, port);

function checkStartup() {
    const textColor = "\x1b[33m%s\x1b[0m";
    if (!settings.privateKey) console.log(textColor, "iPara private key bulunamadı! Lütfen settings.js dosyasını düzenleyiniz...");
    if (!settings.publicKey) console.log(textColor, "iPara public key bulunamadı! Lütfen settings.js dosyasını düzenleyiniz...");
    if (!settings.baseURL) console.log(textColor, "iPara base url bulunamadı. Lütfen settings.js dosyasını düzenleyiniz...");
    if (!settings.mode) console.log(textColor, "iPara mode bulunamadı. Lütfen settings.js dosyasını düzenleyiniz...")
}

checkStartup()

module.exports = {
    settings: settings,
    HOST: host,
    PORT: port,
    HOST_URL: hostAddress
}