var os = require('os');

var Parser = function (code) {
    this._code = code;
    this._codeLength = code.length;
    this._pos = 0;

    this.token = null;
};

Parser.prototype.next = function () {
    this.token = this._getNext();
};

Parser.prototype._getNextToken = function () {
    this._skipWhitespace();

    if (this._pos >= this._codeLength) {
        return new Token(Token.END_OF_FILE, null);
    }

    var char = this._code[this._pos];
    var value = '';

    if (isCommentStart(char)) {
        do {
            value += char;
            char = this._code[++this._pos];
        } while (!isEndOfLine(char));
        return new Token(Token.COMMENT, value);
    }

    if (isSectionNameStart(char)) {
        do {
            char = this._code[++this._pos];
            if (!isSectionNamePart(char)) {
                throw new Error('Parse error: Invalid section name.');
            }
            value += char;
        } while (!isSectionNameEnd(char));
        return new Token(Token.SECTION, value);
    }

    if (isKeyStart(char)) {
        do {
            value += char;
            char = this._code[++this._pos];
        } while (isKeyPart(char));
    }
};

Parser.prototype._skipWhitespace = function () {
    while (this._pos <= this._codeLength) {
        if (!isWhitespace(this._code[this._pos])) {
            break;
        }
        this._pos++;
    }
};

var Token = function (type, value) {
    this.type = type;
    this.value = value
};

Token.SECTION = 'section';
Token.PARAMETER = 'parameter';
Token.COMMENT = 'comment';
Token.END_OF_FILE = 'end of file';

function isEndOfLine(char) {
    return char === '\n';
}

function isWhitespace(char) {
    return /\s/.test(char);
}

function isAlphanumeric(char) {
    return /\w/.test(char);
}

function isCommentStart(char) {
    return ';#'.indexOf(char) >= 0;
}

function isSectionNameStart(char) {
    return char === '[';
}

function isSectionNamePart(char) {
    return isAlphanumeric(char)
        || char === '.';
}

function isSectionNameEnd(char) {
    return char === ']';
}

function isKeyStart(char) {
    return (char === '_')
        || (char >= 'a' && char <= 'z')
        || (char >= 'A' && char <= 'Z');
}

function isKeyPart(char) {
    return isAlphanumeric(char);
}

function isAssignment(char) {
    return char === '=';
}
