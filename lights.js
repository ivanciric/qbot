module.exports = lights;

var request = require("request");

function lights() {}

lights.prototype.switch = function(url, lightName, lightCommand, callback) {

    var command;

    if(lightCommand == 'on'){
        command = 1;
    }

    if(lightCommand == 'off'){
        command = 0;
    }

    request({
        url: url + lightName + '/' + command,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200)
        {
            var status = 'ugašeno';
            if(command == 1){
                status = 'upaljeno';
            }
            callback('Svetlo ' + status + '.' );
        }
    });
};
