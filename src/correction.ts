var PI = Math.PI;
var equatorialRadius = 6378245.0;
var flattening = 0.00669342162296594323;

function transformLat(x: number, y: number) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
    return ret;
}

function transformLng(x: number, y: number) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
    return ret;
}

function transform(lng: number, lat: number) {
    var dLat = transformLat(lng - 105.0, lat - 35.0);
    var dLng = transformLng(lng - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * PI;
    var magic = Math.sin(radLat);
    magic = 1 - flattening * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((equatorialRadius * (1 - flattening)) / (magic * sqrtMagic) * PI);
    dLng = (dLng * 180.0) / (equatorialRadius / sqrtMagic * Math.cos(radLat) * PI);
    var mgLat = lat + dLat;
    var mgLng = lng + dLng;
    var newCoord = {
        lng: mgLng,
        lat: mgLat
    };
    return newCoord;
}

/** WGS8484 转国测局*/
export function wgs84ToGcj02(lng: number, lat: number) {
    var dLat = transformLat(lng - 105.0, lat - 35.0);
    var dLng = transformLng(lng - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * PI;
    var magic = Math.sin(radLat);
    magic = 1 - flattening * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((equatorialRadius * (1 - flattening)) / (magic * sqrtMagic) * PI);
    dLng = (dLng * 180.0) / (equatorialRadius / sqrtMagic * Math.cos(radLat) * PI);
    var mgLat = lat + dLat;
    var mgLng = lng + dLng;
    var newCoord = {
        lng: mgLng,
        lat: mgLat
    };
    return newCoord;
}

/** 国测局转 WGS84 */
export function gcj02ToWgs84(lng: number, lat: number) {
    var coord = transform(lng, lat);
    var lontitude = lng * 2 - coord.lng;
    var latitude = lat * 2 - coord.lat;
    var newCoord = {
        lng: lontitude,
        lat: latitude
    };
    return newCoord;
}
