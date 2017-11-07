const settings = {
    //"Private Magaza Anahtarı  - size mağaza başvurunuz sonucunda gönderilen privaye key (gizli anahtar) bilgisini kullanınız."
    privateKey : process.env.IPARA_PRIVATE_KEY || "",

    //"Public Magaza Anahtarı - size mağaza başvurunuz sonucunda gönderilen publik key (açık anahtar) bilgisini kullanınız.",
    publicKey : process.env.IPARA_PUBLIC_KEY || "",

    //iPara web servisleri API url'lerinin başlangıç bilgisidir. Restful web servis isteklerini takip eden kodlar halinde bulacaksınız.
    // Örneğin "https://api.ipara.com/" + "/rest/payment/auth"  = "https://api.ipara.com/rest/payment/auth"
    baseURL : process.env.IPARA_BASE_URL || "https://api.ipara.com/",

    // Kullandığınız iPara API versiyonudur.
    version : "1.0",

    // Test -> T, entegrasyon testlerinin sırasında "T" modunu, canlı sisteme entegre olarak ödeme almaya başlamak için ise Prod -> "P" modunu kullanınız.
    mode : process.env["IPARA_MODE"] || "T"
}

function errorHandler(text){
    const textColor = '\x1b[36m%s\x1b[0m';
    throw new Error(text, textColor)
}

if(!settings.privateKey) return errorHandler("iPara private key bulunamadı! Lütfen settings.js dosyasını düzenleyiniz...");
if(!settings.publicKey) return errorHandler("iPara public key bulunamadı! Lütfen settings.js dosyasını düzenleyiniz...");
if(!settings.baseURL) return errorHandler("iPara base url bulunamadı. Lütfen settings.js dosyasını düzenleyiniz...");
if(!settings.mode) return errorHandler("iPara mode bulunamadı. Lütfen settings.js dosyasını düzenleyiniz...")


module.exports = settings
