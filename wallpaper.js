module.exports = wallpaper;

var request = require("request");

function wallpaper() {}

wallpaper.prototype.getRandom = function(callback) {

    var url = "https://api.unsplash.com/photos/random?client_id=d6d0b08e88d27688a2b226431380820e2511f21faba56b7fcfb2698be1db8a44";

    request({
        url: url,
        json: true
    }, function (error, response, body) {
        callback(body.urls.raw)
    });
};
