var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var Configuraion = require('../lib/configuration');

var sampleFile = path.resolve(__dirname, 'sample.ini');
var sampleOutput = fs.readFileSync(path.resolve(__dirname, 'sample.out.ini'), {encoding: 'utf8'});

var sampleIncludeFile = path.resolve(__dirname, 'sample-include.ini');
var sampleIncludeOutput = fs.readFileSync(path.resolve(__dirname, 'sample-include.out.ini'), {encoding: 'utf8'});

var sampleDeepIncludeFile = path.resolve(__dirname, 'sample-deep-include.ini');
var sampleDeepIncludeOutput = fs.readFileSync(path.resolve(__dirname, 'sample-deep-include.out.ini'), {encoding: 'utf8'});

var sampleCyclicIncludeFile = path.resolve(__dirname, 'sample-cycle.ini');
var sampleCyclicIncludeOutput = fs.readFileSync(path.resolve(__dirname, 'sample-cycle.out.ini'), {encoding: 'utf8'});

describe('Configuration', function () {
    var configuration;

    beforeEach(function () {
        configuration = new Configuraion();
    });

    it('should parse single file', function () {
        configuration.add(sampleFile);
        expect(configuration.serialize()).to.equal(sampleOutput);
    });

    it('should parse file with single include', function () {
        configuration.add(sampleIncludeFile);
        expect(configuration.serialize()).to.equal(sampleIncludeOutput);
    });

    it('should parse file with several includes', function () {
        configuration.add(sampleDeepIncludeFile);
        expect(configuration.serialize()).to.equal(sampleDeepIncludeOutput);
    });

    it('should parse file with cyclic includes', function () {
        configuration.add(sampleCyclicIncludeFile);
        expect(configuration.serialize()).to.equal(sampleCyclicIncludeOutput);
    });
});
