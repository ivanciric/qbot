module.exports = exchange;

var request = require("request");

function exchange(responder) {
    this.responder = responder;
}

exchange.prototype.convert = function(conversionArray, callback) {

    var fromTo = (conversionArray[2] + "_" + conversionArray[4]).toUpperCase();
    var currencyUrl = "http://free.currencyconverterapi.com/api/v3/convert?q=" + fromTo + "&compact=y";

    request({
        url: currencyUrl,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200)
        {
            if(body[fromTo])
            {
                var conversionResult = parseFloat(( body[fromTo].val * conversionArray[1] )).toFixed(2);

                callback( conversionArray[0] + " iznosi: " + conversionResult );

            }else{
                callback( "Nije mi poznat kurs za " + conversionArray[2] + " u " + conversionArray[4] );
            }
        }
    });
};
