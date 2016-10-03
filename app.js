var fs = require('fs');
var restify = require('restify');
var builder = require('botbuilder');
var dialog = require('./dialogs.js');

var server = restify.createServer({
    key: fs.readFileSync('/etc/apache2/ssl/yoshi.key'),
    certificate: fs.readFileSync('/etc/apache2/ssl/yoshi.crt'),
});

server.listen(process.env.port || process.env.PORT || 9292, function () {
    console.log('%s listening to %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
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

    if(session.message.text.toLowerCase().contains('zdravo')){
        session.send('Zdravo!');
    }

    if(session.message.text.toLowerCase().contains('welc')){
        session.send('Hvala!');
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
        || session.message.text.toLowerCase().contains('direk')
        || session.message.text.toLowerCase().contains('fil')
        || session.message.text.toLowerCase().contains('bot')
        || session.message.text.toLowerCase().contains('mis')
        || session.message.text.toLowerCase().contains('sns')
        || session.message.text.toLowerCase().contains('pol')
        || session.message.text.toLowerCase().contains('trol')
        || session.message.text.toLowerCase().contains('devl')
        || session.message.text.toLowerCase().contains('rogl')
        || session.message.text.toLowerCase().contains('dan')
        || session.message.text.toLowerCase().contains('srb')
        || session.message.text.toLowerCase().contains('svaj')
        || session.message.text.toLowerCase().contains('srp')
        || session.message.text.toLowerCase().contains('ekon')
        || session.message.text.toLowerCase().contains('sit')
        || session.message.text.toLowerCase().contains('ref')
        || session.message.text.toLowerCase().contains('rad')
        || session.message.text.toLowerCase().contains('ban')
        || session.message.text.toLowerCase().contains('noc')
        || session.message.text.toLowerCase().contains('mer')
        || session.message.text.toLowerCase().contains('tru')
        || session.message.text.toLowerCase().contains('kriz')
        || session.message.text.toLowerCase().contains('ko')
    ){
        var snsItem = dialog.sns[Math.floor(Math.random()*dialog.sns.length)];
        session.send(snsItem);
    }

});
