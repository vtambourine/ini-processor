var expect = require('chai').expect;
var Statement = require('../lib/statement');

describe('Statement', function () {
    it('should create blank statement', function () {
        expect(new Statement('')).to.deep.equal({ type: Statement.BLANK, value: null });
        expect(new Statement('   ')).to.deep.equal({ type: Statement.BLANK, value: null });
        expect(new Statement('   \n')).to.deep.equal({ type: Statement.BLANK, value: null });
    });

    it('should create comment statement', function () {
        expect(new Statement(';')).to.deep.equal({ type: Statement.COMMENT, value: '' });
        expect(new Statement('#')).to.deep.equal({ type: Statement.COMMENT, value: '' });
        expect(new Statement(';Comment')).to.deep.equal({ type: Statement.COMMENT, value: 'Comment' });
        expect(new Statement('# Comment ')).to.deep.equal({ type: Statement.COMMENT, value: 'Comment' });
    });

    it('should create include statement', function () {
        expect(new Statement('include "path/to/file"')).to.deep.equal({ type: Statement.INCLUDE, value: 'path/to/file' });
    });

    it('should create section statement', function () {
        expect(new Statement('[Section]')).to.deep.equal({ type: Statement.SECTION, value: 'Section' });
        expect(new Statement('[Section 2.1]')).to.deep.equal({ type: Statement.SECTION, value: 'Section 2.1' });
    });

    it('should create assignment statement', function () {
        expect(new Statement('foo=')).to.deep.equal({ type: Statement.PARAMETER, value: { name: 'foo', parameter: '' } });
        expect(new Statement('foo=bar')).to.deep.equal({ type: Statement.PARAMETER, value: { name: 'foo', parameter: 'bar' } });
        expect(new Statement('foo="bar"')).to.deep.equal({ type: Statement.PARAMETER, value: { name: 'foo', parameter: '"bar"' } });
        expect(new Statement('var1=123')).to.deep.equal({ type: Statement.PARAMETER, value: { name: 'var1', parameter: '123' } });
    });

    it('should create array statement', function () {
        expect(new Statement('foo=bar,baz')).to.deep.equal({ type: Statement.ARRAY, value: { name: 'foo', parameter: ['bar', 'baz'] } });
        expect(new Statement('foo[]=bar')).to.deep.equal({ type: Statement.ARRAY, value: { name: 'foo', parameter: ['bar'] } });
    });

    it('should create unknown statement', function () {
        expect(new Statement('=baz')).to.deep.equal({ type: Statement.UNKNOWN, value: null });
    });
});
