const crypto = require("crypto");
const settings = require("../settings");

function cumputeHash(hashString){
    return crypto.createHash('sha1').update(hashString.trim(), "utf8").digest('base64');
}

module.exports = cumputeHash