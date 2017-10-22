var fs      = require('fs');
var env     = require("./env");
var request = require("request");
var restify = require('restify');
var Weather = require("./weather");
var Lights = require("./lights");
var dialog  = require('./dialogs');
var builder = require('botbuilder');
var Exchange = require("./exchange");
var Responder = require("./responder");
var Meme = require("./meme");
var Intelligence = require("./intelligence");
var Relationships = require("./relationships");
var Transliterator = require("./transliterate");
var Crypto = require("./crypto");

const io    = require('socket.io-client');

var serverOptions = {};

if(env.environment != 'DEVELOPMENT')
{
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

String.prototype.contains = function(content){
    return this.indexOf(content) !== -1;
};

bot.dialog('/', function (session) {

    var text = session.message.text.toLowerCase();
    var name = session.message.user.name;
    var responder = new Responder(dialog, session);
    var weather = new Weather(session);
    var relationships = new Relationships(responder);
    var exchange = new Exchange();
    var transliterator = new Transliterator();
    var intelligence = new Intelligence(responder, session, name);
    var meme = new Meme();
    var lights = new Lights();
    var crypto = new Crypto();

    /**
     * Main responder
     */
    intelligence.think(text);

    /**
     * Ovaj blok je zaduzen za prikaz iznosa jedne valute u drugoj.
     * Primer: koliko iznosi 16 usd u rsd
     */
    var exchangeOffice = text.match(/([0-9.]+) ([a-z]{3}) (to|u) ([a-z]{3})/i);

    if(exchangeOffice && exchangeOffice.length > 0)
    {
        return exchange.convert(exchangeOffice, function(conversion){
            session.send( conversion );
        });
    }

    /**
     * Transliteration block
     * Ex: cir2lat some-latin-text
     */
    var cyrillic = text.match(/cir2lat(.*)/);

    if(cyrillic && cyrillic.length > 0)
    {
        return transliterator.convert(cyrillic, function(result){
            session.send( result );
        });
    }

    /**
     * Relationships
     */
    var relationshipQuestion = text.match(/([a-z]) (with|sa) ([a-z])/i);

    if(relationshipQuestion && relationshipQuestion.length > 0){

        session.send( relationships.match() );
    }

    /**
     * Weather - current temperature in Belgrade & Cacak
     */
    if(text.contains('vrem') || text.contains('temp'))
    {
        return weather.fetchTemp(function(temp){
            session.send( temp );
        });
    }

    /**
     * Meme - generate meme.
     *
     * usage: meme {memeIdentifier}/{upperText}/{lowerText}
     * ex: meme buzz/jokers/jokers-everywhere
     *
     * Texts are typed as url friendly slugs.
     *
     * You can get the meme identifiers list by typing "memes".
     */
    var memeData = text.match(/(meme) (.*)/i);

    if(memeData && memeData.length > 0)
    {
        return meme.make(memeData[2], function(memeImg){
            session.send( memeImg );
        });
    }

    /**
     * Klima control
     *
     */
    var klimaData = text.match(/(klima) (.*) (.*)/i);

    if(klimaData && klimaData.length > 0)
    {
        var klimaName = klimaData[2];
        var klimaCommand = klimaData[3];

        var klimaHost = env.klimas[klimaName];

        if(klimaCommand == 'power'){
            var socket  = io.connect(klimaHost, { reconnect: true });
            socket.emit('key_power', {
                remote_name: 'klimax',
                command: 'KEY_POWER',
                user_id: 'someuser',
                timestamp: new Date()
            });
            session.send( 'Komanda "' + klimaCommand + '" prosledjena na klimu br. ' + klimaName);
        }else{
            session.send( '"' + klimaCommand + '" nije validna komanda. Foooo! (try power)');
        }
    }

    /**
     * Lights control
     *
     */
    var lightsData = text.match(/(svetlo) (.*) (.*)/i);

    if(lightsData && lightsData.length > 0)
    {
        var lightName = lightsData[2];
        var lightCommand = lightsData[3];

        if(lightCommand != 'on' && lightCommand != 'off'){
            session.send( '"' + lightCommand + '" nije validna komanda za prosvetljenje.');
        }

        return lights.switch(env.lightsUrl, env.lightsMap[lightName], lightCommand, function(response){
            session.send( response );
        });
    }

    if(text.contains('memes'))
    {
        return meme.list(function(memes){

            session.send( memes );
        });
    }

    /**
     * Crypto data - list currencies
     */
    if(text.contains('crypto')
        || text.contains('kripto')
        || text.contains('btc')
        || text.contains('eth')
        || text.contains('bqx'))
    {
        return crypto.list(function(list){
            session.send( list );
        });
    }
    
    /**
     * Crypto data - total market cap
     */
    if((text.contains('crypto') && text.contains('total'))
        || text.contains('marketcap')
        || text.contains('market cap'))
    {
        return crypto.total(function(total){
            session.send( total );
        });
    }

});
