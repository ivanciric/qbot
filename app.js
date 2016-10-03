var restify = require('restify');
var builder = require('botbuilder');
var fs = require('fs');
// import dialogs

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

hrana = [
    'Stigli kinezi!',
    'Stigao giros!',
    'Stigla pica!',
    'Stigle kiflice'
];

killing = [
    'Kill all humans! Kill all humans!',
    'Samo cekam da zaspite...'
];

sexy = [
    'Roboti su sexy',
    'Iju naopako!'
];

what = [
    'Otkud ja znam...',
    'Ma radi sta hoces..',
    'Nemam pojma..'
];

football = [
    'Idem i ja!',
    'Nema zuvanja!',
    '3 korne penal!'
];

beer = [
    'Moze pivce.',
    'Pivce za zivce.',
    'Pivce za svemirce.'
];

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
        var foodItem = hrana[Math.floor(Math.random()*hrana.length)];
        session.send(foodItem);
    }

    if(session.message.text.toLowerCase().contains('ubi')
    || session.message.text.toLowerCase().contains('uhod')){
        var killItem = killing[Math.floor(Math.random()*killing.length)];
        session.send(killItem);
    }

    if(session.message.text.toLowerCase().contains('sex')
        || session.message.text.toLowerCase().contains('fuc')){
        var sexyItem = sexy[Math.floor(Math.random()*sexy.length)];
        session.send(sexyItem);
    }

    if(session.message.text.toLowerCase().contains('radi')
        || session.message.text.toLowerCase().contains('sta')){
        var whatItem = what[Math.floor(Math.random()*what.length)];
        session.send(whatItem);
    }

    if(session.message.text.toLowerCase().contains('fudb')
        || session.message.text.toLowerCase().contains('footb')
        || session.message.text.toLowerCase().contains('fuca')
        || session.message.text.toLowerCase().contains('fucu')){
        var footballItem = football[Math.floor(Math.random()*football.length)];
        session.send(footballItem);
    }

    if(session.message.text.toLowerCase().contains('pivo')
        || session.message.text.toLowerCase().contains('beer')
        || session.message.text.toLowerCase().contains('piv')){
        var beerItem = beer[Math.floor(Math.random()*beer.length)];
        session.send(beerItem);
    }

    // foreach dialogs...

});
