module.exports = meme;

var request = require("request");

function meme() {}

meme.prototype.make = function(memeData, callback) {

    var memeUrl = "https://memegen.link/" + memeData + '.jpg';

    callback(memeUrl);
};

meme.prototype.list = function(callback) {

    var memeListUrl = "https://memegen.link/api/templates/";

    request({
        url: memeListUrl,
        json: true
    }, function (error, response, body) {

        var availableMemes = '';

        for(var key in body){

            var urlComponents = body[key].split('/');

            var memeIdentifier = urlComponents.slice(-1)[0];

            availableMemes += '*' + key + '*: ' + memeIdentifier + "\n\n";
        }

        callback(availableMemes);
    });
};