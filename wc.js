module.exports = wc;

var request = require("request");
var PubNub = require('pubnub');

function wc() {}

var lastValue = false

var pubnub = new PubNub({
    subscribeKey: "sub-c-91b7a03c-adb1-11e7-af03-56d0cae65fed",
    publishKey: "pub-c-bee512ca-67d6-4f68-883f-b74c2b818619",
    secretKey: "sec-c-YzUyYTY2YzAtNGMwNS00MTJkLWE3ZWUtODUyNDQwNDVkZGY0",
    ssl: true
})

pubnub.addListener({
    message: function(m) {
        lastValue = m.message
    }
})

pubnub.subscribe({
    channels: ['quantox']
});

wc.prototype.isFree = function(callback) {
    var message = 'WC je ' + (lastValue === 1 ? 'zauzet' : 'slobodan');
    callback(message)
};
