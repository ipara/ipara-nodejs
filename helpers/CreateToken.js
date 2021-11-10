const crypto = require("crypto");

function CreateToken(publicKey, hashString) {
    const sifreli = crypto
        .createHash("sha1")
        .update(hashString.trim(), "utf8")
        .digest("base64");
    return publicKey + ":" + sifreli;
}

module.exports = CreateToken;
