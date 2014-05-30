var fs = require('fs');
var path = require('path');
var Parser = require('./parser');
var Statement = require('./statement');

var includeFiles = {};

var Configuration = function () {
    this._configuration = {};
};

Configuration.prototype.add = function (file) {
    var input = path.resolve(process.cwd(), file);
    includeFiles[input] = true;
    var data = fs.readFileSync(input, {encoding: 'utf8'});
    var parser = new Parser(data);
    var statement;
    var section;
    var sectionName;
    while (statement = parser.next()) {
        switch (statement.type) {
            case Statement.SECTION:
                sectionName = statement.value;
                section = this._configuration[sectionName] = this._configuration[sectionName] || {};
                break;
            case Statement.INCLUDE:
                var includeFile = path.resolve(path.dirname(file), statement.value);
                if (includeFiles[includeFile]) {
                    console.error('Cyclic dependency ignored: ' + includeFile + ' <- ' + file + ' <- ' + statement.value);
                } else {
                    includeFiles[includeFile] = true;
                    this.add(includeFile);
                }
                break;
            case Statement.PARAMETER:
                section[statement.value.name] = statement.value.parameter;
                break;
            case Statement.ARRAY:
                //FIXME
                var array;
                if (!(array = section[statement.value.name])) {
                    array = section[statement.value.name] = [];
                };
                section[statement.value.name] = [].concat(array, statement.value.parameter);
                break;
        }
    }

    delete includeFiles[input];
};

Configuration.prototype.serialize = function () {
    var result = [];
    Object.keys(this._configuration).forEach(function (sectionName) {
        var section = this._configuration[sectionName];
        if (section) {
            result.push('[' + sectionName + ']');
            Object.keys(section).forEach(function (parameterName) {
                var value = section[parameterName];
                if (value instanceof Array) {
                    result.push(parameterName + '=' + value.join(','));
                } else {
                    result.push(parameterName + '=' + value || '');
                }
            })
            result.push('');
        }
    }.bind(this));
    return result.join('\n');
};

module.exports = Configuration;
