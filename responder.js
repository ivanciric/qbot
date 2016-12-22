module.exports = responder;

function responder(dialog, session) {
    this.dialog = dialog;
    this.session = session;
}

responder.prototype.spawnResponse = function(varName, itemOnly) {

    var dialogItem = this.dialog[varName][Math.floor(Math.random()*this.dialog[varName].length)];

    if(itemOnly){
        return dialogItem;
    }else{
        this.session.send(dialogItem);
    }
};
