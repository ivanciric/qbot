module.exports = weather;

var request = require("request");

function weather() {}

weather.prototype.fetchTemp = function(callback) {

    var urlVreme = "http://api.openweathermap.org/data/2.5/group?id=791148,792078" +
        "&appid=8468ccd3277f4d4a4b8f815a3b2bd756&units=metric";

    request({
        url: urlVreme,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200)
        {
            var weatherBelgrade = '';

            var weatherCacak = '';

            body.list.forEach(function (item) {

                if( item.id == '791148' ){// Belgrade
                    weatherBelgrade = item.main;
                }

                if( item.id == '792078' ){// Cacak
                    weatherCacak = item.main;
                }
            });

            callback('Beograd: ' + parseFloat(weatherBelgrade.temp).toFixed(1) + ' °C\n\nČačak: ' +
                parseFloat(weatherCacak.temp).toFixed(1) + ' °C');
        }
    });
};
