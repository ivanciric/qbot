module.exports = crypto;

var request = require("request");
var api = {
  list: 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
  total: 'https://api.coinmarketcap.com/v1/global/'
}


function crypto(responder) {
    this.responder = responder;
}

crypto.prototype.list = function(callback) {

    request({
        url: api.list,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200)
        {
            var cryptos = body
              .map(function(crypto) { return crypto.name + ': ' + crypto.price_usd; })
              .join('\n\r')
            callback(cryptos)
        } else {
          callback('Neka greska sa CoinMarketCap servisom. Mozda ste probili rate limit :O')
        }
    });
};

crypto.prototype.total = function(callback) {

    request({
        url: api.total,
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
