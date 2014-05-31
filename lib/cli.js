var fs = require('fs');
var path = require('path');
var Configuration = require('./configuration');

module.exports = function(program) {
    program
        .command('*')
        .action(function(input, output) {
            var configuration = new Configuration();
            configuration.add(input);
            var iniFile = configuration.serialize();
            if (typeof output === 'string') {
                fs.writeFile(
                    path.resolve(process.cwd(), output),
                    iniFile,
                    function (err) {
                        if (err) throw err;
                    }
                )
            } else {
                console.log(iniFile);
            }
        });
};
