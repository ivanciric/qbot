module.exports = intelligence;

function intelligence(responder, session, name) {
    this.responder = responder;
    this.session = session;
    this.name = name;
}

intelligence.prototype.think = function(text) {

    if(text.contains('hran')
        || text.contains('food')
        || text.contains('klop')){

        this.responder.spawnResponse('hrana'); // 'hrana' is the array name from dialogs.js
    }

    if(text.contains('ubi')
        || text.contains('uhod')){

        this.responder.spawnResponse('killing');
    }

    if(text.contains('sex')
        || text.contains('fuc')){

        this.responder.spawnResponse('sexy');
    }

    if(text.contains('radi')
        || text.contains('sta')){

        this.responder.spawnResponse('what');
    }

    if(text.contains('fudb')
        || text.contains('footb')
        || text.contains('fuca')
        || text.contains('fucu')){

        this.responder.spawnResponse('football');
    }

    if(text.contains('pivo')
        || text.contains('beer')
        || text.contains('piv')){

        this.responder.spawnResponse('beer');
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
        this.responder.spawnResponse('sns');
    }

    if(text.contains('posten')
        || text.contains('fer')){

        this.responder.spawnResponse('bibirok');
    }

    if(text.contains('bobo')
        || text.contains('smrad')){

        this.responder.spawnResponse('bobo');
    }

    if(text.contains('stevan')
        || text.contains('marke')
        || text.contains('maraka')
    ){
        this.responder.spawnResponse('stevan');
    }

    if(text.contains('sreder')
        || text.contains('sekac')){

        this.responder.spawnResponse('sekac');
    }

    if(text.contains('rogla')
        || text.contains('mikex')){

        this.responder.spawnResponse('rogla');
    }

    if(text.contains('ciii')){

        this.responder.spawnResponse('ciii');
    }

    if(text.contains('unist')
        || text.contains('destroy')){

        this.responder.spawnResponse('crush');
    }

    if(text.contains('gojk')){

        this.responder.spawnResponse('gojko');
    }

    if(text.contains('injustice')){

        this.responder.spawnResponse('injustice');
    }

    if(text.contains('pesm')
        || text.contains('muzik')
        || text.contains('music')
    ){
        this.responder.spawnResponse('music');
    }

    if(text.contains('kralj')
        || text.contains('car')
    ){
        this.responder.spawnResponse('kingEmperor');
    }

    if(text.contains('faktur')
    ){
        this.responder.spawnResponse('faktura');
    }

    if(text.contains('napravio')
        || text.contains('kreator')
        || text.contains('creator')
    ){
        this.responder.spawnResponse('creator');
    }

    if(text.contains('zovem')){

        var randomTitle = this.responder.spawnResponse('titles', 1);

        this.session.send('Ti se zoves ' + this.name + ' ' + randomTitle);
    }

    if(text == 'wifi' || text.contains('wifi')){
        this.session.send("*SSID:* Quantox (Quantox1)\n\n*PASS:* 14cd918ac");
    }

    if(text.contains('zdravo')){
        this.session.send('Zdravo ' + name);
    }

    if(text.contains('welc')){
        this.session.send('Hvala ' + name);
    }

};
