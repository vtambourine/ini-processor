var os = require('os');
var Statement = require('./statement');

var Parser = function (data) {
    this._content = data.split(os.EOL);
    this._line = 0;
};

Parser.prototype.next = function () {
    return this._getNextStatement();
};

Parser.prototype._getNextStatement = function () {
    if (this._line >= this._content.length) {
        return null;
    }
    var statement = new Statement(this._content[this._line]);
    this._line++;

    switch (statement.type) {
        case Statement.BLANK:
            statement = this._getNextStatement();
            break;
        case Statement.UNKNOWN:
            throw new Error('Parser error: unrecognized statement at line ' + this._line + '.');
            break;
    }

    return statement;
};

module.exports = Parser;
