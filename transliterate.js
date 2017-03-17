module.exports = transliterator;

function transliterator(responder) {
    this.responder = responder;
}

transliterator.prototype.convert = function(cyrillicArray, callback) {

    var originalText = cyrillicArray[1];

    var Cyr2Lat = {
        "а" : "a",
        "б" : "b",
        "ц" : "c",
        "д" : "d",
        "е" : "e",
        "ф" : "f",
        "г" : "g",
        "х" : "h",
        "и" : "i",
        "ј" : "j",
        "к" : "k",
        "л" : "l",
        "м" : "m",
        "н" : "n",
        "о" : "o",
        "п" : "p",
        "р" : "r",
        "с" : "s",
        "т" : "t",
        "у" : "u",
        "в" : "v",
        "з" : "z",

        "А" : "A",
        "Б" : "B",
        "Ц" : "C",
        "Д" : "D",
        "Е" : "E",
        "Ф" : "F",
        "Г" : "G",
        "Х" : "H",
        "И" : "I",
        "Ј" : "J",
        "К" : "K",
        "Л" : "L",
        "М" : "M",
        "Н" : "N",
        "О" : "O",
        "П" : "P",
        "Р" : "R",
        "С" : "S",
        "Т" : "T",
        "У" : "U",
        "В" : "V",
        "З" : "Z",

        "ч" : "č",
        "ћ" : "ć",
        "ђ" : "đ",
        "ж" : "ž",
        "ш" : "š",
        "љ" : "lj",
        "њ" : "nj",
        "ђ" : "đ",
        "џ" : "dz",

        "Ч" : "Č",
        "Ћ" : "Ć",
        "Ђ" : "Đ",
        "Ж" : "Ž",
        "Ш" : "Š",
        "Љ" : "Lj",
        "Њ" : "Nj",
        "Ђ" : "Đ",
        "Џ" : "Dž"
    };

    var value = originalText.split('');

    for( var i=0; i < value.length; i++){

        value[i] = (Cyr2Lat[value[i]] && Cyr2Lat[value[i]] != "") ? Cyr2Lat[value[i]] : value[i];
    }

    var result = value.join('');

    callback( result );
};
