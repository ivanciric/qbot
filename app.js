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

sns = [
    'Mere stednje i sprovedene reforme znatno su popravile finansijsku situaciju u Srbiji!',
    'Marljivim radom koji nam ova vlada pokazuje, ne mozemo manje ni ocekivati.',
    'Brojke govore sve, Srbija se nalazi na putu ekonomskog oporavka.',
    'Treba da budemo srećni što neko toliko zapinje da budemo jednog dana kao Švajcarska',
    'Pa i trudili smo se jako, a reforme su urodile plodom',
    'Vukovo zalaganje i naporan rad je doveo do toga.',
    'Na dobrom smo putu, a Svajcarska moze da nam bude dobar cilj koji bi trebali da stignemo.',
    'Evidentno je da smo krenuli putem oporavka, smanjena je nezaposlenost a na listi Duing biznis Svetske banke napredovali smo ove godine za 32 mesta.',
    'Kriza nam je bila pred vratima, ali oterali smo je zajednickom promajom. ',
    'Bilo je krajnje vreme da se otrgnemo od provalije zvane bankrot, ko bi nas izvukao iz bule da ne bi Vuka?',
    'Za sada smo na dobrom putu, moramo ovako nastaviti i gradjani ce osetiti boljitak.',
    'Napredak nase zemlje na polju povecavanja boja zaposlenih a smanjenja nezaposlenih je evidentan. Samo polako, strpljivo i rast ce biti sve veci i veci.',
    'Stednjom i reformama uspeli smo da državu dovedemo u stabilno stanje.',
    'Narod razume da je do odredjenih mera moralo doci, zato je i dala poverenje Vuku. Posle mera, sledi period napretka i porasta plata i penzija.',
    'Naravno da ne mozemo da postanemo Svajcarska preko noci, ali da ima pozitivnih rezultata ne moze niko da ospori.'
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
        var snsItem = sns[Math.floor(Math.random()*sns.length)];
        session.send(snsItem);
    }
    
    // foreach dialogs...

});
