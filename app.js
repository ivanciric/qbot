var fs      = require('fs');
var restify = require('restify');
var builder = require('botbuilder');
var dialog  = require('./dialogs.js');
var request = require("request");
var env     = require("./env.js");

var serverOptions = {};

if(env.environment != 'DEVELOPMENT') {

    serverOptions = {
        key: fs.readFileSync( env.key ),
        certificate: fs.readFileSync( env.certificate )
    };
}

var server = restify.createServer(serverOptions);

server.listen(process.env.port || process.env.PORT || 9292, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: env.appId,
    appPassword: env.appPassword
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

bot.on('contactRelationUpdate', function (message) {
    if (message.action === 'add') {
        var name = message.user ? message.user.name : null;
        var reply = new builder.Message()
            .address(message.address)
            .text("Zdravo %s... ", name || 'there');
        bot.send(reply);
    } else {
        // delete data
    }
});

bot.on('typing', function (message) {
    // User is typing...
});

bot.on('deleteUserData', function (message) {

});

String.prototype.contains = function(content){
    return this.indexOf(content) !== -1;
};

bot.on('conversationUpdate', function (message) {

    if (message.address.conversation.isGroup) {

        if (message.membersAdded) {
            message.membersAdded.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    var reply = new builder.Message()
                        .address(message.address)
                        .text("Zdravo svima!");
                    bot.send(reply);
                }
            });
        }

        if (message.membersRemoved) {
            message.membersRemoved.forEach(function (identity) {
                if (identity.id === message.address.bot.id) {
                    var reply = new builder.Message()
                        .address(message.address)
                        .text("Cao!");
                    bot.send(reply);
                }
            });
        }
    }
});


bot.dialog('/', function (session) {

    var text = session.message.text.toLowerCase();
    var name = session.message.user.name;

    if(text == 'wifi' || text.contains('wifi')){
        session.send("*SSID:* Quantox (Quantox1)\n\n*PASS:* 14cd918ac");
    }

    if(name == 'Aleksandar Kaitovic Winnie'){
        session.send('Tisina tamo Winnie!');
    }

    if(text.contains('zdravo')){
        session.send('Zdravo ' + name);
    }

    if(text.contains('welc')){
        session.send('Hvala ' + name);
    }



    // dialogs.js driven response function
    function spawnResponse(varName, itemOnly)
    {
        var dialogItem = dialog[varName][Math.floor(Math.random()*dialog[varName].length)];

        if(itemOnly){
            return dialogItem;
        }else{
            session.send(dialogItem);
        }

    }

    if(text.contains('zovem')){

        var randomTitle = spawnResponse('titles', 1);

        session.send('Ti se zoves ' + name + ' ' + randomTitle);
    }

    if(text.contains('hran')
        || text.contains('food')
        || text.contains('klop')){

        spawnResponse('hrana'); // 'hrana' is the array name from dialogs.js
    }

    if(text.contains('ubi')
        || text.contains('uhod')){

        spawnResponse('killing');
    }

    if(text.contains('sex')
        || text.contains('fuc')){

        spawnResponse('sexy');
    }

    if(text.contains('radi')
        || text.contains('sta')){
        
        spawnResponse('what');
    }

    if(text.contains('fudb')
        || text.contains('footb')
        || text.contains('fuca')
        || text.contains('fucu')){

        spawnResponse('football');
    }

    if(text.contains('pivo')
        || text.contains('beer')
        || text.contains('piv')){

        spawnResponse('beer');
    }

    if(text.contains('vuk')
        || text.contains('uros')
        || text.contains('rogla')
        || text.contains('devla')
        || text.contains('winnie')
        || text.contains('car')
        || text.contains('filip')
        || text.contains('micko')
        || text.contains('misl')
        || text.contains('sns')
        || text.contains('srb')
    ){
        spawnResponse('sns');
    }

    if(text.contains('posten')
        || text.contains('fer')){

        spawnResponse('bibirok');
    }

    if(text.contains('bobo')
        || text.contains('smrad')){

        spawnResponse('bobo');
    }

    if(text.contains('stevan')
        || text.contains('marke')
        || text.contains('maraka')
    ){
        spawnResponse('stevan');
    }

    if(text.contains('sreder')
        || text.contains('sekac')){

        spawnResponse('sekac');
    }

    if(text.contains('rogla')
        || text.contains('mikex')){

        spawnResponse('rogla');
    }

    if(text.contains('ciii')){

        spawnResponse('ciii');
    }

    if(text.contains('unist')
        || text.contains('destroy')){

        spawnResponse('crush');
    }

    if(text.contains('gojk')){

        spawnResponse('gojko');
    }

    if(text.contains('injustice')){

        spawnResponse('injustice');
    }

    if(text.contains('pesm')
        || text.contains('muzik')
        || text.contains('music')
    ){
        spawnResponse('music');
    }

    /**
     * Ovaj blok je zaduzen za prikaz iznosa jedne valute u drugoj.
     * Primer: koliko iznosi 16 usd u rsd
     */
    var exchangeOffice = text.match(/([0-9.]+) ([a-z]{3}) (to|u) ([a-z]{3})/i);

    if(exchangeOffice && exchangeOffice.length > 0)
    {
        var fromTo = (exchangeOffice[2] + "_" + exchangeOffice[4]).toUpperCase();
        var currencyUrl = "http://free.currencyconverterapi.com/api/v3/convert?q=" + fromTo + "&compact=y";

        request({
            url: currencyUrl,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200)
            {
                if(body[fromTo])
                {
                    var conversionResult = parseFloat(( body[fromTo].val * exchangeOffice[1] )).toFixed(2);

                    session.send( exchangeOffice[0] + " iznosi: " + conversionResult );

                }else{
                    session.send("Nije mi poznat kurs za " + exchangeOffice[2] + " u " + exchangeOffice[4]);
                }

            }
        })

    }

    /**
     * Linence server phpstorm
     */
    if(text.contains('phpstorm') || text.contains('php storm')){

        session.send('Treba ti licence server za PhpStorm? Mozes da probas ovaj http://jetbrains.tencent.click samo ' +
            'ticu molim te, ovo nisi cuo od mene ;)');
    }

    /**
     * Relationships
     */
    var relationshipQuestion = text.match(/([a-z]) (with|sa) ([a-z])/i);

    if(relationshipQuestion && relationshipQuestion.length > 0){

        var percentage = Math.floor(Math.random() * 99) + 1;

        if(percentage<50){
            var randomRelationship = spawnResponse('relationshipsNegative', 1);
        } else {
            var randomRelationship = spawnResponse('relationshipsPositive', 1);
        }

        session.send('Vas dvoje se slazete ' + percentage + '% ' + randomRelationship);

    }

    /**
     * Weather - current temperature in Belgrade & Cacak
     */
    if(text.contains('vrem') || text.contains('temp'))
    {
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

                session.send('Beograd: ' + parseFloat(weatherBelgrade.temp).toFixed(1) + ' °C\n\nČačak: ' +
                    parseFloat(weatherCacak.temp).toFixed(1) + ' °C');
            }
        })
    }

});
