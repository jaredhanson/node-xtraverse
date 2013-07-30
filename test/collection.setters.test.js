var fs = require('fs')
  , $ = require('..');


describe('setters', function() {
  
  describe('attr', function() {
    it('should set value of existing attribute', function() {
      var el = $('<foo bar="baz">hello</foo>');
      
      expect(el.attr('bar', 'qux')).to.equal(el);
      expect(el.attr('bar')).to.equal('qux');
      expect(el.toString()).to.equal('<foo bar="qux">hello</foo>');
    });
    
    it('should set value of new attribute', function() {
      var el = $('<foo bar="baz">hello</foo>');
      
      expect(el.attr('qux', 'qoo')).to.equal(el);
      expect(el.attr('qux')).to.equal('qoo');
      expect(el.toString()).to.equal('<foo bar="baz" qux="qoo">hello</foo>');
    });
    
    it('should set multiple attributes', function() {
      var el = $('<foo bar="baz">hello</foo>');
      
      expect(el.attr({ bar: 'bux', a: '1', b: '2' })).to.equal(el);
      expect(el.attr('bar')).to.equal('bux');
      expect(el.attr('a')).to.equal('1');
      expect(el.attr('b')).to.equal('2');
      expect(el.toString()).to.equal('<foo bar="bux" a="1" b="2">hello</foo>');
    });
  });
  
});
