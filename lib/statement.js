var Statement = function (line) {
    this.type = Statement.UNKNOWN;
    this.value = null;

    var data;
    if (data = execBlankLine(line)) {
        this.type = Statement.BLANK;
        this.value = null;

    } else if (data = execComment(line)) {
        this.type = Statement.COMMENT;
        this.value = data[1].trim();

    } else if (data = execInclude(line)) {
        this.type = Statement.INCLUDE;
        this.value = data[1];

    } else if (data = execSectionName(line)) {
        this.type = Statement.SECTION;
        this.value = data[1];

    } else if (data = execAssignment(line)) {
        this.type = Statement.PARAMETER;
        this.value = {
            name: data[1],
            parameter: data[2]
        };

    } else if (data = execArrayAssignment(line)) {
        this.type = Statement.ARRAY;
        this.value = {
            name: data[1],
            parameter: data[2].split(',')
        };
    }
};

Statement.BLANK = 'blank';
Statement.COMMENT = 'comment';
Statement.INCLUDE = 'include';
Statement.SECTION = 'section';
Statement.PARAMETER = 'parameter';
Statement.ARRAY = 'array parameter';
Statement.UNKNOWN = 'unknown';

function execBlankLine(line) {
    return /^\s*$/.exec(line);
}

function execComment(line) {
    return /^[;#]\s*(.*)$/.exec(line);
}

function execInclude(line) {
    return /^include "([\w-_\./\\]+)"$/.exec(line);
}

function execSectionName(line) {
    return /^\[([_\.\w\s]+)\]$/.exec(line);
}

function execAssignment(line) {
    return /^(\w+)=([^,]*)$/.exec(line);
}

function execArrayAssignment(line) {
    return /^(\w+)(?:\[\])?=((?:.+,?\s*)+)$/.exec(line);
}

module.exports = Statement;
