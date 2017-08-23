module.exports = weather;

var request = require("request");

function weather() {}

weather.prototype.fetchTemp = function(callback) {

    var urlVreme = "http://api.openweathermap.org/data/2.5/group?id=791148,792078,3189595,789128 " +
        "&appid=8468ccd3277f4d4a4b8f815a3b2bd756&units=metric";

    request({
        url: urlVreme,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200)
        {
            var weatherBelgrade = '';

            var weatherCacak = '';

            var weatherSubotica = '';

            var weatherKragujevac = '';

            body.list.forEach(function (item) {

                if( item.id == '791148' ){// Belgrade
                    weatherBelgrade = item.main;
                }

                if( item.id == '792078' ){// Cacak
                    weatherCacak = item.main;
                }

                if( item.id == '3189595' ){// Subotica
                    weatherSubotica = item.main;
                }

                if( item.id == '789128' ){// Kragujevac
                    weatherKragujevac = item.main;
                }



            });

            callback('Beograd: ' + parseFloat(weatherBelgrade.temp).toFixed(1) + ' °C\n\nČačak: ' +
                parseFloat(weatherCacak.temp).toFixed(1) + ' °C\n\nKragujevac: ' + parseFloat(weatherKragujevac.temp).toFixed(1) + ' °C\n\nSubotica: ' +
                parseFloat(weatherSubotica.temp).toFixed(1));
        }
    });
};
