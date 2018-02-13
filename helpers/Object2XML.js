//Convert Objects to XML
function ObjectToXML(obj, overrideRootNameAs) {
    if (!obj) {
        return "";
    }
    xml2js = require('xml2js');
    var xmlBuilder = new xml2js.Builder({ explicitRoot: true });
    if (!overrideRootNameAs) {
        var xmlBuilder = new xml2js.Builder({ explicitRoot: true });
    } else {
        var xmlBuilder = new xml2js.Builder({ explicitRoot: false, rootName: overrideRootNameAs });
    }
    convertedObjects = xmlBuilder.buildObject(obj);
    console.log(convertedObjects);
    return convertedObjects;
}
module.exports = ObjectToXML