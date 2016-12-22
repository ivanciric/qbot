module.exports = relationships;

function relationships(responder) {
    this.responder = responder;
}

relationships.prototype.match = function() {

    var percentage = Math.floor(Math.random() * 99) + 1;

    var randomRelationship = this.responder.spawnResponse('relationshipsPositive', 1);

    if(percentage < 50){
        randomRelationship = this.responder.spawnResponse('relationshipsNegative', 1);
    }

    return 'Vas dvoje se slazete ' + percentage + '% ' + randomRelationship;
};
