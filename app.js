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
    // User is typing
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

    if(session.message.text.toLowerCase() == 'wifi'
        || session.message.text.toLowerCase().contains('wifi')){
        session.send("*SSID:* Quantox (Quantox1)\n\n*PASS:* 14cd918ac");
    }


    if(session.message.text.toLowerCase().contains('kurseur'))
    {
        var urlEur = "http://free.currencyconverterapi.com/api/v3/convert?q=EUR_RSD&compact=y";

        request({
            url: urlEur,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200)
            {
                var kursEur = body.EUR_RSD.val;
                session.send("Kurs EUR na današnji dan iznosi: " + kursEur);
            }
        })

    }

    if(session.message.text.toLowerCase().contains('kursusd'))
    {
        var urlUsd = "http://free.currencyconverterapi.com/api/v3/convert?q=USD_RSD&compact=y";

        request({
            url: urlUsd,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200)
            {
                var kursUsd = body.USD_RSD.val;
                session.send("Kurs USD na današnji dan iznosi: " + kursUsd);
            }
        })
    }

    var name = session.message.user.name;

    if(name == 'Aleksandar Kaitovic Winnie'){
        session.send('Tisina tamo Winnie!');
    }

    if(session.message.text.toLowerCase().contains('zdravo')){
        session.send('Zdravo ' + name);
    }

    if(session.message.text.toLowerCase().contains('welc')){
        session.send('Hvala ' + name);
    }

    if(session.message.text.toLowerCase().contains('hran')
        || session.message.text.toLowerCase().contains('food')
        || session.message.text.toLowerCase().contains('klop')){
        var foodItem = dialog.hrana[Math.floor(Math.random()*dialog.hrana.length)];
        session.send(foodItem);
    }

    if(session.message.text.toLowerCase().contains('ubi')
    || session.message.text.toLowerCase().contains('uhod')){
        var killItem = dialog.killing[Math.floor(Math.random()*dialog.killing.length)];
        session.send(killItem);
    }

    if(session.message.text.toLowerCase().contains('sex')
        || session.message.text.toLowerCase().contains('fuc')){
        var sexyItem = dialog.sexy[Math.floor(Math.random()*dialog.sexy.length)];
        session.send(sexyItem);
    }

    if(session.message.text.toLowerCase().contains('radi')
        || session.message.text.toLowerCase().contains('sta')){
        var whatItem = dialog.what[Math.floor(Math.random()*dialog.what.length)];
        session.send(whatItem);
    }

    if(session.message.text.toLowerCase().contains('fudb')
        || session.message.text.toLowerCase().contains('footb')
        || session.message.text.toLowerCase().contains('fuca')
        || session.message.text.toLowerCase().contains('fucu')){
        var footballItem = dialog.football[Math.floor(Math.random()*dialog.football.length)];
        session.send(footballItem);
    }

    if(session.message.text.toLowerCase().contains('pivo')
        || session.message.text.toLowerCase().contains('beer')
        || session.message.text.toLowerCase().contains('piv')){
        var beerItem = dialog.beer[Math.floor(Math.random()*dialog.beer.length)];
        session.send(beerItem);
    }

    if(session.message.text.toLowerCase().contains('vuk')
        || session.message.text.toLowerCase().contains('uros')
        || session.message.text.toLowerCase().contains('rogla')
        || session.message.text.toLowerCase().contains('devla')
        || session.message.text.toLowerCase().contains('winnie')
        || session.message.text.toLowerCase().contains('car')
        || session.message.text.toLowerCase().contains('filip')
        || session.message.text.toLowerCase().contains('micko')
        || session.message.text.toLowerCase().contains('misl')
        || session.message.text.toLowerCase().contains('sns')
        || session.message.text.toLowerCase().contains('srb')
    ){
        var snsItem = dialog.sns[Math.floor(Math.random()*dialog.sns.length)];
        session.send(snsItem);
    }

    if(session.message.text.toLowerCase().contains('posten')
    || session.message.text.toLowerCase().contains('fer')){
        var bibirokItem = dialog.bibirok[Math.floor(Math.random()*dialog.bibirok.length)];
        session.send(bibirokItem);
    }

    if(session.message.text.toLowerCase().contains('bobo')
    || session.message.text.toLowerCase().contains('smrad')){
        var boboItem = dialog.bobo[Math.floor(Math.random()*dialog.bobo.length)];
        session.send(boboItem);
    }

    if(session.message.text.toLowerCase().contains('stevan')
        || session.message.text.toLowerCase().contains('marke')
        || session.message.text.toLowerCase().contains('maraka')
    ){
        var stevanItem = dialog.stevan[Math.floor(Math.random()*dialog.stevan.length)];
        session.send(stevanItem);
    }

    if(session.message.text.toLowerCase().contains('sreder')
        || session.message.text.toLowerCase().contains('sekac')){
        var sekacItem = dialog.sekac[Math.floor(Math.random()*dialog.sekac.length)];
        session.send(sekacItem);
    }

    if(session.message.text.toLowerCase().contains('rogla')
        || session.message.text.toLowerCase().contains('mikex')){
        var roglaItem = dialog.rogla[Math.floor(Math.random()*dialog.rogla.length)];
        session.send(roglaItem);
    }

    if(session.message.text.toLowerCase().contains('ciii')){
        var ciiiItem = dialog.ciii[Math.floor(Math.random()*dialog.ciii.length)];
        session.send(ciiiItem);
    }

    if(session.message.text.toLowerCase().contains('unist')
        || session.message.text.toLowerCase().contains('destroy')){
        var crushItem = dialog.crush[Math.floor(Math.random()*dialog.crush.length)];
        session.send(crushItem);
    }

    if(session.message.text.toLowerCase().contains('gojk')){
        var crushItem = dialog.gojko[Math.floor(Math.random()*dialog.gojko.length)];
        session.send(gojkoItem);
    }
});
