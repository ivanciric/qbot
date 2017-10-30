module.exports = crypto;

var request = require("request");
var api = {
  list: 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
  total: 'https://api.coinmarketcap.com/v1/global/',
  detail: 'https://api.coinmarketcap.com/v1/ticker/'
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
            var message = 'Total Market Cap: ' + Number(body.total_market_cap_usd.toFixed(1)).toLocaleString() + ' USD \n\r';
            message += 'Bitcoin Dominance: ' + body.bitcoin_percentage_of_market_cap + '%';
            callback(message)
        }
    });
};

crypto.prototype.detail = function(currency, callback) {

    request({
        url: api.detail + currency + '/',
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200 && body.length)
        {
            var crypto = body[0]
            var message = crypto.name + ' - ' + crypto.symbol + '\n\r';
            message += 'USD: $' + crypto.price_usd + '\n\r';
            message += 'BTC: ' + crypto.price_btc + '\n\r';
            message += '1h: ' + crypto.percent_change_1h + '%\n\r';
            message += '24h: ' + crypto.percent_change_24h + '%\n\r';
            message += '7d: ' + crypto.percent_change_7d + '%';
            callback(message)
        } else {
          callback('whooops...')
        }
    });
};
